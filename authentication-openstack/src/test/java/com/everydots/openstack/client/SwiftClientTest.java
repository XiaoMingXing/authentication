package com.everydots.openstack.client;

import static org.junit.Assert.*;

/**
 * Created by xiaomingxing on 17/6/14.
 */
public class SwiftClientTest {

    @org.junit.Test
    public void testUploadFile() throws Exception {

        SwiftClient swiftClient = new SwiftClient();

        swiftClient.uploadFileToSwift();

        swiftClient.retrieveFiles();
    }
}