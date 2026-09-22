import React, { type InputHTMLAttributes, type ReactNode, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, id, style, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
        {label && (
          <label
            htmlFor={inputId}
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
            }}
          >
            {label}
          </label>
        )}

        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {leftIcon && (
            <span
              style={{
                position: 'absolute',
                left: '12px',
                display: 'flex',
                alignItems: 'center',
                color: 'var(--color-text-muted)',
                pointerEvents: 'none',
              }}
            >
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            style={{
              width: '100%',
              padding: leftIcon ? '10px 14px 10px 40px' : rightIcon ? '10px 40px 10px 14px' : '10px 14px',
              fontSize: '0.95rem',
              backgroundColor: 'var(--color-surface-subtle)',
              color: 'var(--color-text-primary)',
              border: `1px solid ${error ? 'var(--color-status-danger)' : 'var(--color-border-default)'}`,
              borderRadius: 'var(--radius-md)',
              outline: 'none',
              transition: 'border-color var(--transition-speed), box-shadow var(--transition-speed)',
              ...style,
            }}
            {...props}
          />

          {rightIcon && (
            <span
              style={{
                position: 'absolute',
                right: '12px',
                display: 'flex',
                alignItems: 'center',
                color: 'var(--color-text-muted)',
              }}
            >
              {rightIcon}
            </span>
          )}
        </div>

        {error && (
          <span style={{ fontSize: '0.8rem', color: 'var(--color-status-danger)', fontWeight: 500 }}>
            {error}
          </span>
        )}

        {!error && helperText && (
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
