package com.everydots.analysis.spark.csv;

import scala.Tuple2;

import java.util.List;
import java.util.stream.Collectors;

public class Converters {
    public static List<SaleStatistic> convertForSale(List<Tuple2<String, Integer>> nRepairMobiles) {
        return nRepairMobiles.stream()
                .map(tuple2 -> new SaleStatistic()
                        .withProductName(tuple2._1())
                        .withAmount(tuple2._2()))
                .collect(Collectors.toList());
    }
}
