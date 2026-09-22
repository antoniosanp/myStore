import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { formatProductPrice } from '../../../../domain/models/Product';
import { useCart } from '../../../context/CartContext';
import { useTranslation } from '../../../i18n';
import { Card } from '../../../components/Card/Card';
import { Button } from '../../../components/Button/Button';

export const CartSummary = () => {
  const { totalAmount, totalItems } = useCart();
  const { t } = useTranslation();

  return (
    <Card variant="elevated" padding="lg" style={{ position: 'sticky', top: '90px' }}>
      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: '20px',
          paddingBottom: '12px',
          borderBottom: '1px solid var(--color-border-default)',
        }}
      >
        {t('checkout.orderSummary')}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
          <span>{t('checkout.itemsInOrder', { count: totalItems })}</span>
          <span style={{ fontWeight: 600 }}>{formatProductPrice(totalAmount)}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
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
            paddingTop: '16px',
            borderTop: '2px solid var(--color-border-default)',
          }}
        >
          <span>{t('cart.total')}</span>
          <span style={{ color: 'var(--color-accent-highlight)' }}>
            {formatProductPrice(totalAmount)}
          </span>
        </div>
      </div>

      <Link to="/checkout" style={{ display: 'block', width: '100%' }}>
        <Button
          variant="primary"
          size="lg"
          rightIcon={<ArrowRight size={18} />}
          style={{ width: '100%', padding: '12px 20px' }}
        >
          {t('cart.checkoutButton')}
        </Button>
      </Link>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          justifyContent: 'center',
          marginTop: '16px',
          fontSize: '0.8rem',
          color: 'var(--color-text-muted)',
        }}
      >
        <ShieldCheck size={16} />
        <span>Safe & Secure Checkout</span>
      </div>
    </Card>
  );
};
