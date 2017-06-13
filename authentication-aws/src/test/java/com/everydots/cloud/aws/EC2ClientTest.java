package com.everydots.cloud.aws;

import com.amazonaws.services.ec2.AmazonEC2Client;
import com.amazonaws.services.ec2.model.Instance;
import com.amazonaws.services.ec2.model.InstanceStateChange;
import com.amazonaws.services.ec2.model.Reservation;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

/**
 * Created by mxxiao on 5/27/16.
 */
public class EC2ClientTest {

    /*public static final String LAUNCH_CONFIGURATION_NAME = "SiyuTest";
    private EC2Client ec2Client = new EC2Client();

    @Mock
    private AmazonEC2Client amazonEC2Client;

    @Before
    public void setUp() throws Exception {
        ec2Client.setInstance(amazonEC2Client);
    }

    @Test
    public void shouldDescribeInstances() throws Exception {
        List<Instance> instances = ec2Client.describeInstances();
        assertThat(instances.size(), is(0));
    }

    @Test
    public void shouldRunFreeTierInstance() throws Exception {
        Reservation freeTierInstance = ec2Client.createFreeTierInstance();
        assertThat(freeTierInstance.getInstances().size(), is(1));
        System.out.println(freeTierInstance.getInstances().get(0).getInstanceId());
    }

    @Test
    public void shouldTerminateInstances() throws Exception {
        List<InstanceStateChange> instanceStateChanges = ec2Client.terminateInstances();
        assertThat(instanceStateChanges.size(), is(2));
    }

    @Test
    public void shouldStartInstance() throws Exception {
        //System.out.println(ec2Client.startInstance());

    }

    @Test
    public void shouldCreateLaunchConfiguration() throws Exception {
        ec2Client.createLaunchConfiguration(LAUNCH_CONFIGURATION_NAME);
    }

    @Test
    public void shouldDeleteLaunchConfiguration() throws Exception {
        ec2Client.deleteLaunchConfiguration(LAUNCH_CONFIGURATION_NAME);
    }

    @Test
    public void shouldCreateAutoScalingGroup() throws Exception {
        ec2Client.createAutoScalingGroup();
        List<Instance> instances = ec2Client.describeActiveInstances();
        System.out.println("create instance in autoScalingGroup " + instances.get(0).getInstanceId());
        assertThat(instances.size(), is(1));
    }

    @Test
    public void shouldAutoRunInstance() throws Exception {
        ec2Client.terminateInstanceInAutoScalingGroup("i-0ca4fe8b8c8febf81");

        assertThat(ec2Client.describeActiveInstances().size(), is(1));

        List<Instance> instancesAfterTerminate = ec2Client.describeActiveInstances();
        assertThat(instancesAfterTerminate.size(), is(1));
    }

    @Test
    public void shouldDeleteAutoScalingGroup() throws Exception {
        ec2Client.deleteAutoScalingGroup();
    }*/
}
