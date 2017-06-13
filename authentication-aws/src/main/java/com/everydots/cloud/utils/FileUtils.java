package com.everydots.cloud.utils;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import com.everydots.common.Constants;

public class FileUtils {
    public static void saveKeyPairFile(String keyMaterial) {
        File file = new File(Constants.MAC_KEY_PAIR_PATH + Constants.KEY_NAME + Constants.FILE_SUFFIX);
        try {
            if (!file.exists()) {
                file.createNewFile();
            }
            FileWriter fileWriter = new FileWriter(file.getName(), true);
            BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);
            bufferedWriter.write(keyMaterial);
            bufferedWriter.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
