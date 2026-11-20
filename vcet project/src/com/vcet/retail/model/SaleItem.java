package com.vcet.retail.model;

/**
 * Line item in a sales transaction
 */
public class SaleItem {
    private String productId;
    private String productName;
    private int quantity;
    private double unitPrice;
    private double subtotal;

    public SaleItem(String productId, String productName, int quantity, double unitPrice) {
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.subtotal = quantity * unitPrice;
    }

    public String getProductId() { return productId; }
    public String getProductName() { return productName; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { 
        this.quantity = quantity; 
        this.subtotal = this.quantity * this.unitPrice;
    }
    public double getUnitPrice() { return unitPrice; }
    public double getSubtotal() { return subtotal; }

    @Override
    public String toString() {
        return String.format("%-10s | %-25s | %3d x ₹%7.2f = ₹%8.2f",
                productId, productName, quantity, unitPrice, subtotal);
    }
}
