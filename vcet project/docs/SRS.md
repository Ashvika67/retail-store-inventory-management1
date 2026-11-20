# Software Requirements Specification (SRS)

## For Retail Store Inventory and Sales Analysis System

---

### **Velalar College of Engineering and Technology (Autonomous)**
**Department of Information Technology**  
**Academic Year:** 2026 - 2027 (ODD) | **Class:** 25IT3A  
**Course Activity:** Project-Based Assessment  
**Scenario 9:** Retail Store Inventory and Sales Analysis System  

**Author:** Ashvika K  
**Register Number:** 732925ITR009  
**Faculty In-Charge:** Department of Information Technology  
**Date of Submission:** November 2026  

---

## 1. Introduction

### 1.1 Purpose
The purpose of this document is to provide a detailed Software Requirements Specification (SRS) for the **Retail Store Inventory and Sales Analysis System**. This document defines the functional and non-functional requirements, system architecture, data models, interface constraints, and verification criteria for developing an integrated inventory management and sales analytics platform using **Java, DBMS (MySQL / SQLite), Python, and a Web-based interactive dashboard**.

### 1.2 Document Conventions
- **FR:** Functional Requirement
- **NFR:** Non-Functional Requirement
- **DB:** Database / Database Management System
- **POS:** Point of Sale
- **SKU:** Stock Keeping Unit
- **UI:** User Interface
- Standard formatting follows the **IEEE Std 830-1998 Recommended Practice for Software Requirements Specifications**.

### 1.3 Intended Audience and Reading Suggestions
- **Academic Evaluators & Faculty:** To assess compliance with VCET IT curriculum requirements.
- **Developers & System Engineers:** To guide implementation in Java, SQL, and Python.
- **Testers:** To formulate and execute test plans and validation test cases.
- **End-Users (Store Managers & Cashiers):** To understand system capabilities, POS operations, and report generation.

### 1.4 Project Scope
The Retail Store Inventory and Sales Analysis System is an enterprise software solution designed to eliminate manual bookkeeping, prevent stock-out and overstock conditions, record checkout sales transactions with automatic inventory deduction, and provide computational analysis of retail trends.
- **In-Scope:**
  - Product catalog maintenance (CRUD operations, category categorization, pricing, stock levels).
  - Point-of-Sale (POS) order processing with atomic stock availability checks.
  - Automatic inventory adjustments upon transaction completion.
  - Prevention of sales exceeding available physical stock.
  - Automated generation of low-stock alerts and daily revenue reports.
  - Python-based data extraction, preprocessing (Pandas), and visualization generation (Matplotlib/Seaborn).
  - 24/7 web application accessible on GitHub Pages.
- **Out-of-Scope:**
  - Integrated third-party hardware barcode scanning drivers (software entry supported).
  - Multi-warehouse cross-docking logistics.

---

## 2. Overall Description

### 2.1 Product Perspective
The system functions as a modular retail management platform consisting of four integrated layers:
1. **User Presentation Layer:** Interactive Responsive Web Application (GitHub Pages) and Java Console CLI.
2. **Business Logic Layer:** Java application and Web Controller implementing inventory rules, pricing math, cart validations, and stock threshold logic.
3. **Persistence Layer (DBMS):** Relational database storing normalized product, transaction, customer, and category data.
4. **Analytics Layer:** Python data science pipeline connecting to the database to extract records, clean nulls/outliers, calculate KPIs, and render visualization graphs.

```
+-------------------------------------------------------------+
|                     Presentation Layer                      |
|   - 24/7 Web App (HTML5 / Tailwind / Chart.js / IndexedDB)   |
|   - Java Desktop / Terminal CLI (OOP Console Application)   |
+-------------------------------------------------------------+
                              |
+-------------------------------------------------------------+
|                     Business Logic Layer                    |
|   - Input Validation & Guardrails                           |
|   - Real-time Stock Deduction & Validation                  |
|   - Discount & GST Calculation                              |
|   - Low-stock Notification Engine                           |
+-------------------------------------------------------------+
                              |
+-------------------------------------------------------------+
|                      Persistence Layer                      |
|   - Relational Database (MySQL / SQLite / LocalStorage)     |
|   - Tables: Categories, Products, Customers, Sales, Items   |
+-------------------------------------------------------------+
                              |
+-------------------------------------------------------------+
|                 Python Analytics & BI Engine                |
|   - Data Extraction via DB Connector                        |
|   - Preprocessing & Aggregation using Pandas & NumPy        |
|   - Visualizations using Matplotlib & Seaborn               |
+-------------------------------------------------------------+
```

