package com.everydots.analysis.spark;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaSparkContext;

public class SparkFactory {
    public static JavaSparkContext getLocalEnv(String appName) {
        SparkConf config = new SparkConf()
                .setMaster("local")
                .setAppName(appName);
        return new JavaSparkContext(config);
    }
}
