import axios from 'axios';
import apiClient from '../http/apiClient';
import type { Order } from '../../domain/models/Order';
import type { OrderRepository, CreateOrderInput } from '../../domain/repositories/OrderRepository';

export class OrderApiRepository implements OrderRepository {
  async getUserOrders(): Promise<Order[]> {
    const response = await apiClient.get<Order[]>('/orders');
    return response.data;
  }

  async getAllAdmin(): Promise<Order[]> {
    const response = await apiClient.get<Order[]>('/orders/admin/all');
    return response.data;
  }

  async getById(id: string): Promise<Order | null> {
    try {
      const response = await apiClient.get<Order>(`/orders/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async create(data: CreateOrderInput): Promise<Order> {
    const response = await apiClient.post<Order>('/orders', data);
    return response.data;
  }
}
