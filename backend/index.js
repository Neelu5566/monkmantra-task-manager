const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// 🔌 PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tasks_db',
  password: 'Neelu@02',
  port: 5432,
});

// GET all tasks
app.get('/tasks', async (req, res) => {
  const result = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
  res.json(result.rows);
});

// POST a new task
app.post('/tasks', async (req, res) => {
  const { title, status } = req.body;
  const result = await pool.query(
    'INSERT INTO tasks (title, status) VALUES ($1, $2) RETURNING *',
    [title, status]
  );
  res.status(201).json(result.rows[0]);
});

// UPDATE task
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;
  const result = await pool.query(
    'UPDATE tasks SET title = $1, status = $2 WHERE id = $3 RETURNING *',
    [title, status, id]
  );
  res.json(result.rows[0]);
});

// DELETE task
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  res.json({ message: 'Task deleted' });
});

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
