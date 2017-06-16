package com.everydots.cost.utils;

import java.io.IOException;

import com.everydots.cost.model.SignInModel;
import com.everydots.cost.model.SignUpModel;
import org.codehaus.jackson.map.ObjectMapper;

/**
 * 数据转换类
 */
public class MapperUtil {

    public static SignInModel mapAsUser(String content) {
        ObjectMapper mapper = new ObjectMapper();
        SignInModel user = null;
        try {
            user = mapper.readValue(content, SignInModel.class);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return user;

    }

    public static SignUpModel mapAsUserModel(String content) {
        ObjectMapper mapper = new ObjectMapper();
        SignUpModel user = null;
        try {
            user = mapper.readValue(content, SignUpModel.class);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return user;
    }


}
