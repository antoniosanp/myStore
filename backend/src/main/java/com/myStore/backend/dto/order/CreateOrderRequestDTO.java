package com.myStore.backend.dto.order;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record CreateOrderRequestDTO(

        @Schema(description = "List of items included in this order")
        @NotEmpty(message = "Order must contain at least one item")
        @Valid
        List<OrderItemRequestDTO> items

) {
}
