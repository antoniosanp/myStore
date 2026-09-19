import type { ProductRepository } from '../../domain/repositories/ProductRepository';
import type { Product } from '../../domain/models/Product';

export const makeGetProductByIdUseCase = (repository: ProductRepository) => (id: string): Promise<Product | null> => {
  return repository.getById(id);
};
