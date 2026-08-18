package com.polikut.feature.category.dto.request;

import jakarta.validation.constraints.NotBlank;

public record CategoryUpdateRequest(

        @NotBlank(message = "Оберіть іконку категорії")
        String icon,

        @NotBlank(message = "Вкажіть нову назву категорії")
        String name) {
}
