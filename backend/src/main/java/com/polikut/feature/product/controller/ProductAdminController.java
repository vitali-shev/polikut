package com.polikut.feature.product.controller;

import com.polikut.feature.product.dto.request.ProductUpsertRequest;
import com.polikut.feature.product.dto.response.ProductForAdminResponse;
import com.polikut.feature.product.dto.response.ProductOptionResponse;
import com.polikut.feature.product.service.ProductAdminService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/admin/products")
public class ProductAdminController {

    private final ProductAdminService productAdminService;

    public ProductAdminController(ProductAdminService productAdminService) {
        this.productAdminService = productAdminService;
    }

    @GetMapping("/{id}")
    public ProductForAdminResponse get(@PathVariable Long id) {
        return productAdminService.get(id);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ProductOptionResponse create(@RequestPart("product") @Valid ProductUpsertRequest product,
                                        @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        return productAdminService.create(product, images);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void update(@PathVariable Long id,
                       @RequestPart("product") @Valid ProductUpsertRequest product,
                       @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        productAdminService.update(id, product, images);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productAdminService.delete(id);
    }
}
