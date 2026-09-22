import { useState } from 'react';
import { Plus, Package, ShoppingBag } from 'lucide-react';
import type { Product } from '../../../domain/models/Product';
import type { CreateProductInput, UpdateProductInput } from '../../../domain/repositories/ProductRepository';
import { useAdmin } from '../features/admin/hooks/useAdmin';
import { AdminProductList } from '../features/admin/AdminProductList';
import { AdminOrderList } from '../features/admin/AdminOrderList';
import { AdminProductModal } from '../features/admin/AdminProductModal';
import { useTranslation } from '../i18n';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/Button/Button';

export const AdminPage = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const {
    products,
    orders,
    categories,
    manufacturers,
    isProductsLoading,
    isOrdersLoading,
    actionLoading,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleSaveProduct = async (data: CreateProductInput | UpdateProductInput) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, data as UpdateProductInput);
      } else {
        await createProduct(data as CreateProductInput);
      }
      showToast(t('admin.productSavedSuccess'), 'success');
      setModalOpen(false);
    } catch {
      showToast(t('common.errorTitle'), 'error');
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    const confirm = window.confirm(
      t('admin.deleteConfirmMessage', { name })
    );
    if (!confirm) return;

    try {
      await deleteProduct(id);
      showToast(t('admin.productDeletedSuccess'), 'success');
    } catch {
      showToast(t('common.errorTitle'), 'error');
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            {t('admin.title')}
          </h1>
        </div>

        {activeTab === 'products' && (
          <Button
            variant="primary"
            onClick={handleOpenCreateModal}
            leftIcon={<Plus size={18} />}
          >
            {t('admin.newProductButton')}
          </Button>
        )}
      </div>

      {/* Tabs Toolbar */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid var(--color-border-default)',
          marginBottom: '24px',
        }}
      >
        <button
          onClick={() => setActiveTab('products')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            fontSize: '0.95rem',
            fontWeight: 600,
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'products' ? '2px solid var(--color-brand-primary)' : '2px solid transparent',
            color: activeTab === 'products' ? 'var(--color-brand-primary)' : 'var(--color-text-secondary)',
            cursor: 'pointer',
            transition: 'all var(--transition-speed)',
          }}
        >
          <Package size={18} />
          <span>{t('admin.tabProducts')}</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            fontSize: '0.95rem',
            fontWeight: 600,
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'orders' ? '2px solid var(--color-brand-primary)' : '2px solid transparent',
            color: activeTab === 'orders' ? 'var(--color-brand-primary)' : 'var(--color-text-secondary)',
            cursor: 'pointer',
            transition: 'all var(--transition-speed)',
          }}
        >
          <ShoppingBag size={18} />
          <span>{t('admin.tabOrders')}</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'products' ? (
        <AdminProductList
          products={products}
          isLoading={isProductsLoading}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteProduct}
        />
      ) : (
        <AdminOrderList orders={orders} isLoading={isOrdersLoading} />
      )}

      {/* Product Create/Edit Modal */}
      {modalOpen && (
        <AdminProductModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          product={editingProduct}
          categories={categories}
          manufacturers={manufacturers}
          onSave={handleSaveProduct}
          isLoading={actionLoading}
        />
      )}
    </div>
  );
};
