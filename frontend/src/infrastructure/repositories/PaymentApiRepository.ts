import axios from 'axios';
import { paymentClient } from '../http/paymentClient';
import type { Payment } from '../../domain/models/Payment';
import type { PaymentRepository } from '../../domain/repositories/PaymentRepository';

export class PaymentApiRepository implements PaymentRepository {
  constructor(private readonly client = paymentClient) {}

  async getPaymentByOrderId(orderId: string): Promise<Payment | null> {
    try {
      const response = await this.client.get<Payment>(`/payments/order/${orderId}`);
      return response.data;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        (error.response?.status === 404 || error.response?.status === 500)
      ) {
        // Payment record not yet created or not found
        return null;
      }
      throw error;
    }
  }
}
