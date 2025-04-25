// File: server.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'dhanya24',
  database: process.env.DB_NAME || 'car_rental_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 as test');
    res.json({ message: 'Car Rental API is running', dbConnection: 'Success' });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ message: 'Error connecting to database', error: error.message });
  }
});

// Cars API Routes
app.get('/api/cars', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM cars');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ message: 'Error fetching cars', error: error.message });
  }
});

app.get('/api/cars/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM cars WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching car details:', error);
    res.status(500).json({ message: 'Error fetching car details', error: error.message });
  }
});

// Bookings API Routes
app.post('/api/bookings', async (req, res) => {
  const { carId, customerName, customerEmail, customerPhone, 
          customerAddress, licenseNumber, pickupDate, 
          returnDate, additionalInfo, totalPrice } = req.body;
  
  try {
    // Start a transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    
    try {
      // Insert booking
      const [result] = await connection.query(
        `INSERT INTO bookings 
        (car_id, customer_name, customer_email, customer_phone, 
        customer_address, license_number, pickup_date, 
        return_date, additional_info, total_price, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [carId, customerName, customerEmail, customerPhone, 
        customerAddress, licenseNumber, pickupDate, 
        returnDate, additionalInfo, totalPrice]
      );
      
      // Update car status to 'rented'
      await connection.query(
        'UPDATE cars SET status = "rented" WHERE id = ?',
        [carId]
      );
      
      await connection.commit();
      
      res.status(201).json({ 
        message: 'Booking created successfully',
        bookingId: result.insertId
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT b.*, c.make, c.model 
      FROM bookings b
      JOIN cars c ON b.car_id = c.id
      ORDER BY b.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
});

// Reviews API Routes
app.post('/api/reviews', async (req, res) => {
  const { carId, reviewerName, reviewText, rating } = req.body;
  
  try {
    const [result] = await pool.query(
      `INSERT INTO reviews 
      (car_id, reviewer_name, review_text, rating, created_at) 
      VALUES (?, ?, ?, ?, NOW())`,
      [carId, reviewerName, reviewText, rating]
    );
    
    res.status(201).json({ 
      message: 'Review submitted successfully',
      reviewId: result.insertId
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ message: 'Error submitting review', error: error.message });
  }
});

app.get('/api/reviews/:carId', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM reviews WHERE car_id = ? ORDER BY created_at DESC',
      [req.params.carId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;