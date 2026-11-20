package com.vcet.retail.dao;

import com.vcet.retail.model.Product;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Data Access Object for Product Entity
 * Provides CRUD operations, stock availability checks, and inventory synchronization
 */
public class ProductDAO {
    private final Map<String, Product> productTable = new ConcurrentHashMap<>();

    public ProductDAO() {
        seedInitialProducts();
    }

    private void seedInitialProducts() {
        save(new Product("PRD-101", "Basmati Rice Premium 1kg", "Groceries", "India Gate", 95.0, 130.0, 45, 10, "kg"));
        save(new Product("PRD-102", "Whole Wheat Atta 5kg", "Groceries", "Aashirvaad", 190.0, 240.0, 30, 8, "pack"));
        save(new Product("PRD-103", "Toor Dal Supreme 1kg", "Groceries", "Tata Sampann", 120.0, 155.0, 25, 10, "kg"));
        save(new Product("PRD-104", "Sunflower Cooking Oil 1L", "Groceries", "Fortune", 115.0, 145.0, 4, 15, "litre"));
        save(new Product("PRD-105", "Iodized Salt 1kg", "Groceries", "Tata Salt", 18.0, 26.0, 60, 20, "pack"));

        save(new Product("PRD-201", "Toned Fresh Milk 500ml", "Dairy & Beverages", "Aavin", 20.0, 25.0, 50, 15, "pouch"));
        save(new Product("PRD-202", "Salted Butter 100g", "Dairy & Beverages", "Amul", 42.0, 56.0, 3, 10, "pack"));
        save(new Product("PRD-203", "Green Tea Classic 25 bags", "Dairy & Beverages", "Tetley", 110.0, 160.0, 18, 5, "box"));
        save(new Product("PRD-204", "Cold Pressed Apple Juice 1L", "Dairy & Beverages", "Real", 85.0, 120.0, 2, 8, "bottle"));
        save(new Product("PRD-205", "Filter Coffee Powder 200g", "Dairy & Beverages", "Bru Gold", 140.0, 195.0, 22, 6, "pack"));

        save(new Product("PRD-301", "Neem Aloe Vera Soap 125g", "Personal Care", "Medimix", 28.0, 38.0, 65, 15, "bar"));
        save(new Product("PRD-302", "Anti-Dandruff Shampoo 180ml", "Personal Care", "Head & Shoulders", 125.0, 175.0, 14, 5, "bottle"));
        save(new Product("PRD-303", "Herbal Toothpaste 150g", "Personal Care", "Colgate Max", 65.0, 92.0, 35, 10, "tube"));
        save(new Product("PRD-304", "Moisturizing Cream 100ml", "Personal Care", "Nivea Soft", 130.0, 180.0, 8, 5, "jar"));

        save(new Product("PRD-401", "Liquid Floor Cleaner 1L", "Household", "Lizol", 130.0, 185.0, 16, 5, "bottle"));
        save(new Product("PRD-402", "Detergent Powder 1kg", "Household", "Surf Excel", 105.0, 148.0, 28, 10, "pack"));
        save(new Product("PRD-403", "Dishwash Gel 500ml", "Household", "Vim Gel", 72.0, 105.0, 0, 8, "bottle"));

        save(new Product("PRD-501", "Marie Gold Biscuits 200g", "Snacks", "Britannia", 22.0, 30.0, 80, 20, "pack"));
        save(new Product("PRD-502", "Classic Salted Potato Chips", "Snacks", "Lays", 15.0, 20.0, 40, 15, "pack"));
        save(new Product("PRD-503", "Dairy Milk Silk 60g", "Snacks", "Cadbury", 55.0, 75.0, 32, 10, "bar"));
    }

    public boolean save(Product product) {
        if (product == null || product.getProductId() == null) return false;
        productTable.put(product.getProductId(), product);
        return true;
    }

    public Optional<Product> findById(String productId) {
        return Optional.ofNullable(productTable.get(productId));
    }

    public List<Product> findAll() {
        List<Product> list = new ArrayList<>(productTable.values());
        list.sort(Comparator.comparing(Product::getProductId));
        return list;
    }

    public List<Product> findByCategory(String category) {
        List<Product> list = new ArrayList<>();
        for (Product p : productTable.values()) {
            if (p.getCategory().equalsIgnoreCase(category)) {
                list.add(p);
            }
        }
        return list;
    }

    public List<Product> findLowStock() {
        List<Product> list = new ArrayList<>();
        for (Product p : productTable.values()) {
            if (p.isLowStock() || p.isOutOfStock()) {
                list.add(p);
            }
        }
        list.sort(Comparator.comparingInt(Product::getStockQuantity));
        return list;
    }

    public boolean exists(String productId) {
        return productTable.containsKey(productId);
    }

    public boolean delete(String productId) {
        return productTable.remove(productId) != null;
    }

    /**
     * FR4: Atomic stock availability verification
     */
    public synchronized boolean hasAvailableStock(String productId, int requestedQuantity) {
        Product p = productTable.get(productId);
        if (p == null) return false;
        return p.getStockQuantity() >= requestedQuantity;
    }

    /**
     * FR3: Atomic stock deduction
     */
    public synchronized boolean deductStock(String productId, int quantityToDeduct) {
        Product p = productTable.get(productId);
        if (p == null) return false;
        if (p.getStockQuantity() < quantityToDeduct) return false;
        p.setStockQuantity(p.getStockQuantity() - quantityToDeduct);
        return true;
    }

    /**
     * Restock inventory
     */
    public synchronized boolean addStock(String productId, int quantityToAdd) {
        Product p = productTable.get(productId);
        if (p == null || quantityToAdd <= 0) return false;
        p.setStockQuantity(p.getStockQuantity() + quantityToAdd);
        return true;
    }
}
