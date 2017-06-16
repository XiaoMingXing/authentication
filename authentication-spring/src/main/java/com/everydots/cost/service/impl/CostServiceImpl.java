package com.everydots.cost.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.everydots.cost.domain.CostRecord;
import com.everydots.cost.dao.CostDao;
import com.everydots.cost.service.CostService;
import org.apache.commons.lang.math.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CostServiceImpl implements CostService {

    @Autowired
    private CostDao costDao;

    private String[] service_names = {"EC2", "S3", "RDS", "Kinesis"};

    @Override
    public String insertMockRecords() {
        return insertCosts(mockCostRecords(100));
    }

    @Override
    public String insertCost(CostRecord costRecord) {
        return costDao.insertRecord(costRecord);
    }

    @Override
    public List<Map<String, Object>> statisticRecords() {
        return costDao.statisticRecords();
    }

    @Override
    public String updateCost(CostRecord costRecord) {
        return costDao.updateRecord(costRecord);
    }

    @Override
    public String insertCosts(List<CostRecord> costRecords) {
        return costDao.insertRecords(costRecords);
    }

    private List<CostRecord> mockCostRecords(int length) {
        ArrayList<CostRecord> costRecords = new ArrayList<CostRecord>();
        for (int index = 0; index < length; index++) {
            CostRecord costRecord = new CostRecord();
            costRecord.setCost(RandomUtils.nextDouble());
            costRecord.setService_name(service_names[RandomUtils.nextInt(service_names.length)]);
            costRecords.add(costRecord);
        }
        return costRecords;
    }
}
