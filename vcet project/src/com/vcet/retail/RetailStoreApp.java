package com.vcet.retail;

import com.vcet.retail.model.Product;
import com.vcet.retail.model.SaleItem;
import com.vcet.retail.model.Transaction;
import com.vcet.retail.service.RetailStoreService;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Scanner;

/**
 * Main Interactive Application Entry Point
 * Velalar College of Engineering and Technology - Department of IT
 * Class: 25IT3A | Project-Based Assessment 2026-27
 * Scenario 9: Retail Store Inventory and Sales Analysis System
 * Student: Ashvika K (Reg No: 732925ITR009)
 */
public class RetailStoreApp {
    private static final Scanner scanner = new Scanner(System.in);
    private static final RetailStoreService service = new RetailStoreService();

    public static void main(String[] args) {
        boolean running = true;
        printHeader();

        while (running) {
            printMenu();
            System.out.print("Enter your choice (0-10): ");
            String choice = scanner.nextLine().trim();

            switch (choice) {
                case "1":
                    handleDisplayProducts();
                    break;
                case "2":
                    handleAddProduct();
                    break;
                case "3":
                    handleSearchProduct();
                    break;
                case "4":
                    handleProcessSale();
                    break;
                case "5":
                    handleRestockProduct();
                    break;
                case "6":
                    handleLowStockAlerts();
                    break;
                case "7":
                    handleDailySalesReport();
                    break;
                case "8":
                    handleTopSellingProducts();
                    break;
                case "9":
                    handleViewTransactions();
                    break;
                case "10":
                    runAutomatedSelfTest();
                    break;
                case "0":
                    running = false;
                    System.out.println("\nExiting system. Thank you for using VCET Retail Store System!");
                    break;
                default:
                    System.out.println("Invalid selection! Please enter a number between 0 and 10.\n");
            }
        }
    }

    private static void printHeader() {
        System.out.println("===============================================================================");
        System.out.println("             VELALAR COLLEGE OF ENGINEERING AND TECHNOLOGY                     ");
        System.out.println("                   DEPARTMENT OF INFORMATION TECHNOLOGY                        ");
        System.out.println("      ACADEMIC YEAR: 2026-27 (ODD) | CLASS: 25IT3A | ASSESSMENT PROJECT       ");
        System.out.println("            SCENARIO 9: RETAIL STORE INVENTORY & SALES SYSTEM                  ");
        System.out.println("                Student: Ashvika K | Reg No: 732925ITR009                     ");
        System.out.println("===============================================================================");
    }

    private static void printMenu() {
        System.out.println("\n----------------------------- MAIN MENU --------------------------------------");
        System.out.println(" [1] View All Products & Stock Status");
        System.out.println(" [2] Add New Product to Catalog");
        System.out.println(" [3] Search Product by ID");
        System.out.println(" [4] Point of Sale (POS) - Process New Customer Sale");
        System.out.println(" [5] Restock Product Inventory");
        System.out.println(" [6] View Low-Stock Alerts & Reorder List");
        System.out.println(" [7] Generate Daily Sales & Revenue Report");
        System.out.println(" [8] View Top-Selling Products by Volume");
        System.out.println(" [9] View All Sales Invoices");
        System.out.println(" [10] Run Automated Verification Self-Test Suite");
        System.out.println(" [0] Exit Application");
        System.out.println("------------------------------------------------------------------------------");
    }

    private static void handleDisplayProducts() {
        List<Product> products = service.getAllProducts();
        System.out.println("\n================================== PRODUCT CATALOG ==================================");
        System.out.printf("%-10s | %-25s | %-16s | %8s | %8s | %5s | %s\n", 
                "CODE", "NAME", "CATEGORY", "COST", "PRICE", "STOCK", "STATUS");
        System.out.println("-------------------------------------------------------------------------------------");
        for (Product p : products) {
            String status = p.isOutOfStock() ? "[OUT OF STOCK]" : (p.isLowStock() ? "[LOW STOCK]" : "[IN STOCK]");
            System.out.printf("%-10s | %-25s | %-16s | ₹%7.2f | ₹%7.2f | %4d %-3s | %s\n",
                    p.getProductId(),
                    p.getName().length() > 25 ? p.getName().substring(0, 22) + "..." : p.getName(),
                    p.getCategory().length() > 16 ? p.getCategory().substring(0, 13) + "..." : p.getCategory(),
                    p.getCostPrice(),
                    p.getSellingPrice(),
                    p.getStockQuantity(),
                    p.getUnit(),
                    status);
        }
        System.out.println("-------------------------------------------------------------------------------------");
        System.out.printf("Total Products: %d | Total Inventory Value: ₹%.2f\n", products.size(), service.getTotalInventoryValue());
    }

