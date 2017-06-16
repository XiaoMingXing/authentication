package com.everydots.cost.dao;

import com.everydots.cost.common.MybatisSQLs;
import com.everydots.cost.domain.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

public interface UserDao {

    @Insert(MybatisSQLs.INSERT_USER_SQL)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    public int insertUser(User user);

    @Select(MybatisSQLs.QUERY_USER)
    public User getUser(String email);
}
