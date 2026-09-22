import { useState, useMemo } from 'react';
import { useProducts } from '../features/products/hooks/useProducts';
import { ProductFilter } from '../features/products/ProductFilter';
import { ProductGrid } from '../features/products/ProductGrid';
import { Pagination } from '../components/Pagination';
import { useTranslation } from '../i18n';

const ITEMS_PER_PAGE = 12;

export const HomePage = () => {
  const { products, isLoading } = useProducts();
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('name_asc');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleInStockToggle = (inStock: boolean) => {
    setInStockOnly(inStock);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

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

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const safeCurrentPage = useMemo(() => {
    if (totalPages > 0 && currentPage > totalPages) return 1;
    return currentPage;
  }, [currentPage, totalPages]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, safeCurrentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        categories={categories}
        inStockOnly={inStockOnly}
        onInStockToggle={handleInStockToggle}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />

      <ProductGrid products={paginatedProducts} isLoading={isLoading} />

      {!isLoading && filteredProducts.length > 0 && (
        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={filteredProducts.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      )}
    </div>
  );
};
