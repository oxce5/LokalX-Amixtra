const amqp = require('amqplib');
const RABBIT_URL = 'amqp://guest:guest@localhost:5672';
const QUEUE = 'user-events';

async function main() {
  const conn = await amqp.connect(RABBIT_URL);
  const channel = await conn.createChannel();
  await channel.assertQueue(QUEUE);

  console.log('[RabbitMQ] Waiting for messages in', QUEUE);
  channel.consume(QUEUE, msg => {
    if (msg !== null) {
      console.log('Received:', msg.content.toString());
      channel.ack(msg);
    }
  });
}

main();
