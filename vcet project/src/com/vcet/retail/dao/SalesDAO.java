package com.vcet.retail.dao;

import com.vcet.retail.model.SaleItem;
import com.vcet.retail.model.Transaction;
import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Data Access Object for Transactions and Sales Analytics
 */
public class SalesDAO {
    private final Map<String, Transaction> transactionTable = new ConcurrentHashMap<>();

    public boolean save(Transaction transaction) {
        if (transaction == null || transaction.getTransactionId() == null) return false;
        transactionTable.put(transaction.getTransactionId(), transaction);
        return true;
    }

    public Optional<Transaction> findById(String transactionId) {
        return Optional.ofNullable(transactionTable.get(transactionId));
    }

    public List<Transaction> findAll() {
        List<Transaction> list = new ArrayList<>(transactionTable.values());
        list.sort((a, b) -> b.getTransactionDate().compareTo(a.getTransactionDate()));
        return list;
    }

    public List<Transaction> findByDate(LocalDate date) {
        List<Transaction> list = new ArrayList<>();
        for (Transaction t : transactionTable.values()) {
            if (t.getTransactionDate().toLocalDate().isEqual(date)) {
                list.add(t);
            }
        }
        return list;
    }

    public Map<String, Integer> getTopSellingProducts() {
        Map<String, Integer> productQtyMap = new HashMap<>();
        for (Transaction t : transactionTable.values()) {
            for (SaleItem item : t.getItems()) {
                productQtyMap.put(
                    item.getProductName(), 
                    productQtyMap.getOrDefault(item.getProductName(), 0) + item.getQuantity()
                );
            }
        }
        return productQtyMap;
    }

    public double getTotalRevenue() {
        double total = 0.0;
        for (Transaction t : transactionTable.values()) {
            total += t.getGrandTotal();
        }
        return total;
    }
}
