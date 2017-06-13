package com.everydots.cloud.aws;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.ClasspathPropertiesFileCredentialsProvider;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.autoscaling.AmazonAutoScalingClient;
import com.amazonaws.services.autoscaling.model.*;
import com.amazonaws.services.ec2.AmazonEC2;
import com.amazonaws.services.ec2.AmazonEC2Client;
import com.amazonaws.services.ec2.model.*;
import com.amazonaws.services.ec2.model.Filter;
import com.amazonaws.services.ec2.model.Instance;
import com.everydots.cloud.utils.FileUtils;
import com.everydots.common.Constants;
import com.everydots.common.Messages;
import com.everydots.enums.ImageType;
import com.google.common.base.Function;
import com.google.common.base.Predicate;
import com.google.common.collect.Lists;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.google.common.collect.FluentIterable.from;

/*
* use this class to clean instances
* */
public class EC2Client {

    public static final String CREDENTIAL_PROFILE = "awsCredentials.properties";
    public static final Log LOGGER = LogFactory.getLog(EC2Client.class);
    public static final String DEFAULT_VPC_SECURITY_GROUP = "webserver";
    public static final String AUTO_SCALING_GROUP_NAME = "testAutoScaling";
    public static final String LAUNCH_CONFIGURATION_NAME = "SiyuTest";
    public static final String SUBNET_ZONE_IDENTIFIER = "subnet-6eef9844";
    public static final int CAPACITY = 1;
    public static final String INSTANCEID = "i-0075fe32decd478a0";

    private AmazonEC2 instance = null;
    private AmazonAutoScalingClient autoScalingClient = null;

    private AmazonEC2 getAmazonEC2Client() {
        if (instance == null) {
            instance = new AmazonEC2Client(new ClasspathPropertiesFileCredentialsProvider());
            instance.setRegion(Region.getRegion(Regions.US_EAST_1));
        }
        return instance;
    }

    public void setInstance(AmazonEC2 instance) {
        this.instance = instance;
    }

    public List<Instance> describeInstances() {
        return from(getAmazonEC2Client().describeInstances().getReservations())
                .toMap(new Function<Reservation, Instance>() {
                    @Override
                    public Instance apply(Reservation reservation) {
                        return reservation.getInstances().get(0);
                    }
                }).values().asList();
    }

    public List<Instance> describeActiveInstances() {
        return from(describeInstances()).filter(new Predicate<Instance>() {
            @Override
            public boolean apply(Instance instance) {
                return "running".equals(instance.getState().getName());
            }
        }).toList();
    }

    public List<InstanceStateChange> terminateInstances() {
        TerminateInstancesResult terminateInstancesResult = getAmazonEC2Client()
                .terminateInstances(new TerminateInstancesRequest()
                        .withInstanceIds(from(describeActiveInstances())
                                .toMap(new Function<Instance, String>() {
                                    @Override
                                    public String apply(Instance instance) {
                                        return instance.getInstanceId();
                                    }
                                }).values()));
        return terminateInstancesResult.getTerminatingInstances();
    }

    public Reservation createFreeTierInstance() {
        RunInstancesRequest runInstancesRequest = new RunInstancesRequest();
        runInstancesRequest.setInstanceType(InstanceType.T2Micro);
        runInstancesRequest.setImageId(ImageType.Ubuntu_Virgnia.getImageId());
        runInstancesRequest.setSecurityGroupIds(describeSecurityGroup(Constants.SECURITY_GROUP_NAME));
        runInstancesRequest.setKeyName(getKeyPairName());
        runInstancesRequest.setMaxCount(Constants.INSTANCE_COUNT);
        runInstancesRequest.setMinCount(1);
        runInstancesRequest.setSubnetId(getDefaultSubnetId());
        RunInstancesResult runInstancesResult = getAmazonEC2Client().runInstances(runInstancesRequest);
        return runInstancesResult.getReservation();
    }

    private String getKeyPairName() {
        List<KeyPairInfo> keyPairs = getExistingKeyPair();
        if (CollectionUtils.isEmpty(keyPairs)) {
            KeyPair keyPair = getAmazonEC2Client()
                    .createKeyPair(new CreateKeyPairRequest().withKeyName(Constants.KEY_NAME)).getKeyPair();
            String keyMaterial = keyPair.getKeyMaterial();
            FileUtils.saveKeyPairFile(keyMaterial);
        }
        return Constants.KEY_NAME;
    }

    private List<KeyPairInfo> getExistingKeyPair() {
        try {
            return getAmazonEC2Client()
                    .describeKeyPairs(new DescribeKeyPairsRequest().withKeyNames(Constants.KEY_NAME)).getKeyPairs();
        } catch (AmazonServiceException serviceException) {
            LOGGER.error("key pair not exist", serviceException);
            return new ArrayList<KeyPairInfo>();
        }
    }

