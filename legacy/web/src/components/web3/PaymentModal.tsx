'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CreditBalance } from './CreditBalance';
import { Loader2, CheckCircle2, AlertCircle, Zap } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export interface PaymentItem {
  id: string;
  name: string;
  description?: string;
  credits: number;
  quantity?: number;
}

export interface PaymentModalProps {
  /** Modal open state */
  open: boolean;
  /** Modal close handler */
  onOpenChange: (open: boolean) => void;
  /** Payment items to process */
  items: PaymentItem[];
  /** User's current credit balance */
  currentBalance: number;
  /** Confirm payment handler */
  onConfirm: (items: PaymentItem[]) => Promise<void>;
  /** Payment processing state */
  isProcessing?: boolean;
  /** Payment status */
  status?: 'idle' | 'processing' | 'success' | 'error';
  /** Error message */
  error?: string;
  /** Additional footer content */
  footerContent?: React.ReactNode;
  /** Custom title */
  title?: string;
  /** Custom description */
  description?: string;
  /** Show credit conversion */
  showConversion?: boolean;
  /** Conversion rate (default: 1000 credits = $1) */
  conversionRate?: number;
}

const CREDITS_PER_USD = 1000;

export function PaymentModal({
  open,
  onOpenChange,
  items,
  currentBalance,
  onConfirm,
  isProcessing = false,
  status = 'idle',
  error,
  footerContent,
  title,
  description,
  showConversion = true,
  conversionRate = CREDITS_PER_USD,
}: PaymentModalProps) {
  const totalCredits = items.reduce((sum, item) => {
    const quantity = item.quantity || 1;
    return sum + item.credits * quantity;
  }, 0);

  const usdValue = totalCredits / conversionRate;
  const hasSufficientBalance = currentBalance >= totalCredits;

  const handleConfirm = async () => {
    if (!hasSufficientBalance || isProcessing) return;
    try {
      await onConfirm(items);
    } catch (err) {
      console.error('Payment failed:', err);
    }
  };

  const handleClose = () => {
    if (status === 'processing') return;
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {status === 'success' ? (
              <CheckCircle2 className="h-5 w-5 text-success" />
            ) : status === 'error' ? (
              <AlertCircle className="h-5 w-5 text-destructive" />
            ) : (
              <Zap className="h-5 w-5 text-primary" />
            )}
            {title ||
              (status === 'success'
                ? 'Payment Successful'
                : status === 'error'
                  ? 'Payment Failed'
                  : 'Complete Payment')}
          </DialogTitle>
          <DialogDescription>
            {description ||
              (status === 'idle' ? 'Review and confirm your payment details below.' : '')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Current Balance */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="text-sm text-muted-foreground mb-2">Your Balance</div>
            <CreditBalance
              credits={currentBalance}
              showUsdConversion={showConversion}
              conversionRate={conversionRate}
              size="md"
              compact
              showIcon
            />
          </div>

          {/* Payment Items */}
          {status === 'idle' && (
            <div className="space-y-2">
              <div className="text-sm font-medium">Payment Details</div>
              <div className="space-y-2">
                {items.map((item) => {
                  const quantity = item.quantity || 1;
                  const itemTotal = item.credits * quantity;
                  const itemUsd = itemTotal / conversionRate;

                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        {item.description && (
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        )}
                        {quantity > 1 && (
                          <div className="text-xs text-muted-foreground">
                            {item.credits} credits × {quantity}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-semibold tabular-nums">
                          {formatNumber(itemTotal, { maximumFractionDigits: 0 })} credits
                        </div>
                        {showConversion && (
                          <div className="text-xs text-muted-foreground">
                            $
                            {formatNumber(itemUsd, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Total */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Total</span>
              <div className="text-right">
                <div className="text-lg font-bold tabular-nums text-primary">
                  {formatNumber(totalCredits, { maximumFractionDigits: 0 })} credits
                </div>
                {showConversion && (
                  <div className="text-sm text-muted-foreground">
                    $
                    {formatNumber(usdValue, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
                    USD
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status Messages */}
          {status === 'processing' && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Processing payment...</span>
            </div>
          )}

          {status === 'success' && (
            <div className="flex items-center gap-2 text-sm text-success bg-success/10 rounded-lg p-4">
              <CheckCircle2 className="h-4 w-4" />
              <span>Payment completed successfully!</span>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-start gap-2 text-sm text-destructive bg-destructive/10 rounded-lg p-4">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>{error || 'Payment failed. Please try again.'}</span>
            </div>
          )}

          {!hasSufficientBalance && status === 'idle' && (
            <div className="flex items-start gap-2 text-sm text-warning bg-warning/10 rounded-lg p-4">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium">Insufficient Balance</div>
                <div className="text-xs mt-1">
                  You need{' '}
                  {formatNumber(totalCredits - currentBalance, { maximumFractionDigits: 0 })} more
                  credits.
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {footerContent}
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={status === 'processing'}
            className="w-full sm:w-auto"
          >
            {status === 'success' ? 'Close' : 'Cancel'}
          </Button>
          {status === 'idle' && (
            <Button
              onClick={handleConfirm}
              disabled={!hasSufficientBalance || isProcessing}
              className="w-full sm:w-auto"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Pay {formatNumber(totalCredits, { maximumFractionDigits: 0 })} Credits
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
