package com.polikut.feature.order.dto.response;

public record OrderItemResponse(
        int price,
        int quantity,
        String title,
        String thumbnailUrl) {
}