    private String getDefaultSubnetId() {
        return describeDefaultSubnet().getSubnetId();
    }

    public String getSecurityGroup(String securityGroupName) {
        return describeSecurityGroup(securityGroupName).get(0);
    }

    public List<String> describeSecurityGroup(final String securityGroupName) {
        String groupId;
        List<SecurityGroup> securityGroups = securityGroupExist(securityGroupName);
        if (CollectionUtils.isEmpty(securityGroups)) {
            CreateSecurityGroupResult securityGroup = createNewSecurityGroup(securityGroupName);
            authorizeSecurityGroup(securityGroup.getGroupId());
            groupId = securityGroup.getGroupId();
        } else {
            groupId = securityGroups.get(0).getGroupId();
        }

        return Arrays.asList(groupId);
    }

    private CreateSecurityGroupResult createNewSecurityGroup(String securityGroupName) {
        CreateSecurityGroupResult securityGroup = getAmazonEC2Client()
                .createSecurityGroup(new CreateSecurityGroupRequest()
                        .withGroupName(securityGroupName)
                        .withVpcId(getDefaultVpcId())
                        .withDescription(Messages.SECURITY_GROUP_FOR_SDK_EC2));
        return securityGroup;
    }

    private void authorizeSecurityGroup(String groupId) {
        IpPermission ipPermission = new IpPermission()
                .withIpRanges("0.0.0.0/0")
                .withIpProtocol("tcp")
                .withFromPort(22)
                .withToPort(22);
        getAmazonEC2Client()
                .authorizeSecurityGroupIngress(new AuthorizeSecurityGroupIngressRequest()
                        .withIpPermissions(ipPermission)
                        .withGroupId(groupId));
        getAmazonEC2Client()
                .authorizeSecurityGroupEgress(new AuthorizeSecurityGroupEgressRequest()
                        .withIpPermissions(ipPermission)
                        .withGroupId(groupId));
    }

    private String getDefaultVpcId() {
        return describeDefaultVpc().getVpcId();
    }

    private Vpc describeDefaultVpc() {
        DescribeVpcsResult describeVpcsResult = getAmazonEC2Client()
                .describeVpcs(new DescribeVpcsRequest()
                        .withFilters(new Filter().withName("isDefault")
                                .withName("state")
                                .withValues("available")));
        return describeVpcsResult.getVpcs().get(0);
    }

    private Subnet describeDefaultSubnet() {
        DescribeSubnetsResult describeSubnetsResult = getAmazonEC2Client().describeSubnets(new DescribeSubnetsRequest()
                .withFilters(new Filter()
                        .withName("vpc-id")
                        .withValues(getDefaultVpcId())));
        return describeSubnetsResult.getSubnets().get(0);
    }

    private List<Subnet> describeDefaultSubnets() {
        DescribeSubnetsResult describeSubnetsResult = getAmazonEC2Client().describeSubnets(new DescribeSubnetsRequest()
                .withFilters(new Filter()
                        .withName("vpc-id")
                        .withValues(getDefaultVpcId())));
        return describeSubnetsResult.getSubnets();
    }

    private List<SecurityGroup> securityGroupExist(String securityGroupName) {
        try {
            return getAmazonEC2Client()
                    .describeSecurityGroups(new DescribeSecurityGroupsRequest()
                            .withGroupNames(securityGroupName)
                            .withFilters(new Filter().withName("vpc-id")
                                    .withValues(getDefaultVpcId())))
                    .getSecurityGroups();
        } catch (AmazonServiceException serviceException) {
            LOGGER.error("security group not exist", serviceException);
            return new ArrayList<SecurityGroup>();
        }
    }

    public List<String> describeDefaultSubnetIds() {
        List<Subnet> subnets = describeDefaultSubnets();
        return from(subnets).toMap(new Function<Subnet, String>() {
            @Override
            public String apply(Subnet subnet) {
                return subnet.getSubnetId();
            }
        }).values().asList();

        /*try {
            Properties properties = PropertiesLoaderUtils.loadProperties(new ClassPathResource(
                    this.getClass().getResource(CREDENTIAL_PROFILE).getPath()));
        } catch (Exception e) {
            e.printStackTrace();
        }*/
    }

    private AmazonAutoScalingClient getAmazonAutoScalingClient() {
        if (autoScalingClient == null) {
            autoScalingClient = new AmazonAutoScalingClient(new ClasspathPropertiesFileCredentialsProvider());
        }
        return autoScalingClient;
    }


    public void runInstance() {
        RunInstancesRequest runInstancesRequest = new RunInstancesRequest()
                .withImageId("ami-d56a96b8")
                .withMinCount(1)
                .withMaxCount(1);
        getAmazonEC2Client().runInstances(runInstancesRequest);
    }

