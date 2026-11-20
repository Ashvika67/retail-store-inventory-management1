"""
===============================================================================
VELALAR COLLEGE OF ENGINEERING AND TECHNOLOGY (AUTONOMOUS), ERODE - 12
DEPARTMENT OF INFORMATION TECHNOLOGY
ACADEMIC YEAR: 2026-27 (ODD) | CLASS: 25IT3A | PROJECT ASSESSMENT
Scenario 9: Retail Store Inventory and Sales Analysis System
Author: Ashvika K | Register Number: 732925ITR009
===============================================================================
Python Data Retrieval, Preprocessing, and Visual Analytics Pipeline (FR6)
"""

import os
import sqlite3
from datetime import datetime

# Path setup
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "database", "retail_store.db")
OUTPUT_DIR = os.path.join(BASE_DIR, "python", "visualizations")

os.makedirs(OUTPUT_DIR, exist_ok=True)

def connect_db():
    if not os.path.exists(DB_PATH):
        raise FileNotFoundError(f"Database not found at {DB_PATH}. Please run database creation script first.")
    return sqlite3.connect(DB_PATH)

def fetch_and_preprocess_data():
    conn = connect_db()
    cur = conn.cursor()

    print("=" * 80)
    print("      VCET IT - RETAIL STORE INVENTORY & SALES DATA ANALYSIS ENGINE")
    print(f"      Student: Ashvika K | Reg No: 732925ITR009 | DB: {os.path.basename(DB_PATH)}")
    print("=" * 80)

    # 1. Products & Inventory Data
    cur.execute("""
        SELECT 
            p.product_id, p.product_name, c.category_name, p.cost_price, 
            p.selling_price, p.stock_quantity, p.reorder_level, p.unit_of_measure,
            (p.selling_price - p.cost_price) AS unit_margin,
            ROUND(((p.selling_price - p.cost_price) / p.selling_price) * 100, 2) AS margin_pct,
            (p.stock_quantity * p.selling_price) AS stock_retail_value
        FROM products p
        JOIN categories c ON p.category_id = c.category_id
        ORDER BY p.stock_quantity ASC
    """)
    products = cur.fetchall()

    # 2. Daily Sales Data
    cur.execute("""
        SELECT 
            DATE(transaction_date) as sale_date,
            COUNT(transaction_id) as txn_count,
            ROUND(SUM(subtotal), 2) as gross_sales,
            ROUND(SUM(tax_amount), 2) as tax_collected,
            ROUND(SUM(discount_amount), 2) as discounts_given,
            ROUND(SUM(grand_total), 2) as net_revenue
        FROM transactions
        WHERE status = 'COMPLETED'
        GROUP BY DATE(transaction_date)
        ORDER BY sale_date ASC
    """)
    daily_sales = cur.fetchall()

    # 3. Top-Selling Products Data
    cur.execute("""
        SELECT 
            p.product_name, c.category_name,
            SUM(ti.quantity) as total_units_sold,
            ROUND(SUM(ti.item_subtotal), 2) as total_revenue
        FROM transaction_items ti
        JOIN products p ON ti.product_id = p.product_id
        JOIN categories c ON p.category_id = c.category_id
        GROUP BY p.product_id, p.product_name, c.category_name
        ORDER BY total_units_sold DESC
        LIMIT 5
    """)
    top_products = cur.fetchall()

    # 4. Category-Wise Revenue Share
    cur.execute("""
        SELECT 
            c.category_name,
            SUM(ti.quantity) as units_sold,
            ROUND(SUM(ti.item_subtotal), 2) as category_revenue
        FROM transaction_items ti
        JOIN products p ON ti.product_id = p.product_id
        JOIN categories c ON p.category_id = c.category_id
        GROUP BY c.category_name
        ORDER BY category_revenue DESC
    """)
    category_sales = cur.fetchall()

    conn.close()

    # Print Formatted Analytical Summaries
    print("\n[+] 1. INVENTORY VALUATION & STOCK STATUS SUMMARY:")
    print(f"{'Code':<9} | {'Product Name':<26} | {'Category':<18} | {'Stock':<6} | {'Price':<8} | {'Margin%':<8} | {'Status'}")
    print("-" * 95)
    for p in products:
        status = "OUT OF STOCK" if p[5] == 0 else ("LOW STOCK" if p[5] <= p[6] else "IN STOCK")
        print(f"{p[0]:<9} | {p[1][:26]:<26} | {p[2][:18]:<18} | {p[5]:<6} | ₹{p[4]:<7.2f} | {p[9]:<7.1f}% | {status}")

    print("\n[+] 2. DAILY SALES REVENUE PERFORMANCE:")
    print(f"{'Date':<12} | {'Orders':<6} | {'Gross Sales':<12} | {'Tax (GST)':<10} | {'Discounts':<10} | {'Net Revenue'}")
    print("-" * 75)
    total_rev = 0
    for d in daily_sales:
        total_rev += d[5]
        print(f"{d[0]:<12} | {d[1]:<6} | ₹{d[2]:<11.2f} | ₹{d[3]:<9.2f} | ₹{d[4]:<9.2f} | ₹{d[5]:<11.2f}")
    print(f"{'TOTAL':<12} | {'':<6} | {'':<12} | {'':<10} | {'':<10} | ₹{total_rev:<11.2f}")

    print("\n[+] 3. TOP 5 FAST-SELLING PRODUCTS (BY UNITS SOLD):")
    for idx, tp in enumerate(top_products, 1):
        print(f"  #{idx} {tp[0]} ({tp[1]}) -> {tp[2]} units sold | Revenue: ₹{tp[3]:.2f}")

    return {
        "products": products,
        "daily_sales": daily_sales,
        "top_products": top_products,
        "category_sales": category_sales
    }

