package com.everydots.analysis.spark.csv;

import java.util.Arrays;
import java.util.HashSet;

public class Converters {

    public static int count(String stringValue) {
        String[] stations = stringValue.split(",");
        HashSet hashSet = new HashSet(Arrays.asList(stations));
        return hashSet.size();
    }
}
