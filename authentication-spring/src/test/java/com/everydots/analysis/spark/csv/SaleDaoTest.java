package com.everydots.analysis.spark.csv;

import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Created by mxxiao on 8/7/17.
 */
public class SaleDaoTest {

    @Test
    public void testRecordsAmount() throws Exception {
        SaleDao saleDao = new SaleDao();
        long amounts = saleDao.findAmounts();
        System.out.println(amounts);
    }

    @Test
    public void testStationAverageTime() throws Exception {



    }
}