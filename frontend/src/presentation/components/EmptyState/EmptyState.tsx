import React, { type ReactNode } from 'react';
import { Card } from '../Card/Card';

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export const EmptyState = ({ icon, title, subtitle, action }: EmptyStateProps) => {
  return (
    <Card
      variant="outlined"
      padding="lg"
      style={{
        textAlign: 'center',
        padding: '48px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '20px auto',
        maxWidth: '560px',
      }}
    >
      {icon && (
        <div
          style={{
            marginBottom: '16px',
            color: 'var(--color-text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </div>
      )}

      <h3
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: '8px',
        }}
      >
        {title}
      </h3>

      {subtitle && (
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--color-text-secondary)',
            marginBottom: action ? '24px' : '0',
            maxWidth: '420px',
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </p>
      )}

      {action && <div>{action}</div>}
    </Card>
  );
};
