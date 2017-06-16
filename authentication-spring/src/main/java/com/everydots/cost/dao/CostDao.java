package com.everydots.cost.dao;

import java.util.List;
import java.util.Map;

import com.everydots.cost.domain.CostRecord;

public interface CostDao {

    String insertRecords(List<CostRecord> records);

    String insertRecord(CostRecord record);

    String updateRecord(CostRecord record);

    List<CostRecord> retrieveRecords(CostRecord record);

    List<Map<String, Object>> statisticRecords();
}
