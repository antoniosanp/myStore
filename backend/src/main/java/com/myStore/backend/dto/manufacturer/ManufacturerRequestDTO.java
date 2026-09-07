package com.myStore.backend.dto.manufacturer;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ManufacturerRequestDTO(

    @Schema(description = "Manufacturer or brand name", example = "Sony Corporation")
    @NotBlank(message = "Manufacturer name is required")
    @Size(max = 120, message = "Manufacturer name must not exceed 120 characters")
    String name,

    @Schema(description = "Manufacturer overview", example = "Fabricante multinacional de electrónica y consolas")
    String description,

    @Schema(description = "Website URL", example = "https://www.sony.example.com")
    @Size(max = 255, message = "Website URL must not exceed 255 characters")
    String websiteUrl
){}
