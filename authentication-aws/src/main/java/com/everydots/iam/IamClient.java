package com.everydots.iam;

import com.amazonaws.services.securitytoken.AWSSecurityTokenServiceClient;

public class IamClient {


    public void assumeRole(String roleArn) {
        AWSSecurityTokenServiceClient client = new AWSSecurityTokenServiceClient();
    }

}
