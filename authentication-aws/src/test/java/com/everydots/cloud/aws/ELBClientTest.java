package com.everydots.cloud.aws;

import com.amazonaws.services.elasticloadbalancing.AmazonElasticLoadBalancingClient;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

/**
 * Created by mxxiao on 6/15/16.
 */
public class ELBClientTest {

   /* private ELBClient elbClient = new ELBClient();

    @Mock
    private AmazonElasticLoadBalancingClient amazonElbClient;

    @Before
    public void setUp() throws Exception {
        ELBClient.setInstance(amazonElbClient);
    }

    @Test
    public void shouldCreateELB() throws Exception {
        String loadBalancer = elbClient.createLoadBalancer();
        System.out.println(loadBalancer);
    }

    @Test
    public void shouldDestroyELB() throws Exception {
        String loadBalancer = elbClient.destroyLoadBalancer();
        System.out.print(loadBalancer);
    }*/
}