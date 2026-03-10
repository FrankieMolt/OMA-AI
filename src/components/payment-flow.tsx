'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, 
  CreditCard, 
  Coins, 
  Check,
  AlertCircle,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { STRIPE_PRICING } from '@/lib/pricing';

type PaymentMethod = 'subscription' | 'x402';

interface PaymentFlowProps {
  endpoint?: string;
  onSelect?: (method: PaymentMethod, data?: any) => void;
}

export function PaymentFlow({ endpoint, onSelect }: PaymentFlowProps) {
  const [method, setMethod] = useState<PaymentMethod>('subscription');
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      const response = await fetch('/api/payments/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: selectedPlan })
      });
      
      const { checkout_url, error } = await response.json();
      
      if (error) {
        setError(error);
      } else if (checkout_url) {
        window.location.href = checkout_url;
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleX402Payment = async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // This would integrate with wallet adapter
      onSelect?.('x402', { endpoint });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Payment Method Toggle */}
      <div className="flex gap-2 p-1 bg-muted rounded-lg mb-6">
        <button
          onClick={() => setMethod('subscription')}
          className={cn(
            "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
            method === 'subscription'
              ? "bg-background text-foreground shadow"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <CreditCard className="w-4 h-4 inline mr-2" />
          Subscription
        </button>
        <button
          onClick={() => setMethod('x402')}
          className={cn(
            "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
            method === 'x402'
              ? "bg-background text-foreground shadow"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Coins className="w-4 h-4 inline mr-2" />
          Pay Per Use
        </button>
      </div>

      <AnimatePresence mode="wait">
        {method === 'subscription' ? (
          <motion.div
            key="subscription"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {/* Plan Selection */}
            <div className="space-y-3 mb-6">
              {Object.entries(STRIPE_PRICING).slice(1).map(([key, plan]) => (
                <button
                  key={key}
                  onClick={() => setSelectedPlan(key)}
                  className={cn(
                    "w-full p-4 rounded-lg border-2 transition-all text-left",
                    selectedPlan === key
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{plan.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {plan.tokens.toLocaleString()} tokens/month
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">${plan.price}</div>
                      <div className="text-xs text-muted-foreground">/month</div>
                    </div>
                  </div>
                  
                  {selectedPlan === key && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 pt-3 border-t border-border"
                    >
                      <ul className="space-y-1">
                        {plan.features.slice(0, 4).map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={handleSubscribe}
              disabled={isProcessing}
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  Subscribe with Stripe
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="x402"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/20 mb-4">
                <Coins className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Pay Per Request</h3>
              <p className="text-sm text-muted-foreground">
                Pay only for what you use with X402 micropayments
              </p>
            </div>

            {endpoint && (
              <div className="p-4 rounded-lg bg-background/50 mb-4">
                <div className="text-sm text-muted-foreground mb-1">Endpoint</div>
                <div className="font-mono text-sm">{endpoint}</div>
                <div className="text-xs text-muted-foreground mt-2">
                  Price: ~$0.01-0.05 per request
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-lg bg-background/50 text-center">
                <div className="text-xs text-muted-foreground mb-1">Network</div>
                <div className="font-semibold">Base / Solana</div>
              </div>
              <div className="p-3 rounded-lg bg-background/50 text-center">
                <div className="text-xs text-muted-foreground mb-1">Currency</div>
                <div className="font-semibold">USDC</div>
              </div>
            </div>

            <button
              onClick={handleX402Payment}
              disabled={isProcessing}
              className="w-full py-3 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600 transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  Connect Wallet & Pay
                </>
              )}
            </button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Requires Web3 wallet (MetaMask, Phantom, etc.)
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2"
        >
          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
          <div className="text-sm text-red-500">{error}</div>
        </motion.div>
      )}
    </div>
  );
}
