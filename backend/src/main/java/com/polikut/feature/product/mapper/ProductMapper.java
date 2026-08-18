package com.polikut.feature.product.mapper;

import com.polikut.feature.category.entity.Category;
import com.polikut.feature.product.dto.response.ProductForAdminResponse;
import com.polikut.feature.product.dto.response.ProductCardResponse;
import com.polikut.feature.product.dto.response.ProductResponse;
import com.polikut.feature.product.entity.Product;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class ProductMapper {

    private final ProductImageMapper productImageMapper;

    public ProductMapper(ProductImageMapper productImageMapper) {
        this.productImageMapper = productImageMapper;
    }

    public ProductForAdminResponse toProductForAdminResponse(Product product) {
        return new ProductForAdminResponse(
                product.getId(),
                product.getTitle(),
                product.getDescription(),
                product.getSpecifications(),
                product.getBenefits(),
                product.getOriginalPrice(),
                product.getDiscountPercent(),
                product.getImages().stream()
                        .map(productImageMapper::toProductImageResponse)
                        .toList(),
                product.getCategories().stream()
                        .map(Category::getId)
                        .toList()
        );
    }

    public ProductResponse toProductResponse(Product product) {
        String thumbnailUrl = productImageMapper.toUrl(product.getThumbnailPath());
        return new ProductResponse(
                product.getId(),
                product.getTitle(),
                product.getDescription(),
                product.getSpecifications(),
                product.getBenefits(),
                product.getOriginalPrice(),
                product.getDiscountPercent(),
                product.getCurrentPrice(),
                isRecentlyCreated(product.getCreatedAt()),
                product.getSku(),
                thumbnailUrl,
                product.getImages().stream()
                        .map(productImageMapper::toProductImageResponse)
                        .toList()
        );
    }

    public ProductCardResponse toProductCardResponse(Product product) {
        String thumbnailUrl = productImageMapper.toUrl(product.getThumbnailPath());
        return new ProductCardResponse(
                product.getId(),
                product.getTitle(),
                product.getOriginalPrice(),
                product.getDiscountPercent(),
                product.getCurrentPrice(),
                isRecentlyCreated(product.getCreatedAt()),
                product.getSku(),
                thumbnailUrl
        );
    }

    private static boolean isRecentlyCreated(LocalDate date) {
        return date.isAfter(LocalDate.now().minusMonths(2));
    }
}
