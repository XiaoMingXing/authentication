package com.everydots.cost.service.impl;

import com.everydots.cost.common.Constants;
import com.everydots.cost.dao.UserDao;
import com.everydots.cost.domain.User;
import com.everydots.cost.model.SignInModel;
import com.everydots.cost.model.SignUpModel;
import com.everydots.cost.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    @Qualifier("userDao")
    private UserDao userDao;

    public boolean validateUserPassword(SignInModel signInModel) {
        return isExistingUser(signInModel.getEmail()) && signInModel.getPassword().equals(userDao.getUser(signInModel.getEmail()).getPassword());
    }

    @Override
    public int addUser(SignUpModel signUpModel) {
        if (isExistingUser(signUpModel.getEmail())) {
            return Constants.FAILED;
        }
        User user = new User();
        user.setUsername(signUpModel.getUsername());
        user.setPassword(signUpModel.getPassword());
        user.setEmail(signUpModel.getEmail());
        return userDao.insertUser(user);
    }

    private boolean isExistingUser(String email) {
        return userDao.getUser(email) != null;
    }
}
