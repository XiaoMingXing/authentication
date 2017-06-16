package com.everydots.cost.bean;

import org.apache.http.HttpStatus;

public class SuccessResult {

    private int state = HttpStatus.SC_OK;

    private Object data;

    private String message;

    public SuccessResult() {
    }

    public SuccessResult(Object data) {
        this.data = data;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
