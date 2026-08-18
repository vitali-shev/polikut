package com.polikut.feature.product.exception;

import com.polikut.exception.ApiException;
import jakarta.servlet.http.HttpServletResponse;

public class ProductNotFoundException extends ApiException {

    public ProductNotFoundException() {
        super(
                HttpServletResponse.SC_NOT_FOUND,
                "PRODUCT_NOT_FOUND",
                "Продукт не знайдено або він більше недоступний"
        );
    }
}
