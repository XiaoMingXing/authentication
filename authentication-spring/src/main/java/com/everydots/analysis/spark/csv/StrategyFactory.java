package com.everydots.analysis.spark.csv;

import com.opencsv.bean.HeaderColumnNameTranslateMappingStrategy;

import java.util.HashMap;
import java.util.Map;

public class StrategyFactory {
    public static HeaderColumnNameTranslateMappingStrategy getLenoveStrategy() {
        HeaderColumnNameTranslateMappingStrategy strategy = new HeaderColumnNameTranslateMappingStrategy();
        strategy.setType(RepairRecord.class);

        Map<String, String> columnMapping = new HashMap<String, String>();
        columnMapping.put("Service Order", "so");
        columnMapping.put("IMEI1", "imet");
        columnMapping.put("Product Model", "product");
        columnMapping.put("R-TAT(BD)", "repairTime");
        columnMapping.put("Station Name", "repairStation");
        columnMapping.put("Station Code", "repairStationCode");
        columnMapping.put("Problem Code Description", "repairPart");
        strategy.setColumnMapping(columnMapping);

        return strategy;
    }
}
