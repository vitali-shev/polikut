package com.polikut.feature.product.enums;

public enum ImageFolder {
    THUMBNAIL("thumbnail"),
    IMAGES("images");

    private final String folderName;

    ImageFolder(String folderName) {
        this.folderName = folderName;
    }

    public String getFolderName() {
        return folderName;
    }
}
