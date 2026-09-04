package com.myStore.payment.service;

import com.myStore.payment.messaging.dto.OrderCreatedEventDTO;
import com.myStore.payment.model.Payment;

import java.util.Map;
import java.util.UUID;

public interface PaymentService {

    Payment processOrderCreatedEvent(OrderCreatedEventDTO orderEvent);

    void processWebhookNotification(Map<String, Object> payload);

    Payment getPaymentByOrderId(UUID orderId);
}
