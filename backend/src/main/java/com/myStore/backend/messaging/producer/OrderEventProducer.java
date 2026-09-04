package com.myStore.backend.messaging.producer;

import com.myStore.backend.messaging.dto.OrderCreatedEventDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class OrderEventProducer {

    private final RabbitTemplate rabbitTemplate;

    @Value("${app.rabbitmq.exchange}")
    private String exchange;

    @Value("${app.rabbitmq.order-created-routing-key}")
    private String orderCreatedRoutingKey;

    public void sendOrderCreatedEvent(OrderCreatedEventDTO event) {
        log.info("Sending OrderCreatedEvent for order ID: {}", event.orderId());
        rabbitTemplate.convertAndSend(exchange, orderCreatedRoutingKey, event);
    }
}
