import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Package, Plus, Minus } from 'lucide-react';
import type { Product } from '../../../../domain/models/Product';
import { formatProductPrice } from '../../../../domain/models/Product';
import { useCart } from '../../../context/CartContext';
import { useTranslation } from '../../../i18n';
import { Card } from '../../../components/Card/Card';
import { Badge } from '../../../components/Badge/Badge';
import { Button } from '../../../components/Button/Button';

export interface ProductDetailProps {
  product: Product;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const { addToCart } = useCart();
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);

  const isAvailable = product.isActive && product.stock > 0;

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* Back to Catalog Link */}
      <div style={{ marginBottom: '20px' }}>
        <Link to="/">
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft size={16} />}>
            {t('products.backToCatalog')}
          </Button>
        </Link>
      </div>

      <Card variant="elevated" padding="lg">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
          }}
        >
          {/* Product Image Section */}
          <div
            style={{
              backgroundColor: 'var(--color-surface-subtle)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              minHeight: '320px',
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
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  color: 'var(--color-text-muted)',
                }}
              >
                <Package size={64} strokeWidth={1.5} />
                <span>{t('products.detailsTitle')}</span>
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                {product.sku}
              </span>
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

            <h1
              style={{
                fontSize: '1.75rem',
                fontWeight: 800,
                color: 'var(--color-text-primary)',
                marginBottom: '12px',
                lineHeight: 1.25,
              }}
            >
              {product.name}
            </h1>

            {product.manufacturerName && (
              <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                <span>{t('products.brand')}: </span>
                <span style={{ fontWeight: 600 }}>{product.manufacturerName}</span>
              </div>
            )}

            {product.categoryNames && product.categoryNames.length > 0 && (
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                {product.categoryNames.map((cat) => (
                  <Badge key={cat} variant="neutral" size="sm">
                    {cat}
                  </Badge>
                ))}
              </div>
            )}

            <div
              style={{
                fontSize: '1.75rem',
                fontWeight: 800,
                color: 'var(--color-accent-highlight)',
                marginBottom: '20px',
              }}
            >
              {formatProductPrice(product.price)}
            </div>

            {product.description && (
              <div style={{ marginBottom: '28px' }}>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  {product.description}
                </p>
              </div>
            )}

            {/* Quantity Stepper & Add to Cart */}
            <div style={{ marginTop: 'auto', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              {isAvailable && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid var(--color-border-default)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    aria-label="Decrement quantity"
                    style={{
                      padding: '10px 12px',
                      background: 'var(--color-surface-subtle)',
                      border: 'none',
                      cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Minus size={16} />
                  </button>
                  <span
                    style={{
                      padding: '0 16px',
                      fontWeight: 700,
                      minWidth: '40px',
                      textAlign: 'center',
                    }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    disabled={quantity >= product.stock}
                    aria-label="Increment quantity"
                    style={{
                      padding: '10px 12px',
                      background: 'var(--color-surface-subtle)',
                      border: 'none',
                      cursor: quantity >= product.stock ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              )}

              <Button
                variant="primary"
                size="lg"
                disabled={!isAvailable}
                onClick={() => addToCart(product, quantity)}
                leftIcon={<ShoppingCart size={18} />}
                style={{ flex: 1, minWidth: '180px' }}
              >
                {t('products.addToCart')}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
