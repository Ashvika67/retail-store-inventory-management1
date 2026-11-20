# System Design and Architecture Diagrams

## For Retail Store Inventory and Sales Analysis System

---

### **Velalar College of Engineering and Technology (Autonomous)**
**Department of Information Technology**  
**Academic Year:** 2026 - 2027 (ODD) | **Class:** 25IT3A  
**Scenario 9:** Retail Store Inventory and Sales Analysis System  
**Author:** Ashvika K (Reg No: 732925ITR009)  

---

## 1. Overall System Architecture

The Retail Store Inventory and Sales Analysis System follows a **Multi-Tier Layered Architecture** separating the user interface, business logic, data persistence, and data intelligence analytics:

```mermaid
flowchart TD
    subgraph UI["1. Presentation Tier (Client / UI)"]
        W["Web Application (GitHub Pages 24/7)"]
        J["Java Console / GUI CLI Interface"]
    end

    subgraph BL["2. Business Logic & Controller Tier"]
        IV["Inventory Controller & Service"]
        SC["Sales & POS Service"]
        VC["Validation Engine (Stock Check & Over-sale Guard)"]
        RC["Report & Analytics Generator"]
    end

    subgraph DL["3. Data Access Tier (DAO / Storage Adapter)"]
        PDAO["Product DAO"]
        TDAO["Transaction DAO"]
        IDB["IndexedDB / LocalStorage Adapter"]
        JDBC["JDBC Connection Pool"]
    end

    subgraph DB["4. Persistence Tier (DBMS)"]
        SQL[("Relational Database (MySQL / SQLite)")]
    end

    subgraph PY["5. Python Analytics & BI Tier"]
        EXT["Database Data Retrieval Engine"]
        PRE["Pandas Preprocessing & Aggregation"]
        VIS["Matplotlib / Seaborn Visualizations Engine"]
        OUT["Exported Visual Charts (.png) & Reports"]
    end

    W -->|User Actions| SC
    W -->|Catalog Actions| IV
    J -->|CLI Commands| IV
    J -->|CLI Commands| SC

    SC --> VC
    VC -->|Validated| PDAO
    SC --> TDAO
    IV --> PDAO

    PDAO --> IDB
    TDAO --> IDB
    PDAO --> JDBC
    TDAO --> JDBC

    JDBC --> SQL
    IDB -.->|Sync / Export| SQL

    SQL -->|SQL Queries| EXT
    EXT --> PRE
    PRE --> VIS
    VIS --> OUT
    OUT -->|Render in Reports| W
```

---

## 2. Use Case Diagram

### 2.1 Actors
1. **Store Manager / Inventory Administrator:** Manages catalog, restocks products, sets reorder thresholds, and monitors sales/inventory reports.
2. **Cashier / POS Operator:** Looks up items, creates carts, processes payments, and prints invoices.
3. **Data Analyst / Auditor:** Extracts dataset from database, runs Python preprocessing pipelines, and evaluates business patterns.

### 2.2 Diagram
```mermaid
flowchart LR
    Manager(("Store Manager"))
    Cashier(("Cashier / POS"))
    Analyst(("Data Analyst"))

    subgraph SystemBoundary["Retail Store Inventory & Sales System"]
        UC1(["UC-1: Manage Products (CRUD)"])
        UC2(["UC-2: Monitor Stock & Low-Stock Alerts"])
        UC3(["UC-3: Restock Inventory"])
        UC4(["UC-4: Search & Lookup Products"])
        UC5(["UC-5: Process Sales Transaction"])
        UC6(["UC-6: Validate Stock Availability"])
        UC7(["UC-7: Generate Sales Receipt / Invoice"])
        UC8(["UC-8: View Daily Sales & Revenue Reports"])
        UC9(["UC-9: Extract Dataset via Python"])
        UC10(["UC-10: Preprocess & Clean Sales Data"])
        UC11(["UC-11: Generate Analytical Visualizations"])
    end

    Manager --> UC1
    Manager --> UC2
    Manager --> UC3
    Manager --> UC8

    Cashier --> UC4
    Cashier --> UC5
    UC5 -.->|includes| UC6
    UC5 -.->|includes| UC7

    Analyst --> UC9
    Analyst --> UC10
    Analyst --> UC11
```

---

## 3. Class Diagram

The object-oriented design leverages the **Data Access Object (DAO)** and **Service-Controller** design patterns for high cohesion and loose coupling:

