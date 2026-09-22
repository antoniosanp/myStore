import { useState, useEffect, useCallback } from 'react';
import type { Product } from '../../../../domain/models/Product';
import { ProductRepositoryImpl } from '../../../../infrastructure/repositories/ProductRepository';
import { makeListProductsUseCase } from '../../../../application/productUseCases/listProductsUseCase';

const defaultProductRepo = new ProductRepositoryImpl();
const defaultListProductsUseCase = makeListProductsUseCase(defaultProductRepo);

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await defaultListProductsUseCase();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching products');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
  };
};
