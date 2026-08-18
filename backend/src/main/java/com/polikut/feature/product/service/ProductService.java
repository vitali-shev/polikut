package com.polikut.feature.product.service;

import com.polikut.feature.product.dto.response.ProductCardResponse;
import com.polikut.feature.product.dto.response.ProductOptionResponse;
import com.polikut.feature.product.dto.response.ProductResponse;
import com.polikut.feature.product.entity.Product;
import com.polikut.feature.product.exception.ProductNotFoundException;
import com.polikut.feature.product.mapper.ProductMapper;
import com.polikut.feature.product.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

import static com.polikut.feature.product.repository.ProductSpecs.*;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductService(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    public Page<ProductCardResponse> getProductCards(Long categoryId,
                                                     Boolean discount,
                                                     LocalDate createdAfter,
                                                     Pageable pageable) {
        Specification<Product> specs =
                Specification.where(withCategory(categoryId))
                        .and(withDiscount(discount))
                        .and(withCreatedAfter(createdAfter));

        return productRepository.findAll(specs, pageable)
                .map(productMapper::toProductCardResponse);
    }

    public ProductResponse getProductDetails(Long id) {
        Product product = productRepository.findById(id).orElseThrow(ProductNotFoundException::new);

        return productMapper.toProductResponse(product);
    }

    public List<ProductOptionResponse> getProductOptions() {
        return productRepository.findAll()
                .stream()
                .map(product -> new ProductOptionResponse(product.getId(), product.getTitle()))
                .toList();
    }
}
