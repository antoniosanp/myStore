import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTranslation } from '../i18n';
import { CartItemRow } from '../features/cart/CartItemRow';
import { CartSummary } from '../features/cart/CartSummary';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { Button } from '../components/Button/Button';
import { Card } from '../components/Card/Card';

export const CartPage = () => {
  const { items, clearCart } = useCart();
  const { t } = useTranslation();

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
        <EmptyState
          icon={<ShoppingBag size={56} />}
          title={t('cart.emptyTitle')}
          subtitle={t('cart.emptySubtitle')}
          action={
            <Link to="/">
              <Button variant="primary">{t('cart.browseProducts')}</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
          {t('cart.title')}
        </h1>

        <Button
          variant="ghost"
          size="sm"
          onClick={clearCart}
          leftIcon={<Trash2 size={16} />}
          style={{ color: 'var(--color-status-danger)' }}
        >
          {t('cart.clearCart')}
        </Button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'flex-start',
        }}
      >
        {/* Cart Items List */}
        <Card variant="elevated" padding="lg">
          {items.map((item) => (
            <CartItemRow key={item.product.id} item={item} />
          ))}
        </Card>

        {/* Order Summary Checkout Card */}
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
};
