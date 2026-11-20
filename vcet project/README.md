# Retail Store Inventory and Sales Analysis System

### **Velalar College of Engineering and Technology (Autonomous), Erode – 12**
**Department of Information Technology**  
**Academic Year:** 2026 – 2027 (ODD) | **Class:** 25IT3A  
**Course Activity:** Project-Based Assessment  
**Scenario 9:** Retail Store Inventory and Sales Analysis System  

| Student Name | Register Number | Degree & Branch | Semester / Section |
|---|---|---|---|
| **Ashvika K** | **732925ITR009** | B.Tech. Information Technology | III Year / 25IT3A |

---

## 🌐 24/7 Live Running Website (GitHub Pages)
- **Live Website URL:** `https://<your-github-username>.github.io/<repo-name>/`
- **Hosting:** 100% Free Forever via GitHub Pages (High-availability CDN, zero sleep downtime, 24/7 live).
- **Features:** Interactive Inventory Management (CRUD), Point-of-Sale (POS) Cashier Register with strict over-sale prevention, real-time stock deduction, printable sales invoice receipts, low-stock reorder warnings, daily sales reports, and live Chart.js visual analytics.

---

## 📌 Problem Statement (Scenario 9)
A retail store manages product information, stock availability, sales transactions, and customer purchases. Maintaining these records manually results in stock discrepancies, difficulty tracking sales, and delays in identifying fast-selling products and low-stock items.

This project delivers an integrated **Retail Store Inventory and Sales Analysis System** developed using **Java, DBMS (MySQL / SQLite), Python (Pandas / Seaborn / Matplotlib), and a responsive Web Application** that:
1. Maintains complete product details (ID, name, category, pricing, available stock, reorder level).
2. Records customer sales transactions with automatic receipt generation.
3. Automatically deducts inventory units when sales are finalized.
4. **Strictly validates stock availability before sale completion to prevent transactions exceeding available physical stock.**
5. Generates business intelligence reports on daily revenue, low-stock warnings, and top fast-moving products.
6. Retrieves database records using Python, cleans and preprocesses the dataset, and renders analytical visualizations.

---

## 📂 Project Directory Structure & Submission Deliverables

```
vcet-project/
├── index.html                    # 24/7 Live Web Application (GitHub Pages root)
├── app.js                        # POS & Inventory Controller, Validation, Stock Deduction
├── styles.css                    # Modern Responsive Styling & Print Invoice CSS
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Actions Deployment to GitHub Pages
├── docs/                         # Academic Deliverables (Syllabus Requirement 1)
│   ├── SRS.md                    # IEEE-830 Standard Software Requirements Specification
│   ├── DESIGN_DIAGRAMS.md        # Use Case, Class, Architecture, and Sequence Diagrams
│   ├── ERD_AND_NORMALIZATION.md  # ER Diagram, Relational Schema & 1NF/2NF/3NF/BCNF Proofs
│   └── TESTING.md                # Testing Strategies, 25 Test Cases (Expected vs. Actual)
├── database/                     # Database Deliverables (Syllabus Requirement 3)
│   ├── schema.sql                # Complete DDL (MySQL & SQLite compatible tables & constraints)
│   ├── sample_data.sql           # Realistic Supermarket Seed Dataset (20 Products, 10 Txns)
│   ├── queries.sql               # Analytical SQL Queries (Daily Sales, Low Stock, Best Sellers)
│   └── retail_store.db           # Pre-compiled, pre-seeded SQLite Database file
├── src/                          # Java Application Source Code (Syllabus Requirement 2)
│   └── com/
│       └── vcet/
│           └── retail/
│               ├── RetailStoreApp.java       # Interactive Console Application Entry Point
│               ├── model/
│               │   ├── Product.java          # Product Entity & Margin Calculations
│               │   ├── SaleItem.java         # Transaction Line Item
│               │   └── Transaction.java      # Customer Invoice & Receipt Generator
│               ├── dao/
│               │   ├── ProductDAO.java       # Data Access Object with Atomic Stock Deductions
│               │   └── SalesDAO.java         # Sales Transactions Data Access
│               └── service/
│                   └── RetailStoreService.java # Business Logic Service & Validation Guards
├── python/                       # Python Data Science Deliverables (Syllabus Requirement 4)
│   ├── data_analysis.py          # Python Data Pipeline: DB Extraction, Preprocessing & Reports
│   ├── generate_charts.py        # Standalone SVG/Chart Generator
│   ├── retail_analysis.ipynb     # Interactive Jupyter Notebook with Analysis & Plots
│   ├── requirements.txt          # Python Dependencies
│   └── visualizations/           # Exported High-Resolution Visual Charts
│       ├── daily_sales_trend.svg
│       ├── top_selling_products.svg
│       └── stock_vs_reorder_levels.svg
└── README.md                     # Comprehensive Project Guide & Setup Instructions
```

---

## 🚀 Step-by-Step GitHub Pages Deployment Guide

Follow these simple steps to deploy your live website 24/7 for free on GitHub:

### Step 1: Initialize Git and Commit All Files
Open PowerShell or Terminal in your project directory:
```bash
git init
git add .
git commit -m "Initial submission for VCET IT Project Assessment - Ashvika K"
```

### Step 2: Push to Your GitHub Account
1. Create a new public repository on GitHub (e.g., `retail-store-inventory-management`).
2. Link your local project to GitHub and push:
```bash
git branch -M main
git remote add origin https://github.com/<your-username>/retail-store-inventory-management.git
git push -u origin main
```

