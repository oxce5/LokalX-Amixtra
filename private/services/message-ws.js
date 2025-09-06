const WebSocket = require('ws');
const amqp = require('amqplib');
const jwt = require('jsonwebtoken');

const RABBIT_URL = process.env.RABBIT_URL || 'amqp://guest:guest@localhost:5672';
const QUEUE = process.env.RABBIT_QUEUE || 'user-events';
const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secret-key';

let userSockets = new Map(); // username -> Set of sockets

function setup(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    // Simple JWT auth via query param: ws://host:3000?token=xxx
    const url = new URL(req.url, `http://${req.headers.host}`);
    const token = url.searchParams.get('token');
    let username = null;
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      username = payload.username;
    } catch (e) {
      ws.close(4001, "Invalid token");
      return;
    }

    if (!userSockets.has(username)) userSockets.set(username, new Set());
    userSockets.get(username).add(ws);

    ws.on('close', () => {
      userSockets.get(username).delete(ws);
      if (userSockets.get(username).size === 0) userSockets.delete(username);
    });
  });

  // Set up RabbitMQ consumer
  (async () => {
    const conn = await amqp.connect(RABBIT_URL);
    const channel = await conn.createChannel();
    await channel.assertQueue(QUEUE);
    channel.consume(QUEUE, msg => {
      if (!msg) return;
      let payload;
      try {
        payload = JSON.parse(msg.content.toString());
      } catch (e) {
        return channel.ack(msg);
      }

      if (payload.type === 'user-message' && payload.to) {
        const recipients = userSockets.get(payload.to);
        if (recipients) {
          for (let ws of recipients) {
            ws.send(JSON.stringify(payload));
          }
        }
      }
      channel.ack(msg);
    });
  })();
}

module.exports = { setup };
