import React, { type HTMLAttributes, type ReactNode } from 'react';

export type CardVariant = 'elevated' | 'outlined' | 'subtle';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  children: ReactNode;
}

export const Card = ({
  variant = 'elevated',
  padding = 'md',
  children,
  style,
  ...props
}: CardProps) => {
  const getPadding = () => {
    switch (padding) {
      case 'none':
        return '0';
      case 'sm':
        return '12px';
      case 'lg':
        return '24px';
      case 'md':
      default:
        return '16px';
    }
  };

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: 'var(--color-surface-card)',
          border: '1px solid var(--color-border-default)',
          boxShadow: 'none',
        };
      case 'subtle':
        return {
          backgroundColor: 'var(--color-surface-subtle)',
          border: '1px solid var(--color-border-subtle)',
          boxShadow: 'none',
        };
      case 'elevated':
      default:
        return {
          backgroundColor: 'var(--color-surface-card)',
          border: '1px solid var(--color-border-subtle)',
          boxShadow: 'var(--shadow-card)',
        };
    }
  };

  const baseStyle: React.CSSProperties = {
    borderRadius: 'var(--radius-lg)',
    padding: getPadding(),
    transition: 'background-color var(--transition-speed), border-color var(--transition-speed), box-shadow var(--transition-speed)',
    ...getVariantStyles(),
    ...style,
  };

  return (
    <div style={baseStyle} {...props}>
      {children}
    </div>
  );
};