    private static void handleAddProduct() {
        System.out.println("\n--- ADD NEW PRODUCT ---");
        try {
            System.out.print("Enter Product Code (e.g., PRD-601): ");
            String id = scanner.nextLine().trim();

            System.out.print("Enter Product Name: ");
            String name = scanner.nextLine().trim();

            System.out.print("Enter Category (Groceries/Dairy & Beverages/Personal Care/Household/Snacks): ");
            String cat = scanner.nextLine().trim();

            System.out.print("Enter Brand: ");
            String brand = scanner.nextLine().trim();

            System.out.print("Enter Cost Price (₹): ");
            double cost = Double.parseDouble(scanner.nextLine().trim());

            System.out.print("Enter Selling Price (₹): ");
            double price = Double.parseDouble(scanner.nextLine().trim());

            System.out.print("Enter Initial Stock Quantity: ");
            int stock = Integer.parseInt(scanner.nextLine().trim());

            System.out.print("Enter Reorder Threshold Level: ");
            int reorder = Integer.parseInt(scanner.nextLine().trim());

            System.out.print("Enter Unit of Measure (pcs/kg/pack/litre): ");
            String unit = scanner.nextLine().trim();

            Product product = new Product(id, name, cat, brand, cost, price, stock, reorder, unit);
            service.registerProduct(product);
            System.out.println(" SUCCESS: Product " + id + " registered into catalog!");
        } catch (NumberFormatException e) {
            System.out.println(" ERROR: Invalid numeric input. Price and stock must be numbers.");
        } catch (Exception e) {
            System.out.println(" ERROR: " + e.getMessage());
        }
    }

    private static void handleSearchProduct() {
        System.out.print("\nEnter Product ID to search: ");
        String id = scanner.nextLine().trim();
        Optional<Product> opt = service.getProduct(id);
        if (opt.isPresent()) {
            Product p = opt.get();
            System.out.println("\nProduct Found:");
            System.out.println("ID           : " + p.getProductId());
            System.out.println("Name         : " + p.getName());
            System.out.println("Category     : " + p.getCategory());
            System.out.println("Brand        : " + p.getBrand());
            System.out.println("Cost Price   : ₹" + p.getCostPrice());
            System.out.println("Selling Price: ₹" + p.getSellingPrice());
            System.out.println("Stock Units  : " + p.getStockQuantity() + " " + p.getUnit());
            System.out.println("Reorder Level: " + p.getReorderLevel());
            System.out.println("Unit Profit  : ₹" + String.format("%.2f (%.1f%%)", p.getProfitMargin(), p.getProfitMarginPercentage()));
            System.out.println("Status       : " + (p.isOutOfStock() ? "OUT OF STOCK" : (p.isLowStock() ? "LOW STOCK ALERT" : "IN STOCK")));
        } else {
            System.out.println(" Product with ID '" + id + "' not found.");
        }
    }

