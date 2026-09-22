import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, Package } from 'lucide-react';
import type { CartItem } from '../../../context/CartContext';
import { formatProductPrice } from '../../../../domain/models/Product';
import { useCart } from '../../../context/CartContext';
import { useTranslation } from '../../../i18n';

export interface CartItemRowProps {
  item: CartItem;
}

export const CartItemRow = ({ item }: CartItemRowProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { t } = useTranslation();
  const { product, quantity } = item;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        padding: '16px 0',
        borderBottom: '1px solid var(--color-border-subtle)',
        flexWrap: 'wrap',
      }}
    >
      {/* Product Image & Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 240px' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-surface-subtle)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Package size={28} color="var(--color-text-muted)" />
          )}
        </div>

        <div>
          <Link to={`/product/${product.id}`}>
            <h4
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '4px',
              }}
            >
              {product.name}
            </h4>
          </Link>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            <span>{product.sku}</span>
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
            {formatProductPrice(product.price)}
          </div>
        </div>
      </div>

      {/* Quantity Stepper */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
            onClick={() => updateQuantity(product.id, quantity - 1)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            style={{
              padding: '6px 10px',
              background: 'var(--color-surface-subtle)',
              border: 'none',
              cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Minus size={14} />
          </button>
          <span style={{ padding: '0 12px', fontWeight: 600, minWidth: '32px', textAlign: 'center' }}>
            {quantity}
          </span>
          <button
            onClick={() => updateQuantity(product.id, quantity + 1)}
            disabled={quantity >= product.stock}
            aria-label="Increase quantity"
            style={{
              padding: '6px 10px',
              background: 'var(--color-surface-subtle)',
              border: 'none',
              cursor: quantity >= product.stock ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Subtotal */}
        <div style={{ minWidth: '90px', textAlign: 'right', fontWeight: 700, color: 'var(--color-text-primary)' }}>
          {formatProductPrice(product.price * quantity)}
        </div>

        {/* Delete Button */}
        <button
          onClick={() => removeFromCart(product.id)}
          title={t('cart.remove')}
          aria-label={t('cart.remove')}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            transition: 'color var(--transition-speed)',
          }}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};
