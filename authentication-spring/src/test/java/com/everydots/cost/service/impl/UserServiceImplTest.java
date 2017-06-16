package com.everydots.cost.service.impl;

import com.everydots.cost.dao.UserDao;
import com.everydots.cost.domain.User;
import com.everydots.cost.model.SignInModel;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.BDDMockito.given;
import static org.mockito.Matchers.anyString;


@RunWith(MockitoJUnitRunner.class)
public class UserServiceImplTest {

    @Mock
    private UserDao userDao;

    @InjectMocks
    private UserServiceImpl userService = new UserServiceImpl();

    @Test
    public void shouldReturnFalseWhenUserNotExist() throws Exception {
        //given
        given(userDao.getUser(anyString())).willReturn(null);
        //when
        SignInModel signInModel = new SignInModel();
        boolean isValid = this.userService.validateUserPassword(signInModel);
        assertFalse(isValid);
    }

    @Test
    public void shouldReturnFalseWhenUserExistAndPasswordIncorrect() throws Exception {
        //given
        User user = new User();
        user.setPassword("aaa");
        given(userDao.getUser(anyString())).willReturn(user);
        //when
        SignInModel signInModel = new SignInModel();
        signInModel.setPassword("bbb");
        boolean isValid = this.userService.validateUserPassword(signInModel);
        assertFalse(isValid);
    }

    @Test
    public void shouldReturnTrueWhenUserExistAndPasswordCorrect() throws Exception {

        //given
        User user = new User();
        user.setPassword("aaa");
        given(userDao.getUser(anyString())).willReturn(user);
        //when
        SignInModel signInModel = new SignInModel();
        signInModel.setPassword("aaa");
        boolean isValid = this.userService.validateUserPassword(signInModel);
        assertTrue(isValid);
    }
}