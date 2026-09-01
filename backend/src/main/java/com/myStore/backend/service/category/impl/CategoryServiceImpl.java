package com.myStore.backend.service.category.impl;

import com.myStore.backend.dto.category.CategoryRequestDTO;
import com.myStore.backend.dto.category.CategoryResponseDTO;
import com.myStore.backend.exception.DuplicateResourceException;
import com.myStore.backend.exception.ResourceNotFoundException;
import com.myStore.backend.model.Category;
import com.myStore.backend.repository.CategoryRepository;
import com.myStore.backend.service.category.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public CategoryResponseDTO createCategory(CategoryRequestDTO dto) {
        if (categoryRepository.existsByNameIgnoreCase(dto.name())) {
            throw new DuplicateResourceException("Category with name '" + dto.name() + "' already exists");
        }

        Category category = Category.builder()
                .name(dto.name())
                .description(dto.description())
                .build();

        Category savedCategory = categoryRepository.save(category);
        return mapToResponseDTO(savedCategory);
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryResponseDTO getCategoryById(UUID id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + id));
        return mapToResponseDTO(category);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryResponseDTO> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    @Override
    @Transactional
    public CategoryResponseDTO updateCategory(UUID id, CategoryRequestDTO dto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + id));

        if (!category.getName().equalsIgnoreCase(dto.name()) &&
                categoryRepository.existsByNameIgnoreCase(dto.name())) {
            throw new DuplicateResourceException("Category with name '" + dto.name() + "' already exists");
        }

        category.setName(dto.name());
        category.setDescription(dto.description());

        Category updatedCategory = categoryRepository.save(category);
        return mapToResponseDTO(updatedCategory);
    }

    @Override
    @Transactional
    public void deleteCategory(UUID id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category not found with ID: " + id);
        }
        categoryRepository.deleteById(id);
    }

    private CategoryResponseDTO mapToResponseDTO(Category category) {
        return new CategoryResponseDTO(
                category.getId(),
                category.getName(),
                category.getDescription(),
                category.getCreatedAt()
        );
    }
}
