import type { ProductRepository } from '../../domain/repositories/ProductRepository';
import type { Product } from '../../domain/models/Product';

export const makeListProductsUseCase = (repository: ProductRepository) => (): Promise<Product[]> => {
  return repository.getAll();
};