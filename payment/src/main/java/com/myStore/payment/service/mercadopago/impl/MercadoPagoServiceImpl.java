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

    // Pre-built reusable static back URLs object
    private PreferenceBackUrlsRequest staticBackUrls;

    @PostConstruct
    public void init() {
        MercadoPagoConfig.setAccessToken(accessToken);

        // Initialize immutable static back URLs once during service startup
        this.staticBackUrls = PreferenceBackUrlsRequest.builder()
                .success(successBackUrl)
                .failure(failureBackUrl)
                .pending(pendingBackUrl)
                .build();

        log.info("Mercado Pago SDK and static Back URLs initialized successfully");
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
                        .currencyId("COP")
                        .build();
                items.add(item);
            }

            PreferenceRequest.PreferenceRequestBuilder preferenceBuilder = PreferenceRequest.builder()
                    .items(items)
                    .externalReference(orderEvent.orderId().toString());

            // Mercado Pago API rejects 'localhost' URLs in backUrls and notificationUrl
            if (successBackUrl != null && !successBackUrl.contains("localhost")) {
                preferenceBuilder.backUrls(staticBackUrls).autoReturn("approved");
            }

            if (notificationUrl != null && !notificationUrl.contains("localhost")) {
                preferenceBuilder.notificationUrl(notificationUrl);
            }

            PreferenceRequest preferenceRequest = preferenceBuilder.build();
            PreferenceClient client = new PreferenceClient();
            Preference preference = client.create(preferenceRequest);

            log.info("Created Mercado Pago preference for order ID: {}. InitPoint: {}", orderEvent.orderId(), preference.getInitPoint());
            return preference.getInitPoint();

        } catch (MPApiException e) {
            log.error("Mercado Pago API Exception for order ID {}: HTTP {} - Content: {}", 
                    orderEvent.orderId(), 
                    e.getStatusCode(), 
                    e.getApiResponse() != null ? e.getApiResponse().getContent() : e.getMessage(), 
                    e);
            throw new RuntimeException("Error processing Mercado Pago preference: " + e.getMessage(), e);
        } catch (MPException e) {
            log.error("Mercado Pago Exception for order ID {}: {}", orderEvent.orderId(), e.getMessage(), e);
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
