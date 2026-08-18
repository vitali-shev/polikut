package com.polikut.feature.product.dto.request;

import com.polikut.feature.product.entity.ProductSpec;
import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.Range;

import java.util.List;

public record ProductUpsertRequest(

        List<Integer> imagePositions,

        @NotBlank(message = "Вкажіть назву товару")
        String title,

        String description,

        List<ProductSpec> specifications,

        List<String> benefits,

        @NotNull(message = "Вкажіть ціну товару")
        @Positive(message = "Вкажіть коректну ціну товару")
        Integer originalPrice,

        @Range(min = 0, max = 100, message = "Вкажіть коректний розмір знижки")
        Integer discountPercent,

        @NotEmpty(message = "Оберіть хоча б одну категорію")
        List<Long> categoryIds) {
}
