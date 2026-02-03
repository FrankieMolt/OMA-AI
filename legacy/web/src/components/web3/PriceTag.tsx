'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Tag, DollarSign, Coins, TrendingUp, Zap } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { formatNumber } from '@/lib/utils';

const priceVariants = cva(
  'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-sm font-medium transition-all',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 text-primary border-primary/20',
        secondary: 'bg-secondary text-secondary-foreground border-secondary/20',
        outline: 'bg-background border-border hover:bg-accent',
        accent: 'bg-accent text-accent-foreground border-accent/20',
        success: 'bg-success/10 text-success border-success/20',
        warning: 'bg-warning/10 text-warning border-warning/20',
        danger: 'bg-destructive/10 text-destructive border-destructive/20',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
        xl: 'px-4 py-2 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export type PriceType = 'free' | 'paid' | 'subscription' | 'credits' | 'per_token' | 'per_request';

export interface PriceTagProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof priceVariants> {
  /** Price amount */
  amount: number;
  /** Price type */
  type?: PriceType;
  /** Currency symbol */
  currency?: string;
  /** Show original price (for discounts) */
  originalPrice?: number;
  /** Show trend */
  trend?: 'up' | 'down' | 'flat';
  /** Show icon */
  showIcon?: boolean;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Show period (e.g., /month, /year) */
  period?: string;
  /** Show conversion to credits */
  showCreditConversion?: boolean;
  /** Credit conversion rate */
  creditRate?: number;
  /** Highlight discount */
  showDiscount?: boolean;
  /** Compact mode */
  compact?: boolean;
  /** Custom formatter */
  formatter?: (amount: number) => string;
}

const typeIcons: Record<PriceType, React.ReactNode> = {
  free: <Zap className="h-4 w-4" />,
  paid: <DollarSign className="h-4 w-4" />,
  subscription: <TrendingUp className="h-4 w-4" />,
  credits: <Coins className="h-4 w-4" />,
  per_token: <Tag className="h-4 w-4" />,
  per_request: <Zap className="h-4 w-4" />,
};

const typeLabels: Record<PriceType, string> = {
  free: 'Free',
  paid: '',
  subscription: '',
  credits: 'credits',
  per_token: '/token',
  per_request: '/request',
};

const CREDITS_PER_USD = 1000;

export function PriceTag({
  amount,
  type = 'paid',
  currency = '$',
  originalPrice,
  trend,
  showIcon = true,
  icon,
  period,
  showCreditConversion = false,
  creditRate = CREDITS_PER_USD,
  showDiscount = false,
  formatter,
  variant = 'default',
  size = 'md',
  className,
  ...props
}: PriceTagProps) {
  const formattedAmount = formatter
    ? formatter(amount)
    : type === 'credits'
      ? formatNumber(amount, { maximumFractionDigits: 0 })
      : formatNumber(amount, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const discountPercentage =
    originalPrice && originalPrice > 0
      ? Math.round(((originalPrice - amount) / originalPrice) * 100)
      : 0;

  const creditAmount =
    type !== 'free' && type !== 'credits' ? Math.round(amount * creditRate) : null;

  const displayIcon = icon || (showIcon ? typeIcons[type] : null);
  const displayLabel = typeLabels[type];

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingUp : null;

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(priceVariants({ variant, size }), 'flex items-center gap-1.5', className)}
        {...props}
      >
        {displayIcon && <span className="flex-shrink-0">{displayIcon}</span>}

        {/* Free Badge */}
        {type === 'free' && <span className="font-semibold">Free</span>}

        {/* Regular Price */}
        {type !== 'free' && (
          <div className="flex items-baseline gap-1">
            {originalPrice && showDiscount && (
              <span className="text-xs line-through text-muted-foreground">
                {formatter
                  ? formatter(originalPrice)
                  : formatNumber(originalPrice, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                {currency}
              </span>
            )}
            {currency && type !== 'credits' && (
              <span className="text-muted-foreground">{currency}</span>
            )}
            <span className="font-bold tabular-nums">{formattedAmount}</span>
            {displayLabel && <span className="text-xs font-normal opacity-80">{displayLabel}</span>}
            {period && <span className="text-xs font-normal opacity-80">{period}</span>}
          </div>
        )}

        {/* Discount Badge */}
        {showDiscount && discountPercentage > 0 && (
          <span className="ml-1 text-xs font-bold text-success">
            -{discountPercentage}%
          </span>
        )}

        {/* Trend Indicator */}
        {trend && TrendIcon && (
          <TrendIcon
            className={cn(
              'h-3 w-3 flex-shrink-0',
              trend === 'up' && 'text-success rotate-0',
              trend === 'down' && 'text-destructive rotate-180'
            )}
          />
        )}
      </div>

      {/* Credit Conversion */}
      {showCreditConversion && creditAmount !== null && (
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <Coins className="h-3 w-3" />
          {formatNumber(creditAmount, { maximumFractionDigits: 0 })} credits
        </div>
      )}
    </div>
  );
}

// Compact price display for cards
export function CompactPrice({
  amount,
  type = 'paid',
  currency = '$',
  className,
}: {
  amount: number;
  type?: PriceType;
  currency?: string;
  className?: string;
}) {
  if (type === 'free') {
    return (
      <div className={cn('text-xs font-medium text-success', className)}>
        Free
      </div>
    );
  }

  return (
    <div className={cn('text-sm font-bold tabular-nums', className)}>
      {currency}
      {formatNumber(amount, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </div>
  );
}
