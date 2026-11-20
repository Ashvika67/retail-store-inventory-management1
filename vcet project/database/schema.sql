-- ============================================================================
-- VELALAR COLLEGE OF ENGINEERING AND TECHNOLOGY (AUTONOMOUS), ERODE - 12
-- DEPARTMENT OF INFORMATION TECHNOLOGY
-- ACADEMIC YEAR: 2026 - 2027 (ODD) | CLASS: 25IT3A
-- PROJECT-BASED ASSESSMENT
-- Scenario 9: Retail Store Inventory and Sales Analysis System
-- Student Name: Ashvika K | Register Number: 732925ITR009
-- ============================================================================
-- Database Schema Definition (DDL)
-- Compatible with MySQL 8.0+ and SQLite 3.x
-- Normalized to 3NF / BCNF
-- ============================================================================

-- 1. Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
    category_id INTEGER PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
);

-- 2. Create Products Table (FR1: Maintain product details)
CREATE TABLE IF NOT EXISTS products (
    product_id VARCHAR(20) PRIMARY KEY,
    category_id INTEGER NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    brand VARCHAR(50),
    cost_price DECIMAL(10,2) NOT NULL CHECK (cost_price >= 0),
    selling_price DECIMAL(10,2) NOT NULL CHECK (selling_price >= cost_price),
    stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    reorder_level INTEGER NOT NULL DEFAULT 5 CHECK (reorder_level >= 0),
    unit_of_measure VARCHAR(20) DEFAULT 'pcs',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE RESTRICT
);

-- 3. Create Customers Table
CREATE TABLE IF NOT EXISTS customers (
    customer_id INTEGER PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create Transactions Table (FR2: Record sales transactions)
CREATE TABLE IF NOT EXISTS transactions (
    transaction_id VARCHAR(30) PRIMARY KEY,
    customer_id INTEGER,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    subtotal DECIMAL(10,2) NOT NULL CHECK (subtotal >= 0),
    tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00 CHECK (tax_amount >= 0),
    discount_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00 CHECK (discount_amount >= 0),
    grand_total DECIMAL(10,2) NOT NULL CHECK (grand_total >= 0),
    payment_method VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'COMPLETED',
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE SET NULL
);

-- 5. Create Transaction Items Table (Line items of sales)
CREATE TABLE IF NOT EXISTS transaction_items (
    item_id INTEGER PRIMARY KEY,
    transaction_id VARCHAR(30) NOT NULL,
    product_id VARCHAR(20) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
    item_subtotal DECIMAL(10,2) NOT NULL CHECK (item_subtotal >= 0),
    FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT
);

-- 6. Create Stock Audit Logs Table (FR3: Track automatic stock updates)
CREATE TABLE IF NOT EXISTS stock_audit_logs (
    log_id INTEGER PRIMARY KEY,
    product_id VARCHAR(20) NOT NULL,
    change_type VARCHAR(20) NOT NULL, -- 'SALE', 'RESTOCK', 'ADJUSTMENT'
    quantity_changed INTEGER NOT NULL,
    remaining_stock INTEGER NOT NULL CHECK (remaining_stock >= 0),
    remarks VARCHAR(255),
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(transaction_date);
CREATE INDEX IF NOT EXISTS idx_items_transaction ON transaction_items(transaction_id);
CREATE INDEX IF NOT EXISTS idx_items_product ON transaction_items(product_id);
