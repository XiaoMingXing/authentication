package com.everydots.cloud.service;

import com.amazonaws.services.rds.model.DBInstance;
import com.everydots.cloud.aws.RDSClient;
import com.everydots.cloud.beans.MySqlDataSourceBean;
import org.springframework.stereotype.Service;

@Service
public class RDSService {

    public static final String DRIVER_CLASS_NAME = "com.mysql.jdbc.Driver";
    public RDSClient rdsClient = new RDSClient();

    public MySqlDataSourceBean launchDBInstance() {
        DBInstance dbInstance = rdsClient.launchFreeTierDB();
        return constructDataSourceBean(dbInstance);
    }

    public boolean hasDBInstance() {
        return rdsClient.describeRDSInstance() != null;
    }

    public MySqlDataSourceBean getDataSourceBean() {
        DBInstance dbInstance = rdsClient.describeRDSInstance();
        return constructDataSourceBean(dbInstance);
    }

    private MySqlDataSourceBean constructDataSourceBean(DBInstance dbInstance) {
        MySqlDataSourceBean mySqlDataSourceBean = new MySqlDataSourceBean();
        mySqlDataSourceBean.setUsername(RDSClient.MASTER_USERNAME);
        mySqlDataSourceBean.setPassword(RDSClient.MASTER_PASSWORD);
        mySqlDataSourceBean.setDriverClassName(DRIVER_CLASS_NAME);
        mySqlDataSourceBean.setUrl("jdbc:mysql://" +
                dbInstance.getEndpoint().getAddress() + ":" + dbInstance.getEndpoint().getPort() + "/" +
                dbInstance.getDBInstanceIdentifier());
        return mySqlDataSourceBean;
    }
}
