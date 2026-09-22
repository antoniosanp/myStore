import React from 'react';
import { useTranslation } from '../../i18n';

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        marginTop: 'auto',
        backgroundColor: 'var(--color-surface-card)',
        borderTop: '1px solid var(--color-border-default)',
        padding: '32px 20px',
        color: 'var(--color-text-secondary)',
        fontSize: '0.9rem',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          textAlign: 'center',
        }}
      >
        <p style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
          🛍️ {t('common.appName')}
        </p>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          {t('footer.tagline')}
        </p>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
          &copy; {currentYear} {t('common.appName')}. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
};
