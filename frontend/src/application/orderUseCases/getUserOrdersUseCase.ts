import type { Order } from '../../domain/models/Order';
import type { OrderRepository } from '../../domain/repositories/OrderRepository';

export const makeGetUserOrdersUseCase = (repository: OrderRepository) => (): Promise<Order[]> => {
  return repository.getUserOrders();
};
