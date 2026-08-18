package com.polikut.feature.order.dto.request;

import com.polikut.feature.order.enums.OrderStatus;
import com.polikut.feature.order.enums.PaymentMethod;
import com.polikut.feature.order.enums.PaymentStatus;

public record OrderUpdateRequest(
        OrderStatus orderStatus,
        PaymentMethod paymentMethod,
        PaymentStatus paymentStatus) {
}
