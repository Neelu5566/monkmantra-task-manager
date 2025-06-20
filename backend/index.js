const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config(); // 👈 Load .env variables

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 🔌 PostgreSQL connection using env variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// API endpoints

app.get('/tasks', async (req, res) => {
  const result = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
  res.json(result.rows);
});

app.post('/tasks', async (req, res) => {
  const { title, status } = req.body;
  const result = await pool.query(
    'INSERT INTO tasks (title, status) VALUES ($1, $2) RETURNING *',
    [title, status]
  );
  res.status(201).json(result.rows[0]);
});

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;
  const result = await pool.query(
    'UPDATE tasks SET title = $1, status = $2 WHERE id = $3 RETURNING *',
    [title, status, id]
  );
  res.json(result.rows[0]);
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  res.json({ message: 'Task deleted' });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
