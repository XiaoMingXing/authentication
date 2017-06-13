package com.everydots.cloud.aws;

import com.amazonaws.services.rds.AmazonRDSClient;
import com.amazonaws.services.rds.model.DBInstance;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

/**
 * Created by mxxiao on 6/18/16.
 */
public class RDSClientTest {

    /*private RDSClient rdsClient;
    @Mock
    private AmazonRDSClient instance;

    @Before
    public void setUp() throws Exception {
        rdsClient.setInstance(instance);

    }

    @Test
    public void shouldLaunchFreeTierRDS() throws Exception {
        DBInstance freeTierDB = rdsClient.launchFreeTierDB();
        System.out.println(freeTierDB.getDBName());
    }

    @Test
    public void shouldDisplayRDSInstanceId() throws Exception {
        DBInstance dbInstance = rdsClient.describeRDSInstance();
        String dbInstanceIdentifier = dbInstance
                .getDBInstanceIdentifier();
        String dbiResourceId = dbInstance.getDbiResourceId();
        System.out.println(dbInstanceIdentifier);
        System.out.println(dbiResourceId);
    }*/
}