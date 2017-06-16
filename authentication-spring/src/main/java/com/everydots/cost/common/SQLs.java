package com.everydots.cost.common;

public class SQLs {
    public static final String CREATE_COST_TABLE_SQL =
            "create table cost_services (id VARCHAR(32) ,service_name VARCHAR(100) ,cost DOUBLE)";
    public static final String INSERT_COST_SQL = "insert into cost_services values(?,?,?)";
    public static final String SELECT_COST_BY_NAME_SQL = "select * from cost_services where service_name=?";
    public static final String UPDATE_COST_BY_NAME = "update set cost=? where service_name=?";
    public static final String STATISTIC_SERVICE_COST_SQL = "select id,service_name,sum(cost) cost from cost_services group by service_name order by cost desc";

    public static final String QUERY_USER = "select * from user where username = ?";
    public static final String CREATE_USER_SQL = "create table user(id VARCHAR(32) ,username VARCHAR(100) ,password VARCHAR(100), email VARCHAR(32))";
    public static final String INSERT_USER_SQL = "insert into user values(?,?,?,?)";

}
