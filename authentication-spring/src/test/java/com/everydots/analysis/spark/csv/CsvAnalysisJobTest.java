package com.everydots.analysis.spark.csv;

import org.junit.Test;

import java.util.List;
import java.util.function.Consumer;

/**
 * Created by mxxiao on 7/31/17.
 */
public class CsvAnalysisJobTest {

    @Test
    public void parseDataWithCSV() throws Exception {
        CsvAnalysisJob csvAnalysisJob = new CsvAnalysisJob();
        String csvFile = "reports/BasicReport_20170718_034034_66359.csv";
        List list = csvAnalysisJob.parseData(this.getClass().getClassLoader().getResource(csvFile).getPath(),
                StrategyFactory.getLenoveStrategy());
        list.forEach(o -> {
            System.out.println(o.toString());
        });
    }

}