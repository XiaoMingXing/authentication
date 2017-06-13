package com.everydots.enums;

public enum ImageType {
    Ubuntu_Singapore("ami-25c00c46"), Ubuntu_Virgnia("ami-fce3c696");

    private String imageId;

    ImageType(String imageId) {
        this.imageId = imageId;
    }

    public String getImageId() {
        return imageId;
    }

    public void setImageId(String imageId) {
        this.imageId = imageId;
    }
}
