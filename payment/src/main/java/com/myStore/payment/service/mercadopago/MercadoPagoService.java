package com.myStore.payment.service.mercadopago;

import com.mercadopago.resources.payment.Payment;
import com.myStore.payment.messaging.dto.OrderCreatedEventDTO;

public interface MercadoPagoService {

    String createPaymentPreference(OrderCreatedEventDTO orderEvent);

    Payment getPaymentDetails(Long paymentId);
}