```mermaid
classDiagram
    class Product {
        -String productId
        -String name
        -String category
        -double costPrice
        -double sellingPrice
        -int stockQuantity
        -int reorderLevel
        +getProductId() String
        +getName() String
        +getCategory() String
        +getSellingPrice() double
        +getStockQuantity() int
        +setStockQuantity(int qty) void
        +isLowStock() boolean
        +isOutOfStock() boolean
    }

    class SaleItem {
        -String productId
        -String productName
        -int quantity
        -double unitPrice
        -double subtotal
        +calculateSubtotal() double
    }

    class Transaction {
        -String transactionId
        -String customerName
        -String customerPhone
        -List~SaleItem~ items
        -double subtotal
        -double taxAmount
        -double discountAmount
        -double grandTotal
        -String paymentMethod
        -Date transactionDate
        +addItem(SaleItem item) void
        +calculateTotal() double
    }

    class InventoryService {
        -ProductDAO productDao
        +addProduct(Product p) boolean
        +updateProduct(Product p) boolean
        +deleteProduct(String id) boolean
        +getAllProducts() List~Product~
        +getLowStockProducts() List~Product~
        +hasSufficientStock(String id, int qty) boolean
        +deductStock(String id, int qty) boolean
        +restock(String id, int qty) boolean
    }

    class SalesService {
        -TransactionDAO transactionDao
        -InventoryService inventoryService
        +initiateTransaction(String customerName) Transaction
        +addItemToCart(Transaction t, String productId, int qty) boolean
        +processCheckout(Transaction t, String paymentMode) boolean
        +getDailySalesReport(Date date) DailyReport
    }

    class DailyReport {
        -Date date
        -int totalTransactions
        -double totalRevenue
        -List~Transaction~ transactions
        +printSummary() void
    }

    Transaction "1" *-- "1..*" SaleItem : contains
    SalesService ..> Transaction : creates
    SalesService ..> InventoryService : validates & updates stock
    InventoryService o-- Product : manages
    DailyReport o-- Transaction : aggregates
```

---

## 4. Sequence Diagrams

### 4.1 Processing a Sale with Stock Availability Validation
This diagram highlights **Functional Requirement 4** (preventing sales exceeding available stock) and **Functional Requirement 3** (automatic stock deduction):

```mermaid
sequenceDiagram
    autonumber
    actor Cashier
    participant UI as POS Interface
    participant SS as SalesService
    participant IS as InventoryService
    participant DB as Relational Database

    Cashier ->> UI: Select Product (ID: PRD-001) & Quantity (qty = 5)
    UI ->> SS: validateAndAddItem(PRD-001, 5)
    SS ->> IS: checkStockAvailability(PRD-001, 5)
    IS ->> DB: SELECT stock_quantity FROM products WHERE product_id = 'PRD-001'
    DB -->> IS: stock_quantity = 3
    
    alt Requested Quantity > Available Stock (5 > 3)
        IS -->> SS: False (Insufficient Stock: Available = 3)
        SS -->> UI: Error: Insufficient stock (Available: 3)
        UI -->> Cashier: Alert: Cannot add item! Requested quantity exceeds available stock.
    else Requested Quantity <= Available Stock
        IS -->> SS: True (Stock Verified)
        SS ->> UI: Item added to cart. Subtotal updated.
        Cashier ->> UI: Confirm Checkout & Payment (UPI/Cash)
        UI ->> SS: completeCheckout(cartDetails)
        SS ->> IS: deductStock(PRD-001, 5)
        IS ->> DB: UPDATE products SET stock_quantity = stock_quantity - 5
        SS ->> DB: INSERT INTO transactions (...), INSERT INTO transaction_items (...)
        DB -->> SS: Transaction Committed Successfully
        SS -->> UI: Checkout Completed + Invoice Generated
        UI -->> Cashier: Display / Print Sales Receipt
    end
```

### 4.2 Product Restock Sequence
```mermaid
sequenceDiagram
    autonumber
    actor Manager
    participant UI as Inventory UI
    participant IS as InventoryService
    participant DB as Relational Database

    Manager ->> UI: Input Restock Quantity for PRD-001 (e.g. +50 units)
    UI ->> IS: restockProduct("PRD-001", 50)
    IS ->> DB: UPDATE products SET stock_quantity = stock_quantity + 50 WHERE product_id = 'PRD-001'
    IS ->> DB: INSERT INTO stock_logs (product_id, change_type, quantity, date)
    DB -->> IS: Success
    IS -->> UI: Product Restocked Successfully
    UI -->> Manager: Display Updated Catalog & Clear Low Stock Warning
```
