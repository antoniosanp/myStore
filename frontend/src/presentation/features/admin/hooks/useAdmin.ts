/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from 'react';
import type { Product } from '../../../../domain/models/Product';
import type { Order } from '../../../../domain/models/Order';
import type { CreateProductInput, UpdateProductInput } from '../../../../domain/repositories/ProductRepository';
import { ProductRepositoryImpl } from '../../../../infrastructure/repositories/ProductRepository';
import { OrderApiRepository } from '../../../../infrastructure/repositories/OrderApiRepository';
import { makeListProductsUseCase } from '../../../../application/productUseCases/listProductsUseCase';
import { makeCreateProductUseCase } from '../../../../application/productUseCases/createProductUseCase';
import { makeUpdateProductUseCase } from '../../../../application/productUseCases/updateProductUseCase';
import { makeDeleteProductUseCase } from '../../../../application/productUseCases/deleteProductUseCase';
import { makeGetAllOrdersAdminUseCase } from '../../../../application/orderUseCases/getAllOrdersAdminUseCase';
import { backendClient } from '../../../../infrastructure/http/backendClient';

const productRepo = new ProductRepositoryImpl();
const orderRepo = new OrderApiRepository();

const listProducts = makeListProductsUseCase(productRepo);
const createProductCase = makeCreateProductUseCase(productRepo);
const updateProductCase = makeUpdateProductUseCase(productRepo);
const deleteProductCase = makeDeleteProductUseCase(productRepo);
const getAllOrdersAdmin = makeGetAllOrdersAdminUseCase(orderRepo);

export interface CategoryItem {
  id: string;
  name: string;
}

export interface ManufacturerItem {
  id: string;
  name: string;
}

export const useAdmin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [manufacturers, setManufacturers] = useState<ManufacturerItem[]>([]);

  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [isOrdersLoading, setIsOrdersLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      const data = await listProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching products');
    } finally {
      setIsProductsLoading(false);
    }
  }, []);

  const loadOrders = useCallback(async () => {
    try {
      const data = await getAllOrdersAdmin();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching admin orders');
    } finally {
      setIsOrdersLoading(false);
    }
  }, []);

  const loadMetadata = useCallback(async () => {
    try {
      const [catRes, manRes] = await Promise.allSettled([
        backendClient.get<CategoryItem[]>('/categories'),
        backendClient.get<ManufacturerItem[]>('/manufacturers'),
      ]);

      if (catRes.status === 'fulfilled') {
        setCategories(catRes.value.data);
      }
      if (manRes.status === 'fulfilled') {
        setManufacturers(manRes.value.data);
      }
    } catch {
      // Graceful fallback if endpoints not available
    }
  }, []);

  useEffect(() => {
    loadProducts();
    loadOrders();
    loadMetadata();
  }, [loadProducts, loadOrders, loadMetadata]);

  const refetchProducts = useCallback(async () => {
    setIsProductsLoading(true);
    await loadProducts();
  }, [loadProducts]);

  const refetchOrders = useCallback(async () => {
    setIsOrdersLoading(true);
    await loadOrders();
  }, [loadOrders]);

  const createProduct = async (data: CreateProductInput): Promise<Product> => {
    setActionLoading(true);
    try {
      const res = await createProductCase(data);
      await loadProducts();
      return res;
    } finally {
      setActionLoading(false);
    }
  };

  const updateProduct = async (id: string, data: UpdateProductInput): Promise<Product> => {
    setActionLoading(true);
    try {
      const res = await updateProductCase(id, data);
      await loadProducts();
      return res;
    } finally {
      setActionLoading(false);
    }
  };

  const deleteProduct = async (id: string): Promise<void> => {
    setActionLoading(true);
    try {
      await deleteProductCase(id);
      await loadProducts();
    } finally {
      setActionLoading(false);
    }
  };

  return {
    products,
    orders,
    categories,
    manufacturers,
    isProductsLoading,
    isOrdersLoading,
    actionLoading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    refetchProducts,
    refetchOrders,
  };
};
