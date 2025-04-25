// File: init-db.js
require('dotenv').config();
const fs = require('fs');
const mysql = require('mysql2/promise');

async function initializeDatabase() {
  // Read SQL file
  const sql = fs.readFileSync('./schema.sql', 'utf8');
  
  try {
    // First connect without database to create it if needed
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'password'
    });
    
    console.log('Connected to MySQL server');
    
    // Create database if not exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'car_rental_db'}`);
    console.log(`Database ${process.env.DB_NAME || 'car_rental_db'} created or already exists`);
    
    // Connect with database to run schema
    await connection.query(`USE ${process.env.DB_NAME || 'car_rental_db'}`);

    // Split and execute SQL statements
    const statements = sql.split(';').filter(statement => statement.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        await connection.query(statement);
      }
    }
    
    console.log('Database schema initialized successfully');
    await connection.end();
    
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();