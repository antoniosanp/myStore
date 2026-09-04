package com.myStore.payment.messaging.consumer;

import com.myStore.payment.messaging.dto.OrderCreatedEventDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class OrderEventConsumer {

    private final PaymentService paymentService;

    @RabbitListener(queues = "${app.rabbitmq.order-created-queue}")
    public void handleOrderCreatedEvent(OrderCreatedEventDTO event) {
        log.info("Received OrderCreatedEvent for order ID: {}", event.orderId());
        paymentService.processOrderCreatedEvent(event);
    }
}
