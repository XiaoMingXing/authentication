package com.everydots.analysis.spark.csv;

import java.io.Serializable;
import java.util.UUID;

public class KeyValueRecord implements Serializable {

    private String id;

    private String key;

    private double numericValue;

    private String stringValue;

    public KeyValueRecord() {
        this.id = UUID.randomUUID().toString().replace("-", "");
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public double getNumericValue() {
        return numericValue;
    }

    public void setNumericValue(int numericValue) {
        this.numericValue = numericValue;
    }

    public String getStringValue() {
        return stringValue;
    }

    public void setStringValue(String stringValue) {
        this.stringValue = stringValue;
    }

    public KeyValueRecord withKey(String key) {
        this.key = key;
        return this;
    }

    public KeyValueRecord withNumericValue(Double value) {
        this.numericValue = value;
        return this;
    }

    public KeyValueRecord withStringValue(String value) {
        this.stringValue = value;
        return this;
    }
}
