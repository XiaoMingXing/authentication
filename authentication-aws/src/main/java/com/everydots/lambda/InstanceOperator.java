package com.everydots.lambda;


import com.amazonaws.services.lambda.runtime.Context;
import com.everydots.cloud.aws.EC2Client;

public class InstanceOperator {

    public void StopInstances(String[] instanceIds, Context context) {
        EC2Client ec2Client = new EC2Client();
        ec2Client.stopInstances(instanceIds);
    }
}
