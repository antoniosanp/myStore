import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Order } from '../../../../domain/models/Order';
import { useTranslation } from '../../../i18n';
import { OrderCard } from './OrderCard';
import { EmptyState } from '../../../components/EmptyState/EmptyState';
import { Spinner } from '../../../components/Spinner/Spinner';
import { Button } from '../../../components/Button/Button';

export interface OrderListProps {
  orders: Order[];
  isLoading: boolean;
}

export const OrderList = ({ orders, isLoading }: OrderListProps) => {
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

  if (orders.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingBag size={48} />}
        title={t('orders.emptyTitle')}
        subtitle={t('orders.emptySubtitle')}
        action={
          <Link to="/">
            <Button variant="primary">{t('cart.browseProducts')}</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};