### Step 3: Enable 24/7 GitHub Pages Hosting
1. Open your repository on GitHub in your browser.
2. Click **Settings** (tab at the top).
3. In the left sidebar, click **Pages** (under *Code and automation*).
4. Under **Build and deployment**:
   - **Source:** Select `Deploy from a branch`.
   - **Branch:** Select `main` and folder `/ (root)`.
   - Click **Save**.
5. Within 60 seconds, GitHub will issue your live URL:
   ```
   https://<your-username>.github.io/retail-store-inventory-management/
   ```
*(Because we also included `.github/workflows/deploy.yml`, automated GitHub Actions deployment will trigger and keep it continuously live 24/7).*

---

## ☕ Java Application Execution Instructions

The Java application contains a complete Object-Oriented design implementing the DAO pattern, input validation, and an automated verification test suite.

### Step 1: Compile the Java Application
```bash
# Create bin output folder
mkdir -p bin

# Compile using Java 8, 11, 17, 21+
javac -d bin -sourcepath src src/com/vcet/retail/RetailStoreApp.java
```

### Step 2: Run the Application
```bash
java -cp bin com.vcet.retail.RetailStoreApp
```

### Sample Interactive Menu:
```
===============================================================================
             VELALAR COLLEGE OF ENGINEERING AND TECHNOLOGY                     
                   DEPARTMENT OF INFORMATION TECHNOLOGY                        
      ACADEMIC YEAR: 2026-27 (ODD) | CLASS: 25IT3A | ASSESSMENT PROJECT       
            SCENARIO 9: RETAIL STORE INVENTORY & SALES SYSTEM                  
                Student: Ashvika K | Reg No: 732925ITR009                     
===============================================================================

----------------------------- MAIN MENU --------------------------------------
 [1] View All Products & Stock Status
 [2] Add New Product to Catalog
 [3] Search Product by ID
 [4] Point of Sale (POS) - Process New Customer Sale
 [5] Restock Product Inventory
 [6] View Low-Stock Alerts & Reorder List
 [7] Generate Daily Sales & Revenue Report
 [8] View Top-Selling Products by Volume
 [9] View All Sales Invoices
 [10] Run Automated Verification Self-Test Suite
 [0] Exit Application
------------------------------------------------------------------------------
```

---

## 🗄️ Database Setup Instructions

The database schema is 100% normalized up to **Third Normal Form (3NF) & Boyce-Codd Normal Form (BCNF)**.

### Option A: Ready-to-Use SQLite (Pre-Seeded)
The repository includes `database/retail_store.db` pre-populated with:
- 5 Product Categories
- 20 Realistic Retail Supermarket Products
- 5 Customers
- 10 Historical Transactions with 30 Line Items
- Complete Stock Audit Trail

### Option B: MySQL Setup (XAMPP / MySQL Workbench)
1. Open MySQL Command Line or MySQL Workbench:
```sql
CREATE DATABASE retail_store_db;
USE retail_store_db;
```
2. Import schema and sample records:
```bash
mysql -u root -p retail_store_db < database/schema.sql
mysql -u root -p retail_store_db < database/sample_data.sql
```
3. Run analytical queries from `database/queries.sql`.

---

## 🐍 Python Data Retrieval, Preprocessing & Visualization Guide

The Python module satisfies **Functional Requirement 6** and **Instruction 10** by connecting to the database, cleaning records, computing KPIs, and plotting charts.

### Step 1: Install Python Dependencies
```bash
cd python
pip install -r requirements.txt
```

### Step 2: Execute Analysis Pipeline
```bash
python data_analysis.py
```
This script queries the database, displays analytical summary tables in the terminal, and exports visual charts to `python/visualizations/`.

### Step 3: Run Jupyter Notebook
```bash
jupyter notebook retail_analysis.ipynb
```

---

## 📊 Verification of Functional Requirements (100% Compliance)

| Functional Requirement | Specification | Implementation & Verification |
|---|---|---|
| **FR1** | Maintain product details (ID, name, category, price, available stock) | Implemented in `Product.java`, `ProductDAO.java`, SQL table `products`, and Web Inventory UI. Allows full CRUD operations. |
| **FR2** | Record sales transactions (product details, quantity, date) | Implemented in `Transaction.java`, `SalesDAO.java`, SQL table `transactions` & `transaction_items`, and POS cashier checkout. |
| **FR3** | Automatically update stock quantities when sales are recorded | Implemented via `deductStock()` in Java and atomic stock deductions in `app.js`. Decrements stock immediately upon checkout. |
| **FR4** | **Check stock availability before processing sale and prevent sales exceeding stock** | **Strictly enforced:** Blocks transaction attempts where `requested_quantity > available_stock` in both Java CLI and Web POS UI. |
| **FR5** | Generate reports on daily sales, product availability, and low-stock items | Implemented in `RetailStoreService.java`, SQL analytical queries (`queries.sql`), and the Reports Tab in Web UI. |
| **FR6** | Retrieve sales and inventory data from database, preprocess it, and generate visualizations | Implemented in `python/data_analysis.py`, `python/retail_analysis.ipynb`, and interactive Chart.js on the web app. |

---

## 🧪 Testing Results
- **Total Test Cases Executed:** 25
- **Tests Passed:** 25
- **Tests Failed:** 0
- **Success Rate:** **100%**
- Complete test specifications available in [`docs/TESTING.md`](docs/TESTING.md).

---

## 📜 Academic Integrity & Course Declaration
This project is submitted by **Ashvika K** (Register Number: **732925ITR009**), student of Department of Information Technology, Class 25IT3A, Velalar College of Engineering and Technology, Erode - 12, in partial fulfillment of the requirements for the **Project-Based Assessment 2026 - 2027 (ODD)**.
