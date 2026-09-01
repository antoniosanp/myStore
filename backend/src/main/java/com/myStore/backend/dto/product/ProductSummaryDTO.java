package com.myStore.backend.dto.product;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Set;
import java.util.UUID;

public record ProductSummaryDTO(
        UUID id,
        String sku,
        String name,
        String description,
        BigDecimal price,
        Integer stock,
        String imageUrl,
        Boolean isActive,
        String manufacturerName,
        Set<String> categoryNames,
        Instant createdAt
) {}
