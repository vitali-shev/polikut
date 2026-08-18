package com.polikut.feature.order.dto.response;

import com.polikut.feature.order.enums.DeliveryMethod;
import com.polikut.feature.order.enums.OrderStatus;
import com.polikut.feature.order.enums.PaymentMethod;
import com.polikut.feature.order.enums.PaymentStatus;

import java.time.LocalDateTime;

public record OrderCardResponse(
        Long id,
        OrderStatus orderStatus,
        DeliveryMethod deliveryMethod,
        PaymentMethod paymentMethod,
        PaymentStatus paymentStatus,
        LocalDateTime createdAt,
        int totalPrice) {
}
