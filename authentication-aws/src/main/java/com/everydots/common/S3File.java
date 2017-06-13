package com.everydots.common;

import java.io.File;

public class S3File {
    private String key;
    private File file;

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }

    public S3File withKey(String key) {
        this.key = key;
        return this;
    }

    public S3File withFile(File file) {
        this.file = file;
        return this;
    }
}
