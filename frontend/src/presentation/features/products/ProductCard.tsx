import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Package } from 'lucide-react';
import type { Product } from '../../../domain/models/Product';
import { formatProductPrice } from '../../../domain/models/Product';
import { useCart } from '../../context/CartContext';
import { useTranslation } from '../../i18n';
import { Card } from '../../components/Card/Card';
import { Badge } from '../../components/Badge/Badge';
import { Button } from '../../components/Button/Button';

export interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { t } = useTranslation();
  const [imgError, setImgError] = useState(false);

  const isAvailable = product.isActive && product.stock > 0;

  return (
    <Card
      variant="elevated"
      padding="none"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      {/* Product Image Area */}
      <Link to={`/product/${product.id}`} style={{ position: 'relative', display: 'block', overflow: 'hidden' }}>
        <div
          style={{
            width: '100%',
            height: '200px',
            backgroundColor: 'var(--color-surface-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {product.imageUrl && !imgError ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              onError={() => setImgError(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
              }}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--color-text-muted)',
              }}
            >
              <Package size={48} strokeWidth={1.5} />
              <span style={{ fontSize: '0.8rem' }}>{t('products.detailsTitle')}</span>
            </div>
          )}
        </div>

        {/* Stock Status Badge */}
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          {isAvailable ? (
            <Badge variant="success" size="sm">
              {t('products.stockAvailable', { count: product.stock })}
            </Badge>
          ) : (
            <Badge variant="danger" size="sm">
              {t('products.outOfStock')}
            </Badge>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ marginBottom: '6px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
            {product.sku}
          </span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3
            style={{
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              lineHeight: 1.3,
              marginBottom: '8px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.6em',
            }}
          >
            {product.name}
          </h3>
        </Link>

        {product.manufacturerName && (
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
            <span>{t('products.brand')}: </span>
            <span style={{ fontWeight: 600 }}>{product.manufacturerName}</span>
          </div>
        )}

        <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--color-border-subtle)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
            }}
          >
            <span
              style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--color-accent-highlight)',
              }}
            >
              {formatProductPrice(product.price)}
            </span>

            <Button
              variant="primary"
              size="sm"
              disabled={!isAvailable}
              onClick={() => addToCart(product, 1)}
              leftIcon={<ShoppingCart size={15} />}
              style={{ padding: '6px 12px' }}
            >
              {t('products.addToCart')}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
