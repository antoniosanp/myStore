import type { Payment } from '../../domain/models/Payment';
import type { PaymentRepository } from '../../domain/repositories/PaymentRepository';

export const makeGetPaymentByOrderIdUseCase =
  (repository: PaymentRepository) =>
  (orderId: string): Promise<Payment | null> => {
    return repository.getPaymentByOrderId(orderId);
  };
