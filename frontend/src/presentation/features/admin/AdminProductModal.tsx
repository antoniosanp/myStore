import React, { useState } from 'react';
import type { Product } from '../../../../domain/models/Product';
import type { CreateProductInput, UpdateProductInput } from '../../../../domain/repositories/ProductRepository';
import { useTranslation } from '../../../i18n';
import { Modal } from '../../../components/Modal/Modal';
import { Input } from '../../../components/Input/Input';
import { Select } from '../../../components/Select/Select';
import { Button } from '../../../components/Button/Button';
import type { CategoryItem, ManufacturerItem } from './hooks/useAdmin';

export interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  categories: CategoryItem[];
  manufacturers: ManufacturerItem[];
  onSave: (data: CreateProductInput | UpdateProductInput) => Promise<void>;
  isLoading: boolean;
}

export const AdminProductModal = ({
  isOpen,
  onClose,
  product,
  categories,
  manufacturers,
  onSave,
  isLoading,
}: AdminProductModalProps) => {
  const { t } = useTranslation();

  const [sku, setSku] = useState(product?.sku || '');
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price?.toString() || '');
  const [stock, setStock] = useState(product?.stock?.toString() || '');
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || '');
  const [manufacturerId, setManufacturerId] = useState('');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditing = !!product;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!sku.trim()) errs.sku = 'SKU is required';
    if (!name.trim()) errs.name = 'Name is required';
    if (!price || isNaN(Number(price)) || Number(price) <= 0) errs.price = 'Valid positive price required';
    if (!stock || isNaN(Number(stock)) || Number(stock) < 0) errs.stock = 'Valid non-negative stock required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      sku: sku.trim(),
      name: name.trim(),
      description: description.trim() || undefined,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      imageUrl: imageUrl.trim() || undefined,
      manufacturerId: manufacturerId || undefined,
      categoryIds: selectedCategoryIds.length > 0 ? selectedCategoryIds : undefined,
    };

    await onSave(payload);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? t('admin.editProductTitle') : t('admin.createProductTitle')}
      maxWidth="600px"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Input
            label={t('admin.skuLabel')}
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            error={errors.sku}
            disabled={isEditing}
          />
          <Input
            label={t('admin.nameLabel')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
            {t('admin.descriptionLabel')}
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            style={{
              padding: '10px 14px',
              fontSize: '0.95rem',
              backgroundColor: 'var(--color-surface-subtle)',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--color-border-default)',
              borderRadius: 'var(--radius-md)',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Input
            type="number"
            step="0.01"
            label={t('admin.priceLabel')}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            error={errors.price}
          />
          <Input
            type="number"
            label={t('admin.stockLabel')}
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            error={errors.stock}
          />
        </div>

        <Input
          label={t('admin.imageUrlLabel')}
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://images.unsplash.com/..."
        />

        {manufacturers.length > 0 && (
          <Select
            label={t('admin.manufacturerLabel')}
            value={manufacturerId}
            onChange={(e) => setManufacturerId(e.target.value)}
          >
            <option value="">Select a manufacturer...</option>
            {manufacturers.map((man) => (
              <option key={man.id} value={man.id}>
                {man.name}
              </option>
            ))}
          </Select>
        )}

        {categories.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
              {t('admin.categoriesLabel')}
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map((cat) => {
                const isSelected = selectedCategoryIds.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategoryIds((prev) =>
                        isSelected ? prev.filter((id) => id !== cat.id) : [...prev, cat.id]
                      );
                    }}
                    style={{
                      padding: '6px 12px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid',
                      borderColor: isSelected ? 'var(--color-brand-primary)' : 'var(--color-border-default)',
                      backgroundColor: isSelected ? 'var(--color-brand-primary)' : 'var(--color-surface-subtle)',
                      color: isSelected ? '#FFFFFF' : 'var(--color-text-secondary)',
                      cursor: 'pointer',
                    }}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
          <Button variant="outline" type="button" onClick={onClose} disabled={isLoading}>
            {t('common.cancel')}
          </Button>
          <Button variant="primary" type="submit" isLoading={isLoading}>
            {t('common.save')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
