package com.polikut.feature.category.dto.request;

import jakarta.validation.constraints.NotBlank;

public record CategoryCreateRequest(

        @NotBlank(message = "Оберіть іконку категорії")
        String icon,

        @NotBlank(message = "Вкажіть назву категорії")
        String name) {
}
