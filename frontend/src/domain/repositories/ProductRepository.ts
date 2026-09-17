import { Product } from '../models/Product';

export interface CreateProductInput {
  sku: string;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  imageUrl?: string | null;
  manufacturerId: string;
  categoryIds: string[];
}

export type UpdateProductInput = Partial<CreateProductInput>;

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
  getBySku(sku: string): Promise<Product | null>;
  create(data: CreateProductInput): Promise<Product>;
  update(id: string, data: UpdateProductInput): Promise<Product>;
  delete(id: string): Promise<void>;
}
