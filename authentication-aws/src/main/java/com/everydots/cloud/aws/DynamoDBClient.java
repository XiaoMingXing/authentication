package com.everydots.cloud.aws;

import com.amazonaws.auth.ClasspathPropertiesFileCredentialsProvider;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.autoscaling.AmazonAutoScalingClient;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;

public class DynamoDBClient {

    private AmazonDynamoDBClient instance = null;

    private AmazonDynamoDBClient getAmazonEC2Client() {
        if (instance == null) {
            instance = new AmazonDynamoDBClient(new ClasspathPropertiesFileCredentialsProvider());
            instance.setRegion(Region.getRegion(Regions.US_EAST_1));
        }
        return instance;
    }

}
