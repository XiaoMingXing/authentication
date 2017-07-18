package com.everydots.analysis.spark.bean;


import com.opencsv.bean.CsvBind;

public class CostRecord {

    @CsvBind
    private String InvoiceID;

    @CsvBind
    private String ProductName;

    @CsvBind
    private String UnBlendedCost;

    public String getInvoiceID() {
        return InvoiceID;
    }

    public void setInvoiceID(String invoiceID) {
        InvoiceID = invoiceID;
    }

    public String getProductName() {
        return ProductName;
    }

    public void setProductName(String productName) {
        ProductName = productName;
    }

    public String getUnBlendedCost() {
        return UnBlendedCost;
    }

    public void setUnBlendedCost(String unBlendedCost) {
        UnBlendedCost = unBlendedCost;
    }
}
