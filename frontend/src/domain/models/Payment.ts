import { z } from 'zod';

export const PaymentStatusEnumSchema = z.enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED']);
export type PaymentStatus = z.infer<typeof PaymentStatusEnumSchema>;

export const PaymentSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  userId: z.string(),
  provider: z.string(),
  transactionId: z.string().nullable().optional(),
  status: PaymentStatusEnumSchema,
  amount: z.number(),
  initPoint: z.string().nullable().optional(),
  createdAt: z.string(),
});

export type Payment = z.infer<typeof PaymentSchema>;

// Alias for backwards compatibility
export type PaymentDetails = Payment;
