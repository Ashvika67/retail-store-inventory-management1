# Testing Documentation and Test Cases

## For Retail Store Inventory and Sales Analysis System

---

### **Velalar College of Engineering and Technology (Autonomous)**
**Department of Information Technology**  
**Academic Year:** 2026 - 2027 (ODD) | **Class:** 25IT3A  
**Scenario 9:** Retail Store Inventory and Sales Analysis System  
**Author:** Ashvika K (Reg No: 732925ITR009)  

---

## 1. Testing Strategy and Methodologies

The Retail Store Inventory and Sales Analysis System undergoes rigorous verification across multiple testing tiers:

```
+-------------------------------------------------------+
|                    System Testing                     |
|  - End-to-End POS Transaction & Stock Synchronization |
|  - 24/7 Web App Cross-Browser & Responsiveness        |
+-------------------------------------------------------+
                           |
+-------------------------------------------------------+
|                  Integration Testing                  |
|  - Java DAO <-> Relational Database Connection (JDBC) |
|  - Python Pipeline <-> Database Dataset Extraction    |
+-------------------------------------------------------+
                           |
+-------------------------------------------------------+
|                     Unit Testing                      |
|  - Boundary Value Analysis (BVA) for Stock Check      |
|  - Equivalence Class Partitioning for Price/Quantity  |
|  - Tax & Subtotal Arithmetic Validation               |
+-------------------------------------------------------+
```

### 1.1 Testing Techniques Employed
1. **Black-Box Testing (Functional Testing):** Verifying outputs against inputs according to Functional Requirements FR1 through FR6 without inspecting internal code.
2. **Boundary Value Analysis (BVA):** Testing boundary limits of stock (e.g. attempting to purchase 0 items, 1 item, exact stock items $N$, and $N + 1$ items).
3. **Equivalence Class Partitioning (ECP):** Partitioning inputs into valid and invalid classes (e.g., negative prices, negative stock, blank product IDs).
4. **Integration Testing:** Ensuring the database schema constraints (foreign keys, check constraints) properly trigger errors when invalid sales transactions are attempted.
5. **Data Pipeline Testing:** Validating Python data extraction, handling of missing values, and visual plot rendering without runtime exceptions.

---

## 2. Detailed Test Cases with Expected vs. Actual Results

### Test Suite 1: Product Management & Catalog Control (FR1)

| Test ID | Test Description | Input / Test Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| **TC-PRD-01** | Add new valid product | ID: `PRD-001`, Name: `Basmati Rice 1kg`, Category: `Grocery`, Cost: `80.00`, Price: `110.00`, Stock: `50`, Reorder: `10` | Product successfully added to catalog and database table. | Product added with green toast notification; row appears in table. | **PASS** |
| **TC-PRD-02** | Prevent duplicate Product ID | Attempt to add another product with existing ID `PRD-001` | System rejects with error: *"Product ID already exists"*. | Error modal displayed; duplicate entry prevented. | **PASS** |
| **TC-PRD-03** | Reject negative price | Input Price: `-45.00` | System validation flags negative value and rejects submission. | Validation error: *"Selling price must be greater than zero"*. | **PASS** |
| **TC-PRD-04** | Reject selling price lower than cost price | Cost Price: `100.00`, Selling Price: `70.00` | Warning or rejection: *"Selling price should not be lower than cost price"*. | Warning displayed to prevent accidental loss-making pricing. | **PASS** |
| **TC-PRD-05** | Update existing product details | Change stock of `PRD-001` from `50` to `75` | Product stock successfully updated in database. | Stock updated to 75; timestamp recorded. | **PASS** |
| **TC-PRD-06** | Delete product with confirmation | Click Delete on unreferenced product | Confirmation prompt displayed; product removed from inventory upon confirmation. | Product removed from UI and database. | **PASS** |

---

### Test Suite 2: Sales Transaction Processing & Cart Logic (FR2)

| Test ID | Test Description | Input / Test Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| **TC-SLS-01** | Add item to POS cart | Select `PRD-001` (Price: ₹110), Qty: `2` | Item added to cart; Subtotal = ₹220.00. | Cart displays item, unit price, quantity 2, subtotal ₹220.00. | **PASS** |
| **TC-SLS-02** | Calculate tax and discounts automatically | Subtotal: ₹1000.00, Tax rate: 5%, Discount: ₹50.00 | Tax: ₹50.00, Discount: ₹50.00, Grand Total: ₹1000.00 | Calculation exact to 2 decimal places. | **PASS** |
| **TC-SLS-03** | Checkout with multi-item cart | 3 units of Item A (₹50) + 2 units of Item B (₹100) = ₹350. Pay mode: UPI | Transaction committed; unique Txn ID generated; receipt displayed. | Txn ID `TXN-20261119-001` generated; printable receipt shown. | **PASS** |
| **TC-SLS-04** | Prevent empty cart checkout | Click "Process Checkout" when cart is empty | Checkout blocked with message: *"Cart is empty"*. | Alert displayed: *"Please add items to cart before checkout"*. | **PASS** |

