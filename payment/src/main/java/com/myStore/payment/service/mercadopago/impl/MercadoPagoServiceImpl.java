package com.myStore.payment.service.mercadopago.impl;

import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.client.preference.*;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.payment.Payment;
import com.mercadopago.resources.preference.Preference;
import com.myStore.payment.messaging.dto.OrderCreatedEventDTO;
import com.myStore.payment.messaging.dto.OrderItemEventDTO;
import com.myStore.payment.service.mercadopago.MercadoPagoService;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class MercadoPagoServiceImpl implements MercadoPagoService {

    @Value("${app.mercadopago.access-token}")
    private String accessToken;

    @Value("${app.mercadopago.back-url.success}")
    private String successBackUrl;

    @Value("${app.mercadopago.back-url.failure}")
    private String failureBackUrl;

    @Value("${app.mercadopago.back-url.pending}")
    private String pendingBackUrl;

    @Value("${app.mercadopago.notification-url}")
    private String notificationUrl;

    @PostConstruct
    public void init() {
        MercadoPagoConfig.setAccessToken(accessToken);
        log.info("Mercado Pago SDK initialized successfully");
    }

    @Override
    public String createPaymentPreference(OrderCreatedEventDTO orderEvent) {
        try {
            List<PreferenceItemRequest> items = new ArrayList<>();

            for (OrderItemEventDTO itemDTO : orderEvent.items()) {
                PreferenceItemRequest item = PreferenceItemRequest.builder()
                        .id(itemDTO.productId().toString())
                        .title(itemDTO.productName())
                        .quantity(itemDTO.quantity())
                        .unitPrice(itemDTO.unitPrice())
                        .currencyId("USD")
                        .build();
                items.add(item);
            }

            PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest.builder()
                    .success(successBackUrl)
                    .failure(failureBackUrl)
                    .pending(pendingBackUrl)
                    .build();

            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(items)
                    .backUrls(backUrls)
                    .autoReturn("approved")
                    .notificationUrl(notificationUrl)
                    .externalReference(orderEvent.orderId().toString())
                    .build();

            PreferenceClient client = new PreferenceClient();
            Preference preference = client.create(preferenceRequest);

            log.info("Created Mercado Pago preference for order ID: {}", orderEvent.orderId());
            return preference.getInitPoint();

        } catch (MPException | MPApiException e) {
            log.error("Error creating Mercado Pago preference for order ID {}: {}", orderEvent.orderId(), e.getMessage(), e);
            throw new RuntimeException("Error processing Mercado Pago preference", e);
        }
    }

    @Override
    public Payment getPaymentDetails(Long paymentId) {
        try {
            PaymentClient paymentClient = new PaymentClient();
            return paymentClient.get(paymentId);
        } catch (MPException | MPApiException e) {
            log.error("Error fetching Mercado Pago payment details for ID {}: {}", paymentId, e.getMessage(), e);
            throw new RuntimeException("Error fetching payment details from Mercado Pago", e);
        }
    }
}
