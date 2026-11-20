package com.vcet.retail.service;

import com.vcet.retail.dao.ProductDAO;
import com.vcet.retail.dao.SalesDAO;
import com.vcet.retail.model.Product;
import com.vcet.retail.model.SaleItem;
import com.vcet.retail.model.Transaction;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * Core Business Logic & Orchestration Service
 * Enforces business rules: stock checks, atomic deduction, and analytics
 */
public class RetailStoreService {
    private final ProductDAO productDAO;
    private final SalesDAO salesDAO;
    private int transactionCounter = 1;

    public RetailStoreService() {
        this.productDAO = new ProductDAO();
        this.salesDAO = new SalesDAO();
        seedSampleTransactions();
    }

    private void seedSampleTransactions() {
        // Create 2 pre-seeded sample transactions
        Transaction t1 = createNewTransaction("Suresh Kumar", "UPI");
        addToCart(t1, "PRD-101", 2);
        addToCart(t1, "PRD-102", 1);
        completeCheckout(t1, 0.0);

        Transaction t2 = createNewTransaction("Priya Dharshini", "Card");
        addToCart(t2, "PRD-103", 2);
        addToCart(t2, "PRD-402", 1);
        completeCheckout(t2, 20.0);
    }

    // --- Product Management (FR1) ---
    public boolean registerProduct(Product p) {
        if (p == null || p.getProductId() == null || p.getProductId().trim().isEmpty()) {
            throw new IllegalArgumentException("Product ID cannot be blank.");
        }
        if (productDAO.exists(p.getProductId())) {
            throw new IllegalArgumentException("Product with ID " + p.getProductId() + " already exists!");
        }
        if (p.getSellingPrice() < 0 || p.getCostPrice() < 0) {
            throw new IllegalArgumentException("Prices cannot be negative.");
        }
        if (p.getStockQuantity() < 0) {
            throw new IllegalArgumentException("Stock quantity cannot be negative.");
        }
        return productDAO.save(p);
    }

    public List<Product> getAllProducts() {
        return productDAO.findAll();
    }

    public Optional<Product> getProduct(String productId) {
        return productDAO.findById(productId);
    }

    public List<Product> getLowStockAlerts() {
        return productDAO.findLowStock();
    }

    public boolean restock(String productId, int quantity) {
        if (quantity <= 0) {
            throw new IllegalArgumentException("Restock quantity must be positive.");
        }
        return productDAO.addStock(productId, quantity);
    }

    // --- POS & Transaction Operations (FR2, FR3, FR4) ---
    public Transaction createNewTransaction(String customerName, String paymentMethod) {
        String txnId = String.format("TXN-%s-%03d", 
                LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")), 
                transactionCounter++);
        return new Transaction(txnId, customerName, paymentMethod);
    }

    /**
     * FR4: Verify stock availability before adding item
     */
    public boolean addToCart(Transaction cart, String productId, int quantity) {
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be at least 1 unit.");
        }
        Product product = productDAO.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + productId));

        // Check if already in cart
        int existingInCart = 0;
        for (SaleItem item : cart.getItems()) {
            if (item.getProductId().equalsIgnoreCase(productId)) {
                existingInCart += item.getQuantity();
            }
        }

        int totalRequested = existingInCart + quantity;
        if (totalRequested > product.getStockQuantity()) {
            throw new IllegalStateException(String.format(
                    "Insufficient stock for '%s'! Available: %d units, Requested: %d units.",
                    product.getName(), product.getStockQuantity(), totalRequested));
        }

        // Add or update line item
        boolean updated = false;
        for (SaleItem item : cart.getItems()) {
            if (item.getProductId().equalsIgnoreCase(productId)) {
                item.setQuantity(item.getQuantity() + quantity);
                updated = true;
                break;
            }
        }
        if (!updated) {
            cart.addItem(new SaleItem(product.getProductId(), product.getName(), quantity, product.getSellingPrice()));
        } else {
            cart.recalculateTotals();
        }
        return true;
    }

    /**
     * FR3: Complete checkout and deduct stock atomically
     */
    public synchronized boolean completeCheckout(Transaction cart, double discount) {
        if (cart == null || cart.getItems().isEmpty()) {
            throw new IllegalStateException("Cannot checkout an empty cart.");
        }

        // 1. Final verification pass of stock for all items
        for (SaleItem item : cart.getItems()) {
            if (!productDAO.hasAvailableStock(item.getProductId(), item.getQuantity())) {
                throw new IllegalStateException("Stock validation failed for " + item.getProductName() + "! Stock changed.");
            }
        }

        // 2. Atomic deduction of inventory
        for (SaleItem item : cart.getItems()) {
            productDAO.deductStock(item.getProductId(), item.getQuantity());
        }

        // 3. Apply discount & save transaction
        cart.applyDiscount(discount);
        cart.setStatus("COMPLETED");
        salesDAO.save(cart);
        return true;
    }

    // --- Reports & Analytics (FR5) ---
    public List<Transaction> getAllTransactions() {
        return salesDAO.findAll();
    }

    public List<Transaction> getDailyTransactions(LocalDate date) {
        return salesDAO.findByDate(date);
    }

    public double getDailyRevenue(LocalDate date) {
        double revenue = 0.0;
        for (Transaction t : getDailyTransactions(date)) {
            revenue += t.getGrandTotal();
        }
        return revenue;
    }

    public Map<String, Integer> getTopSellingProducts() {
        return salesDAO.getTopSellingProducts();
    }

    public double getTotalInventoryValue() {
        double total = 0.0;
        for (Product p : productDAO.findAll()) {
            total += (p.getStockQuantity() * p.getSellingPrice());
        }
        return total;
    }
}
