package com.polikut.feature.category.service;

import com.polikut.feature.category.dto.request.CategoryCreateRequest;
import com.polikut.feature.category.dto.request.CategoryUpdateRequest;
import com.polikut.feature.category.dto.response.CategoryResponse;
import com.polikut.feature.category.entity.Category;
import com.polikut.feature.category.exception.CategoryNameDuplicateException;
import com.polikut.feature.category.exception.CategoryNotFoundException;
import com.polikut.feature.category.repository.CategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class CategoryAdminService {

    private final CategoryRepository categoryRepository;

    public CategoryAdminService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public CategoryResponse create(CategoryCreateRequest request) {
        String name = request.name();
        if (categoryRepository.existsCategoryByName(name)) {
            throw new CategoryNameDuplicateException(name);
        }

        Category category = new Category();
        category.setIcon(request.icon());
        category.setName(request.name());

        Category saved = categoryRepository.save(category);
        return new CategoryResponse(saved.getId(), saved.getIcon(), saved.getName());
    }

    public CategoryResponse update(Long id, CategoryUpdateRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(CategoryNotFoundException::new);

        String oldName = category.getName();
        String newName = request.name();
        if (!oldName.equals(newName)) {
            if (categoryRepository.existsCategoryByName(newName)) {
                throw new CategoryNameDuplicateException(newName);
            }
        }

        category.setIcon(request.icon());
        category.setName(newName);

        Category updated = categoryRepository.save(category);

        return new CategoryResponse(updated.getId(), updated.getIcon(), updated.getName());
    }

    @Transactional
    public CategoryResponse delete(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(CategoryNotFoundException::new);

        CategoryResponse response = new CategoryResponse(category.getId(), category.getIcon(), category.getName());

        categoryRepository.deleteConnectionsByCategoryId(categoryId);
        categoryRepository.delete(category);

        return response;
    }
}
