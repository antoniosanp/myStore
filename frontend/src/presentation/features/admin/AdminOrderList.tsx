import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import type { Order, OrderStatusEnum } from '../../../../domain/models/Order';
import { formatOrderAmount } from '../../../../domain/models/Order';
import { useTranslation } from '../../../i18n';
import { Card } from '../../../components/Card/Card';
import { Badge } from '../../../components/Badge/Badge';
import { Button } from '../../../components/Button/Button';
import { Select } from '../../../components/Select/Select';
import { Spinner } from '../../../components/Spinner/Spinner';

export interface AdminOrderListProps {
  orders: Order[];
  isLoading: boolean;
}

export const AdminOrderList = ({ orders, isLoading }: AdminOrderListProps) => {
  const { t } = useTranslation();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <Spinner size={32} color="var(--color-brand-primary)" />
      </div>
    );
  }

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === 'ALL') return true;
    return o.status === filterStatus;
  });

  const getStatusBadge = (status: OrderStatusEnum) => {
    switch (status) {
      case 'PAID':
        return <Badge variant="success">{t('orders.statusPaid')}</Badge>;
      case 'PENDING':
        return <Badge variant="warning">{t('orders.statusPending')}</Badge>;
      case 'CANCELLED':
        return <Badge variant="danger">{t('orders.statusCancelled')}</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div>
      {/* Filter Toolbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <div style={{ width: '200px' }}>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="ALL">{t('admin.orderFilterAll')}</option>
            <option value="PENDING">{t('orders.statusPending')}</option>
            <option value="PAID">{t('orders.statusPaid')}</option>
            <option value="CANCELLED">{t('orders.statusCancelled')}</option>
          </Select>
        </div>

        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          {t('checkout.itemsInOrder', { count: filteredOrders.length })}
        </span>
      </div>

      {filteredOrders.length === 0 ? (
        <Card variant="outlined" padding="lg" style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
          {t('admin.noOrdersFound')}
        </Card>
      ) : (
        <Card variant="elevated" padding="none" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr
                style={{
                  backgroundColor: 'var(--color-surface-subtle)',
                  borderBottom: '1px solid var(--color-border-default)',
                  color: 'var(--color-text-secondary)',
                  fontWeight: 600,
                }}
              >
                <th style={{ padding: '12px 16px' }}>{t('orders.orderId', { id: '' }).replace(':', '').trim()}</th>
                <th style={{ padding: '12px 16px' }}>{t('orders.date', { date: '' }).replace(':', '').trim()}</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>{t('orders.status')}</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Items</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>{t('cart.total')}</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>{t('admin.tableActions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o) => {
                const formattedDate = new Date(o.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                });
                const totalItems = o.items.reduce((acc, i) => acc + i.quantity, 0);

                return (
                  <tr key={o.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                      {o.id.substring(0, 8)}...
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--color-text-secondary)' }}>
                      {formattedDate}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      {getStatusBadge(o.status)}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      {totalItems}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700 }}>
                      {formatOrderAmount(o.totalAmount)}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <Link to={`/orders/${o.id}`}>
                        <Button variant="ghost" size="sm" rightIcon={<ExternalLink size={14} />}>
                          {t('orders.viewDetails')}
                        </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
};
