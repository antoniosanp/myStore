import React from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from '../../i18n';
import { Input } from '../../components/Input/Input';
import { Select } from '../../components/Select/Select';

export interface ProductFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  inStockOnly: boolean;
  onInStockToggle: (inStock: boolean) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const ProductFilter = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  inStockOnly,
  onInStockToggle,
  sortBy,
  onSortChange,
}: ProductFilterProps) => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '14px',
        alignItems: 'center',
        padding: '16px 20px',
        backgroundColor: 'var(--color-surface-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border-default)',
        marginBottom: '24px',
      }}
    >
      {/* Search Input */}
      <div style={{ flex: '1 1 240px' }}>
        <Input
          type="text"
          placeholder={t('products.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          leftIcon={<Search size={18} />}
        />
      </div>

      {/* Category Dropdown */}
      <div style={{ flex: '0 1 200px' }}>
        <Select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">{t('products.filterAllCategories')}</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
      </div>

      {/* Sort Dropdown */}
      <div style={{ flex: '0 1 200px' }}>
        <Select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="name_asc">{t('products.sortNameAsc')}</option>
          <option value="price_asc">{t('products.sortPriceAsc')}</option>
          <option value="price_desc">{t('products.sortPriceDesc')}</option>
        </Select>
      </div>

      {/* In Stock Checkbox Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
        <input
          type="checkbox"
          id="in-stock-only"
          checked={inStockOnly}
          onChange={(e) => onInStockToggle(e.target.checked)}
          style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: 'var(--color-brand-primary)' }}
        />
        <label
          htmlFor="in-stock-only"
          style={{
            fontSize: '0.85rem',
            fontWeight: 500,
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
          }}
        >
          {t('products.inStockOnly')}
        </label>
      </div>
    </div>
  );
};
