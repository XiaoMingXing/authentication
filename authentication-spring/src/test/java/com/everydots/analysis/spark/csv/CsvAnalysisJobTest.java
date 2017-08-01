package com.everydots.analysis.spark.csv;

import org.junit.Test;
import scala.Tuple2;

import java.util.List;

/**
 * Created by mxxiao on 7/31/17.
 */
public class CsvAnalysisJobTest {

    @Test
    public void parseDataWithCSV() throws Exception {
        CsvAnalysisJob csvAnalysisJob = new CsvAnalysisJob();
        String csvFile = "reports/BasicReport_20170718_034034_66359.csv";
        List<SaleRecord> list = csvAnalysisJob
                .parseData(this.getClass().getClassLoader().getResource(csvFile).getPath(),
                        StrategyFactory.getLenoveStrategy());
        List<Tuple2<String, Integer>> nRepairMobiles = csvAnalysisJob.topNRepairMobiles(5, list);
        SaleDao saleDao = new SaleDao();
        saleDao.insertRecords(Converters.convertForSale(nRepairMobiles));
    }

}