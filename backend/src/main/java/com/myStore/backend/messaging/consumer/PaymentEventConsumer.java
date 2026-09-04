package com.myStore.backend.messaging.consumer;

import com.myStore.backend.messaging.dto.PaymentCompletedEventDTO;
import com.myStore.backend.service.order.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class PaymentEventConsumer {

    private final OrderService orderService;

    @RabbitListener(queues = "${app.rabbitmq.payment-completed-queue}")
    public void handlePaymentCompletedEvent(PaymentCompletedEventDTO event) {
        log.info("Received PaymentCompletedEvent for order ID: {} with status: {}", event.orderId(), event.status());
        orderService.updateOrderStatus(event.orderId(), event.status());
    }
}
