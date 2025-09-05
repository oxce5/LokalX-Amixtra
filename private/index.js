const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
const amqp = require('amqplib');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const JWT_SECRET = 'your-very-secret-key'; // Use env var in production!

// MySQL connection
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'userManager',
  password: process.env.DB_PASSWORD || 'test',
  database: process.env.DB_NAME || 'appdb'
};

// TODO Implement messaging and posts
// RabbitMQ connection (optional)
// const RABBIT_URL = 'amqp://user:pass@localhost:5672';
// const QUEUE = 'user-events';
//
// let rabbitChannel;
// async function setupRabbit() {
//   const conn = await amqp.connect(RABBIT_URL);
//   rabbitChannel = await conn.createChannel();
//   await rabbitChannel.assertQueue(QUEUE);
// }
// setupRabbit().catch(console.error);

// Register endpoint
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  let conn;
    try {
      conn = await mysql.createConnection(dbConfig);
    } catch (error) {
      console.error('Failed to connect to MySQL:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

  // Check if user exists
  const [rows] = await conn.execute('SELECT id FROM users WHERE username = ? OR email = ?', [username, email]);
  if (rows.length > 0) {
    await conn.end();
    return res.status(400).json({ error: 'Username or email already exists' });
  }

  const password_hash = await bcrypt.hash(password, 10);
  await conn.execute('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', [username, email, password_hash]);
  await conn.end();

  // Publish event to RabbitMQ
  // if (rabbitChannel) {
  //   rabbitChannel.sendToQueue(QUEUE, Buffer.from(JSON.stringify({ type: 'register', username, email })));
  // }

  // Create JWT token
  const token = jwt.sign({ username, email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'User registered', token });
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const conn = await mysql.createConnection(dbConfig);

  const [rows] = await conn.execute('SELECT * FROM users WHERE username = ?', [username]);
  await conn.end();

  if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  // Publish event to RabbitMQ
  if (rabbitChannel) {
    rabbitChannel.sendToQueue(QUEUE, Buffer.from(JSON.stringify({ type: 'login', username })));
  }

  // Create JWT token
  const token = jwt.sign({ username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Protected route example
app.get('/profile', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token provided' });
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ username: decoded.username, email: decoded.email });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
