package com.everydots.analysis.spark;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.SparkSession;

public class SparkFactory {
    public static JavaSparkContext getLocalEnv(String appName) {
        SparkConf config = new SparkConf()
                .setMaster("local")
                .setAppName(appName);
        return new JavaSparkContext(config);
    }

    public static SparkSession getLocalSQLEnv(String appName) {

        SparkSession spark = SparkSession
                .builder()
                .master("local")
                .appName(appName)
                .getOrCreate();
        return spark;
    }
}