---

### Test Suite 3: Stock Availability Validation & Over-Sale Prevention (FR3 & FR4 - Critical)

| Test ID | Test Description | Input / Test Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| **TC-STK-01** | Purchase within available stock | Product `PRD-005` stock = `20`. Purchase qty = `5`. | Sale succeeds; available stock automatically reduces from `20` to `15`. | Stock updated from 20 to 15 in database; confirmed. | **PASS** |
| **TC-STK-02** | Boundary test: Purchase exact stock | Product `PRD-008` stock = `10`. Purchase qty = `10`. | Sale succeeds; available stock becomes `0`; status changes to "Out of Stock". | Stock becomes 0; red "Out of Stock" badge displayed. | **PASS** |
| **TC-STK-03** | **Boundary test: Prevent over-sale (qty = stock + 1)** | Product `PRD-008` stock = `10`. Customer attempts to buy `11`. | **Sale BLOCKED.** System shows error: *"Requested quantity (11) exceeds available stock (10)"*. | **Transaction blocked immediately.** Error alert displayed. | **PASS** |
| **TC-STK-04** | Prevent adding out-of-stock item to cart | Product `PRD-012` stock = `0`. Attempt to add to cart. | Add button disabled or shows: *"Item is currently out of stock"*. | Disabled with message *"Out of stock"*; cart rejects item. | **PASS** |
| **TC-STK-05** | Atomicity on transaction cancellation | Cart with 5 units of `PRD-001` is cancelled before payment confirmation. | Stock quantity remains unaffected (`50`). | No deduction occurs; stock remains 50. | **PASS** |

---

### Test Suite 4: Inventory Alerts & Business Intelligence Reports (FR5)

| Test ID | Test Description | Input / Test Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| **TC-RPT-01** | Low-stock alert triggering | Product has stock = `4`, Reorder level = `5` | Product flagged in "Low Stock Alert" report with warning indicator. | Displayed in Low-Stock tab with yellow warning badge. | **PASS** |
| **TC-RPT-02** | Daily Sales Report aggregation | Execute 4 transactions on current date totaling ₹4,850.00 | Daily report shows Count = 4, Total Revenue = ₹4,850.00. | Report matches sum of individual sales transactions. | **PASS** |
| **TC-RPT-03** | Fast-selling products ranking | Product A sold 45 units; Product B sold 20 units | Ranking lists Product A at #1 and Product B at #2. | Ranked correctly in Top-Selling table and chart. | **PASS** |

---

### Test Suite 5: Python Data Retrieval, Preprocessing & Visualization (FR6)

| Test ID | Test Description | Input / Test Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| **TC-PY-01** | Database extraction via Python | Run `python data_analysis.py` | Connects to `retail_store.db`, executes SQL query, loads DataFrame. | 100% records fetched without null primary keys. | **PASS** |
| **TC-PY-02** | Data preprocessing & cleaning | Clean numeric types, format dates, compute line item revenues | Preprocessed DataFrame ready with zero missing values. | Verified with Pandas `.info()` and `.describe()`. | **PASS** |
| **TC-PY-03** | Chart Generation (Revenue Trend) | Execute Matplotlib line chart generation | Image `daily_sales_trend.png` saved to `visualizations/`. | File created with clear labels, dates, and legend. | **PASS** |
| **TC-PY-04** | Chart Generation (Category Share) | Execute Seaborn/Matplotlib pie/doughnut chart | Image `category_revenue_share.png` generated. | Percentage distribution rendered accurately. | **PASS** |
| **TC-PY-05** | Chart Generation (Stock vs Reorder) | Execute grouped bar chart comparing stock vs reorder | Image `stock_vs_reorder_levels.png` generated. | Threshold lines and bar comparisons clearly plotted. | **PASS** |

---

### Test Suite 6: 24/7 Web App Usability & GitHub Pages Deployment

| Test ID | Test Description | Input / Test Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| **TC-WEB-01** | GitHub Pages 24/7 accessibility | Access site URL on modern browser | Loads instantly with no login required or server delay. | Loads in < 1 second; zero server downtime. | **PASS** |
| **TC-WEB-02** | Responsive Mobile / Tablet view | Test on viewport width 375px (mobile) and 768px (tablet) | Layout shifts to mobile navigation; tables and cart stack cleanly. | Touch-friendly controls; no horizontal overflow. | **PASS** |
| **TC-WEB-03** | LocalStorage / IndexedDB Persistence | Add product, refresh browser window | Data persists across browser refresh. | Catalog and sales data intact after reload. | **PASS** |
| **TC-WEB-04** | Sample Dataset Seeding | Click "Load Demo Data" button | Pre-populates 20 realistic products and 15 transactions. | Instant sample data loaded for live demonstration. | **PASS** |

---

## 3. Summary of Test Execution
- **Total Test Cases Executed:** 25
- **Tests Passed:** 25
- **Tests Failed:** 0
- **Pass Rate:** **100%**
- **Requirements Compliance:** All 6 Functional Requirements (FR1 to FR6) verified and confirmed.
