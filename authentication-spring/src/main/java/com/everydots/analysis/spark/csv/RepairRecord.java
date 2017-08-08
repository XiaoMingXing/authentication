package com.everydots.analysis.spark.csv;


import com.opencsv.bean.CsvBind;

import java.io.Serializable;

public class RepairRecord implements Serializable {

    @CsvBind
    private String so;

    @CsvBind
    private String imet;

    @CsvBind
    private String product;

    @CsvBind
    private int repairTime;

    @CsvBind
    private String repairStation;

    @CsvBind
    private String repairStationCode;

    @CsvBind
    private String repairPart;

    @CsvBind
    private String repairLevel;

    @CsvBind
    private String replacePartStatus;

    @CsvBind
    private String replacePartName;

    @CsvBind
    private String problemName;

    @CsvBind
    private String partApplyTime;

    @CsvBind
    private String replacePartNumber;


    public String getPartApplyTime() {
        return partApplyTime;
    }

    public void setPartApplyTime(String partApplyTime) {
        this.partApplyTime = partApplyTime;
    }

    public String getProblemName() {
        return problemName;
    }

    public void setProblemName(String problemName) {
        this.problemName = problemName;
    }

    public String getRepairLevel() {
        return repairLevel;
    }

    public void setRepairLevel(String repairLevel) {
        this.repairLevel = repairLevel;
    }

    public String getReplacePartStatus() {
        return replacePartStatus;
    }

    public void setReplacePartStatus(String replacePartStatus) {
        this.replacePartStatus = replacePartStatus;
    }

    public String getReplacePartName() {
        return replacePartName;
    }

    public void setReplacePartName(String replacePartName) {
        this.replacePartName = replacePartName;
    }

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

    public int getRepairTime() {
        return repairTime;
    }

    public void setRepairTime(int repairTime) {
        this.repairTime = repairTime;
    }

    public String getRepairStation() {
        return repairStation;
    }

    public void setRepairStation(String repairStation) {
        this.repairStation = repairStation;
    }

    public String getRepairPart() {
        return repairPart;
    }

    public void setRepairPart(String repairPart) {
        this.repairPart = repairPart;
    }

    public String getRepairStationCode() {
        return repairStationCode;
    }

    public void setRepairStationCode(String repairStationCode) {
        this.repairStationCode = repairStationCode;
    }

    public String getReplacePartNumber() {
        return replacePartNumber;
    }

    public void setReplacePartNumber(String replacePartNumber) {
        this.replacePartNumber = replacePartNumber;
    }
}
