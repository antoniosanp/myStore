import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useToast, type ToastType } from '../../context/ToastContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={18} color="var(--color-status-success)" />;
      case 'error':
        return <AlertCircle size={18} color="var(--color-status-danger)" />;
      case 'warning':
        return <AlertTriangle size={18} color="var(--color-status-warning)" />;
      case 'info':
      default:
        return <Info size={18} color="var(--color-status-info)" />;
    }
  };

  const getBorderColor = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'var(--color-status-success)';
      case 'error':
        return 'var(--color-status-danger)';
      case 'warning':
        return 'var(--color-status-warning)';
      case 'info':
      default:
        return 'var(--color-status-info)';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '380px',
        width: 'calc(100% - 40px)',
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            padding: '12px 16px',
            backgroundColor: 'var(--color-surface-raised)',
            color: 'var(--color-text-primary)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-modal)',
            borderLeft: `4px solid ${getBorderColor(toast.type)}`,
            fontSize: '0.9rem',
            fontWeight: 500,
            animation: 'slideInRight 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {getIcon(toast.type)}
            <span>{toast.message}</span>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            aria-label="Close notification"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '2px',
            }}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
