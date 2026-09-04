package com.myStore.payment.messaging.dto;

import java.math.BigDecimal;
import java.util.UUID;

public record OrderItemEventDTO(
        UUID productId,
        String productName,
        Integer quantity,
        BigDecimal unitPrice
) {
}
