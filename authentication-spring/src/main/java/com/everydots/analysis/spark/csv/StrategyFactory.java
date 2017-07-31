package com.everydots.analysis.spark.csv;

import com.opencsv.bean.HeaderColumnNameTranslateMappingStrategy;

import java.util.HashMap;
import java.util.Map;

public class StrategyFactory {
    public static HeaderColumnNameTranslateMappingStrategy getLenoveStrategy() {
        HeaderColumnNameTranslateMappingStrategy strategy = new HeaderColumnNameTranslateMappingStrategy();
        strategy.setType(SaleRecord.class);

        Map<String, String> columnMapping = new HashMap<String, String>();
        columnMapping.put("Service Order", "so");
        columnMapping.put("IMEI1", "imet");
        columnMapping.put("Product Model", "product");
        strategy.setColumnMapping(columnMapping);

        return strategy;
    }
}
