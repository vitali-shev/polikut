package com.polikut.feature.order.exception;

import com.polikut.exception.ApiException;
import jakarta.servlet.http.HttpServletResponse;

public class OrderNotFoundException extends ApiException {

    public OrderNotFoundException() {
        super(
                HttpServletResponse.SC_NOT_FOUND,
                "ORDER_NOT_FOUND",
                "Замовлення не знайдено або воно більше недоступне"
        );
    }
}
