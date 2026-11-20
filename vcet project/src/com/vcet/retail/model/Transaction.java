package com.vcet.retail.model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 * Sales Transaction Entity
 * Represents an itemized customer purchase invoice
 */
public class Transaction {
    private String transactionId;
    private String customerName;
    private LocalDateTime transactionDate;
    private List<SaleItem> items;
    private double subtotal;
    private double taxAmount;
    private double discountAmount;
    private double grandTotal;
    private String paymentMethod;
    private String status;

    public Transaction(String transactionId, String customerName, String paymentMethod) {
        this.transactionId = transactionId;
        this.customerName = (customerName == null || customerName.trim().isEmpty()) ? "Walk-in Customer" : customerName;
        this.paymentMethod = paymentMethod;
        this.transactionDate = LocalDateTime.now();
        this.items = new ArrayList<>();
        this.subtotal = 0.0;
        this.taxAmount = 0.0;
        this.discountAmount = 0.0;
        this.grandTotal = 0.0;
        this.status = "COMPLETED";
    }

    public void addItem(SaleItem item) {
        this.items.add(item);
        recalculateTotals();
    }

    public void applyDiscount(double discount) {
        this.discountAmount = discount;
        recalculateTotals();
    }

    public void recalculateTotals() {
        this.subtotal = 0.0;
        for (SaleItem item : items) {
            this.subtotal += item.getSubtotal();
        }
        // Standard 5% GST tax calculation
        this.taxAmount = this.subtotal * 0.05;
        this.grandTotal = Math.max(0.0, (this.subtotal + this.taxAmount) - this.discountAmount);
    }

    public String getTransactionId() { return transactionId; }
    public String getCustomerName() { return customerName; }
    public LocalDateTime getTransactionDate() { return transactionDate; }
    public void setTransactionDate(LocalDateTime date) { this.transactionDate = date; }
    public List<SaleItem> getItems() { return items; }
    public double getSubtotal() { return subtotal; }
    public double getTaxAmount() { return taxAmount; }
    public double getDiscountAmount() { return discountAmount; }
    public double getGrandTotal() { return grandTotal; }
    public String getPaymentMethod() { return paymentMethod; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String generateReceipt() {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd-MMM-yyyy HH:mm:ss");
        StringBuilder sb = new StringBuilder();
        sb.append("========================================================\n");
        sb.append("        VCET RETAIL SUPERMARKET & STORE                \n");
        sb.append("          Thindal, Erode, Tamil Nadu - 12              \n");
        sb.append("========================================================\n");
        sb.append(String.format("Invoice No : %-20s Date: %s\n", transactionId, transactionDate.format(dtf)));
        sb.append(String.format("Customer   : %-20s Mode: %s\n", customerName, paymentMethod));
        sb.append("--------------------------------------------------------\n");
        sb.append(String.format("%-10s | %-22s | %3s | %8s | %8s\n", "CODE", "ITEM", "QTY", "RATE", "TOTAL"));
        sb.append("--------------------------------------------------------\n");
        for (SaleItem it : items) {
            sb.append(String.format("%-10s | %-22s | %3d | %8.2f | %8.2f\n",
                    it.getProductId(),
                    it.getProductName().length() > 22 ? it.getProductName().substring(0, 19) + "..." : it.getProductName(),
                    it.getQuantity(),
                    it.getUnitPrice(),
                    it.getSubtotal()));
        }
        sb.append("--------------------------------------------------------\n");
        sb.append(String.format("%45s : ₹%9.2f\n", "Subtotal", subtotal));
        sb.append(String.format("%45s : ₹%9.2f\n", "GST Tax (5%)", taxAmount));
        if (discountAmount > 0) {
            sb.append(String.format("%45s : ₹%9.2f\n", "Discount", discountAmount));
        }
        sb.append("========================================================\n");
        sb.append(String.format("%45s : ₹%9.2f\n", "GRAND TOTAL", grandTotal));
        sb.append("========================================================\n");
        sb.append("          Thank you for shopping with us!              \n");
        sb.append("========================================================\n");
        return sb.toString();
    }
}
