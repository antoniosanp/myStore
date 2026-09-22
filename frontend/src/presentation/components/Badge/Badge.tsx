import React, { type HTMLAttributes, type ReactNode } from 'react';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'accent';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
}

export const Badge = ({
  variant = 'neutral',
  size = 'md',
  children,
  style,
  ...props
}: BadgeProps) => {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'success':
        return {
          backgroundColor: 'var(--color-status-success-subtle)',
          color: 'var(--color-status-success-text)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
        };
      case 'warning':
        return {
          backgroundColor: 'var(--color-status-warning-subtle)',
          color: 'var(--color-status-warning-text)',
          border: '1px solid rgba(245, 158, 11, 0.2)',
        };
      case 'danger':
        return {
          backgroundColor: 'var(--color-status-danger-subtle)',
          color: 'var(--color-status-danger-text)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
        };
      case 'info':
        return {
          backgroundColor: 'var(--color-status-info-subtle)',
          color: 'var(--color-status-info-text)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
        };
      case 'accent':
        return {
          backgroundColor: 'var(--color-accent-highlight-subtle)',
          color: 'var(--color-accent-highlight-text)',
          border: '1px solid rgba(217, 119, 6, 0.2)',
        };
      case 'neutral':
      default:
        return {
          backgroundColor: 'var(--color-surface-subtle)',
          color: 'var(--color-text-secondary)',
          border: '1px solid var(--color-border-default)',
        };
    }
  };

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: size === 'sm' ? '2px 6px' : '4px 10px',
    fontSize: size === 'sm' ? '0.75rem' : '0.8rem',
    fontWeight: 600,
    borderRadius: 'var(--radius-full)',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    ...getVariantStyles(),
    ...style,
  };

  return (
    <span style={baseStyle} {...props}>
      {children}
    </span>
  );
};
