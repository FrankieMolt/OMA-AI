'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

export type TransactionStatusType = 'pending' | 'confirmed' | 'failed' | 'warning';

const statusVariants = cva(
  'inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-300',
  {
    variants: {
      status: {
        pending:
          'bg-warning/10 text-warning border border-warning/20',
        confirmed: 'bg-success/10 text-success border border-success/20',
        failed: 'bg-destructive/10 text-destructive border border-destructive/20',
        warning: 'bg-warning/10 text-warning border border-warning/20',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
      },
    },
    defaultVariants: {
      status: 'pending',
      size: 'md',
    },
  }
);

const statusIcons = {
  pending: Loader2,
  confirmed: CheckCircle2,
  failed: XCircle,
  warning: AlertCircle,
};

const statusLabels = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  failed: 'Failed',
  warning: 'Warning',
};

export interface TransactionStatusProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statusVariants> {
  /** Transaction status type */
  status: TransactionStatusType;
  /** Custom label text */
  label?: string;
  /** Show icon */
  showIcon?: boolean;
  /** Animation delay in ms (for pending state) */
  animationDelay?: number;
  /** Transaction signature or hash */
  signature?: string;
  /** On click handler for signature */
  onSignatureClick?: (signature: string) => void;
  /** Timestamp */
  timestamp?: string;
}

export function TransactionStatus({
  status,
  label,
  showIcon = true,
  animationDelay = 0,
  signature,
  onSignatureClick,
  timestamp,
  size = 'md',
  className,
  ...props
}: TransactionStatusProps) {
  const StatusIcon = statusIcons[status];
  const displayLabel = label || statusLabels[status];

  return (
    <div className="flex flex-col gap-1">
      <div className={cn(statusVariants({ status, size }), className)} {...props}>
        {showIcon && (
          <StatusIcon
            className={cn('flex-shrink-0', status === 'pending' && 'animate-spin', 'h-4 w-4')}
            style={{
              animationDelay: `${animationDelay}ms`,
            }}
          />
        )}
        <span>{displayLabel}</span>
        {timestamp && <span className="text-xs text-muted-foreground ml-2">{timestamp}</span>}
      </div>
      {signature && (
        <button
          onClick={() => onSignatureClick?.(signature)}
          className="text-xs text-muted-foreground hover:text-primary transition-colors font-mono max-w-[200px] truncate"
          title="Click to view transaction"
        >
          {`${signature.slice(0, 8)}...${signature.slice(-8)}`}
        </button>
      )}
    </div>
  );
}
