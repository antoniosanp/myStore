import { useState, useEffect, useCallback } from 'react';
import type { Product } from '../../../../domain/models/Product';
import { ProductRepositoryImpl } from '../../../../infrastructure/repositories/ProductRepository';
import { makeGetProductByIdUseCase } from '../../../../application/productUseCases/getProductByIdUseCase';

const defaultProductRepo = new ProductRepositoryImpl();
const defaultGetProductByIdUseCase = makeGetProductByIdUseCase(defaultProductRepo);

export const useProductDetail = (productId?: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!productId) {
      setProduct(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await defaultGetProductByIdUseCase(productId);
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching product');
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    isLoading,
    error,
    refetch: fetchProduct,
  };
};
