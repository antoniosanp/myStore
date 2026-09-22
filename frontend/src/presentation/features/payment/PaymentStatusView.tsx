import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, ShoppingBag } from 'lucide-react';
import { useTranslation } from '../../i18n';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';

export interface PaymentStatusViewProps {
  status: 'success' | 'failure' | 'pending';
}

export const PaymentStatusView = ({ status }: PaymentStatusViewProps) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const externalReference = searchParams.get('external_reference') || searchParams.get('orderId');

  const getStatusContent = () => {
    switch (status) {
      case 'success':
        return {
          icon: <CheckCircle size={56} color="var(--color-status-success)" />,
          title: t('payment.successTitle'),
          subtitle: t('payment.successSubtitle'),
          btnVariant: 'primary' as const,
        };
      case 'failure':
        return {
          icon: <XCircle size={56} color="var(--color-status-danger)" />,
          title: t('payment.failureTitle'),
          subtitle: t('payment.failureSubtitle'),
          btnVariant: 'danger' as const,
        };
      case 'pending':
      default:
        return {
          icon: <Clock size={56} color="var(--color-status-warning)" />,
          title: t('payment.pendingTitle'),
          subtitle: t('payment.pendingSubtitle'),
          btnVariant: 'primary' as const,
        };
    }
  };

  const content = getStatusContent();

  return (
    <div style={{ maxWidth: '520px', margin: '48px auto', textAlign: 'center' }}>
      <Card variant="elevated" padding="lg">
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          {content.icon}
        </div>

        <h1
          style={{
            fontSize: '1.6rem',
            fontWeight: 800,
            marginBottom: '10px',
            color: 'var(--color-text-primary)',
          }}
        >
          {content.title}
        </h1>

        <p
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: '0.95rem',
            marginBottom: '20px',
            lineHeight: 1.5,
          }}
        >
          {content.subtitle}
        </p>

        {externalReference && (
          <div
            style={{
              padding: '10px 14px',
              backgroundColor: 'var(--color-surface-subtle)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              marginBottom: '24px',
            }}
          >
            {t('payment.orderReference', { orderId: externalReference })}
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {externalReference ? (
            <Link to={`/orders/${externalReference}`}>
              <Button variant="primary">
                {t('payment.viewOrderButton')}
              </Button>
            </Link>
          ) : (
            <Link to="/orders">
              <Button variant="primary">
                {t('payment.viewOrderButton')}
              </Button>
            </Link>
          )}

          <Link to="/">
            <Button variant="secondary" leftIcon={<ShoppingBag size={16} />}>
              {t('payment.backToStoreButton')}
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};
