import type { Order } from '../../domain/models/Order';
import type { CreateOrderInput, OrderRepository } from '../../domain/repositories/OrderRepository';

export const makeCreateOrderUseCase = (repository: OrderRepository) => (input: CreateOrderInput): Promise<Order> => {
  return repository.create(input);
};