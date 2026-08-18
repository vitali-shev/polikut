package com.polikut.feature.category.exception;

import com.polikut.exception.ApiException;
import jakarta.servlet.http.HttpServletResponse;

public class CategoryNameDuplicateException extends ApiException {

    public CategoryNameDuplicateException(String name) {
        super(
                HttpServletResponse.SC_CONFLICT,
                "CATEGORY_NAME_DUPLICATE",
                "Категорія із назвою '%s' вже існує в системі".formatted(name)
        );
    }
}
