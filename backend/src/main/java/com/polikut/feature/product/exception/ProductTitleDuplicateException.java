package com.polikut.feature.product.exception;

import com.polikut.exception.ApiException;
import jakarta.servlet.http.HttpServletResponse;

public class ProductTitleDuplicateException extends ApiException {

    public ProductTitleDuplicateException(String title) {
        super(
                HttpServletResponse.SC_CONFLICT,
                "PRODUCT_TITLE_DUPLICATE",
                "Продукт із назвою '%s' вже існує в системі".formatted(title)
        );
    }
}
