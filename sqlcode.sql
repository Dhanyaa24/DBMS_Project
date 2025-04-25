-- Create database if not exists
CREATE DATABASE IF NOT EXISTS car_rental_db;
USE car_rental_db;

-- Cars table
CREATE TABLE IF NOT EXISTS cars (
  id INT AUTO_INCREMENT PRIMARY KEY,
  make VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INT NOT NULL,
  type VARCHAR(50) NOT NULL,
  price_per_day DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  status ENUM('available', 'rented', 'maintenance') DEFAULT 'available',
  seating_capacity INT DEFAULT 5,
  luggage_capacity INT DEFAULT 3,
  transmission VARCHAR(50) DEFAULT 'Automatic',
  fuel_type VARCHAR(50) DEFAULT 'Petrol',
  mileage VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  car_id INT NOT NULL,
  customer_name VARCHAR(100) NOT NULL,
  customer_email VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_address TEXT,
  license_number VARCHAR(50) NOT NULL,
  pickup_date DATE NOT NULL,
  return_date DATE NOT NULL,
  additional_info TEXT,
  total_price DECIMAL(10, 2) NOT NULL,
  booking_status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (car_id) REFERENCES cars(id)
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  car_id INT NOT NULL,
  reviewer_name VARCHAR(100) NOT NULL,
  review_text TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (car_id) REFERENCES cars(id)
);

-- Insert sample car data (optional)
INSERT INTO cars (make, model, year, type, price_per_day, image_url, status, seating_capacity, luggage_capacity, transmission, fuel_type, mileage)
VALUES 
  ('Toyota', 'Camry', 2023, 'sedan', 3500, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD1Wk9VE-rR_aiDbDdEc6yvx6Kg_qjk07roVSLnvRQOfRXPM9AsIPkZw7GjrAKARzivwM&usqp=CAU', 'available', 5, 3, 'Automatic', 'Petrol', '12 kmpl'),
  ('Honda', 'CR-V', 2023, 'suv', 4500, 'https://images8.alphacoders.com/549/549210.jpg', 'available', 5, 4, 'Automatic', 'Diesel', '14 kmpl'),
  ('Mercedes', 'S-Class', 2023, 'luxury', 12000, 'https://www.hdcarwallpapers.com/walls/mercedes_benz_s_klasse_lang_amg_line_2020_4k-HD.jpg', 'available', 5, 3, 'Automatic', 'Petrol', '9 kmpl'),
  ('BMW', 'M4', 2023, 'sports', 15000, 'https://i.ytimg.com/vi/x9fB-2OOHFo/maxresdefault.jpg', 'rented', 4, 2, 'Manual', 'Petrol', '8 kmpl'),
  ('Tata', 'Nexon EV', 2023, 'electric', 5000, 'https://s7ap1.scene7.com/is/image/tatapassenger/City-33?$B-1228-696-S$&fit=crop&fmt=webp', 'available', 5, 3, 'Automatic', 'Electric', '300 km/charge'),
  ('Hyundai', 'Creta', 2023, 'suv', 4000, 'https://w0.peakpx.com/wallpaper/775/571/HD-wallpaper-hyundai-creta-road-2021-cars-crossovers-mx-spec-su2-2021-hyundai-creta-korean-cars-hyundai.jpg', 'available', 5, 4, 'Automatic', 'Diesel', '16 kmpl'),
  ('Maruti Suzuki', 'Swift', 2023, 'hatchback', 2000, 'https://images5.alphacoders.com/136/1365537.jpeg', 'available', 5, 2, 'Manual', 'Petrol', '22 kmpl'),
  ('Kia', 'Seltos', 2023, 'suv', 4200, 'https://www.hdcarwallpapers.com/walls/kia_seltos_2023_4k-HD.jpg', 'rented', 5, 4, 'Automatic', 'Diesel', '18 kmpl');
  select * from bookings;