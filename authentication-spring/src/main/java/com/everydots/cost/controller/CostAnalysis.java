package com.everydots.cost.controller;

import com.everydots.cost.domain.User;
import com.everydots.cost.service.CostService;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/analysis/services")
public class CostAnalysis {

    @Autowired
    private CostService costService;

    @RequestMapping(method = RequestMethod.GET)
    public
    @ResponseBody
    Object retrieve() throws Exception {
        User user = new User();
        user.setUsername("serverUser");
        user.setPassword("1111");
        return new ObjectMapper().writer().writeValueAsString(user);
    }


    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    Object save(@RequestBody String content) throws Exception {
        System.out.println(content);
        return costService.insertMockRecords();
    }

    @RequestMapping(value = "/statistic", method = RequestMethod.GET)
    public
    @ResponseBody
    Object statistic() throws Exception {
        return costService.statisticRecords();
    }
}
