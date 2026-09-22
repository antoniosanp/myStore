import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Calendar, ArrowRight } from 'lucide-react';
import type { Order } from '../../../../domain/models/Order';
import { formatOrderAmount } from '../../../../domain/models/Order';
import { useTranslation } from '../../../i18n';
import { Card } from '../../../components/Card/Card';
import { Badge } from '../../../components/Badge/Badge';
import { Button } from '../../../components/Button/Button';

export interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const { t } = useTranslation();

  const formattedDate = new Date(order.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const getStatusBadge = () => {
    switch (order.status) {
      case 'PAID':
        return <Badge variant="success">{t('orders.statusPaid')}</Badge>;
      case 'PENDING':
        return <Badge variant="warning">{t('orders.statusPending')}</Badge>;
      case 'CANCELLED':
        return <Badge variant="danger">{t('orders.statusCancelled')}</Badge>;
      default:
        return <Badge variant="neutral">{order.status}</Badge>;
    }
  };

  const totalItemsCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Card variant="elevated" padding="md" style={{ marginBottom: '16px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          borderBottom: '1px solid var(--color-border-subtle)',
          paddingBottom: '12px',
          marginBottom: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Package size={18} color="var(--color-brand-primary)" />
          <span style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
            {t('orders.orderId', { id: order.id.substring(0, 8) })}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.8rem',
              color: 'var(--color-text-muted)',
            }}
          >
            <Calendar size={14} />
            <span>{formattedDate}</span>
          </div>
          {getStatusBadge()}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
          <span>{t('cart.itemCount_plural', { count: totalItemsCount })}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-accent-highlight)' }}>
              {formatOrderAmount(order.totalAmount)}
            </span>
          </div>

          <Link to={`/orders/${order.id}`}>
            <Button variant="outline" size="sm" rightIcon={<ArrowRight size={14} />}>
              {t('orders.viewDetails')}
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
