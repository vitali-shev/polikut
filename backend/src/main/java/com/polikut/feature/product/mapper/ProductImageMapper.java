package com.polikut.feature.product.mapper;

import com.polikut.feature.product.dto.response.ProductImageResponse;
import com.polikut.feature.product.entity.ProductImage;
import com.polikut.infrastructure.integration.firebase.FirebaseStorageService;
import org.springframework.stereotype.Component;

@Component
public class ProductImageMapper {

    private final FirebaseStorageService firebaseStorageService;

    public ProductImageMapper(FirebaseStorageService firebaseStorageService) {
        this.firebaseStorageService = firebaseStorageService;
    }

    public ProductImageResponse toProductImageResponse(ProductImage productImage) {
        return new ProductImageResponse(
                productImage.position(),
                firebaseStorageService.buildUrl(productImage.path())
        );
    }

    public String toUrl(String path) {
        return path != null ? firebaseStorageService.buildUrl(path) : null;
    }
}
