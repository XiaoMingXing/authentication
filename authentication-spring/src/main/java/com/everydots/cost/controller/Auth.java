package com.everydots.cost.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.everydots.cost.model.SignInModel;
import com.everydots.cost.model.SignUpModel;
import com.everydots.cost.service.UserService;
import com.everydots.cost.utils.MapperUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("auth")
public class Auth {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "login", method = RequestMethod.POST)
    public
    @ResponseBody
    Object login(@RequestBody String content) throws Exception {
        SignInModel signInModel = MapperUtil.mapAsUser(content);
        return userService.validateUserPassword(signInModel);
    }

    @RequestMapping(value = "register", method = RequestMethod.POST)
    public
    @ResponseBody
    Object register(@RequestBody String content) throws Exception {
        SignUpModel signUpModel = MapperUtil.mapAsUserModel(content);
        return userService.addUser(signUpModel);
    }

    @RequestMapping("test")
    public void test(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("success cros!!");
    }
}