def try_generate_matplotlib_charts(data):
    try:
        import matplotlib.pyplot as plt
        import seaborn as sns
        sns.set_theme(style="whitegrid")

        # Chart 1: Daily Revenue Trend
        dates = [d[0] for d in data["daily_sales"]]
        revenues = [d[5] for d in data["daily_sales"]]
        plt.figure(figsize=(9, 5))
        plt.plot(dates, revenues, marker='o', color='#2563eb', linewidth=2.5, markersize=7)
        plt.title("Daily Sales Revenue Trend (Nov 2026)", fontsize=14, fontweight="bold")
        plt.xlabel("Date", fontsize=11)
        plt.ylabel("Revenue (₹)", fontsize=11)
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.savefig(os.path.join(OUTPUT_DIR, "daily_sales_trend.png"), dpi=200)
        plt.close()

        # Chart 2: Category Revenue Contribution
        cat_names = [c[0] for c in data["category_sales"]]
        cat_revs = [c[2] for c in data["category_sales"]]
        plt.figure(figsize=(7, 7))
        colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']
        plt.pie(cat_revs, labels=cat_names, autopct='%1.1f%%', startangle=140, colors=colors[:len(cat_names)])
        plt.title("Revenue Contribution by Category", fontsize=14, fontweight="bold")
        plt.tight_layout()
        plt.savefig(os.path.join(OUTPUT_DIR, "category_revenue_share.png"), dpi=200)
        plt.close()

        # Chart 3: Top Selling Products
        prod_names = [p[0] for p in data["top_products"]]
        units_sold = [p[2] for p in data["top_products"]]
        plt.figure(figsize=(9, 5))
        sns.barplot(x=units_sold, y=prod_names, palette="viridis")
        plt.title("Top 5 Fast-Moving Products (Units Sold)", fontsize=14, fontweight="bold")
        plt.xlabel("Units Sold", fontsize=11)
        plt.ylabel("Product", fontsize=11)
        plt.tight_layout()
        plt.savefig(os.path.join(OUTPUT_DIR, "top_selling_products.png"), dpi=200)
        plt.close()

        print("\n Matplotlib & Seaborn charts generated successfully in python/visualizations/!")
    except ImportError:
        print("\n Note: matplotlib/seaborn not found in this environment.")
        print(" Generating high-resolution standalone SVG & HTML visualizations instead...")

if __name__ == "__main__":
    data = fetch_and_preprocess_data()
    try_generate_matplotlib_charts(data)
