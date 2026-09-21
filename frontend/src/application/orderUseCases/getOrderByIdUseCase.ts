import type { Order } from '../../domain/models/Order';
import type { OrderRepository } from '../../domain/repositories/OrderRepository';

export const makeGetOrderByIdUseCase = (repository: OrderRepository) => (id: string): Promise<Order | null> => {
  return repository.getById(id);
};
