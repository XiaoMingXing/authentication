package com.everydots.cost.dao;

import com.everydots.cloud.beans.MySqlDataSourceBean;
import com.everydots.cost.common.SQLs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.ResultSet;
import java.util.Properties;

@Service
public class DataSourceClient {

    public static final String JDBC_CONFIG_FILE = "jdbc.properties";
    public static final String SERVICE_TABLE_NAME = "cost_services";
    public static final String USER_TABLE_NAME = "user";

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public boolean tableInitialized(MySqlDataSourceBean dataSource) throws IOException {
        refreshJdbcConfig(dataSource);
        return isTableExist(SERVICE_TABLE_NAME);
    }

    public void initTable(MySqlDataSourceBean dataSource) {
        if (!isTableExist(SERVICE_TABLE_NAME)) {
            jdbcTemplate.execute(SQLs.CREATE_COST_TABLE_SQL);
        }
        if (!isTableExist(USER_TABLE_NAME)) {
            jdbcTemplate.execute(SQLs.CREATE_USER_SQL);
        }
    }

    private boolean isTableExist(String tableName) {
        try {
            ResultSet resultSet = jdbcTemplate.getDataSource().getConnection()
                    .getMetaData().getTables(null, null, tableName, new String[]{"TABLE"});
            while (resultSet.next()) {
                return true;
            }
        } catch (Exception e) {
            return false;
        }
        return false;
    }

    private void refreshJdbcConfig(MySqlDataSourceBean dataSource) throws IOException {
        FileOutputStream outputStream = null;
        ClassPathResource resource = new ClassPathResource(JDBC_CONFIG_FILE);
        Properties properties =
                PropertiesLoaderUtils.loadProperties(resource);
        properties.setProperty("url", dataSource.getUrl());
        properties.setProperty("username", dataSource.getUsername());
        properties.setProperty("password", dataSource.getPassword());
        outputStream = new FileOutputStream(resource.getPath());
        properties.store(outputStream, null);
        outputStream.close();
    }


}
