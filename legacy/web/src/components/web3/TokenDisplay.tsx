'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { UsdcCircleColorful, SolanaCircleColorful } from '@ant-design/web3-icons';
import { formatNumber } from '@/lib/utils';

export interface TokenDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Token balance amount */
  amount: number | string;
  /** Token symbol (USDC, SOL, etc.) */
  symbol: 'USDC' | 'SOL' | 'BTC' | 'ETH';
  /** Show full decimal precision */
  showDecimals?: boolean;
  /** Display size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Show token icon */
  showIcon?: boolean;
  /** Custom icon class name */
  iconClassName?: string;
  /** Label text */
  label?: string;
  /** Color variant */
  variant?: 'default' | 'muted' | 'accent';
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-2xl',
};

const iconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

const variantClasses = {
  default: 'text-foreground',
  muted: 'text-muted-foreground',
  accent: 'text-primary',
};

export function TokenDisplay({
  amount,
  symbol,
  showDecimals = true,
  size = 'md',
  showIcon = true,
  iconClassName,
  label,
  variant = 'default',
  className,
  ...props
}: TokenDisplayProps) {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  const formattedAmount = showDecimals
    ? formatNumber(numericAmount, { minimumFractionDigits: 2, maximumFractionDigits: 6 })
    : formatNumber(numericAmount, { maximumFractionDigits: 0 });

  const TokenIcon = symbol === 'SOL' ? SolanaCircleColorful : UsdcCircleColorful;

  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      {showIcon && (
        <TokenIcon
          className={cn('flex-shrink-0', iconClassName)}
          style={{ width: iconSizes[size], height: iconSizes[size] }}
        />
      )}
      <div className="flex flex-col">
        {label && (
          <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
        )}
        <div className="flex items-baseline gap-1">
          <span
            className={cn('font-semibold tabular-nums', sizeClasses[size], variantClasses[variant])}
          >
            {formattedAmount}
          </span>
          <span className={cn('font-medium text-muted-foreground', sizeClasses[size])}>
            {symbol}
          </span>
        </div>
      </div>
    </div>
  );
}
