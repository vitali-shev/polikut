package com.polikut.feature.category.repository;

import com.polikut.feature.category.entity.Category;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Modifying
    @Query(value = "delete from product_category where category_id = :categoryId",
            nativeQuery = true)
    void deleteConnectionsByCategoryId(Long categoryId);

    boolean existsCategoryByName(String name);
}
