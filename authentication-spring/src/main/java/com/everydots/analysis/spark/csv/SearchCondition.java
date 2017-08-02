package com.everydots.analysis.spark.csv;

import java.io.Serializable;
import java.security.SecureRandom;

public class SearchCondition implements Serializable {

    private String productModel;

    private String problemCode;

    public String getProductModel() {
        return productModel;
    }

    public void setProductModel(String productModel) {
        this.productModel = productModel;
    }

    public String getProblemCode() {
        return problemCode;
    }

    public void setProblemCode(String problemCode) {
        this.problemCode = problemCode;
    }
}
