package com.myStore.backend.dto.category;

import java.time.Instant;
import java.util.UUID;

public record CategoryResponseDTO(
    UUID id,
    String name,
    String description,
    Instant createdAt
) {}
