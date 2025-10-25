
-- Create the database
CREATE DATABASE IF NOT EXISTS farmer_dealer_db;
USE farmer_dealer_db;

-- Create Farmer table
CREATE TABLE IF NOT EXISTS farmer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Create Product table
CREATE TABLE IF NOT EXISTS product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DOUBLE NOT NULL,
    quantity VARCHAR(100) NOT NULL,
    description TEXT,
    farmer_id INT,
    CONSTRAINT fk_farmer FOREIGN KEY (farmer_id) REFERENCES farmer(id) ON DELETE SET NULL
);

-- Insert a test farmer
INSERT INTO farmer (name, email, password, role)
VALUES ('Test Farmer', 'farmer@example.com', 'pass123', 'farmer');