### 2.2 Product Functions
- **Product & Inventory Management:** Add, update, view, and delete product profiles; track current stock, minimum reorder thresholds, and unit prices.
- **Sales Transaction Processing:** Create customer cart, select multiple products, specify quantities, calculate total with GST/discounts, record payment method.
- **Automated Stock Synchronization:** Instantly decrease product stock upon completed checkout; prevent transactions if requested quantity > current stock.
- **Business Intelligence Reporting:** Generate daily sales summaries, category-wise revenue breakdowns, top-selling items, and low-stock replenishment lists.
- **Visual Analytics:** Python charts showing revenue curves, inventory replenishment urgency, and customer purchase patterns.

### 2.3 User Classes and Characteristics
- **Store Administrator / Inventory Manager:** Technical proficiency: Moderate. Responsible for catalog maintenance, setting reorder thresholds, viewing financial reports, and running analytics.
- **Cashier / POS Operator:** Technical proficiency: Basic. Responsible for fast product lookups, adding items to cart, processing payments, and issuing printed/digital receipts.
- **Academic Auditor / Evaluator:** Reviews code architecture, database normalization, unit testing reports, and Python visualizations.

### 2.4 Operating Environment
- **Operating System:** Platform independent (Windows 10/11, Linux, macOS).
- **Java Runtime:** Java Development Kit (JDK) 8 or higher (Java 11, 17, 21+ supported).
- **Database Engine:** MySQL 8.0+ or SQLite 3.x.
- **Python Environment:** Python 3.8+ with Pandas, Matplotlib, Seaborn.
- **Web Browser:** Google Chrome, Mozilla Firefox, Microsoft Edge, Safari.
- **Hosting Platform:** GitHub Pages (24/7 static web hosting with zero downtime).

### 2.5 Design and Implementation Constraints
- **Concurrency & Atomicity:** Database operations must comply with ACID properties (Atomicity, Consistency, Isolation, Durability) to ensure stock quantities never become negative during concurrent checkouts.
- **Free Hosting Constraint:** Web deployment must run 24/7 on free infrastructure without sleep timeouts or recurring subscription fees.
- **Normalization:** Relational schema must satisfy Third Normal Form (3NF) to eliminate data redundancy and insertion/deletion anomalies.

### 2.6 Assumptions and Dependencies
- Products must possess unique Product IDs / SKUs.
- Price values are non-negative numeric floats.
- Sales transactions are immutable once marked "Completed".

---

## 3. Specific Functional Requirements (FR)

### FR1: Product Details Management
- **Description:** The system shall maintain product records including Product ID, Name, Category, Cost Price, Selling Price, Available Stock, and Reorder Level.
- **Inputs:** Product ID (alphanumeric), Name (string), Category (string/enum), Cost Price (positive float), Selling Price (positive float >= cost price), Available Stock (non-negative integer), Reorder Level (non-negative integer).
- **Processing:** Validates fields against negative numbers or empty strings; executes SQL `INSERT` or `UPDATE`.
- **Outputs:** Confirmation notification; updated catalog view in inventory table.

### FR2: Sales Transaction Recording
- **Description:** The system shall record sales transactions with unique Transaction IDs, customer details, list of sold items, itemized quantities, unit prices, total bill, payment method, and transaction timestamp.
- **Inputs:** Customer Name, Phone Number, Product ID list, Quantities, Payment Mode (Cash, Card, UPI).
- **Processing:** Generates unique Transaction ID; calculates line subtotals, applicable taxes (GST), and grand total; saves parent transaction and child transaction items.
- **Outputs:** Itemized sales invoice / receipt; persisted transaction record in database.

