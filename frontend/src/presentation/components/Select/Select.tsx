import React, { type SelectHTMLAttributes, forwardRef } from 'react';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: SelectOption[];
  helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options = [], helperText, id, children, style, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
        {label && (
          <label
            htmlFor={selectId}
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
            }}
          >
            {label}
          </label>
        )}

        <select
          ref={ref}
          id={selectId}
          aria-invalid={!!error}
          style={{
            width: '100%',
            padding: '10px 14px',
            fontSize: '0.95rem',
            backgroundColor: 'var(--color-surface-subtle)',
            color: 'var(--color-text-primary)',
            border: `1px solid ${error ? 'var(--color-status-danger)' : 'var(--color-border-default)'}`,
            borderRadius: 'var(--radius-md)',
            outline: 'none',
            cursor: 'pointer',
            transition: 'border-color var(--transition-speed)',
            ...style,
          }}
          {...props}
        >
          {children
            ? children
            : options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
        </select>

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

Select.displayName = 'Select';
