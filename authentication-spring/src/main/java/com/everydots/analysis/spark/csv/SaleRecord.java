package com.everydots.analysis.spark.csv;


import com.opencsv.bean.CsvBind;

import java.io.Serializable;

public class SaleRecord implements Serializable {

    @CsvBind
    private String so;

    @CsvBind
    private String imet;

    @CsvBind
    private String product;

    public String getSo() {
        return so;
    }

    public void setSo(String so) {
        this.so = so;
    }

    public String getImet() {
        return imet;
    }

    public void setImet(String imet) {
        this.imet = imet;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }
}
