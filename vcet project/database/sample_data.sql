-- ============================================================================
-- VELALAR COLLEGE OF ENGINEERING AND TECHNOLOGY (AUTONOMOUS)
-- DEPARTMENT OF INFORMATION TECHNOLOGY
-- Scenario 9: Retail Store Inventory and Sales Analysis System
-- Student: Ashvika K | Reg No: 732925ITR009
-- ============================================================================
-- Seed Dataset (DML)
-- ============================================================================

-- 1. Insert Categories
INSERT OR IGNORE INTO categories (category_id, category_name, description) VALUES
(1, 'Groceries & Staples', 'Rice, flour, pulses, spices, and grains'),
(2, 'Dairy & Beverages', 'Milk, butter, juices, tea, and soft drinks'),
(3, 'Personal Care', 'Soaps, shampoos, oral hygiene, and skincare'),
(4, 'Household & Cleaning', 'Detergents, floor cleaners, and kitchen essentials'),
(5, 'Snacks & Confectionery', 'Biscuits, chips, chocolates, and cookies');

-- 2. Insert Products (FR1)
INSERT OR REPLACE INTO products (product_id, category_id, product_name, brand, cost_price, selling_price, stock_quantity, reorder_level, unit_of_measure, created_at) VALUES
('PRD-101', 1, 'Basmati Rice Premium 1kg', 'India Gate', 95.00, 130.00, 45, 10, 'kg', '2026-11-01 09:00:00'),
('PRD-102', 1, 'Whole Wheat Atta 5kg', 'Aashirvaad', 190.00, 240.00, 30, 8, 'pack', '2026-11-01 09:15:00'),
('PRD-103', 1, 'Toor Dal Supreme 1kg', 'Tata Sampann', 120.00, 155.00, 25, 10, 'kg', '2026-11-01 09:20:00'),
('PRD-104', 1, 'Sunflower Cooking Oil 1L', 'Fortune', 115.00, 145.00, 4, 15, 'litre', '2026-11-01 09:30:00'), -- Low stock
('PRD-105', 1, 'Iodized Salt 1kg', 'Tata Salt', 18.00, 26.00, 60, 20, 'pack', '2026-11-01 09:35:00'),

('PRD-201', 2, 'Toned Fresh Milk 500ml', 'Aavin', 20.00, 25.00, 50, 15, 'pouch', '2026-11-01 10:00:00'),
('PRD-202', 2, 'Salted Butter 100g', 'Amul', 42.00, 56.00, 3, 10, 'pack', '2026-11-01 10:10:00'), -- Low stock
('PRD-203', 2, 'Green Tea Classic 25 bags', 'Tetley', 110.00, 160.00, 18, 5, 'box', '2026-11-01 10:15:00'),
('PRD-204', 2, 'Cold Pressed Apple Juice 1L', 'Real', 85.00, 120.00, 2, 8, 'bottle', '2026-11-01 10:20:00'), -- Low stock
('PRD-205', 2, 'Filter Coffee Powder 200g', 'Bru Gold', 140.00, 195.00, 22, 6, 'pack', '2026-11-01 10:30:00'),

('PRD-301', 3, 'Neem Aloe Vera Soap 125g', 'Medimix', 28.00, 38.00, 65, 15, 'bar', '2026-11-01 11:00:00'),
('PRD-302', 3, 'Anti-Dandruff Shampoo 180ml', 'Head & Shoulders', 125.00, 175.00, 14, 5, 'bottle', '2026-11-01 11:15:00'),
('PRD-303', 3, 'Herbal Toothpaste 150g', 'Colgate Max', 65.00, 92.00, 35, 10, 'tube', '2026-11-01 11:20:00'),
('PRD-304', 3, 'Moisturizing Cream 100ml', 'Nivea Soft', 130.00, 180.00, 8, 5, 'jar', '2026-11-01 11:30:00'),

('PRD-401', 4, 'Liquid Floor Cleaner 1L', 'Lizol', 130.00, 185.00, 16, 5, 'bottle', '2026-11-01 12:00:00'),
('PRD-402', 4, 'Detergent Powder 1kg', 'Surf Excel', 105.00, 148.00, 28, 10, 'pack', '2026-11-01 12:15:00'),
('PRD-403', 4, 'Dishwash Gel 500ml', 'Vim Gel', 72.00, 105.00, 0, 8, 'bottle', '2026-11-01 12:20:00'), -- Out of stock

('PRD-501', 5, 'Marie Gold Biscuits 200g', 'Britannia', 22.00, 30.00, 80, 20, 'pack', '2026-11-01 13:00:00'),
('PRD-502', 5, 'Classic Salted Potato Chips', 'Lays', 15.00, 20.00, 40, 15, 'pack', '2026-11-01 13:10:00'),
('PRD-503', 5, 'Dairy Milk Silk 60g', 'Cadbury', 55.00, 75.00, 32, 10, 'bar', '2026-11-01 13:15:00');

-- 3. Insert Customers
INSERT OR IGNORE INTO customers (customer_id, full_name, phone_number, email) VALUES
(1, 'Suresh Kumar', '9842100001', 'suresh.k@gmail.com'),
(2, 'Priya Dharshini', '9842100002', 'priya.d@yahoo.com'),
(3, 'Karthik Raja', '9842100003', 'karthik.r@outlook.com'),
(4, 'Ananya Sharma', '9842100004', 'ananya.s@gmail.com'),
(5, 'Venkatesh S', '9842100005', 'venkatesh.s@hotmail.com');

