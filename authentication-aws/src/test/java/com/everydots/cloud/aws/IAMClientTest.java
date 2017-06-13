package com.everydots.cloud.aws;

import com.amazonaws.auth.*;
import com.amazonaws.services.identitymanagement.AmazonIdentityManagementClient;
import com.amazonaws.services.identitymanagement.model.AccessKey;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.internal.Constants;
import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.securitytoken.model.AssumeRoleResult;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import java.util.List;
import java.util.Properties;

import static com.everydots.common.Constants.ROLE_ARN;

/**
 * Created by mxxiao on 6/15/16.
 */
public class IAMClientTest {

    IAMClient iamClient;
    @Mock
    private AmazonIdentityManagementClient instance;

    @Before
    public void setUp() throws Exception {

        iamClient = new IAMClient();

        iamClient.setInstance(instance);
    }

    @Test
    public void shouldCreateIAM() throws Exception {
        AccessKey IAM = iamClient.createIAM();
        System.out.println("accessKey: " + IAM.getAccessKeyId() + "secretKey: " + IAM.getSecretAccessKey());
    }

    @Test
    public void shouldWriteProperties() throws Exception {
        Properties IAM = iamClient.writeCredentials();
        System.out.println("accessKey: " + IAM.getProperty("accessKey") + '\n' + "secretKey: " + IAM.getProperty("secretKey"));
    }

    @Test
    public void destroyIAM() throws Exception {
        iamClient.destroyIAM();
    }

    @Test
    public void testSuccessAssumeRole() throws Exception {
        BasicSessionCredentials sessionCredentials = iamClient.assumeRole(ROLE_ARN);
        AmazonS3Client s3Client = new AmazonS3Client(sessionCredentials);
        List<Bucket> buckets = s3Client.listBuckets();
        buckets.forEach(bucket -> System.out.println(bucket.getName()));
    }
}