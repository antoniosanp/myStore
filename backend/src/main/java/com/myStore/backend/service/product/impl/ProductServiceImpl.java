package com.myStore.backend.service.product.impl;

import com.myStore.backend.dto.product.ProductRequestDTO;
import com.myStore.backend.dto.product.ProductSummaryDTO;
import com.myStore.backend.exception.BadRequestException;
import com.myStore.backend.exception.DuplicateResourceException;
import com.myStore.backend.exception.ResourceNotFoundException;
import com.myStore.backend.model.Category;
import com.myStore.backend.model.Manufacturer;
import com.myStore.backend.model.Product;
import com.myStore.backend.repository.CategoryRepository;
import com.myStore.backend.repository.ManufacturerRepository;
import com.myStore.backend.repository.ProductRepository;
import com.myStore.backend.service.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ManufacturerRepository manufacturerRepository;
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public ProductSummaryDTO createProduct(ProductRequestDTO dto) {
        if (productRepository.existsBySku(dto.sku())) {
            throw new DuplicateResourceException("Product with SKU: " + dto.sku() + " already exists");
        }

        Manufacturer manufacturer = manufacturerRepository.findById(dto.manufacturerId())
                .orElseThrow(() -> new ResourceNotFoundException("Manufacturer not found with ID: " + dto.manufacturerId()));

        Set<Category> categories = fetchAndValidateCategories(dto.categoryIds());

        Product product = Product.builder()
                .sku(dto.sku())
                .name(dto.name())
                .description(dto.description())
                .price(dto.price())
                .stock(dto.stock())
                .imageUrl(dto.imageUrl())
                .manufacturer(manufacturer)
                .categories(categories)
                .build();

        Product savedProduct = productRepository.save(product);
        return mapToDto(savedProduct);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductSummaryDTO getProductById(UUID id) {
        Product p = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + id));
        return mapToDto(p);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductSummaryDTO getProductBySku(String sku) {
        Product p = productRepository.findBySku(sku)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with SKU: " + sku));
        return mapToDto(p);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductSummaryDTO> getAll() {
        return productRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    @Transactional
    public ProductSummaryDTO updateProduct(UUID id, ProductRequestDTO dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + id));

        if (!product.getSku().equalsIgnoreCase(dto.sku()) && productRepository.existsBySku(dto.sku())) {
            throw new DuplicateResourceException("Product with SKU: " + dto.sku() + " already exists");
        }

        if (!product.getManufacturer().getId().equals(dto.manufacturerId())) {
            Manufacturer newManufacturer = manufacturerRepository.findById(dto.manufacturerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Manufacturer not found with ID: " + dto.manufacturerId()));
            product.setManufacturer(newManufacturer);
        }

        Set<Category> categories = fetchAndValidateCategories(dto.categoryIds());
        product.setCategories(categories);

        product.setSku(dto.sku());
        product.setName(dto.name());
        product.setDescription(dto.description());
        product.setPrice(dto.price());
        product.setStock(dto.stock());
        product.setImageUrl(dto.imageUrl());

        Product updatedProduct = productRepository.save(product);
        return mapToDto(updatedProduct);
    }

    @Override
    @Transactional
    public void softDeleteProduct(UUID id) {
        Product p = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + id));

        p.setIsActive(false);
        productRepository.save(p);
    }

    @Override
    @Transactional
    public Integer calculateNewStock(UUID id, Integer toSubtract) {
        if (toSubtract == null || toSubtract <= 0) {
            throw new BadRequestException("Quantity to subtract must be greater than zero");
        }

        Product p = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + id));

        if (p.getStock() < toSubtract) {
            throw new BadRequestException("Insufficient stock for product ID: " + id + ". Available: " + p.getStock() + ", Requested: " + toSubtract);
        }

        p.setStock(p.getStock() - toSubtract);
        productRepository.save(p);
        return p.getStock();
    }

    @Override
    @Transactional
    public Integer reStock(UUID id, Integer toAdd) {
        if (toAdd == null || toAdd <= 0) {
            throw new BadRequestException("Quantity to add must be greater than zero");
        }

        Product p = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + id));

        p.setStock(p.getStock() + toAdd);
        productRepository.save(p);
        return p.getStock();
    }

    private Set<Category> fetchAndValidateCategories(Set<UUID> categoryIds) {
        List<Category> categoryList = categoryRepository.findAllById(categoryIds);
        if (categoryList.size() != categoryIds.size()) {
            throw new ResourceNotFoundException("One or more categories were not found");
        }
        return new HashSet<>(categoryList);
    }

    private ProductSummaryDTO mapToDto(Product p) {
        if (p == null) {
            throw new IllegalArgumentException("Cannot map null Product entity to DTO");
        }

        Set<String> categoryNames = p.getCategories() != null
                ? p.getCategories().stream().map(Category::getName).collect(Collectors.toSet())
                : Set.of();

        return new ProductSummaryDTO(
                p.getId(),
                p.getSku(),
                p.getName(),
                p.getDescription(),
                p.getPrice(),
                p.getStock(),
                p.getImageUrl(),
                p.getIsActive(),
                p.getManufacturer().getName(),
                categoryNames,
                p.getCreatedAt()
        );
    }
}
