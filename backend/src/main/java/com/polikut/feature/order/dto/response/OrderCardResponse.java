package com.polikut.feature.order.dto.response;

import com.polikut.feature.order.enums.DeliveryMethod;
import com.polikut.feature.order.enums.OrderStatus;
import com.polikut.feature.order.enums.PaymentMethod;
import com.polikut.feature.order.enums.PaymentStatus;

import java.time.Instant;

public record OrderCardResponse(
        Long id,
        OrderStatus orderStatus,
        DeliveryMethod deliveryMethod,
        PaymentMethod paymentMethod,
        PaymentStatus paymentStatus,
        Instant createdAt,
        int totalPrice) {
}
