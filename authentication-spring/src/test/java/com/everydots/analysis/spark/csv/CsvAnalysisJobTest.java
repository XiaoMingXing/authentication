package com.everydots.analysis.spark.csv;

import org.junit.Test;

import java.util.List;

/**
 * Created by mxxiao on 7/31/17.
 */
public class CsvAnalysisJobTest {

    @Test
    public void parseDataWithCSV() throws Exception {
        CsvAnalysisJob csvAnalysisJob = new CsvAnalysisJob();
        String csvFile = "reports/BasicReport_20170718_034034_66359.csv";
        List<RepairRecord> list = csvAnalysisJob
                .parseData(this.getClass().getClassLoader().getResource(csvFile).getPath(),
                        StrategyFactory.getLenoveStrategy());
        List<KeyValueRecord> nRepairMobiles = csvAnalysisJob.topNRepairMobiles(list, -1);
        nRepairMobiles
                .stream()
                .forEach(nRepairMobile -> System.out.println(nRepairMobile.getKey() + ":" + nRepairMobile.getNumericValue()));
    }


    @Test
    public void testStationTimeLineData() throws Exception {
        CsvAnalysisJob csvAnalysisJob = new CsvAnalysisJob();
        String csvFile = "reports/all_in_one.csv";
        List<RepairRecord> list = csvAnalysisJob
                .parseData(this.getClass().getClassLoader().getResource(csvFile).getPath(),
                        StrategyFactory.getLenoveStrategy());
        SearchCondition searchCondition = new SearchCondition();
        String productModel = "K50a40";
        searchCondition.setProductModel(productModel);
        String problemCode = "RF Performance";
        searchCondition.setProblemCode(problemCode);
        //searchCondition.setProductModel("A1000");

        List<KeyValueRecord> nRepairMobiles = csvAnalysisJob.repairStationTimeLine(list, searchCondition);
        for (int index = 0; index < nRepairMobiles.size(); index++) {
            KeyValueRecord nRepairMobile = nRepairMobiles.get(index);
            System.out.println(" { name: '" + nRepairMobile.getKey() + "','" +
                    problemCode + "':" + nRepairMobile.getNumericValue() + "},");
        }
    }

    @Test
    public void testRepairProblemCode() throws Exception {
        CsvAnalysisJob csvAnalysisJob = new CsvAnalysisJob();
        String csvFile = "reports/all_in_one.csv";
        //String csvFile = "reports/BasicReport_20170718_034034_66359.csv";
        List<RepairRecord> list = csvAnalysisJob
                .parseData(this.getClass().getClassLoader().getResource(csvFile).getPath(),
                        StrategyFactory.getLenoveStrategy());
        String[] problemCode = {"Software", "Charging", "Touch Screen"};
        List<KeyValueRecord> nRepairMobiles = csvAnalysisJob.stationRepairTime(list, problemCode[1]);
        for (int index = 0; index < nRepairMobiles.size(); index++) {
            KeyValueRecord nRepairMobile = nRepairMobiles.get(index);
            System.out.println(" { name: '" + nRepairMobile.getKey() + "天','" +
                    problemCode[1] + "':" + Converters.count(nRepairMobile.getStringValue()) + "},");
        }
    }
}