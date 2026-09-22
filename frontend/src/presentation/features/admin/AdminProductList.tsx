import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import type { Product } from '../../../domain/models/Product';
import { formatProductPrice } from '../../../domain/models/Product';
import { useTranslation } from '../../i18n';
import { Card } from '../../components/Card/Card';
import { Badge } from '../../components/Badge/Badge';
import { Button } from '../../components/Button/Button';
import { Spinner } from '../../components/Spinner/Spinner';

export interface AdminProductListProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string, name: string) => void;
}

export const AdminProductList = ({
  products,
  isLoading,
  onEdit,
  onDelete,
}: AdminProductListProps) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <Spinner size={32} color="var(--color-brand-primary)" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <Card variant="outlined" padding="lg" style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
        {t('admin.noProductsFound')}
      </Card>
    );
  }

  return (
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
            <th style={{ padding: '12px 16px' }}>{t('admin.tableSku')}</th>
            <th style={{ padding: '12px 16px' }}>{t('admin.tableName')}</th>
            <th style={{ padding: '12px 16px' }}>{t('admin.tableBrand')}</th>
            <th style={{ padding: '12px 16px', textAlign: 'right' }}>{t('admin.tablePrice')}</th>
            <th style={{ padding: '12px 16px', textAlign: 'center' }}>{t('admin.tableStock')}</th>
            <th style={{ padding: '12px 16px', textAlign: 'center' }}>{t('admin.tableStatus')}</th>
            <th style={{ padding: '12px 16px', textAlign: 'right' }}>{t('admin.tableActions')}</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr
              key={p.id}
              style={{
                borderBottom: '1px solid var(--color-border-subtle)',
                transition: 'background-color var(--transition-speed)',
              }}
            >
              <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                {p.sku}
              </td>
              <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {p.name}
              </td>
              <td style={{ padding: '12px 16px', color: 'var(--color-text-secondary)' }}>
                {p.manufacturerName || '-'}
              </td>
              <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700 }}>
                {formatProductPrice(p.price)}
              </td>
              <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                <span style={{ fontWeight: 600, color: p.stock > 0 ? 'var(--color-text-primary)' : 'var(--color-status-danger)' }}>
                  {p.stock}
                </span>
              </td>
              <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                {p.isActive ? (
                  <Badge variant="success" size="sm">
                    {t('admin.statusActive')}
                  </Badge>
                ) : (
                  <Badge variant="neutral" size="sm">
                    {t('admin.statusInactive')}
                  </Badge>
                )}
              </td>
              <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(p)}
                    title={t('common.edit')}
                    style={{ padding: '6px' }}
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(p.id, p.name)}
                    title={t('common.delete')}
                    style={{ padding: '6px', color: 'var(--color-status-danger)' }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