-- 4. Insert Transactions (FR2)
INSERT OR REPLACE INTO transactions (transaction_id, customer_id, transaction_date, subtotal, tax_amount, discount_amount, grand_total, payment_method, status) VALUES
('TXN-20261115-001', 1, '2026-11-15 10:30:00', 500.00, 25.00, 0.00, 525.00, 'UPI', 'COMPLETED'),
('TXN-20261115-002', 2, '2026-11-15 14:15:00', 780.00, 39.00, 20.00, 799.00, 'Card', 'COMPLETED'),
('TXN-20261116-001', 3, '2026-11-16 11:00:00', 360.00, 18.00, 0.00, 378.00, 'Cash', 'COMPLETED'),
('TXN-20261116-002', 4, '2026-11-16 16:45:00', 1250.00, 62.50, 50.00, 1262.50, 'UPI', 'COMPLETED'),
('TXN-20261117-001', 5, '2026-11-17 12:20:00', 640.00, 32.00, 0.00, 672.00, 'Cash', 'COMPLETED'),
('TXN-20261117-002', 1, '2026-11-17 17:30:00', 890.00, 44.50, 30.00, 904.50, 'Card', 'COMPLETED'),
('TXN-20261118-001', 2, '2026-11-18 10:15:00', 430.00, 21.50, 0.00, 451.50, 'UPI', 'COMPLETED'),
('TXN-20261118-002', 3, '2026-11-18 15:50:00', 1120.00, 56.00, 40.00, 1136.00, 'UPI', 'COMPLETED'),
('TXN-20261119-001', 4, '2026-11-19 11:10:00', 680.00, 34.00, 0.00, 714.00, 'Cash', 'COMPLETED'),
('TXN-20261119-002', 5, '2026-11-19 15:20:00', 950.00, 47.50, 25.00, 972.50, 'Card', 'COMPLETED');

-- 5. Insert Transaction Items (FR2 & FR3)
INSERT OR REPLACE INTO transaction_items (item_id, transaction_id, product_id, quantity, unit_price, item_subtotal) VALUES
(1, 'TXN-20261115-001', 'PRD-101', 2, 130.00, 260.00),
(2, 'TXN-20261115-001', 'PRD-102', 1, 240.00, 240.00),
(3, 'TXN-20261115-002', 'PRD-103', 2, 155.00, 310.00),
(4, 'TXN-20261115-002', 'PRD-402', 2, 148.00, 296.00),
(5, 'TXN-20261115-002', 'PRD-302', 1, 174.00, 174.00),
(6, 'TXN-20261116-001', 'PRD-203', 1, 160.00, 160.00),
(7, 'TXN-20261116-001', 'PRD-503', 2, 75.00, 150.00),
(8, 'TXN-20261116-001', 'PRD-201', 2, 25.00, 50.00),
(9, 'TXN-20261116-002', 'PRD-101', 3, 130.00, 390.00),
(10, 'TXN-20261116-002', 'PRD-102', 2, 240.00, 480.00),
(11, 'TXN-20261116-002', 'PRD-304', 2, 180.00, 360.00),
(12, 'TXN-20261117-001', 'PRD-205', 2, 195.00, 390.00),
(13, 'TXN-20261117-001', 'PRD-201', 4, 25.00, 100.00),
(14, 'TXN-20261117-001', 'PRD-501', 5, 30.00, 150.00),
(15, 'TXN-20261117-002', 'PRD-401', 2, 185.00, 370.00),
(16, 'TXN-20261117-002', 'PRD-103', 2, 155.00, 310.00),
(17, 'TXN-20261117-002', 'PRD-502', 7, 20.00, 140.00),
(18, 'TXN-20261117-002', 'PRD-301', 2, 38.00, 70.00),
(19, 'TXN-20261118-001', 'PRD-104', 2, 145.00, 290.00),
(20, 'TXN-20261118-001', 'PRD-503', 1, 75.00, 75.00),
(21, 'TXN-20261118-001', 'PRD-501', 2, 30.00, 65.00),
(22, 'TXN-20261118-002', 'PRD-101', 4, 130.00, 520.00),
(23, 'TXN-20261118-002', 'PRD-205', 2, 195.00, 390.00),
(24, 'TXN-20261118-002', 'PRD-303', 2, 92.00, 184.00),
(25, 'TXN-20261119-001', 'PRD-102', 2, 240.00, 480.00),
(26, 'TXN-20261119-001', 'PRD-203', 1, 160.00, 160.00),
(27, 'TXN-20261119-001', 'PRD-502', 2, 20.00, 40.00),
(28, 'TXN-20261119-002', 'PRD-402', 3, 148.00, 444.00),
(29, 'TXN-20261119-002', 'PRD-103', 2, 155.00, 310.00),
(30, 'TXN-20261119-002', 'PRD-304', 1, 180.00, 180.00);

-- 6. Insert Stock Audit Logs
INSERT OR REPLACE INTO stock_audit_logs (log_id, product_id, change_type, quantity_changed, remaining_stock, remarks, logged_at) VALUES
(1, 'PRD-101', 'INITIAL_STOCK', 54, 54, 'Initial inventory setup', '2026-11-01 09:00:00'),
(2, 'PRD-101', 'SALE', -2, 52, 'Deduction for TXN-20261115-001', '2026-11-15 10:30:00'),
(3, 'PRD-101', 'SALE', -3, 49, 'Deduction for TXN-20261116-002', '2026-11-16 16:45:00'),
(4, 'PRD-101', 'SALE', -4, 45, 'Deduction for TXN-20261118-002', '2026-11-18 15:50:00'),
(5, 'PRD-403', 'SALE', -8, 0, 'Stock sold out', '2026-11-10 18:00:00');
