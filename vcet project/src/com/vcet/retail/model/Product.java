package com.vcet.retail.model;

/**
 * Product Model Entity
 * Scenario 9: Retail Store Inventory and Sales Analysis System
 * Student: Ashvika K | Reg No: 732925ITR009 | Class: 25IT3A
 */
public class Product {
    private String productId;
    private String name;
    private String category;
    private String brand;
    private double costPrice;
    private double sellingPrice;
    private int stockQuantity;
    private int reorderLevel;
    private String unit;

    public Product(String productId, String name, String category, String brand, 
                   double costPrice, double sellingPrice, int stockQuantity, int reorderLevel, String unit) {
        this.productId = productId;
        this.name = name;
        this.category = category;
        this.brand = brand;
        this.costPrice = costPrice;
        this.sellingPrice = sellingPrice;
        this.stockQuantity = stockQuantity;
        this.reorderLevel = reorderLevel;
        this.unit = unit;
    }

    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public double getCostPrice() { return costPrice; }
    public void setCostPrice(double costPrice) { this.costPrice = costPrice; }

    public double getSellingPrice() { return sellingPrice; }
    public void setSellingPrice(double sellingPrice) { this.sellingPrice = sellingPrice; }

    public int getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(int stockQuantity) { this.stockQuantity = stockQuantity; }

    public int getReorderLevel() { return reorderLevel; }
    public void setReorderLevel(int reorderLevel) { this.reorderLevel = reorderLevel; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public boolean isOutOfStock() {
        return stockQuantity <= 0;
    }

    public boolean isLowStock() {
        return stockQuantity <= reorderLevel && stockQuantity > 0;
    }

    public double getProfitMargin() {
        return sellingPrice - costPrice;
    }

    public double getProfitMarginPercentage() {
        if (sellingPrice == 0) return 0.0;
        return (getProfitMargin() / sellingPrice) * 100.0;
    }

    @Override
    public String toString() {
        return String.format("[%s] %-25s | Cat: %-15s | Price: ₹%7.2f | Stock: %3d %s | Status: %s",
                productId, name, category, sellingPrice, stockQuantity, unit,
                isOutOfStock() ? "OUT OF STOCK" : (isLowStock() ? "LOW STOCK" : "IN STOCK"));
    }
}
