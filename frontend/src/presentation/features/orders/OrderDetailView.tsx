import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Order } from '../../../domain/models/Order';
import { formatOrderAmount } from '../../../domain/models/Order';
import { PaymentApiRepository } from '../../../infrastructure/repositories/PaymentApiRepository';
import { makeGetPaymentByOrderIdUseCase } from '../../../application/paymentUseCases/getPaymentByOrderIdUseCase';
import { usePayment } from '../payment/hooks/usePayment';
import { useToast } from '../../context/ToastContext';
import { useTranslation } from '../../i18n';
import { Card } from '../../components/Card/Card';
import { Badge } from '../../components/Badge/Badge';
import { Button } from '../../components/Button/Button';
import { Spinner } from '../../components/Spinner/Spinner';

export interface OrderDetailViewProps {
  order: Order;
}

const paymentRepo = new PaymentApiRepository();
const getPaymentByOrderId = makeGetPaymentByOrderIdUseCase(paymentRepo);

export const OrderDetailView = ({ order }: OrderDetailViewProps) => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { payment, isLoading: isCheckingPayment } = usePayment(order.id);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const formattedDate = new Date(order.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
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

  const handlePay = async () => {
    if (payment?.initPoint) {
      window.location.href = payment.initPoint;
      return;
    }

    setIsRedirecting(true);
    try {
      const paymentData = await getPaymentByOrderId(order.id);
      if (paymentData?.initPoint) {
        window.location.href = paymentData.initPoint;
      } else {
        showToast(t('orders.paymentSessionNotFound'), 'warning');
      }
    } catch {
      showToast(t('orders.paymentSessionNotFound'), 'warning');
    } finally {
      setIsRedirecting(false);
    }
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto' }}>
      {/* Back button */}
      <div style={{ marginBottom: '20px' }}>
        <Link to="/orders">
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft size={16} />}>
            {t('orders.backToOrders')}
          </Button>
        </Link>
      </div>

      {/* Main Order Card */}
      <Card variant="elevated" padding="lg" style={{ marginBottom: '24px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            borderBottom: '1px solid var(--color-border-default)',
            paddingBottom: '16px',
            marginBottom: '20px',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
              {t('orders.detailTitle', { id: order.id.substring(0, 8) })}
            </h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem',
                color: 'var(--color-text-muted)',
                marginTop: '4px',
              }}
            >
              <Calendar size={14} />
              <span>{t('orders.date', { date: formattedDate })}</span>
            </div>
          </div>

          <div>{getStatusBadge()}</div>
        </div>

        {/* Order Items Table */}
        <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border-default)', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                <th style={{ padding: '10px 0' }}>{t('products.detailsTitle')}</th>
                <th style={{ padding: '10px 0', textAlign: 'center' }}>{t('cart.quantity')}</th>
                <th style={{ padding: '10px 0', textAlign: 'right' }}>{t('cart.unitPrice')}</th>
                <th style={{ padding: '10px 0', textAlign: 'right' }}>{t('cart.subtotal')}</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: '1px solid var(--color-border-subtle)',
                    fontSize: '0.95rem',
                  }}
                >
                  <td style={{ padding: '12px 0', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {item.productName}
                  </td>
                  <td style={{ padding: '12px 0', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                    {item.quantity}
                  </td>
                  <td style={{ padding: '12px 0', textAlign: 'right', color: 'var(--color-text-secondary)' }}>
                    {formatOrderAmount(item.unitPrice)}
                  </td>
                  <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {formatOrderAmount(item.subtotal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '2px solid var(--color-border-default)',
            paddingTop: '16px',
            fontSize: '1.3rem',
            fontWeight: 800,
          }}
        >
          <span>{t('cart.total')}</span>
          <span style={{ color: 'var(--color-accent-highlight)' }}>
            {formatOrderAmount(order.totalAmount)}
          </span>
        </div>
      </Card>

      {/* Payment Information Card */}
      <Card variant="subtle" padding="lg">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <CreditCard size={20} color="var(--color-brand-primary)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            {t('checkout.paymentMethod')}
          </h3>
        </div>

        {isCheckingPayment ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)' }}>
            <Spinner size={16} />
            <span>{t('orders.checkingPayment')}</span>
          </div>
        ) : order.status === 'PAID' ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              backgroundColor: 'var(--color-status-success-subtle)',
              color: 'var(--color-status-success-text)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 500,
            }}
          >
            <CheckCircle2 size={20} />
            <span>{t('orders.paymentApprovedNotice')}</span>
          </div>
        ) : order.status === 'PENDING' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                backgroundColor: payment?.initPoint
                  ? 'var(--color-status-warning-subtle)'
                  : 'var(--color-surface-subtle)',
                color: payment?.initPoint
                  ? 'var(--color-status-warning-text)'
                  : 'var(--color-text-secondary)',
                borderRadius: 'var(--radius-md)',
                fontWeight: 500,
              }}
            >
              <AlertCircle size={20} />
              <span>
                {payment?.initPoint
                  ? t('orders.paymentPendingNotice')
                  : t('orders.paymentSessionNotFound')}
              </span>
            </div>

            <div>
              <Button
                variant="primary"
                size="lg"
                onClick={handlePay}
                isLoading={isRedirecting}
                rightIcon={<ExternalLink size={17} />}
              >
                {t('orders.payWithMercadoPago')}
              </Button>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              backgroundColor: 'var(--color-status-danger-subtle)',
              color: 'var(--color-status-danger-text)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 500,
            }}
          >
            <AlertCircle size={20} />
            <span>{t('orders.paymentCancelledNotice')}</span>
          </div>
        )}
      </Card>
    </div>
  );
};
