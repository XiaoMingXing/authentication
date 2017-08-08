package com.everydots.analysis.spark.csv.library;

import com.everydots.analysis.spark.enums.Project;
import org.junit.Test;

/**
 * Created by mxxiao on 8/8/17.
 */
public class AnalysisTest {


    private final Analysis analysis = new Analysis(Project.LENOVO);

    @Test
    public void process() throws Exception {
        analysis.process();
    }

    @Test
    public void test() throws Exception {
        analysis.process();
        //analysis.count();
        //analysis.checkMetadata();
        analysis.stationStatistics();
        analysis.getSparkSession().close();
    }

}