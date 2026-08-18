package com.polikut.feature.product.dto.response;

public record ProductCardResponse(
        Long id,
        String title,
        int originalPrice,
        int discountPercent,
        int currentPrice,
        boolean isNew,
        String sku,
        String thumbnailUrl) {
}
