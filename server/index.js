const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const knex = require('knex');
const knexConfig = require('./knexfile');

const app = express();
const port = 5000;

const db = knex(knexConfig.development); // Use dev environment

// PostgreSQL configuration
const pool = new Pool({
  user: 'skjimen',
  host: 'localhost',
  database: 'inventory',
  password: 'pacalou23',
  port: 5432,
});

app.use(cors());
app.use(express.json());

// PostgreSQL route 
app.get('/users', async (req, res) => {
  try {
    const query = `
      SELECT users.*, json_agg(items.*) AS items
      FROM users
      LEFT JOIN items ON users.id = items.user_id
      GROUP BY users.id;
    `;
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Knex route 
app.get('/users/knex', async (req, res) => {
  try {
    const users = await db('users').select('*');
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Register a new user route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  try {
    const newUser = await db('users').insert({ username, email, password }).returning('*');
    res.json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to fetch all items
app.get('/items', async (req, res) => {
  try {
    const items = await db('items').select('*');
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
