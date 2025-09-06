const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getDbConnection } = require('../services/db');
const { getRabbitChannel, QUEUE } = require('../services/rabbitmq'); // <-- Update here

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secret-key';

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  let conn;
  try {
    conn = await getDbConnection();
  } catch (error) {
    console.error('Failed to connect to MySQL:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }

  const [rows] = await conn.execute('SELECT id FROM users WHERE username = ? OR email = ?', [username, email]);
  if (rows.length > 0) {
    await conn.end();
    return res.status(400).json({ error: 'Username or email already exists' });
  }

  const password_hash = await bcrypt.hash(password, 10);
  await conn.execute('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', [username, email, password_hash]);
  await conn.end();

  // Publish event to RabbitMQ
  const channel = getRabbitChannel();
  if (channel) {
    channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify({ type: 'register', username, email })));
  }

  const token = jwt.sign({ username, email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'User registered', token });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  let conn;
  try {
    conn = await getDbConnection();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }

  const [rows] = await conn.execute('SELECT * FROM users WHERE username = ?', [username]);
  await conn.end();

  if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  // Publish event to RabbitMQ
  const channel = getRabbitChannel();
  if (channel) {
    channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify({ type: 'login', username })));
  }

  const token = jwt.sign({ username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
