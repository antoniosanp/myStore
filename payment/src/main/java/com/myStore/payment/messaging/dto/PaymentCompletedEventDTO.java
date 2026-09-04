package com.myStore.payment.messaging.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public record PaymentCompletedEventDTO(
        UUID orderId,
        UUID paymentId,
        String status,
        String provider,
        String transactionId,
        BigDecimal amount,
        Instant processedAt
) {
}