### FR3: Automatic Stock Quantity Updates
- **Description:** The system shall automatically decrement the available stock of each product by the exact quantity sold upon transaction finalization.
- **Processing:** For each line item in transaction: `New_Stock = Current_Stock - Quantity_Sold`. If transaction is voided or cancelled, stock is restored: `New_Stock = Current_Stock + Quantity_Sold`.
- **Outputs:** Real-time updated stock values visible across inventory and POS views.

### FR4: Stock Availability Validation & Over-Sale Prevention
- **Description:** The system shall verify stock levels prior to approving any line item or checkout transaction.
- **Rule:** If `Quantity_Requested > Available_Stock`, the system **MUST REJECT** the addition/sale and alert the operator with message: *"Requested quantity exceeds available stock (Available: X)"*.
- **Outputs:** Rejection notification modal/console alert; transaction blocked from committing until quantities are adjusted.

### FR5: Sales & Inventory Reporting
- **Description:** The system shall generate comprehensive management reports.
  - **FR5.1 Daily Sales Report:** Aggregates transaction count, gross revenue, discounts, and net earnings for any selected date.
  - **FR5.2 Low Stock Alert Report:** Filters all products where `Available_Stock <= Reorder_Level`.
  - **FR5.3 Fast-Selling Products Report:** Ranks products by total volume sold and total revenue generated.

### FR6: Python Data Retrieval, Preprocessing & Visualization
- **Description:** Python scripts shall query the relational database, clean and prepare the dataset using Pandas, and generate high-resolution visual charts.
- **Charts Generated:**
  1. *Daily Revenue Trend (Line Chart)*
  2. *Top-Selling Products by Quantity (Horizontal Bar Chart)*
  3. *Category-Wise Revenue Contribution (Pie / Donut Chart)*
  4. *Stock Level vs Reorder Level (Grouped Bar Chart)*
  5. *Sales Quantity Distribution (Histogram / KDE)*

---

## 4. Non-Functional Requirements (NFR)

### 4.1 Performance Requirements
- **Response Time:** Catalog searches and POS item additions shall execute in less than 200 ms.
- **Stock Validation:** Stock availability checks shall execute instantaneously before cart update.
- **Chart Generation:** Python analysis pipeline shall process up to 100,000 records within 3 seconds.

### 4.2 Security Requirements
- **Data Integrity:** Foreign key constraints and database check constraints prevent orphan records and negative stock.
- **Input Sanitization:** Prepared statements / parameterized SQL queries protect against SQL Injection attacks.
- **Client Validation:** Form inputs sanitize XSS payloads.

### 4.3 Usability & User Experience (UI/UX)
- Modern, clean, responsive interface adapting to desktop, tablet, and mobile screens.
- Visual status badges: Green for "In Stock", Yellow for "Low Stock", Red for "Out of Stock".
- One-click sample dataset seeding for immediate evaluation and viva demonstrations.

### 4.4 Availability & Reliability
- 24/7 web accessibility guaranteed via GitHub Pages high-availability CDN.
- Zero server sleep delay or downtime.
- Persistent client-side and relational database storage ensuring data survives page reloads.

---

## 5. Verification & Acceptance Criteria
| Requirement ID | Acceptance Test | Success Condition |
|---|---|---|
| FR1 | Add product with ID `PRD-101`, Price `50.00`, Stock `20` | Record exists in database and shows in table |
| FR2 | Execute checkout for 2 items totaling `100.00` | Transaction logged with timestamp and invoice generated |
| FR3 | Complete sale of 3 units of product with initial stock 10 | Available stock updates to exactly 7 |
| FR4 | Attempt to sell 15 units of product with stock 10 | System blocks checkout with clear error message |
| FR5 | View Low-Stock tab when item has stock 2 (reorder 5) | Item is highlighted with yellow/red warning badge |
| FR6 | Run `python data_analysis.py` | PNG charts created in `visualizations/` without error |
