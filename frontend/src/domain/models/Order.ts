import { z } from 'zod';

export const OrderStatusEnumSchema = z.enum(['PENDING', 'PAID', 'CANCELLED']);
export type OrderStatusEnum = z.infer<typeof OrderStatusEnumSchema>;

export const OrderItemSchema = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(),
  productName: z.string(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().nonnegative(),
  subtotal: z.number().nonnegative(),
});
export type OrderItem = z.infer<typeof OrderItemSchema>;

export const OrderSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  totalAmount: z.number().nonnegative(),
  status: OrderStatusEnumSchema,
  items: z.array(OrderItemSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const OrderListSchema = z.array(OrderSchema);
export type Order = z.infer<typeof OrderSchema>;

export function isOrderPaid(order: Order): boolean {
  return order.status === 'PAID';
}

export function formatOrderAmount(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}
