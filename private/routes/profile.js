const express = require('express');
const jwt = require('jsonwebtoken');
const { getDbConnection } = require('../services/db');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secret-key';

// Helper to authenticate and get user from token
async function authenticate(req, res) {
  const auth = req.headers.authorization;
  if (!auth) {
    res.status(401).json({ error: 'No token provided' });
    return null;
  }
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
    return null;
  }
}

// GET profile (unchanged)
router.get('/', async (req, res) => {
  const decoded = await authenticate(req, res);
  if (!decoded) return;
  res.json({ username: decoded.username, email: decoded.email });
});

// PATCH profile details (displayName, bio, etc.)
router.patch('/', async (req, res) => {
  const decoded = await authenticate(req, res);
  if (!decoded) return;

  const { displayName, bio } = req.body;
  if (displayName === undefined && bio === undefined) {
    return res.status(400).json({ error: 'Nothing to update' });
  }

  let conn;
  try {
    conn = await getDbConnection();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }

  // Only update provided fields
  const fields = [];
  const values = [];
  if (displayName !== undefined) {
    fields.push('display_name = ?');
    values.push(displayName);
  }
  if (bio !== undefined) {
    fields.push('bio = ?');
    values.push(bio);
  }
  values.push(decoded.username); // for WHERE clause

  try {
    await conn.execute(
      `UPDATE users SET ${fields.join(', ')} WHERE username = ?`,
      values
    );
    await conn.end();
    res.json({ message: 'Profile updated' });
  } catch (err) {
    await conn.end();
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;
