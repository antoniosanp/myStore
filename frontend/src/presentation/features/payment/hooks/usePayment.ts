import { useState, useEffect, useCallback, useRef } from 'react';
import type { Payment, PaymentStatus } from '../../../../domain/models/Payment';
import { PaymentApiRepository } from '../../../../infrastructure/repositories/PaymentApiRepository';
import { makeGetPaymentByOrderIdUseCase } from '../../../../application/paymentUseCases/getPaymentByOrderIdUseCase';

export type { Payment, PaymentStatus };
export type PaymentDetails = Payment;

const defaultPaymentRepo = new PaymentApiRepository();
const getPaymentByOrderIdUseCase = makeGetPaymentByOrderIdUseCase(defaultPaymentRepo);

export const usePayment = (orderId?: string) => {
  const [payment, setPayment] = useState<Payment | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  const loadData = useCallback(async (): Promise<Payment | null> => {
    if (!orderId) return null;
    setError(null);
    try {
      const data = await getPaymentByOrderIdUseCase(orderId);
      setPayment(data);
      return data;
    } catch {
      // Payment might still be processing through RabbitMQ consumer
      setError(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (!orderId) return;

    let isMounted = true;
    let pollCount = 0;
    const maxPolls = 15;

    const poll = async () => {
      const data = await loadData();
      if (!isMounted) return;

      // Continue polling if payment record or initPoint is not yet generated, or while pending
      if ((!data || !data.initPoint || data.status === 'PENDING') && pollCount < maxPolls) {
        pollCount++;
        timerRef.current = window.setTimeout(poll, 2000);
      }
    };

    poll();

    return () => {
      isMounted = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [orderId, loadData]);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    await loadData();
  }, [loadData]);

  return {
    payment,
    isLoading,
    error,
    refetch,
  };
};
