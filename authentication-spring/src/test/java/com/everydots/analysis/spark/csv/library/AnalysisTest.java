package com.everydots.analysis.spark.csv.library;

import com.everydots.analysis.spark.enums.Project;
import org.junit.Before;
import org.junit.Test;

/**
 * Created by mxxiao on 8/8/17.
 */
public class AnalysisTest {


    private final Analysis analysis = new Analysis(Project.LENOVO);

    @Before
    public void before() throws Exception {
        analysis.setxAxis("StationName");
    }

    @Test
    public void process() throws Exception {
        analysis.process();
    }

    @Test
    public void test() throws Exception {
        analysis.process();
        //analysis.count();
        //analysis.checkMetadata();
        //analysis.stationCommonStatistics("Model", null);
        analysis.stationOpenCase(11);


        analysis.getSparkSession().close();
    }

}