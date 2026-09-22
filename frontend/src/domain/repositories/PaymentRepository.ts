import type { Payment } from '../models/Payment';

export interface PaymentRepository {
  getPaymentByOrderId(orderId: string): Promise<Payment | null>;
}
