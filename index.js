// index.js
// A nodejs express app that gets the visitor's public IP address and stores it in a postgres database

// Import the required modules
const express = require('express');
const pg = require('pg');
const requestIp = require('request-ip');
const IP = require('ip');

// Create an express app
const app = express();

// Get the postgres details from the environment variables
const db_host = process.env.DB_HOST || 'localhost';
const db_username = process.env.DB_USERNAME || 'postgres';
const db_password = process.env.DB_PASSWORD || 'postgres';
const db_name = process.env.DB_NAME || 'task_db';
const db_port = process.env.DB_PORT || 5432;


// Console log the environment variables
console.log(`DB Host: ${db_host}`);
console.log(`DB Username: ${db_username}`);
console.log(`DB Password: ${db_password}`);
console.log(`DB Name: ${db_name}`);
console.log(`DB Port: ${db_port}`);



// Create a postgres client
const client = new pg.Client({
  user: db_username,
  password: db_password,
  database: db_name,
  host: db_host,
  port: db_port
});

// Connect to the database
client.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  } else {
    console.log('Connected to the database');

    // Create the table if it does not exist
    const query = `
      CREATE TABLE IF NOT EXISTS client_ips (
        id SERIAL PRIMARY KEY,
        client_ip VARCHAR(255) NOT NULL
      );
    `;

    client.query(query, (err, res) => {
      if (err) {
        console.error('Error creating the table:', err);
      } else {
        console.log('Table created or already exists');
      }
    });
  }
});

// Define a middleware to get the client IP address
app.use(requestIp.mw());

// Define a GET endpoint to store the client IP address
app.get('/client-ip', (req, res) => {
  // Get the client IP address from the request
  const clientIp = requestIp.getClientIp(req);

  // Insert the client IP address into the table
  const query = `
    INSERT INTO client_ips (client_ip)
    VALUES ($1)
    RETURNING id;
  `;

  client.query(query, [clientIp], (err, result) => {
    if (err) {
      console.error('Error inserting the client IP address:', err);
      res.status(500).send('Internal server error');
    } else {
      // Get the inserted id from the result
      const id = result.rows[0].id;

      // Send a response with the id and the client IP address
      res.json({
        id: id,
        client_ip: clientIp
      });
    }
  });
});

// Define a GET endpoint to list down all client IPs in a table format
app.get('/client-ip/list', (req, res) => {
  // Select all the client IPs from the table
  const query = `
    SELECT * FROM client_ips;
  `;

  client.query(query, (err, result) => {
    if (err) {
      console.error('Error selecting the client IPs:', err);
      res.status(500).send('Internal server error');
    } else {
      // Get the rows from the result
      const rows = result.rows;
      // Send a response with the rows as a JSON array
      res.json(rows);
    }
  });
});

// Define a GET endpoint to return a welcome message
app.get('/', (req, res) => {
    res.send('Welcome to the Client IP Task Demo [DEV]');
});

// Define a GET endpoint to delete all client IPs from the table
app.get('/client-ip/delete-all', (req, res) => {
    // Delete all the client IPs from the table
    const query = `
      DELETE FROM client_ips;
    `;
  
    client.query(query, (err, result) => {
      if (err) {
        console.error('Error deleting the client IPs:', err);
        res.status(500).send('Internal server error');
      } else {
        // Send a response with a success message
        res.send('All client IPs have been deleted');
      }
    });
  });

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log('Server running and listening on port 3000');
});
