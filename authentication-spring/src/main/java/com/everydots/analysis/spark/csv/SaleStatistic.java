package com.everydots.analysis.spark.csv;

import java.io.Serializable;
import java.util.UUID;

public class SaleStatistic implements Serializable {

    private String id;

    private String productName;

    private int amount;

    public SaleStatistic() {
        this.id = UUID.randomUUID().toString().replace("-", "");
    }

    public String getProductName() {
        return productName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public SaleStatistic withProductName(String productName) {
        this.productName = productName;
        return this;
    }

    public SaleStatistic withAmount(Integer amount) {
        this.amount = amount;
        return this;
    }
}
