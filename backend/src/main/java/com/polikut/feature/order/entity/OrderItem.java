package com.polikut.feature.order.entity;

public record OrderItem(Integer price, Integer quantity, String title, String thumbnailPath) {
}
