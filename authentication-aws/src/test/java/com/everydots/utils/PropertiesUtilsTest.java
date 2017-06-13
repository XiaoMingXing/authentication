package com.everydots.utils;

import org.junit.Test;

/**
 * Created by mxxiao on 7/4/16.
 */
public class PropertiesUtilsTest {

    @Test
    public void testWritePropertiesFiles() throws Exception {
        PropertiesUtils.writeProperty("bucketName", "testaaaaaa");
    }

    @Test
    public void testReadProperties() throws Exception {
        String bucketName = PropertiesUtils.getProperty("bucketName");
        System.out.println(bucketName);
    }
}