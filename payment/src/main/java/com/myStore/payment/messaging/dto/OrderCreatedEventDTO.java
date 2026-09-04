package com.myStore.payment.messaging.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record OrderCreatedEventDTO(
        UUID orderId,
        UUID userId,
        BigDecimal totalAmount,
        List<OrderItemEventDTO> items,
        Instant createdAt
) {
}
