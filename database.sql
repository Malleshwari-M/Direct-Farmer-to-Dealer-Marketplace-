
CREATE DATABASE FarmerDealerDB;
USE FarmerDealerDB;


CREATE TABLE Farmers (
    farmer_id INT AUTO_INCREMENT PRIMARY KEY,
    farmer_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    phone_no VARCHAR(15)
);


CREATE TABLE Dealers (
    dealer_id INT AUTO_INCREMENT PRIMARY KEY,
    dealer_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    company_name VARCHAR(100),
    phone_no VARCHAR(15)
);


CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    farmer_id INT,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(100),
    quantity INT NOT NULL,
    price_per_unit DECIMAL(10,2) NOT NULL,
    description TEXT,
    FOREIGN KEY (farmer_id) REFERENCES Farmers(farmer_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    dealer_id INT,
    product_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    quantity INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    FOREIGN KEY (dealer_id) REFERENCES Dealers(dealer_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


INSERT INTO Farmers (farmer_name, email, password, location, phone_no)
VALUES 
('Ravi Kumar', 'ravi@gmail.com', 'ravi123', 'Coimbatore', '9876543210'),
('Mani', 'mani@gmail.com', 'mani123', 'Erode', '9876509876');


INSERT INTO Dealers (dealer_name, email, password, company_name, phone_no)
VALUES 
('Arun Traders', 'arun@gmail.com', 'arun123', 'Arun Agro', '9988776655'),
('Selva Distributors', 'selva@gmail.com', 'selva123', 'Selva Exports', '8877665544');


INSERT INTO Products (farmer_id, product_name, category, quantity, price_per_unit, description)
VALUES 
(1, 'Tomatoes', 'Vegetables', 100, 25.50, 'Fresh organic tomatoes'),
(2, 'Paddy Rice', 'Grains', 200, 50.00, 'High-quality rice grains');


INSERT INTO Orders (dealer_id, product_id, quantity, total_amount, status)
VALUES 
(1, 1, 20, 510.00, 'Confirmed'),
(2, 2, 50, 2500.00, 'Pending');
