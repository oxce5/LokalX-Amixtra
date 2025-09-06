const express = require('express');
const jwt = require('jsonwebtoken');
const { getDbConnection } = require('../services/db');
const { getRabbitChannel, QUEUE } = require('../services/rabbitmq');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secret-key';

// JWT authentication middleware
async function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token provided' });
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// POST /messages { to, message }
router.post('/', authenticate, async (req, res) => {
  const { to, message } = req.body;
  const from = req.user.username;
  if (!to || !message) return res.status(400).json({ error: 'Missing fields' });

  const payload = {
    type: 'user-message',
    from,
    to,
    message,
    sentAt: new Date().toISOString()
  };

  const channel = getRabbitChannel();
  if (channel) {
    channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(payload)));
    // Optionally, persist in DB here
    return res.json({ message: 'Sent' });
  } else {
    return res.status(503).json({ error: 'Messaging temporarily unavailable' });
  }
});

module.exports = router;
