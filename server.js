const express = require('express');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // To allow cross-origin requests from the front-end

// PostgreSQL client setup
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'expense_tracker',
  password: 'funone',
  port: 5432,
});

client.connect();

// Endpoint to add an expense or income
app.post('/api/addExpense', async (req, res) => {
  const { date, amount, category, type } = req.body;

  const query = `
    INSERT INTO expenses (date, amount, category, type)
    VALUES ($1, $2, $3, $4)
  `;
  const values = [date, amount, category, type];

  try {
    await client.query(query, values);
    res.status(200).json({ message: 'Expense/Income added successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Error adding entry', details: err.stack });
  }
});

// Endpoint to get all expenses
app.get('/api/viewExpenses', async (req, res) => {
  const result = await client.query('SELECT * FROM expenses ORDER BY date DESC');
  res.status(200).json(result.rows);
});

// Endpoint to get total spending
app.get('/api/viewTotalSpending', async (req, res) => {
  const result = await client.query('SELECT SUM(amount) AS total FROM expenses WHERE type = \'expense\'');
  res.status(200).json({ total: result.rows[0].total });
});

// Endpoint to get spending by category
app.get('/api/viewSpendingByCategory', async (req, res) => {
  const result = await client.query('SELECT category, SUM(amount) AS total FROM expenses GROUP BY category ORDER BY total DESC');
  res.status(200).json(result.rows);
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
