-- Create the database
CREATE DATABASE IF NOT EXISTS farmer_dealer_db;

-- Use the database
USE farmer_dealer_db;

-- Optional: create a test farmer
INSERT INTO farmer (name, email, password, role)
VALUES ('Test Farmer', 'farmer@example.com', 'pass123', 'farmer');

