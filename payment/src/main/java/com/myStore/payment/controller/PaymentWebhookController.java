package com.myStore.payment.controller;

import com.myStore.payment.dto.PaymentResponseDTO;
import com.myStore.payment.model.Payment;
import com.myStore.payment.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
@Tag(name = "Payments", description = "Endpoints for payment webhooks and status inquiries")
public class PaymentWebhookController {

    private final PaymentService paymentService;

    @PostMapping("/webhook")
    @Operation(summary = "Mercado Pago Webhook", description = "Receives asynchronous payment status notifications from Mercado Pago")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Webhook notification received successfully")
    })
    public ResponseEntity<Void> receiveWebhook(@RequestBody Map<String, Object> payload) {
        paymentService.processWebhookNotification(payload);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/order/{orderId}")
    @Operation(summary = "Get payment by Order ID", description = "Retrieves payment details and checkout initPoint URL for a given order")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Payment details retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Payment not found for given order ID")
    })
    public ResponseEntity<PaymentResponseDTO> getPaymentByOrderId(@PathVariable UUID orderId) {
        Payment payment = paymentService.getPaymentByOrderId(orderId);
        PaymentResponseDTO response = new PaymentResponseDTO(
                payment.getId(),
                payment.getOrderId(),
                payment.getUserId(),
                payment.getProvider(),
                payment.getTransactionId(),
                payment.getStatus(),
                payment.getAmount(),
                payment.getInitPoint(),
                payment.getCreatedAt()
        );
        return ResponseEntity.ok(response);
    }
}
