package com.myStore.payment.messaging.producer;

import com.myStore.payment.messaging.dto.PaymentCompletedEventDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class PaymentEventProducer {

    private final RabbitTemplate rabbitTemplate;

    @Value("${app.rabbitmq.exchange}")
    private String exchange;

    @Value("${app.rabbitmq.payment-completed-routing-key}")
    private String paymentCompletedRoutingKey;

    public void sendPaymentCompletedEvent(PaymentCompletedEventDTO event) {
        log.info("Sending PaymentCompletedEvent for order ID: {} with status: {}", event.orderId(), event.status());
        rabbitTemplate.convertAndSend(exchange, paymentCompletedRoutingKey, event);
    }
}
