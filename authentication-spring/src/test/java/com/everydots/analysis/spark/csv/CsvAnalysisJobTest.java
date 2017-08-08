package com.everydots.analysis.spark.csv;

import org.bson.types.ObjectId;
import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static com.google.common.collect.Lists.newArrayList;

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
    public void testDataRecords() throws Exception {
        String csvFile = "reports/all_in_one.csv";
        String stationName = "MOBI QUEST";
        String problemCode = "Touch Screen";

        CsvAnalysisJob csvAnalysisJob = new CsvAnalysisJob();
        List<RepairRecord> list = csvAnalysisJob
                .parseData(this.getClass().getClassLoader().getResource(csvFile).getPath(),
                        StrategyFactory.getLenoveStrategy());

        ArrayList<String> soList = newArrayList("SOIN0630301612310009", "SOIN0630301702090025", "SOIN0630301702060037"
                , "SOIN0630301611180005", "SOIN0630301608020091");

        list.stream().forEach(item -> {
            if (soList.contains(item.getSo())
                    && stationName.equals(item.getRepairStation())
                    && problemCode.equals(item.getRepairPart())) {
                System.out.println("ProductModel: " + item.getProduct());
                System.out.println("RepairStation: " + item.getRepairStation());
                System.out.println("ReplacePartName:" + item.getReplacePartName());
                System.out.println("ReplacePartStatus: " + item.getReplacePartStatus());
                System.out.println("PartApplyTime: " + item.getPartApplyTime());
                System.out.println("RepairLevel: " + item.getRepairLevel());
                System.out.println("ReplacementPartNumber: " + item.getReplacePartNumber());
            }
        });
    }

    //6631871,8117091,7991861,4610031,505032
    /*
    * ProductModel: A6020a46
RepairStation: MOBI QUEST
ReplacePartName:A6020a46 TP LCM ASSY GL&*712601000491 CS
ReplacePartStatus:Parts in service center
PartApplyTime:2016-12-31 17:11:10
RepairLevel:L2 (HW replacement exclude Motherboard)
ReplacementPartNumber:1

ProductModel: ZUK-Z1
RepairStation: MOBI QUEST
ReplacePartName:Z1 TP LCM ASSY_BK&*11574679-00 CS
ReplacePartStatus:Parts in service center
PartApplyTime:2016-11-18 19:02:36
RepairLevel:L2 (HW replacement exclude Motherboard)
ReplacementPartNumber:1
*/


    @Test
    public void testStationTimeLineData() throws Exception {
        CsvAnalysisJob csvAnalysisJob = new CsvAnalysisJob();
        String csvFile = "reports/all_in_one.csv";
        List<RepairRecord> list = csvAnalysisJob
                .parseData(this.getClass().getClassLoader().getResource(csvFile).getPath(),
                        StrategyFactory.getLenoveStrategy());
        SearchCondition searchCondition = new SearchCondition();
        String productModel = "K50a40";
        //searchCondition.setProductModel(productModel);
        String problemCode = "Charging";
        searchCondition.setProblemCode(problemCode);
        //searchCondition.setProductModel("A1000");

        List<KeyValueRecord> nRepairMobiles = csvAnalysisJob.repairStationTimeLine(list, searchCondition);
        double sum = 0;
        for (int index = 0; index < nRepairMobiles.size(); index++) {
            KeyValueRecord nRepairMobile = nRepairMobiles.get(index);
            System.out.println(" { name: '" + nRepairMobile.getKey() + "','" +
                    problemCode + "':" + nRepairMobile.getNumericValue() + "},");
            sum += nRepairMobile.getNumericValue();
        }
        System.out.println("Average:" + sum / nRepairMobiles.size());
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


    // Most: { name: 'N.N.Enterprises','RF Performance':47.0},
    // Less: { name: 'MOBILE RESCUE','RF Performance':0.0},
    // Average: 5.98

    // Most: { name: 'Lenovo ESCs','Charging':1.64} >1000
    // Less: { name: 'VINAYAKA COMMUNICATION_SVC','Charging':31.0}
    // Average: 3.95

    // Most: { name: 'Prudent Telecom Services','Touch Screen':0.49}
    // Less: { name: 'MOBI QUEST','Touch Screen':3.85}
    // Average: 2.21


    // Most: { name: 'ESC-SCD','RF Performance':1.77}
    // Less: { name: 'Simran Electronics','RF Performance':5.74}
    // Average: 3.10

    //Most: { name: 'The Cell Point-CPT','Charging':0.05}
    //Less: { name: 'MOBILE CLINIC','Charging':6.55}
    //Average: 2.58


    @Test
    public void testInsertRecords() throws Exception {

        SaleDao saleDao = new SaleDao();
        KeyValueRecord record = new KeyValueRecord();
        record.setKey("demo");
        record.setNumericValue(3);
        saleDao.insertRecords(newArrayList(record));

    }

    @Test
    public void testInertJson() throws Exception {

        SaleDao saleDao = new SaleDao();
        KeyValueRecord record = new KeyValueRecord();
        record.setId(new ObjectId());
        record.setKey("test");
        record.setStringValue("testValue");
        String json = new ObjectMapper().writeValueAsString(record);
        saleDao.insertJson(json);

    }
}