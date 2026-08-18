package com.polikut.feature.order.dto.response;

import com.polikut.feature.order.enums.DeliveryMethod;
import com.polikut.feature.order.enums.OrderStatus;
import com.polikut.feature.order.enums.PaymentMethod;
import com.polikut.feature.order.enums.PaymentStatus;

import java.time.LocalDateTime;
import java.util.List;

public record OrderDetailsResponse(
        Long id,
        OrderStatus orderStatus,
        String fullName,
        String phoneNumber,
        String comment,
        DeliveryMethod deliveryMethod,
        String settlementName,
        String settlementRef,
        String warehouseName,
        String warehouseRef,
        String ukrposhtaAddress,
        PaymentMethod paymentMethod,
        PaymentStatus paymentStatus,
        String trackingNumber,
        LocalDateTime createdAt,
        int totalPrice,
        List<OrderItemResponse> items) {
}
