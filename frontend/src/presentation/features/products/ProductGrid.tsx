import React from 'react';
import { PackageSearch } from 'lucide-react';
import type { Product } from '../../../../domain/models/Product';
import { useTranslation } from '../../../i18n';
import { ProductCard } from './ProductCard';
import { EmptyState } from '../../../components/EmptyState/EmptyState';
import { Spinner } from '../../../components/Spinner/Spinner';

export interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}

export const ProductGrid = ({ products, isLoading }: ProductGridProps) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 0',
          gap: '16px',
        }}
      >
        <Spinner size={36} color="var(--color-brand-primary)" />
        <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          {t('common.loading')}
        </span>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        icon={<PackageSearch size={48} />}
        title={t('products.emptyCatalogTitle')}
        subtitle={t('products.emptyCatalogSubtitle')}
      />
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '24px',
        width: '100%',
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
