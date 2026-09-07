package com.myStore.backend.dto.product;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.Set;
import java.util.UUID;

public record ProductRequestDTO(

        @Schema(description = "Unique SKU code", example = "SONY-PS5-SLIM")
        @NotBlank(message = "SKU is required")
        @Size(max = 60, message = "SKU must not exceed 60 characters")
        String sku,

        @Schema(description = "Product display name", example = "Consola PlayStation 5 Slim 1TB")
        @NotBlank(message = "Product name is required")
        @Size(max = 150, message = "Product name must not exceed 150 characters")
        String name,

        @Schema(description = "Detailed product description", example = "Juegos a 4K 120 FPS, Ray Tracing y control DualSense con retroalimentación háptica.")
        String description,

        @Schema(description = "Product unit price", example = "499.99")
        @NotNull(message = "Price is required")
        @Positive(message = "Price must be greater than 0")
        BigDecimal price,

        @Schema(description = "Available inventory stock", example = "25")
        @NotNull(message = "Stock is required")
        @PositiveOrZero(message = "Stock must not be less than 0")
        Integer stock,

        @Schema(description = "Product image URL", example = "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80")
        @Size(max = 500, message = "Image URL must not exceed 500 characters")
        String imageUrl,

        @Schema(description = "Existing Manufacturer UUID", example = "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d")
        @NotNull(message = "Manufacturer ID is required")
        UUID manufacturerId,

        @Schema(description = "Set of existing Category UUIDs", example = "[\"b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e\"]")
        @NotEmpty(message = "At least one category is required")
        Set<UUID> categoryIds

) {
}
