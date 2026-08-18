package com.polikut.feature.product.controller;

import com.polikut.feature.product.dto.response.ProductCardResponse;
import com.polikut.feature.product.dto.response.ProductOptionResponse;
import com.polikut.feature.product.dto.response.ProductResponse;
import com.polikut.feature.product.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping()
    public Page<ProductCardResponse> getProductCards(@RequestParam(required = false) Long categoryId,
                                                     @RequestParam(required = false) Boolean discount,
                                                     @RequestParam(required = false) LocalDate createdAfter,
                                                     Pageable pageable) {
        return productService.getProductCards(categoryId, discount, createdAfter, pageable);
    }

    @GetMapping("/{id}")
    public ProductResponse getProductDetails(@PathVariable Long id) {
        return productService.getProductDetails(id);
    }

    @GetMapping("/options")
    public List<ProductOptionResponse> getProductOptions() {
        return productService.getProductOptions();
    }
}
