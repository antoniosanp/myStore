import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderApiRepository } from '../../../../infrastructure/repositories/OrderApiRepository';
import { PaymentApiRepository } from '../../../../infrastructure/repositories/PaymentApiRepository';
import { makeCreateOrderUseCase } from '../../../../application/orderUseCases/createOrderUseCase';
import { makeGetPaymentByOrderIdUseCase } from '../../../../application/paymentUseCases/getPaymentByOrderIdUseCase';
import { useCart } from '../../../context/CartContext';
import { useToast } from '../../../context/ToastContext';
import { useTranslation } from '../../../i18n';

const orderRepo = new OrderApiRepository();
const createOrder = makeCreateOrderUseCase(orderRepo);
const paymentRepo = new PaymentApiRepository();
const getPaymentByOrderId = makeGetPaymentByOrderIdUseCase(paymentRepo);

export const useCheckout = () => {
  const { items, clearCart, totalAmount } = useCart();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const placeOrder = async () => {
    if (items.length === 0) {
      showToast(t('checkout.emptyCartNotice'), 'warning');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setStatusMessage(t('checkout.processingOrder'));

    try {
      const orderPayload = {
        items: items.map((i) => ({
          productId: i.product.id,
          quantity: i.quantity,
        })),
      };

      // 1. Create order in the backend
      const newOrder = await createOrder(orderPayload);
      clearCart();

      setStatusMessage(t('checkout.redirectingToPayment'));
      showToast(t('checkout.redirectingToPayment'), 'info');

      // 2. Poll the payment use case for initPoint URL generated from RabbitMQ event
      let initPoint: string | null = null;
      const maxRetries = 12;
      const delayMs = 500;

      for (let i = 0; i < maxRetries; i++) {
        try {
          const paymentRes = await getPaymentByOrderId(newOrder.id);
          if (paymentRes?.initPoint) {
            initPoint = paymentRes.initPoint;
            break;
          }
        } catch {
          // Payment event might still be in RabbitMQ consumer processing, wait and retry
        }
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }

      if (initPoint) {
        // 3. Open Mercado Pago gateway directly
        window.location.href = initPoint;
      } else {
        // If gateway initPoint was delayed, fallback to order details page
        showToast(t('checkout.orderCreatedSuccess'), 'success');
        navigate(`/orders/${newOrder.id}`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : t('checkout.orderFailed');
      setError(message);
      showToast(t('checkout.orderFailed'), 'error');
    } finally {
      setIsSubmitting(false);
      setStatusMessage(null);
    }
  };

  return {
    items,
    totalAmount,
    isSubmitting,
    statusMessage,
    error,
    placeOrder,
  };
};
