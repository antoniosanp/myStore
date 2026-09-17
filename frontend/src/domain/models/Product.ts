import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string().uuid(),
  sku: z.string().min(1),
  name: z.string().min(1),
  description: z.string().nullable().optional(),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  imageUrl: z.string().nullable().optional(),
  isActive: z.boolean(),
  manufacturerName: z.string().nullable().optional(),
  categoryNames: z.array(z.string()).default([]),
  createdAt: z.string(),
});

export const ProductListSchema = z.array(ProductSchema);

export type Product = z.infer<typeof ProductSchema>;

export function isProductAvailable(product: Product): boolean {
  return product.isActive && product.stock > 0;
}

export function hasEnoughStock(product: Product, quantityRequested: number): boolean {
  return (
    isProductAvailable(product) &&
    quantityRequested > 0 &&
    quantityRequested <= product.stock
  );
}

export function formatProductPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(price);
}