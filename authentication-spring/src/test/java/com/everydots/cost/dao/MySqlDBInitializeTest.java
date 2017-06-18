package com.everydots.cost.dao;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"/spring-config.xml", "/applicationContext.xml"})
public class MySqlDBInitializeTest {

    @Autowired
    private MySqlDBInitialize dbInitialize;

    @Test
    public void shouldCreateRDSandInitDB() throws Exception {
        //dbInitialize.init();
    }
}