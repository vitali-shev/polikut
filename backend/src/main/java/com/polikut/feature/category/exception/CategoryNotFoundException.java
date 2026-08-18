package com.polikut.feature.category.exception;

import com.polikut.exception.ApiException;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;

public class CategoryNotFoundException extends ApiException {

    public CategoryNotFoundException() {
        super(
                HttpServletResponse.SC_NOT_FOUND,
                "CATEGORY_NOT_FOUND",
                "Категорію не знайдено. Оберіть зі списку та спробуйте ще раз"
        );
    }
}
