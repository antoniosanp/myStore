import { useParams } from 'react-router-dom';
import { useProductDetail } from '../features/products/hooks/useProductDetail';
import { ProductDetail } from '../features/products/ProductDetail';
import { Spinner } from '../components/Spinner/Spinner';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { useTranslation } from '../i18n';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { product, isLoading, error } = useProductDetail(id);
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 20px' }}>
        <Spinner size={36} color="var(--color-brand-primary)" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ padding: '40px 20px' }}>
        <EmptyState
          title={t('common.errorTitle')}
          subtitle={error || t('products.emptyCatalogTitle')}
        />
      </div>
    );
  }

  return (
    <div style={{ padding: '32px 20px' }}>
      <ProductDetail product={product} />
    </div>
  );
};
