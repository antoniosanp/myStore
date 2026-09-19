import type { ProductRepository } from '../../domain/repositories/ProductRepository';
import type { Product } from '../../domain/models/Product';

export const makeGetProductBySkuUseCase = (repository: ProductRepository) => (sku: string): Promise<Product | null> => {
  return repository.getBySku(sku);
};