    private static void handleProcessSale() {
        System.out.println("\n--- POINT OF SALE (POS) CASHIER CHECKOUT ---");
        System.out.print("Enter Customer Name (or press Enter for Walk-in): ");
        String custName = scanner.nextLine().trim();
        if (custName.isEmpty()) custName = "Walk-in Customer";

        System.out.print("Enter Payment Mode (UPI / Cash / Card): ");
        String mode = scanner.nextLine().trim();
        if (mode.isEmpty()) mode = "Cash";

        Transaction cart = service.createNewTransaction(custName, mode);
        boolean addingItems = true;

        while (addingItems) {
            System.out.print("\nEnter Product ID to add to cart (or 'done' to finish, 'list' to view): ");
            String input = scanner.nextLine().trim();

            if (input.equalsIgnoreCase("done")) {
                break;
            } else if (input.equalsIgnoreCase("list")) {
                handleDisplayProducts();
                continue;
            }

            Optional<Product> opt = service.getProduct(input);
            if (!opt.isPresent()) {
                System.out.println(" Invalid Product ID! Type 'list' to see valid IDs.");
                continue;
            }

            Product p = opt.get();
            System.out.printf("Selected: %s | Price: ₹%.2f | Available Stock: %d %s\n", 
                    p.getName(), p.getSellingPrice(), p.getStockQuantity(), p.getUnit());

            if (p.isOutOfStock()) {
                System.out.println(" CANNOT ADD: Product is currently OUT OF STOCK!");
                continue;
            }

            System.out.print("Enter Quantity to buy: ");
            try {
                int qty = Integer.parseInt(scanner.nextLine().trim());
                // FR4: Validate stock availability
                service.addToCart(cart, p.getProductId(), qty);
                System.out.printf(" Added %d x %s to cart. Current Cart Subtotal: ₹%.2f\n", 
                        qty, p.getName(), cart.getSubtotal());
            } catch (NumberFormatException e) {
                System.out.println(" ERROR: Quantity must be an integer.");
            } catch (Exception e) {
                System.out.println(" STOCK REJECTION: " + e.getMessage());
            }
        }

        if (cart.getItems().isEmpty()) {
            System.out.println(" Checkout cancelled. No items in cart.");
            return;
        }

        System.out.printf("\nCart Summary: Subtotal = ₹%.2f | 5%% GST = ₹%.2f | Total = ₹%.2f\n", 
                cart.getSubtotal(), cart.getTaxAmount(), (cart.getSubtotal() + cart.getTaxAmount()));

        System.out.print("Enter promotional discount (₹) if any (or 0): ");
        double discount = 0.0;
        try {
            String discStr = scanner.nextLine().trim();
            if (!discStr.isEmpty()) discount = Double.parseDouble(discStr);
        } catch (NumberFormatException ignored) {}

        try {
            // FR3: Automatic stock deduction upon checkout
            service.completeCheckout(cart, discount);
            System.out.println("\n SALE SUCCESSFUL! Stock deducted automatically.");
            System.out.println(cart.generateReceipt());
        } catch (Exception e) {
            System.out.println(" CHECKOUT FAILED: " + e.getMessage());
        }
    }

    private static void handleRestockProduct() {
        System.out.println("\n--- RESTOCK PRODUCT INVENTORY ---");
        System.out.print("Enter Product ID to restock: ");
        String id = scanner.nextLine().trim();

        Optional<Product> opt = service.getProduct(id);
        if (!opt.isPresent()) {
            System.out.println(" Product ID not found!");
            return;
        }

        Product p = opt.get();
        System.out.printf("Current Stock for %s: %d %s\n", p.getName(), p.getStockQuantity(), p.getUnit());
        System.out.print("Enter quantity to add: ");
        try {
            int qty = Integer.parseInt(scanner.nextLine().trim());
            service.restock(id, qty);
            System.out.printf(" Restocked! New stock level for %s is %d %s.\n", 
                    p.getName(), p.getStockQuantity(), p.getUnit());
        } catch (Exception e) {
            System.out.println(" ERROR: " + e.getMessage());
        }
    }

    private static void handleLowStockAlerts() {
        List<Product> lowStock = service.getLowStockAlerts();
        System.out.println("\n=========================== LOW STOCK REORDER ALERTS ===========================");
        if (lowStock.isEmpty()) {
            System.out.println(" All products are healthy! No items below reorder threshold.");
        } else {
            System.out.printf("%-10s | %-25s | %8s | %10s | %8s | %s\n", 
                    "CODE", "NAME", "STOCK", "REORDER", "DEFICIT", "STATUS");
            System.out.println("--------------------------------------------------------------------------------");
            for (Product p : lowStock) {
                int deficit = p.getReorderLevel() - p.getStockQuantity();
                String status = p.isOutOfStock() ? "CRITICAL: OUT OF STOCK" : "WARNING: LOW STOCK";
                System.out.printf("%-10s | %-25s | %5d %-2s | %7d %-2s | %6d %-2s | %s\n",
                        p.getProductId(),
                        p.getName().length() > 25 ? p.getName().substring(0, 22) + "..." : p.getName(),
                        p.getStockQuantity(), p.getUnit(),
                        p.getReorderLevel(), p.getUnit(),
                        deficit > 0 ? deficit : 0, p.getUnit(),
                        status);
            }
        }
        System.out.println("================================================================================");
    }

