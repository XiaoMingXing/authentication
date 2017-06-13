package com.everydots.cloud.aws;

import com.amazonaws.auth.ClasspathPropertiesFileCredentialsProvider;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.ec2.model.InstanceType;
import com.amazonaws.services.elasticmapreduce.AmazonElasticMapReduceClient;
import com.amazonaws.services.elasticmapreduce.model.AddInstanceGroupsRequest;
import com.amazonaws.services.elasticmapreduce.model.InstanceGroupConfig;

public class EMRClient {

    private AmazonElasticMapReduceClient instance = null;

    public AmazonElasticMapReduceClient getEMRClient() {
        if (instance == null) {
            instance = new AmazonElasticMapReduceClient(new ClasspathPropertiesFileCredentialsProvider());
            instance.setRegion(Region.getRegion(Regions.US_EAST_1));
        }
        return instance;
    }


    public void createEMRCluster() {
        AddInstanceGroupsRequest addInstanceGroupsRequest = new AddInstanceGroupsRequest()
                .withInstanceGroups(new InstanceGroupConfig()
                        .withInstanceType(InstanceType.T1Micro.toString())
                        .withInstanceCount(2)
                       );
        getEMRClient().addInstanceGroups(addInstanceGroupsRequest);
    }
}
