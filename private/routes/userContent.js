const express = require('express');
const jwt = require('jsonwebtoken');
const { getDbConnection } = require('../services/db');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secret-key';

// Middleware for JWT authentication
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

// GET all user_content for authenticated user
router.get('/', authenticate, async (req, res) => {
  let conn;
  try {
    conn = await getDbConnection();
    const [rows] = await conn.execute(
      'SELECT * FROM user_content WHERE username = ?',
      [req.user.username]
    );
    await conn.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// POST create new user_content
router.post('/', authenticate, async (req, res) => {
  const { marketProducts, biddingProducts, description, tags } = req.body;
  let conn;
  try {
    conn = await getDbConnection();
    await conn.execute(
      `INSERT INTO user_content 
        (username, market_products, bidding_products, description, tags, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        req.user.username,
        marketProducts ? JSON.stringify(marketProducts) : null,
        biddingProducts ? JSON.stringify(biddingProducts) : null,
        description || null,
        tags ? JSON.stringify(tags) : null,
      ]
    );
    await conn.end();
    res.json({ message: "Content created" });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// PATCH update a specific user_content by id
router.patch('/:id', authenticate, async (req, res) => {
  const { status, marketProducts, biddingProducts, description, tags } = req.body;
  let conn;
  try {
    conn = await getDbConnection();
    // Only update provided fields
    const updates = [];
    const values = [];
    if (status !== undefined) {
      updates.push('status = ?');
      values.push(status);
    }
    if (marketProducts !== undefined) {
      updates.push('market_products = ?');
      values.push(JSON.stringify(marketProducts));
    }
    if (biddingProducts !== undefined) {
      updates.push('bidding_products = ?');
      values.push(JSON.stringify(biddingProducts));
    }
    if (description !== undefined) {
      updates.push('description = ?');
      values.push(description);
    }
    if (tags !== undefined) {
      updates.push('tags = ?');
      values.push(JSON.stringify(tags));
    }
    if (updates.length === 0) return res.status(400).json({ error: 'Nothing to update' });
    updates.push('updated_at = NOW()');
    values.push(req.params.id, req.user.username);

    const [result] = await conn.execute(
      `UPDATE user_content SET ${updates.join(', ')} WHERE id = ? AND username = ?`,
      values
    );
    await conn.end();
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Content updated' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE a specific user_content by id
router.delete('/:id', authenticate, async (req, res) => {
  let conn;
  try {
    conn = await getDbConnection();
    const [result] = await conn.execute(
      'DELETE FROM user_content WHERE id = ? AND username = ?',
      [req.params.id, req.user.username]
    );
    await conn.end();
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Content deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
