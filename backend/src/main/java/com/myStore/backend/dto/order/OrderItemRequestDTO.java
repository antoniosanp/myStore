package com.myStore.backend.dto.order;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record OrderItemRequestDTO(

        @Schema(description = "Existing Product UUID to purchase", example = "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d")
        @NotNull(message = "Product ID is required")
        UUID productId,

        @Schema(description = "Quantity of units", example = "2")
        @NotNull(message = "Quantity is required")
        @Min(value = 1, message = "Quantity must be at least 1")
        Integer quantity

) {
}
