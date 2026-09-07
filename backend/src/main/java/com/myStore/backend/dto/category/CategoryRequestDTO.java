package com.myStore.backend.dto.category;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CategoryRequestDTO(
    @Schema(description = "Category name", example = "Tecnología")
    @NotBlank(message = "Category name is required")
    @Size(max = 100, message = "Category name must not exceed 100 characters")
    String name,

    @Schema(description = "Category description", example = "Dispositivos móviles, laptops y gadgets tecnológicos")
    String description
) {}
