package com.myStore.backend.dto.product;

import com.myStore.backend.dto.category.CategoryResponseDTO;
import com.myStore.backend.dto.manufacturer.ManufacturerResponseDTO;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Set;
import java.util.UUID;

public record ProductResponseDTO(
        UUID id,
        String sku,
        String name,
        String description,
        BigDecimal price,
        Integer stock,
        String imageUrl,
        Boolean isActive,
        ManufacturerResponseDTO manufacturer,
        Set<CategoryResponseDTO> categories,
        Instant createdAt
) {
}
