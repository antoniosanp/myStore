import { useState, useMemo } from 'react';
import { useProducts } from '../features/products/hooks/useProducts';
import { ProductFilter } from '../features/products/ProductFilter';
import { ProductGrid } from '../features/products/ProductGrid';
import { useTranslation } from '../i18n';

export const HomePage = () => {
  const { products, isLoading } = useProducts();
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('name_asc');

  // Extract unique category names from catalog
  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((p) => {
      p.categoryNames?.forEach((c) => cats.add(c));
    });
    return Array.from(cats).sort();
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query filter (matches name or sku)
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(query);
          const matchSku = p.sku.toLowerCase().includes(query);
          if (!matchName && !matchSku) return false;
        }

        // Category filter
        if (selectedCategory) {
          if (!p.categoryNames?.includes(selectedCategory)) return false;
        }

        // Stock filter
        if (inStockOnly) {
          if (p.stock <= 0 || !p.isActive) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        // Default name_asc
        return a.name.localeCompare(b.name);
      });
  }, [products, searchQuery, selectedCategory, inStockOnly, sortBy]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1
          style={{
            fontSize: '1.85rem',
            fontWeight: 800,
            color: 'var(--color-text-primary)',
            marginBottom: '6px',
          }}
        >
          {t('products.catalogTitle')}
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          {t('footer.tagline')}
        </p>
      </div>

      <ProductFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
        inStockOnly={inStockOnly}
        onInStockToggle={setInStockOnly}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <ProductGrid products={filteredProducts} isLoading={isLoading} />
    </div>
  );
};