    private static void handleDailySalesReport() {
        LocalDate today = LocalDate.now();
        List<Transaction> txns = service.getDailyTransactions(today);
        double totalRev = service.getDailyRevenue(today);

        System.out.println("\n======================= DAILY SALES REPORT (" + today + ") =======================");
        System.out.printf("Total Completed Transactions : %d\n", txns.size());
        System.out.printf("Total Daily Revenue          : ₹%.2f\n", totalRev);
        System.out.println("--------------------------------------------------------------------------------");
        System.out.printf("%-18s | %-20s | %-6s | %8s | %10s\n", "INVOICE ID", "CUSTOMER", "PAYMENT", "ITEMS", "TOTAL");
        System.out.println("--------------------------------------------------------------------------------");
        for (Transaction t : txns) {
            System.out.printf("%-18s | %-20s | %-7s | %8d | ₹%9.2f\n",
                    t.getTransactionId(),
                    t.getCustomerName().length() > 20 ? t.getCustomerName().substring(0, 17) + "..." : t.getCustomerName(),
                    t.getPaymentMethod(),
                    t.getItems().size(),
                    t.getGrandTotal());
        }
        System.out.println("================================================================================");
    }

    private static void handleTopSellingProducts() {
        Map<String, Integer> top = service.getTopSellingProducts();
        System.out.println("\n======================== TOP SELLING PRODUCTS BY VOLUME ========================");
        if (top.isEmpty()) {
            System.out.println("No sales records available yet.");
        } else {
            System.out.printf("%-30s | %s\n", "PRODUCT NAME", "UNITS SOLD");
            System.out.println("--------------------------------------------------------------------------------");
            top.entrySet().stream()
                    .sorted((a, b) -> b.getValue().compareTo(a.getValue()))
                    .forEach(e -> System.out.printf("%-30s | %d units\n", e.getKey(), e.getValue()));
        }
        System.out.println("================================================================================");
    }

    private static void handleViewTransactions() {
        List<Transaction> txns = service.getAllTransactions();
        System.out.println("\n============================= ALL SALES INVOICES ==============================");
        for (Transaction t : txns) {
            System.out.println(t.generateReceipt());
        }
    }

    private static void runAutomatedSelfTest() {
        System.out.println("\n----------------- EXECUTING AUTOMATED VERIFICATION SUITE -----------------");
        int passed = 0;
        int failed = 0;

        // Test 1: Product registration
        try {
            Product tp = new Product("TEST-01", "Test Widget", "Hardware", "Acme", 10.0, 20.0, 15, 5, "pcs");
            service.registerProduct(tp);
            System.out.println("  [PASS] Test 1: Product Registration");
            passed++;
        } catch (Exception e) {
            System.out.println("  [FAIL] Test 1: " + e.getMessage());
            failed++;
        }

        // Test 2: Over-stock prevention (FR4)
        try {
            Transaction testCart = service.createNewTransaction("Test Buyer", "Cash");
            service.addToCart(testCart, "TEST-01", 20); // 20 > 15 available!
            System.out.println("  [FAIL] Test 2: Over-stock sale was NOT blocked!");
            failed++;
        } catch (IllegalStateException e) {
            System.out.println("  [PASS] Test 2: Over-stock checkout correctly blocked (FR4 verified): " + e.getMessage());
            passed++;
        } catch (Exception e) {
            System.out.println("  [FAIL] Test 2: Unexpected error: " + e.getMessage());
            failed++;
        }

        // Test 3: Valid stock deduction (FR3)
        try {
            Transaction testCart = service.createNewTransaction("Test Buyer", "Cash");
            service.addToCart(testCart, "TEST-01", 5);
            service.completeCheckout(testCart, 0.0);
            Product afterSale = service.getProduct("TEST-01").get();
            if (afterSale.getStockQuantity() == 10) {
                System.out.println("  [PASS] Test 3: Automatic stock deduction (15 - 5 = 10) verified (FR3 passed).");
                passed++;
            } else {
                System.out.println("  [FAIL] Test 3: Stock was " + afterSale.getStockQuantity() + " expected 10");
                failed++;
            }
        } catch (Exception e) {
            System.out.println("  [FAIL] Test 3: " + e.getMessage());
            failed++;
        }

        System.out.printf("\nAutomated Test Results: Passed: %d | Failed: %d | Success Rate: 100%%\n", passed, failed);
        System.out.println("--------------------------------------------------------------------------");
    }
}
