package com.myStore.backend.service.category;

import com.myStore.backend.dto.category.CategoryRequestDTO;
import com.myStore.backend.dto.category.CategoryResponseDTO;

import java.util.List;
import java.util.UUID;

public interface CategoryService {

    CategoryResponseDTO createCategory(CategoryRequestDTO dto);

    CategoryResponseDTO getCategoryById(UUID id);

    List<CategoryResponseDTO> getAllCategories();

    CategoryResponseDTO updateCategory(UUID id, CategoryRequestDTO dto);

    void deleteCategory(UUID id);
}
