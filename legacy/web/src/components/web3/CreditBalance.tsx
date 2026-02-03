'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Coins, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { formatNumber } from '@/lib/utils';

export interface CreditBalanceProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Credit balance amount */
  credits: number;
  /** Show USD conversion */
  showUsdConversion?: boolean;
  /** Credit conversion rate (default: 1000 credits = $1) */
  conversionRate?: number;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Show trend */
  trend?: {
    value: number;
    period: string;
  };
  /** Show icon */
  showIcon?: boolean;
  /** Custom label */
  label?: string;
  /** Compact mode (no card wrapper) */
  compact?: boolean;
  /** Click handler */
  onClick?: () => void;
}

const CREDITS_PER_USD = 1000;

const sizeClasses = {
  sm: {
    amount: 'text-lg',
    usd: 'text-xs',
    icon: 'h-4 w-4',
  },
  md: {
    amount: 'text-2xl',
    usd: 'text-sm',
    icon: 'h-5 w-5',
  },
  lg: {
    amount: 'text-4xl',
    usd: 'text-base',
    icon: 'h-6 w-6',
  },
  xl: {
    amount: 'text-5xl',
    usd: 'text-lg',
    icon: 'h-7 w-7',
  },
};

export function CreditBalance({
  credits,
  showUsdConversion = true,
  conversionRate = CREDITS_PER_USD,
  size = 'md',
  trend,
  showIcon = true,
  label,
  compact = false,
  onClick,
  className,
  ...props
}: CreditBalanceProps) {
  const usdValue = credits / conversionRate;
  const formattedCredits = formatNumber(credits, { maximumFractionDigits: 0 });
  const formattedUsd = formatNumber(usdValue, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const TrendIcon = trend && trend.value >= 0 ? TrendingUp : TrendingDown;
  const trendColor = trend && trend.value >= 0 ? 'text-success' : 'text-destructive';

  const content = (
    <div className={cn('flex flex-col gap-1', onClick && 'cursor-pointer')} onClick={onClick}>
      <div className="flex items-center gap-2">
        {showIcon && <Coins className={cn('flex-shrink-0 text-primary', sizeClasses[size].icon)} />}
        <div className="flex items-baseline gap-2">
          <span className={cn('font-bold tabular-nums text-foreground', sizeClasses[size].amount)}>
            {formattedCredits}
          </span>
          <span className="text-sm font-medium text-muted-foreground">credits</span>
        </div>
      </div>

      {showUsdConversion && (
        <div className="flex items-center gap-1.5">
          <DollarSign
            className={cn('flex-shrink-0 text-muted-foreground', sizeClasses[size].icon)}
          />
          <span className={cn('text-muted-foreground', sizeClasses[size].usd)}>
            ${formattedUsd} USD
          </span>
        </div>
      )}

      {trend && (
        <div className={cn('flex items-center gap-1', sizeClasses[size].usd, trendColor)}>
          <TrendIcon className="h-3 w-3" />
          <span className="font-medium">
            {trend.value >= 0 ? '+' : ''}
            {trend.value}%
          </span>
          <span className="text-muted-foreground">{trend.period}</span>
        </div>
      )}

      {label && (
        <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
      )}
    </div>
  );

  if (compact) {
    return (
      <div className={cn(className)} {...props}>
        {content}
      </div>
    );
  }

  return (
    <Card className={cn('hover:shadow-lg transition-shadow', className)} {...props}>
      <CardContent className="p-6">{content}</CardContent>
    </Card>
  );
}
