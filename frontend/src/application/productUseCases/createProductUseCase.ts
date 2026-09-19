import type { ProductRepository, CreateProductInput } from '../../domain/repositories/ProductRepository';
import type { Product } from '../../domain/models/Product';

export const makeCreateProductUseCase = (repository: ProductRepository) => (input: CreateProductInput): Promise<Product> => {
  return repository.create(input);
};
