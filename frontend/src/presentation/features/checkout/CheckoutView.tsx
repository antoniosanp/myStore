import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, ShieldCheck, ShoppingBag } from 'lucide-react';
import { formatProductPrice } from '../../../domain/models/Product';
import { useCheckout } from './hooks/useCheckout';
import { useTranslation } from '../../i18n';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { EmptyState } from '../../components/EmptyState/EmptyState';

export const CheckoutView = () => {
  const { items, totalAmount, isSubmitting, statusMessage, error, placeOrder } = useCheckout();
  const { t } = useTranslation();

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingBag size={48} />}
        title={t('cart.emptyTitle')}
        subtitle={t('checkout.emptyCartNotice')}
        action={
          <Link to="/">
            <Button variant="primary">{t('cart.browseProducts')}</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Back Button */}
      <div style={{ marginBottom: '20px' }}>
        <Link to="/cart">
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft size={16} />}>
            {t('common.back')}
          </Button>
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Order Items Review */}
        <Card variant="elevated" padding="lg">
          <h3
            style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid var(--color-border-default)',
            }}
          >
            {t('checkout.orderSummary')}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.9rem',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{product.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    {quantity} × {formatProductPrice(product.price)}
                  </div>
                </div>
                <div style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {formatProductPrice(product.price * quantity)}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              borderTop: '2px solid var(--color-border-default)',
              paddingTop: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              <span>{t('checkout.shipping')}</span>
              <span style={{ color: 'var(--color-status-success)', fontWeight: 600 }}>
                {t('checkout.shippingFree')}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--color-text-primary)',
                marginTop: '4px',
              }}
            >
              <span>{t('checkout.total')}</span>
              <span style={{ color: 'var(--color-accent-highlight)' }}>
                {formatProductPrice(totalAmount)}
              </span>
            </div>
          </div>
        </Card>

        {/* Payment & Action Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Card variant="elevated" padding="lg">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <CreditCard size={22} color="var(--color-brand-primary)" />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {t('checkout.paymentMethod')}
              </h3>
            </div>

            <div
              style={{
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-surface-subtle)',
                border: '1px solid var(--color-brand-primary)',
                marginBottom: '20px',
              }}
            >
              <div style={{ fontWeight: 700, color: 'var(--color-brand-primary)', marginBottom: '4px' }}>
                Mercado Pago Checkout
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                {t('checkout.mercadoPagoDesc')}
              </div>
            </div>

            {statusMessage && (
              <div
                style={{
                  padding: '12px',
                  backgroundColor: 'var(--color-surface-subtle)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--color-text-secondary)',
                  fontSize: '0.85rem',
                  marginBottom: '16px',
                  textAlign: 'center',
                }}
              >
                {statusMessage}
              </div>
            )}

            {error && (
              <div
                style={{
                  padding: '12px',
                  backgroundColor: 'var(--color-status-danger-subtle)',
                  color: 'var(--color-status-danger-text)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                  marginBottom: '16px',
                }}
              >
                {error}
              </div>
            )}

            <Button
              variant="primary"
              size="lg"
              onClick={placeOrder}
              isLoading={isSubmitting}
              style={{ width: '100%', padding: '14px' }}
            >
              {t('checkout.confirmAndPay')}
            </Button>
          </Card>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: 'var(--color-text-muted)',
              fontSize: '0.85rem',
            }}
          >
            <ShieldCheck size={18} />
            <span>256-Bit SSL Encrypted Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
};
