import React from 'react';

export interface SpinnerProps {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Spinner = ({
  size = 20,
  color = 'currentColor',
  style,
}: SpinnerProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        animation: 'spin 0.8s linear infinite',
        display: 'inline-block',
        verticalAlign: 'middle',
        ...style,
      }}
    >
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};
