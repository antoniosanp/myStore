package com.myStore.payment.dto;

import com.myStore.payment.model.enums.PaymentStatusEnum;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public record PaymentResponseDTO(
        UUID id,
        UUID orderId,
        UUID userId,
        String provider,
        String transactionId,
        PaymentStatusEnum status,
        BigDecimal amount,
        String initPoint,
        Instant createdAt
) {
}
