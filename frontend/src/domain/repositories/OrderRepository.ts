import type { Order } from '../models/Order';

export interface CreateOrderItemInput {
  productId: string;
  quantity: number;
}

export interface CreateOrderInput {
  items: CreateOrderItemInput[];
}

export interface OrderRepository {
  getUserOrders(): Promise<Order[]>;
  getAllAdmin(): Promise<Order[]>;
  getById(id: string): Promise<Order | null>;
  create(data: CreateOrderInput): Promise<Order>;
}
