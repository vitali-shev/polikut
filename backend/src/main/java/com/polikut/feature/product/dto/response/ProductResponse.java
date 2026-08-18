package com.polikut.feature.product.dto.response;

import com.polikut.feature.product.entity.ProductSpec;

import java.util.List;

public record ProductResponse(
        Long id,
        String title,
        String description,
        List<ProductSpec> specifications,
        List<String> benefits,
        int originalPrice,
        int discountPercent,
        int currentPrice,
        boolean isNew,
        String sku,
        String thumbnailUrl,
        List<ProductImageResponse> images) {
}
