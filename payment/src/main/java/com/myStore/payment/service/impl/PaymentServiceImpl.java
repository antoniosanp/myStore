package com.myStore.payment.service.impl;

import com.myStore.payment.messaging.dto.OrderCreatedEventDTO;
import com.myStore.payment.messaging.dto.PaymentCompletedEventDTO;
import com.myStore.payment.messaging.producer.PaymentEventProducer;
import com.myStore.payment.model.Payment;
import com.myStore.payment.model.enums.PaymentStatusEnum;
import com.myStore.payment.repository.PaymentRepository;
import com.myStore.payment.service.PaymentService;
import com.myStore.payment.service.mercadopago.MercadoPagoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final MercadoPagoService mercadoPagoService;
    private final PaymentEventProducer paymentEventProducer;

    @Override
    @Transactional
    public Payment processOrderCreatedEvent(OrderCreatedEventDTO orderEvent) {
        log.info("Processing OrderCreatedEvent for order ID: {}", orderEvent.orderId());

        if (paymentRepository.findByOrderId(orderEvent.orderId()).isPresent()) {
            log.warn("Payment record already exists for order ID: {}", orderEvent.orderId());
            return paymentRepository.findByOrderId(orderEvent.orderId()).get();
        }

        String initPoint;
        try {
            initPoint = mercadoPagoService.createPaymentPreference(orderEvent);
        } catch (Exception e) {
            log.warn("Could not create Mercado Pago preference for order ID {}: {}. Using fallback checkout URL.", orderEvent.orderId(), e.getMessage());
            initPoint = "https://sandbox.mercadopago.com/checkout/v1/redirect?pref_id=mock-" + orderEvent.orderId();
        }

        Payment payment = Payment.builder()
                .orderId(orderEvent.orderId())
                .userId(orderEvent.userId())
                .provider("MERCADO_PAGO")
                .status(PaymentStatusEnum.PENDING)
                .amount(orderEvent.totalAmount())
                .initPoint(initPoint)
                .build();

        Payment savedPayment = paymentRepository.save(payment);
        log.info("Successfully created payment record with ID: {} for order ID: {}", savedPayment.getId(), orderEvent.orderId());
        return savedPayment;
    }

    @Override
    @Transactional
    public void processWebhookNotification(Map<String, Object> payload) {
        log.info("Received Mercado Pago webhook notification: {}", payload);

        // Support direct simulation payload: { "orderId": "UUID", "status": "PAID" }
        if (payload.containsKey("orderId")) {
            try {
                UUID orderId = UUID.fromString(payload.get("orderId").toString());
                Payment payment = paymentRepository.findByOrderId(orderId).orElse(null);
                if (payment != null) {
                    payment.setStatus(PaymentStatusEnum.APPROVED);
                    payment.setTransactionId("TX-MOCK-" + System.currentTimeMillis());
                    paymentRepository.save(payment);

                    PaymentCompletedEventDTO completedEvent = new PaymentCompletedEventDTO(
                            payment.getOrderId(),
                            payment.getId(),
                            "PAID",
                            payment.getProvider(),
                            payment.getTransactionId(),
                            payment.getAmount(),
                            Instant.now()
                    );

                    paymentEventProducer.sendPaymentCompletedEvent(completedEvent);
                    log.info("Direct test payment approved for order ID: {}", orderId);
                    return;
                }
            } catch (Exception e) {
                log.warn("Failed direct webhook simulation: {}", e.getMessage());
            }
        }

        String action = (String) payload.get("action");
        String type = (String) payload.get("type");

        if ("payment".equals(type) || "payment.created".equals(action) || "payment.updated".equals(action)) {
            Object dataObj = payload.get("data");
            if (dataObj instanceof Map<?, ?> dataMap) {
                Object idObj = dataMap.get("id");
                if (idObj != null) {
                    try {
                        Long mpPaymentId = Long.parseLong(idObj.toString());
                        verifyAndUpdatePayment(mpPaymentId);
                    } catch (Exception e) {
                        log.warn("Could not verify Mercado Pago payment ID {}: {}", idObj, e.getMessage());
                    }
                }
            }
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Payment getPaymentByOrderId(UUID orderId) {
        return paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Payment not found for order ID: " + orderId));
    }

    private void verifyAndUpdatePayment(Long mpPaymentId) {
        com.mercadopago.resources.payment.Payment mpPayment = mercadoPagoService.getPaymentDetails(mpPaymentId);
        if (mpPayment == null || mpPayment.getExternalReference() == null) {
            log.warn("Mercado Pago payment details or external reference missing for payment ID: {}", mpPaymentId);
            return;
        }

        UUID orderId = UUID.fromString(mpPayment.getExternalReference());
        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Payment entity not found for order ID: " + orderId));

        String mpStatus = mpPayment.getStatus();
        log.info("Verified Mercado Pago payment status: {} for order ID: {}", mpStatus, orderId);

        PaymentStatusEnum newStatus;
        String backendStatusString;

        if ("approved".equalsIgnoreCase(mpStatus)) {
            newStatus = PaymentStatusEnum.APPROVED;
            backendStatusString = "PAID";
        } else if ("rejected".equalsIgnoreCase(mpStatus) || "cancelled".equalsIgnoreCase(mpStatus)) {
            newStatus = PaymentStatusEnum.REJECTED;
            backendStatusString = "CANCELLED";
        } else {
            newStatus = PaymentStatusEnum.PENDING;
            backendStatusString = "PENDING";
        }

        payment.setStatus(newStatus);
        payment.setTransactionId(mpPaymentId.toString());
        paymentRepository.save(payment);

        if (!"PENDING".equals(backendStatusString)) {
            PaymentCompletedEventDTO completedEvent = new PaymentCompletedEventDTO(
                    payment.getOrderId(),
                    payment.getId(),
                    backendStatusString,
                    payment.getProvider(),
                    payment.getTransactionId(),
                    payment.getAmount(),
                    Instant.now()
            );

            paymentEventProducer.sendPaymentCompletedEvent(completedEvent);
        }
    }
}
