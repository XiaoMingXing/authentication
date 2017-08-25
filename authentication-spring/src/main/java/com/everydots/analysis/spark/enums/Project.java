package com.everydots.analysis.spark.enums;

public enum Project {

    LENOVO("lenovo mobile repair project", "reports/all_in_one.csv"),
    SHELL("shell delivery project", "");

    private String appName;

    private String dataPath;

    private String[] fullDataPaths;

    Project(String appName, String dataPath) {
        this.appName = appName;
        this.dataPath = dataPath;
    }

    Project(String appName, String[] fullDataPaths) {
        this.appName = appName;
        this.fullDataPaths = fullDataPaths;
    }

    public String getAppName() {
        return appName;
    }

    public String getDataPath() {
        return dataPath;
    }

    public String[] getFullDataPaths() {
        return fullDataPaths;
    }
}
