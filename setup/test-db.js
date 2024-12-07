const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'expense_tracker',
  password: 'funone',
  port: 5432,
});

client.connect()
  .then(() => {
    console.log("Connected to the database");
  });



  