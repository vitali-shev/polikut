package com.polikut.feature.product.exception;

import com.polikut.exception.ApiException;
import jakarta.servlet.http.HttpServletResponse;

public class UnsupportedImageFormatException extends ApiException {

    public UnsupportedImageFormatException() {
        super(
                HttpServletResponse.SC_UNSUPPORTED_MEDIA_TYPE,
                "UNSUPPORTED_IMAGE_FORMAT",
                "Формат файлу не підтримується. Оберіть інше зображення."
        );
    }
}
