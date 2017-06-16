package com.everydots.cost.service;

import com.everydots.cost.exception.ExistingException;
import com.everydots.cost.model.SignInModel;
import com.everydots.cost.model.SignUpModel;

/**
 * Created by xiaomingxing on 16/8/3.
 */
public interface UserService {

    boolean validateUserPassword(SignInModel user);

    int addUser(SignUpModel signUpModel) throws ExistingException;
}
