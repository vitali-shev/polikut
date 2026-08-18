package com.polikut.feature.product.exception;

import com.polikut.exception.ApiException;
import jakarta.servlet.http.HttpServletResponse;

public class ImageOrderMismatchException extends ApiException {

    public ImageOrderMismatchException() {
        super(
                HttpServletResponse.SC_BAD_REQUEST,
                "INVALID_IMAGE_DATA",
                "Кількість завантажених файлів не збігається з кількістю вказаних позицій"
        );
    }
}
