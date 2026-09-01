package com.myStore.backend.dto.manufacturer;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ManufacturerRequestDTO(

    @NotBlank(message = "Manufacturer name is required")
    @Size(max = 120, message = "Manufacturer name must not exceed 120 characters")
    String name,

    String description,

    @Size(max = 255, message = "Website URL must not exceed 255 characters")
    String websiteUrl
){}
