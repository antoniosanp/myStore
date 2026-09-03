package com.myStore.backend.dto.order;

import com.myStore.backend.model.enums.OrderStatusEnum;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record OrderResponseDTO(
        UUID id,
        UUID userId,
        BigDecimal totalAmount,
        OrderStatusEnum status,
        List<OrderItemResponseDTO> items,
        Instant createdAt,
        Instant updatedAt
) {
}
