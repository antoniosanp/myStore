import axios from "axios";
import apiClient from "../http/apiClient";
import type { Product } from "../../domain/models/Product";
import type { ProductRepository, CreateProductInput, UpdateProductInput } from "../../domain/repositories/ProductRepository";

export class ProductRepositoryImpl implements ProductRepository {
    async getAll(): Promise<Product[]> {
        const response = await apiClient.get<Product[]>("/products");
        return response.data;
    }

    async getById(id: string): Promise<Product | null> {
        try {
            const response = await apiClient.get<Product>(`/products/${id}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return null;
            }
            throw error;
        }
    }

    async getBySku(sku: string): Promise<Product | null> {
        try {
            const response = await apiClient.get<Product>(`/products/sku/${sku}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return null;
            }
            throw error;
        }
    }

    async create(data: CreateProductInput): Promise<Product> {
        const response = await apiClient.post<Product>("/products", data);
        return response.data;
    }

    async update(id: string, data: UpdateProductInput): Promise<Product> {
        const response = await apiClient.put<Product>(`/products/${id}`, data);
        return response.data;
    }

    async delete(id: string): Promise<void> {
        await apiClient.delete(`/products/${id}`);
    }
}

