package com.myStore.backend.dto.manufacturer;

import java.util.UUID;

public record ManufacturerResponseDTO(
        UUID id,
        String name,
        String description,
        String websiteUrl
) {
}
