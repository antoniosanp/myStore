import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Order } from '../../domain/models/Order';
import { OrderApiRepository } from '../../infrastructure/repositories/OrderApiRepository';
import { makeGetOrderByIdUseCase } from '../../application/orderUseCases/getOrderByIdUseCase';
import { OrderDetailView } from '../features/orders/OrderDetailView';
import { Spinner } from '../components/Spinner/Spinner';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { useTranslation } from '../i18n';

const orderRepo = new OrderApiRepository();
const getOrderById = makeGetOrderByIdUseCase(orderRepo);

export const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    getOrderById(id)
      .then((data) => {
        if (!isMounted) return;
        setOrder(data);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : 'Error fetching order');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 20px' }}>
        <Spinner size={36} color="var(--color-brand-primary)" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div style={{ padding: '40px 20px' }}>
        <EmptyState
          title={t('common.errorTitle')}
          subtitle={error || t('orders.emptyTitle')}
        />
      </div>
    );
  }

  return (
    <div style={{ padding: '32px 20px' }}>
      <OrderDetailView order={order} />
    </div>
  );
};
