import type { ProductRepository } from '../../domain/repositories/ProductRepository';

export const makeDeleteProductUseCase = (repository: ProductRepository) => (id: string): Promise<void> => {
  return repository.delete(id);
};
