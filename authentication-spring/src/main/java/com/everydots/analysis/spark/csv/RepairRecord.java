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
}
