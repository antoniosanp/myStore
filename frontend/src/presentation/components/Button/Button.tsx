import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Spinner } from '../Spinner/Spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  children,
  style,
  ...props
}: ButtonProps) => {
  const getPadding = () => {
    switch (size) {
      case 'sm':
        return '6px 12px';
      case 'lg':
        return '12px 24px';
      case 'md':
      default:
        return '9px 18px';
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'sm':
        return '0.85rem';
      case 'lg':
        return '1.05rem';
      case 'md':
      default:
        return '0.95rem';
    }
  };

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: 'var(--color-brand-secondary)',
          color: 'var(--color-brand-secondary-contrast)',
          border: '1px solid transparent',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-brand-primary)',
          border: '1px solid var(--color-brand-primary)',
        };
      case 'danger':
        return {
          backgroundColor: 'var(--color-status-danger)',
          color: '#FFFFFF',
          border: '1px solid transparent',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-text-primary)',
          border: '1px solid transparent',
        };
      case 'primary':
      default:
        return {
          backgroundColor: 'var(--color-brand-primary)',
          color: 'var(--color-brand-primary-contrast)',
          border: '1px solid transparent',
        };
    }
  };

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: getPadding(),
    fontSize: getFontSize(),
    fontWeight: 600,
    borderRadius: 'var(--radius-md)',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled || isLoading ? 0.65 : 1,
    transition: 'all var(--transition-speed)',
    outline: 'none',
    ...getVariantStyles(),
    ...style,
  };

  return (
    <button disabled={disabled || isLoading} style={baseStyle} {...props}>
      {isLoading && <Spinner size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
      {!isLoading && leftIcon}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};
