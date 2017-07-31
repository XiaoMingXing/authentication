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
        List<Tuple2> list = csvAnalysisJob.parseData(this.getClass().getClassLoader().getResource(csvFile).getPath(),
                StrategyFactory.getLenoveStrategy());
        list.subList(0, 5).forEach(tuple2 -> System.out.println(tuple2._1().toString() + "  :  " + tuple2._2().toString()));
    }

}