"""
Standalone Visual Chart Generator
Generates clean SVG charts for:
1. Daily Sales Revenue Trend
2. Category Revenue Share
3. Top 5 Selling Products by Volume
4. Stock vs Reorder Level Comparison
"""

import os
import sqlite3

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "database", "retail_store.db")
OUTPUT_DIR = os.path.join(BASE_DIR, "python", "visualizations")

os.makedirs(OUTPUT_DIR, exist_ok=True)

def generate_svg_charts():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    # 1. Daily Sales
    cur.execute("SELECT DATE(transaction_date), SUM(grand_total) FROM transactions WHERE status='COMPLETED' GROUP BY DATE(transaction_date) ORDER BY DATE(transaction_date)")
    daily_data = cur.fetchall()

    # Generate Daily Trend SVG
    width, height = 700, 360
    padding = 60
    max_val = max([d[1] for d in daily_data]) * 1.15
    points = []
    labels = []
    
    for i, (date, rev) in enumerate(daily_data):
        x = padding + (i * (width - 2 * padding) / (len(daily_data) - 1))
        y = height - padding - (rev / max_val * (height - 2 * padding))
        points.append((x, y, rev))
        labels.append((x, date))

    polyline_pts = " ".join([f"{x:.1f},{y:.1f}" for x, y, _ in points])
    
    svg1 = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%" height="100%" style="background:#ffffff; border-radius:12px; font-family:system-ui, -apple-system, sans-serif;">
        <rect width="{width}" height="{height}" fill="#ffffff" rx="12"/>
        <text x="{width/2}" y="36" text-anchor="middle" font-size="18" font-weight="700" fill="#1e293b">Daily Sales Revenue Trend (Nov 2026)</text>
        <text x="{width/2}" y="56" text-anchor="middle" font-size="12" fill="#64748b">Scenario 9: Retail Store Inventory &amp; Sales System | VCET IT</text>
        
        <!-- Grid lines -->
        <line x1="{padding}" y1="{height-padding}" x2="{width-padding}" y2="{height-padding}" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="{padding}" y1="{padding}" x2="{padding}" y2="{height-padding}" stroke="#cbd5e1" stroke-width="2"/>
        
        <!-- Trend line -->
        <polyline fill="none" stroke="#2563eb" stroke-width="3.5" points="{polyline_pts}"/>
        
        <!-- Data points & tooltips -->
    '''
    for x, y, val in points:
        svg1 += f'''
        <circle cx="{x:.1f}" cy="{y:.1f}" r="6" fill="#1d4ed8" stroke="#ffffff" stroke-width="2.5"/>
        <text x="{x:.1f}" y="{y-12:.1f}" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">₹{val:,.1f}</text>
        '''
    for x, lbl in labels:
        svg1 += f'''
        <text x="{x:.1f}" y="{height-padding+22}" text-anchor="middle" font-size="11" fill="#475569">{lbl[5:]}</text>
        '''
    svg1 += '</svg>'

    with open(os.path.join(OUTPUT_DIR, "daily_sales_trend.svg"), "w", encoding="utf-8") as f:
        f.write(svg1)

    # 2. Top-Selling Products Bar Chart
    cur.execute("""
        SELECT p.product_name, SUM(ti.quantity) as sold
        FROM transaction_items ti
        JOIN products p ON ti.product_id = p.product_id
        GROUP BY p.product_id
        ORDER BY sold DESC
        LIMIT 5
    """)
    top_items = cur.fetchall()

    svg2 = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%" height="100%" style="background:#ffffff; border-radius:12px; font-family:system-ui, -apple-system, sans-serif;">
        <rect width="{width}" height="{height}" fill="#ffffff" rx="12"/>
        <text x="{width/2}" y="36" text-anchor="middle" font-size="18" font-weight="700" fill="#1e293b">Top 5 Fast-Moving Products (Units Sold)</text>
        <text x="{width/2}" y="56" text-anchor="middle" font-size="12" fill="#64748b">Student: Ashvika K (732925ITR009) | 25IT3A</text>
    '''
    max_sold = max([t[1] for t in top_items]) * 1.2
    colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']
    
    start_y = 85
    row_height = 48
    bar_max_w = 340
    
    for i, (name, qty) in enumerate(top_items):
        y = start_y + i * row_height
        bar_w = (qty / max_sold) * bar_max_w
        svg2 += f'''
        <text x="210" y="{y+16}" text-anchor="end" font-size="12" font-weight="600" fill="#334155">{name[:25]}</text>
        <rect x="220" y="{y}" width="{bar_w:.1f}" height="24" fill="{colors[i % len(colors)]}" rx="4"/>
        <text x="{230 + bar_w:.1f}" y="{y+17}" font-size="12" font-weight="700" fill="#1e293b">{qty} units</text>
        '''
    svg2 += '</svg>'

    with open(os.path.join(OUTPUT_DIR, "top_selling_products.svg"), "w", encoding="utf-8") as f:
        f.write(svg2)

    # 3. Stock Level vs Reorder Level Comparison
    cur.execute("""
        SELECT p.product_name, p.stock_quantity, p.reorder_level
        FROM products p
        ORDER BY p.stock_quantity ASC
        LIMIT 6
    """)
    stock_comparison = cur.fetchall()

    svg3 = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 380" width="100%" height="100%" style="background:#ffffff; border-radius:12px; font-family:system-ui, -apple-system, sans-serif;">
        <rect width="760" height="380" fill="#ffffff" rx="12"/>
        <text x="380" y="34" text-anchor="middle" font-size="18" font-weight="700" fill="#1e293b">Stock Level vs Reorder Threshold Level (FR5)</text>
        <text x="380" y="52" text-anchor="middle" font-size="12" fill="#64748b">Highlighting Critical Items and Replenishment Urgency</text>

        <!-- Legend -->
        <rect x="250" y="70" width="16" height="12" fill="#ef4444" rx="2"/>
        <text x="272" y="81" font-size="11" fill="#334155">Current Stock</text>
        <rect x="420" y="70" width="16" height="12" fill="#64748b" rx="2"/>
        <text x="442" y="81" font-size="11" fill="#334155">Reorder Level</text>
    '''

    max_c = max(max([s[1] for s in stock_comparison]), max([s[2] for s in stock_comparison])) * 1.2
    for i, (name, stock, reorder) in enumerate(stock_comparison):
        y = 105 + i * 42
        w_stock = (stock / max_c) * 320
        w_reorder = (reorder / max_c) * 320
        color_stock = "#ef4444" if stock <= reorder else "#10b981"
        svg3 += f'''
        <text x="210" y="{y+14}" text-anchor="end" font-size="11" font-weight="600" fill="#334155">{name[:24]}</text>
        <rect x="220" y="{y}" width="{w_stock:.1f}" height="10" fill="{color_stock}" rx="2"/>
        <rect x="220" y="{y+13}" width="{w_reorder:.1f}" height="10" fill="#94a3b8" rx="2"/>
        <text x="{225 + max(w_stock, w_reorder):.1f}" y="{y+16}" font-size="11" fill="#1e293b">Stock: {stock} | Min: {reorder}</text>
        '''
    svg3 += '</svg>'

    with open(os.path.join(OUTPUT_DIR, "stock_vs_reorder_levels.svg"), "w", encoding="utf-8") as f:
        f.write(svg3)

    conn.close()
    print(" Standalone SVG charts generated in python/visualizations/ successfully!")

if __name__ == "__main__":
    generate_svg_charts()
