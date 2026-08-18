package com.polikut.feature.category.controller;

import com.polikut.feature.category.dto.request.CategoryCreateRequest;
import com.polikut.feature.category.dto.request.CategoryUpdateRequest;
import com.polikut.feature.category.dto.response.CategoryResponse;
import com.polikut.feature.category.service.CategoryAdminService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/admin/categories")
public class CategoryAdminController {

    private final CategoryAdminService categoryAdminService;

    public CategoryAdminController(CategoryAdminService categoryAdminService) {
        this.categoryAdminService = categoryAdminService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse create(@Valid @RequestBody CategoryCreateRequest request) {
        return categoryAdminService.create(request);
    }

    @PutMapping("/{id}")
    public CategoryResponse update(@PathVariable Long id,
                                   @Valid @RequestBody CategoryUpdateRequest request) {
        return categoryAdminService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public CategoryResponse delete(@PathVariable Long id) {
        return categoryAdminService.delete(id);
    }
}
