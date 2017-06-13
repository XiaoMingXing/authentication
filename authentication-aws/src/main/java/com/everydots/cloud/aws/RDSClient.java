package com.everydots.cloud.aws;

import com.amazonaws.auth.ClasspathPropertiesFileCredentialsProvider;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.rds.AmazonRDSClient;
import com.amazonaws.services.rds.model.CreateDBInstanceRequest;
import com.amazonaws.services.rds.model.DBInstance;
import com.amazonaws.services.rds.model.DescribeDBInstancesRequest;
import com.amazonaws.services.rds.model.DescribeDBInstancesResult;

public class RDSClient {

    public static final String DB_NAME = "demo";
    public static final String DB_NAME_ID = "demodb";
    private static final String DB_INSTANCE_TYPE = "db.t2.micro";
    private static final String DB_ENGINE = "MySQL";
    public static final String MASTER_USERNAME = "root";
    public static final String MASTER_PASSWORD = "xiaomixin";

    private AmazonRDSClient instance = null;

    private AmazonRDSClient getRDSClient() {
        if (instance == null) {
            instance = new AmazonRDSClient(new ClasspathPropertiesFileCredentialsProvider());
            instance.setRegion(Region.getRegion(Regions.US_EAST_1));
        }
        return instance;
    }

    public void setInstance(AmazonRDSClient instance) {
        this.instance = instance;
    }

    public DBInstance launchFreeTierDB() {
        EC2Client ec2Client = new EC2Client();
        CreateDBInstanceRequest dbInstanceRequest =
                new CreateDBInstanceRequest()
                        .withDBName(DB_NAME)
                        .withDBInstanceClass(DB_INSTANCE_TYPE)
                        .withEngine(DB_ENGINE)
                        .withDBInstanceIdentifier(DB_NAME_ID)
                        .withMasterUsername(MASTER_USERNAME)
                        .withMasterUserPassword(MASTER_PASSWORD)
                        .withAllocatedStorage(5)
                        .withVpcSecurityGroupIds(ec2Client
                                .getSecurityGroup(EC2Client.DEFAULT_VPC_SECURITY_GROUP));
        DBInstance dbInstance = getRDSClient().createDBInstance(dbInstanceRequest);
        return dbInstance;
    }


    public DBInstance describeRDSInstance() {
        DescribeDBInstancesRequest describeDBInstancesRequest =
                new DescribeDBInstancesRequest()
                        .withDBInstanceIdentifier(DB_NAME_ID);
        try {
            DescribeDBInstancesResult describeDBInstancesResult =
                    getRDSClient().describeDBInstances(describeDBInstancesRequest);
            return describeDBInstancesResult.getDBInstances().get(0);
        } catch (Exception e) {
            return null;
        }
    }

}
