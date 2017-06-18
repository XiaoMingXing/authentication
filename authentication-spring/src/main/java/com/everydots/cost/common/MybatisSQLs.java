package com.everydots.cost.common;

public class MybatisSQLs {

    public static final String QUERY_USER = "select * from user where email=#{email}";
    public static final String INSERT_USER_SQL = "insert into user values(#{id},#{username},#{password},#{email})";
}
