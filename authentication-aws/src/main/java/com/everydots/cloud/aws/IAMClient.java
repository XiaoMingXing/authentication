package com.everydots.cloud.aws;

import com.amazonaws.services.identitymanagement.AmazonIdentityManagementClient;
import com.amazonaws.services.identitymanagement.model.*;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Properties;

public class IAMClient {
    public static final String IAMUSER = "Test";
    public static final String ACCESSKEY = "accessKey";
    public static final String SECRETKEY = "secretKey";
    public static final String PROPERTIES = "src/main/resources/awsCredentials.properties";
    public static final String CREDENTIAL_PROFILE = "awsCredentials.properties";
    public static final String POLICY = "arn:aws:iam::aws:policy/AdministratorAccess";

    public static AmazonIdentityManagementClient instance = null;
    Properties prop = new Properties();

    public static void setInstance(AmazonIdentityManagementClient instance) {
        IAMClient.instance = instance;
    }

    public Properties writeCredentials() throws IOException {

        OutputStream output = new FileOutputStream(PROPERTIES);

        AccessKey IAM = createIAM();
        String accessKey = IAM.getAccessKeyId();
        String secretKey = IAM.getSecretAccessKey();

        prop.setProperty(ACCESSKEY, accessKey);
        prop.setProperty(SECRETKEY, secretKey);
        prop.store(output, null);
        return prop;
    }

    private AmazonIdentityManagementClient getIAMClient() {
        if (instance == null) {
            instance = new AmazonIdentityManagementClient();
        }
        return instance;
    }

    public AccessKey createIAM() {
        String userName = createUser();
        AttachUserPolicyRequest attachUserPolicyRequest = new AttachUserPolicyRequest()
                .withPolicyArn(POLICY)
                .withUserName(userName);
        getIAMClient().attachUserPolicy(attachUserPolicyRequest);

        CreateAccessKeyRequest createAccessKeyRequest = new CreateAccessKeyRequest()
                .withUserName(userName);
        CreateAccessKeyResult accessKey = getIAMClient().createAccessKey(createAccessKeyRequest);
        return accessKey.getAccessKey();
    }

    public void destroyIAM() throws IOException {
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream(CREDENTIAL_PROFILE);
        prop.load(inputStream);
        DeleteAccessKeyRequest deleteAccessKeyRequest = new DeleteAccessKeyRequest().withUserName(IAMUSER).withAccessKeyId(prop.getProperty(ACCESSKEY));
        DeleteUserRequest deleteUserRequest = new DeleteUserRequest().withUserName(IAMUSER);
        getIAMClient().deleteAccessKey(deleteAccessKeyRequest);
        getIAMClient().deleteUser(deleteUserRequest);

    }

    private String createUser() {
        CreateUserRequest createUserRequest = new CreateUserRequest()
                .withUserName(IAMUSER);
        CreateUserResult createUserResult = getIAMClient().createUser(createUserRequest);
        return createUserResult.getUser().getUserName();
    }
}
