import { useState, useEffect, useCallback } from 'react';
import type { Order } from '../../../../domain/models/Order';
import { OrderApiRepository } from '../../../../infrastructure/repositories/OrderApiRepository';
import { makeGetUserOrdersUseCase } from '../../../../application/orderUseCases/getUserOrdersUseCase';

const defaultOrderRepo = new OrderApiRepository();
const defaultGetUserOrdersUseCase = makeGetUserOrdersUseCase(defaultOrderRepo);

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await defaultGetUserOrdersUseCase();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching orders');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    isLoading,
    error,
    refetch: fetchOrders,
  };
};
