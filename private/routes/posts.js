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

// GET all posts (optionally by user)
router.get('/', async (req, res) => {
  const { by_user } = req.query;
  let conn;
  try {
    conn = await getDbConnection();
    let rows;
    if (by_user) {
      [rows] = await conn.execute(
        'SELECT * FROM posts WHERE by_user = ? ORDER BY created_at DESC',
        [by_user]
      );
    } else {
      [rows] = await conn.execute(
        'SELECT * FROM posts ORDER BY created_at DESC'
      );
    }
    await conn.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET single post by id
router.get('/:id', async (req, res) => {
  let conn;
  try {
    conn = await getDbConnection();
    const [rows] = await conn.execute(
      'SELECT * FROM posts WHERE id = ?',
      [req.params.id]
    );
    await conn.end();
    if (rows.length === 0) return res.status(404).json({ error: 'Post not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// POST create new post
router.post('/', authenticate, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: "Missing title or content" });
  let conn;
  try {
    conn = await getDbConnection();
    await conn.execute(
      `INSERT INTO posts (by_user, title, content, edit_history) VALUES (?, ?, ?, ?)`,
      [
        req.user.username,
        title,
        content,
        JSON.stringify([])
      ]
    );
    await conn.end();
    res.json({ message: "Post created" });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// PATCH update a post (add to edit_history)
router.patch('/:id', authenticate, async (req, res) => {
  const { title, content } = req.body;
  if (!title && !content) return res.status(400).json({ error: "Nothing to update" });

  let conn;
  try {
    conn = await getDbConnection();
    // Get current post (ensure ownership)
    const [rows] = await conn.execute(
      'SELECT * FROM posts WHERE id = ? AND by_user = ?',
      [req.params.id, req.user.username]
    );
    if (rows.length === 0) {
      await conn.end();
      return res.status(404).json({ error: "Post not found or not yours" });
    }
    const post = rows[0];

    // Prepare edit history
    let history = [];
    if (post.edit_history) {
      try { history = JSON.parse(post.edit_history); } catch {}
    }
    history.push({
      title: post.title,
      content: post.content,
      edited_at: post.updated_at
    });

    // Prepare new values
    const newTitle = title !== undefined ? title : post.title;
    const newContent = content !== undefined ? content : post.content;

    await conn.execute(
      `UPDATE posts SET title = ?, content = ?, edit_history = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND by_user = ?`,
      [
        newTitle,
        newContent,
        JSON.stringify(history),
        req.params.id,
        req.user.username
      ]
    );
    await conn.end();
    res.json({ message: "Post updated" });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE a post
router.delete('/:id', authenticate, async (req, res) => {
  let conn;
  try {
    conn = await getDbConnection();
    const [result] = await conn.execute(
      'DELETE FROM posts WHERE id = ? AND by_user = ?',
      [req.params.id, req.user.username]
    );
    await conn.end();
    if (result.affectedRows === 0) return res.status(404).json({ error: "Post not found or not yours" });
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
