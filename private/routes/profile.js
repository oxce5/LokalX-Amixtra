const express = require('express');
const jwt = require('jsonwebtoken');
const { getDbConnection } = require('../services/db');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secret-key';

// GET profile (with display_name and bio)
router.get('/', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token provided' });
  const token = auth.split(' ')[1];
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  let conn;
  try {
    conn = await getDbConnection();
    const [rows] = await conn.execute(
      'SELECT username, email, display_name, bio FROM users WHERE username = ?',
      [decoded.username]
    );
    await conn.end();
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
    const user = rows[0];
    res.json({
      username: user.username,
      email: user.email,
      displayName: user.display_name,
      bio: user.bio,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Database error' });
  }
});

// PATCH profile (update display_name and/or bio)
router.patch('/', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token provided' });
  const token = auth.split(' ')[1];
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const { displayName, bio } = req.body;
  if (displayName === undefined && bio === undefined) {
    return res.status(400).json({ error: 'Nothing to update' });
  }

  let fields = [];
  let values = [];
  if (displayName !== undefined) {
    fields.push("display_name = ?");
    values.push(displayName);
  }
  if (bio !== undefined) {
    fields.push("bio = ?");
    values.push(bio);
  }
  values.push(decoded.username); // WHERE username = ?

  let conn;
  try {
    conn = await getDbConnection();
    await conn.execute(
      `UPDATE users SET ${fields.join(", ")} WHERE username = ?`,
      values
    );
    await conn.end();
    res.json({ message: "Profile updated" });
  } catch (err) {
    return res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
