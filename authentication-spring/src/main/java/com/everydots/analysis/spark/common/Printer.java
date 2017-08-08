package com.everydots.analysis.spark.common;

import org.apache.spark.sql.Row;

import java.util.List;

public class Printer {

    public static void printRow(List<Row> rows) {
        rows.forEach(row -> {
            System.out.println(row.toString());
        });
    }
}
