import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '../../i18n';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  const { t } = useTranslation();

  if (totalPages <= 1) return null;

  const getPageNumbers = (): (number | 'ellipsis')[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, 'ellipsis', totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [1, 'ellipsis', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages];
  };

  const pages = getPageNumbers();

  const fromItem = totalItems && itemsPerPage ? (currentPage - 1) * itemsPerPage + 1 : undefined;
  const toItem = totalItems && itemsPerPage ? Math.min(currentPage * itemsPerPage, totalItems) : undefined;

  return (
    <nav
      aria-label="Pagination Navigation"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        marginTop: '36px',
        marginBottom: '20px',
        width: '100%',
      }}
    >
      {/* Items Count Summary */}
      {totalItems !== undefined && fromItem !== undefined && toItem !== undefined && (
        <span
          style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-secondary)',
          }}
        >
          {t('pagination.showing', {
            from: fromItem,
            to: toItem,
            total: totalItems,
          })}
        </span>
      )}

      {/* Pagination Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label={t('pagination.previous')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '8px 12px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-default)',
            backgroundColor: 'var(--color-surface-card)',
            color: currentPage <= 1 ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
            cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
            fontSize: '0.875rem',
            fontWeight: 500,
            transition: 'all var(--transition-speed)',
            opacity: currentPage <= 1 ? 0.6 : 1,
          }}
        >
          <ChevronLeft size={16} />
          <span>{t('pagination.previous')}</span>
        </button>

        {/* Page Numbers */}
        {pages.map((page, idx) => {
          if (page === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${idx}`}
                style={{
                  padding: '8px 6px',
                  color: 'var(--color-text-muted)',
                  userSelect: 'none',
                }}
              >
                &hellip;
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`Page ${page}`}
              style={{
                minWidth: '38px',
                height: '38px',
                padding: '0 8px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                fontWeight: isActive ? 700 : 500,
                border: isActive
                  ? '1px solid var(--color-brand-primary)'
                  : '1px solid var(--color-border-default)',
                backgroundColor: isActive
                  ? 'var(--color-brand-primary)'
                  : 'var(--color-surface-card)',
                color: isActive
                  ? 'var(--color-brand-primary-contrast)'
                  : 'var(--color-text-primary)',
                cursor: 'pointer',
                transition: 'all var(--transition-speed)',
                boxShadow: isActive ? '0 1px 3px rgba(37, 99, 235, 0.3)' : 'none',
              }}
            >
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label={t('pagination.next')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '8px 12px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-default)',
            backgroundColor: 'var(--color-surface-card)',
            color: currentPage >= totalPages ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
            cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
            fontSize: '0.875rem',
            fontWeight: 500,
            transition: 'all var(--transition-speed)',
            opacity: currentPage >= totalPages ? 0.6 : 1,
          }}
        >
          <span>{t('pagination.next')}</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  );
};
