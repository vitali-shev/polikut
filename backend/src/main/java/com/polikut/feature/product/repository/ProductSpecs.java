package com.polikut.feature.product.repository;

import com.polikut.feature.product.entity.Product;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public final class ProductSpecs {

    private ProductSpecs() {
    }

    public static Specification<Product> withCategory(Long categoryId) {
        return (root, query, cb) -> {
            if (categoryId == null) {
                return null;
            }
            return cb.equal(root.join("categories").get("id"), categoryId);
        };
    }

    public static Specification<Product> withDiscount(Boolean discount) {
        return (root, query, cb) -> {
            if (!Boolean.TRUE.equals(discount)) {
                return null;
            }
            return cb.greaterThan(root.get("discountPercent"), 0);
        };
    }

    public static Specification<Product> withCreatedAfter(LocalDate createdAfter) {
        return (root, query, cb) -> {
            if (createdAfter == null) {
                return null;
            }
            return cb.greaterThan(root.get("createdAt"), createdAfter);
        };
    }
}
