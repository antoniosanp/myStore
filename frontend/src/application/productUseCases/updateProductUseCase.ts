import type { ProductRepository, UpdateProductInput } from '../../domain/repositories/ProductRepository';
import type { Product } from '../../domain/models/Product';

export const makeUpdateProductUseCase = (repository: ProductRepository) => (id: string, input: UpdateProductInput): Promise<Product> => {
  return repository.update(id, input);
};
