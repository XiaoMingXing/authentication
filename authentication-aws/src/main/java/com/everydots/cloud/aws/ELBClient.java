package com.everydots.cloud.aws;

import com.amazonaws.auth.ClasspathPropertiesFileCredentialsProvider;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.elasticloadbalancing.AmazonElasticLoadBalancingClient;
import com.amazonaws.services.elasticloadbalancing.model.*;

public class ELBClient {

    public static final String LOAD_BALANCER_NAME = "demoLoadBalancer";
    public static final String WEBSERVER = "webserver";

    public static AmazonElasticLoadBalancingClient instance = null;

    public AmazonElasticLoadBalancingClient getAmazonELBClient() {
        if (instance == null) {
            instance = new AmazonElasticLoadBalancingClient(new ClasspathPropertiesFileCredentialsProvider());
            instance.setRegion(Region.getRegion(Regions.US_EAST_1));
        }
        return instance;
    }

    public static void setInstance(AmazonElasticLoadBalancingClient instance) {
        ELBClient.instance = instance;
    }

    public String createLoadBalancer() {
        EC2Client ec2Client = new EC2Client();

        CreateLoadBalancerRequest createLoadBalancerRequest =
                new CreateLoadBalancerRequest()
                        .withLoadBalancerName(LOAD_BALANCER_NAME)
                        .withListeners(new Listener()
                                .withProtocol("HTTP")
                                .withInstanceProtocol("HTTP")
                                .withInstancePort(8080)
                                .withLoadBalancerPort(8080))
                        .withSubnets(ec2Client.describeDefaultSubnetIds())
                        .withSecurityGroups(ec2Client.getSecurityGroup(WEBSERVER));
        CreateLoadBalancerResult loadBalancer = getAmazonELBClient()
                .createLoadBalancer(createLoadBalancerRequest);
        return loadBalancer.getDNSName();
    }


    public String destroyLoadBalancer() {
        DeleteLoadBalancerRequest deleteLoadBalancerRequest = new DeleteLoadBalancerRequest()
                .withLoadBalancerName(LOAD_BALANCER_NAME);
        DeleteLoadBalancerResult deleteLoadBalancerResult =
                getAmazonELBClient().deleteLoadBalancer(deleteLoadBalancerRequest);
        return deleteLoadBalancerResult.toString();
    }

}