    public List<InstanceStateChange> startInstance() {
        StartInstancesRequest startInstancesRequest = new StartInstancesRequest()
                .withInstanceIds(INSTANCEID);
        getAmazonEC2Client().startInstances(startInstancesRequest);
        StartInstancesResult startInstancesResult = new StartInstancesResult();
        return startInstancesResult.getStartingInstances();
    }

    public void createAutoScalingGroup() {
        CreateAutoScalingGroupRequest createAutoScalingGroupRequest = new CreateAutoScalingGroupRequest()
                .withAutoScalingGroupName(AUTO_SCALING_GROUP_NAME)
                        // .withLaunchConfigurationName(LAUNCH_CONFIGURATION_NAME)
                .withInstanceId(INSTANCEID)
                .withVPCZoneIdentifier(SUBNET_ZONE_IDENTIFIER)
                .withDesiredCapacity(CAPACITY)
                .withMaxSize(CAPACITY)
                .withMinSize(CAPACITY);
        getAmazonAutoScalingClient().createAutoScalingGroup(createAutoScalingGroupRequest);

    }

    public void deleteAutoScalingGroup() {
        DeleteAutoScalingGroupRequest deleteAutoScalingGroupRequest = new DeleteAutoScalingGroupRequest()
                .withAutoScalingGroupName(AUTO_SCALING_GROUP_NAME)
                .withForceDelete(Boolean.TRUE);
        getAmazonAutoScalingClient().deleteAutoScalingGroup(deleteAutoScalingGroupRequest);
    }

    public void createLaunchConfiguration(String launchConfigurationName) {
        CreateLaunchConfigurationRequest createLaunchConfigurationRequest = new CreateLaunchConfigurationRequest()
                .withLaunchConfigurationName(launchConfigurationName)
                .withImageId(ImageType.Ubuntu_Virgnia.getImageId())
                .withInstanceType(InstanceType.T2Micro.toString());
        getAmazonAutoScalingClient().createLaunchConfiguration(createLaunchConfigurationRequest);
    }

    public void deleteLaunchConfiguration(String launchConfigurationName) {
        DeleteLaunchConfigurationRequest deleteLaunchConfigurationRequest = new DeleteLaunchConfigurationRequest()
                .withLaunchConfigurationName(launchConfigurationName);
        getAmazonAutoScalingClient().deleteLaunchConfiguration(deleteLaunchConfigurationRequest);

    }

    public boolean noAutoScalingGroup() {
        DescribeAutoScalingGroupsResult scalingGroupsResult = getAmazonAutoScalingClient()
                .describeAutoScalingGroups(new DescribeAutoScalingGroupsRequest()
                        .withAutoScalingGroupNames(AUTO_SCALING_GROUP_NAME));
        AutoScalingGroup autoScalingGroup = scalingGroupsResult.getAutoScalingGroups().get(0);
        return CollectionUtils.isEmpty(scalingGroupsResult.getAutoScalingGroups());
    }

    public AutoScalingGroup getAutoScalingGroup() {
        DescribeAutoScalingGroupsResult scalingGroupsResult = getAmazonAutoScalingClient()
                .describeAutoScalingGroups(new DescribeAutoScalingGroupsRequest()
                        .withAutoScalingGroupNames(AUTO_SCALING_GROUP_NAME));
        if (CollectionUtils.isEmpty(scalingGroupsResult.getAutoScalingGroups())) {
            createAutoScalingGroup();
        }
        return from(scalingGroupsResult.getAutoScalingGroups()).firstMatch(new Predicate<AutoScalingGroup>() {
            @Override
            public boolean apply(AutoScalingGroup autoScalingGroup) {
                return autoScalingGroup.getAutoScalingGroupName().equals(AUTO_SCALING_GROUP_NAME);
            }
        }).orNull();
    }

    public TerminateInstanceInAutoScalingGroupResult terminateInstanceInAutoScalingGroup(String instanceId) {
        TerminateInstanceInAutoScalingGroupRequest terminateInstanceInAutoScalingGroupRequest
                = new TerminateInstanceInAutoScalingGroupRequest()
                .withShouldDecrementDesiredCapacity(Boolean.FALSE)
                .withInstanceId(instanceId);
        return getAmazonAutoScalingClient()
                .terminateInstanceInAutoScalingGroup(terminateInstanceInAutoScalingGroupRequest);
    }

    public void stopInstances(String[] instanceIds) {
        StopInstancesRequest stopInstancesRequest = new StopInstancesRequest();
        stopInstancesRequest.setInstanceIds(Lists.newArrayList(instanceIds));
        getAmazonEC2Client().stopInstances(stopInstancesRequest);
    }
}
