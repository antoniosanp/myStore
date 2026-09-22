import { useOrders } from '../features/orders/hooks/useOrders';
import { OrderList } from '../features/orders/OrderList';
import { useTranslation } from '../i18n';

export const OrdersPage = () => {
  const { orders, isLoading } = useOrders();
  const { t } = useTranslation();

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '32px 20px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
          {t('orders.title')}
        </h1>
      </div>

      <OrderList orders={orders} isLoading={isLoading} />
    </div>
  );
};
