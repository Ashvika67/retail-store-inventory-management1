-- ============================================================================
-- VELALAR COLLEGE OF ENGINEERING AND TECHNOLOGY (AUTONOMOUS)
-- DEPARTMENT OF INFORMATION TECHNOLOGY
-- Scenario 9: Retail Store Inventory and Sales Analysis System
-- Student: Ashvika K | Reg No: 732925ITR009
-- ============================================================================
-- Business Logic & Analytical SQL Queries
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Product Catalog & Inventory Inquiries (FR1)
-- ----------------------------------------------------------------------------

-- 1.1 Retrieve all active products with category names and stock status
SELECT 
    p.product_id,
    p.product_name,
    c.category_name,
    p.brand,
    p.cost_price,
    p.selling_price,
    p.stock_quantity,
    p.reorder_level,
    CASE 
        WHEN p.stock_quantity = 0 THEN 'OUT_OF_STOCK'
        WHEN p.stock_quantity <= p.reorder_level THEN 'LOW_STOCK'
        ELSE 'IN_STOCK'
    END AS stock_status,
    ROUND((p.selling_price - p.cost_price), 2) AS profit_margin_unit,
    ROUND(((p.selling_price - p.cost_price) / p.selling_price) * 100, 2) AS profit_margin_pct
FROM products p
JOIN categories c ON p.category_id = c.category_id
ORDER BY c.category_name, p.product_name;

-- 1.2 Total Inventory Valuation (Cost & Retail Value)
SELECT 
    COUNT(product_id) AS total_products,
    SUM(stock_quantity) AS total_units_in_stock,
    ROUND(SUM(stock_quantity * cost_price), 2) AS total_inventory_cost,
    ROUND(SUM(stock_quantity * selling_price), 2) AS total_inventory_retail_value,
    ROUND(SUM(stock_quantity * (selling_price - cost_price)), 2) AS potential_gross_profit
FROM products;

-- ----------------------------------------------------------------------------
-- 2. Stock Availability & Over-Sale Guard (FR4)
-- ----------------------------------------------------------------------------

-- 2.1 Verify stock availability before adding to cart / completing sale
-- Parameter: :p_product_id, :p_requested_qty
SELECT 
    product_id,
    product_name,
    stock_quantity,
    CASE 
        WHEN stock_quantity >= 5 THEN 1 -- Example requested_qty = 5
        ELSE 0 
    END AS is_available
FROM products
WHERE product_id = 'PRD-101';

-- ----------------------------------------------------------------------------
-- 3. Automatic Stock Deduction & Logging (FR3)
-- ----------------------------------------------------------------------------

-- 3.1 Decrement stock quantity after successful transaction
-- (In Java/Python, executed inside a transaction block)
UPDATE products 
SET stock_quantity = stock_quantity - 2
WHERE product_id = 'PRD-101' AND stock_quantity >= 2;

-- 3.2 Insert audit record
INSERT INTO stock_audit_logs (product_id, change_type, quantity_changed, remaining_stock, remarks)
SELECT 
    product_id, 
    'SALE', 
    -2, 
    stock_quantity, 
    'Transaction TXN-20261119-001'
FROM products 
WHERE product_id = 'PRD-101';

-- ----------------------------------------------------------------------------
-- 4. Daily Sales & Revenue Reports (FR5)
-- ----------------------------------------------------------------------------

-- 4.1 Daily Revenue Summary
SELECT 
    DATE(transaction_date) AS sale_date,
    COUNT(transaction_id) AS total_transactions,
    ROUND(SUM(subtotal), 2) AS gross_sales,
    ROUND(SUM(tax_amount), 2) AS total_tax_collected,
    ROUND(SUM(discount_amount), 2) AS total_discounts,
    ROUND(SUM(grand_total), 2) AS net_revenue
FROM transactions
WHERE status = 'COMPLETED'
GROUP BY DATE(transaction_date)
ORDER BY sale_date DESC;

-- 4.2 Low Stock Alert Query (FR5)
-- Retrieves all products whose stock is at or below the reorder threshold
SELECT 
    p.product_id,
    p.product_name,
    c.category_name,
    p.stock_quantity,
    p.reorder_level,
    (p.reorder_level - p.stock_quantity) AS units_needed_for_safety_stock,
    p.unit_of_measure
FROM products p
JOIN categories c ON p.category_id = c.category_id
WHERE p.stock_quantity <= p.reorder_level
ORDER BY p.stock_quantity ASC;

-- 4.3 Top 5 Best-Selling Products by Volume (FR5 & FR6)
SELECT 
    p.product_id,
    p.product_name,
    c.category_name,
    SUM(ti.quantity) AS total_units_sold,
    ROUND(SUM(ti.item_subtotal), 2) AS total_sales_revenue
FROM transaction_items ti
JOIN products p ON ti.product_id = p.product_id
JOIN categories c ON p.category_id = c.category_id
GROUP BY p.product_id, p.product_name, c.category_name
ORDER BY total_units_sold DESC
LIMIT 5;

-- 4.4 Category-Wise Revenue Contribution
SELECT 
    c.category_name,
    COUNT(DISTINCT ti.transaction_id) AS orders_count,
    SUM(ti.quantity) AS total_units_sold,
    ROUND(SUM(ti.item_subtotal), 2) AS total_revenue,
    ROUND((SUM(ti.item_subtotal) * 100.0 / (SELECT SUM(item_subtotal) FROM transaction_items)), 2) AS revenue_pct
FROM transaction_items ti
JOIN products p ON ti.product_id = p.product_id
JOIN categories c ON p.category_id = c.category_id
GROUP BY c.category_id, c.category_name
ORDER BY total_revenue DESC;

-- 4.5 Payment Method Breakdown
SELECT 
    payment_method,
    COUNT(transaction_id) AS transaction_count,
    ROUND(SUM(grand_total), 2) AS total_collected,
    ROUND(AVG(grand_total), 2) AS average_order_value
FROM transactions
GROUP BY payment_method;
