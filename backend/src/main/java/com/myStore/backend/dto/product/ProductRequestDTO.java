package com.myStore.backend.dto.product;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.Set;
import java.util.UUID;

public record ProductRequestDTO(

        @NotBlank(message = "SKU is required")
        @Size(max = 60, message = "SKU must not exceed 60 characters")
        String sku,

        @NotBlank(message = "Product name is required")
        @Size(max = 150, message = "Product name must not exceed 150 characters")
        String name,

        String description,

        @NotNull(message = "Price is required")
        @Positive(message = "Price must be greater than 0")
        BigDecimal price,

        @NotNull(message = "Stock is required")
        @PositiveOrZero(message = "Stock must not be less than 0")
        Integer stock,

        @Size(max = 500, message = "Image URL must not exceed 500 characters")
        String imageUrl,

        @NotNull(message = "Manufacturer ID is required")
        UUID manufacturerId,

        @NotEmpty(message = "At least one category is required")
        Set<UUID> categoryIds

) {
}
