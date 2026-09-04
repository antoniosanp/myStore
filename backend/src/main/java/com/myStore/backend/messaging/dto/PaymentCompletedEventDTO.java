package com.myStore.backend.messaging.dto;

import com.myStore.backend.model.enums.OrderStatusEnum;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public record PaymentCompletedEventDTO(
        UUID orderId,
        UUID paymentId,
        OrderStatusEnum status,
        String provider,
        String transactionId,
        BigDecimal amount,
        Instant processedAt
) {
}
