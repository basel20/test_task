CREATE DATABASE test;

-- Create Products Table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,               -- Unique identifier for each product
    plu VARCHAR(50) UNIQUE NOT NULL,     -- Product Lookup Code (PLU)
    name VARCHAR(255) NOT NULL,           -- Name of the product
    is_available BOOLEAN DEFAULT TRUE
);

-- Create Stocks Table
CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,               -- Unique identifier for each stock entry
    product_id INTEGER NOT NULL,         -- Foreign key referencing the product
    shop_id VARCHAR(50) NOT NULL,        -- Identifier for the shop
    quantity_on_shelf INTEGER DEFAULT 0, -- Quantity of product on shelf
    quantity_in_order INTEGER DEFAULT 0, -- Quantity of product in order
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Create ActionHistory Table
CREATE TABLE action_history (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    shop_id VARCHAR(50) NOT NULL,
    action VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
