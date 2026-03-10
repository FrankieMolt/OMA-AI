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
  Loader2,
  Sparkles,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CREDIT_PACKAGES } from '@/lib/credits';

type PaymentMethod = 'fiat' | 'x402';

interface PaymentFlowProps {
  onSuccess?: (data: any) => void;
}

export function PaymentFlow({ onSuccess }: PaymentFlowProps) {
  const [method, setMethod] = useState<PaymentMethod>('x402');
  const [selectedPkg, setSelectedPkg] = useState<string>('pro');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Logic for Stripe or x402
      if (method === 'fiat') {
        const response = await fetch('/api/credits/purchase', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ packageId: selectedPkg, userId: 'demo-user' })
        });
        const { checkout } = await response.json();
        if (checkout?.url) window.location.href = checkout.url;
      } else {
        // x402 flow
        alert('x402 Payment Requested. Please sign the transaction in your autonomous wallet.');
        onSuccess?.({ status: 'completed' });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-zinc-950 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Refill Credits</h3>
        <p className="text-gray-500 text-sm font-medium">Select a package to power your agentic fleet.</p>
      </div>

      {/* Payment Method Toggle */}
      <div className="flex gap-2 p-1.5 bg-white/5 rounded-2xl mb-8 border border-white/5">
        <button
          onClick={() => setMethod('x402')}
          className={cn(
            "flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2",
            method === 'x402'
              ? "bg-primary text-black shadow-lg shadow-primary/20"
              : "text-gray-500 hover:text-white"
          )}
        >
          <Coins className="w-4 h-4" />
          x402 (Base)
        </button>
        <button
          onClick={() => setMethod('fiat')}
          className={cn(
            "flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2",
            method === 'fiat'
              ? "bg-white text-black shadow-lg"
              : "text-gray-500 hover:text-white"
          )}
        >
          <CreditCard className="w-4 h-4" />
          Fiat (Stripe)
        </button>
      </div>

      {/* Package Selection */}
      <div className="grid grid-cols-1 gap-3 mb-8">
        {CREDIT_PACKAGES.slice(0, 3).map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => setSelectedPkg(pkg.id)}
            className={cn(
              "w-full p-5 rounded-[1.5rem] border-2 transition-all text-left relative overflow-hidden group",
              selectedPkg === pkg.id
                ? "border-primary/50 bg-primary/5"
                : "border-white/5 bg-white/[0.02] hover:border-white/10"
            )}
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  selectedPkg === pkg.id ? "bg-primary text-black" : "bg-white/5 text-gray-500 group-hover:text-white"
                )}>
                  {pkg.id === 'pro' ? <Crown className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                </div>
                <div>
                  <div className="font-black text-white text-lg tracking-tight">{pkg.credits.toLocaleString()} Credits</div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{pkg.description}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-white">${pkg.price}</div>
                {pkg.bonus > 0 && <div className="text-[10px] text-emerald-400 font-black uppercase">+{pkg.bonus.toLocaleString()} Bonus</div>}
              </div>
            </div>
            {selectedPkg === pkg.id && (
              <motion.div layoutId="active-bg" className="absolute inset-0 bg-primary/5 -z-0" />
            )}
          </button>
        ))}
      </div>

      <button
        onClick={handlePurchase}
        disabled={isProcessing}
        className={cn(
          "w-full py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] shadow-xl active:scale-95",
          method === 'x402' ? "bg-primary text-black" : "bg-white text-black"
        )}
      >
        {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
        Authorize Transaction
      </button>

      {error && (
        <div className="mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold flex items-center gap-3">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <p className="mt-6 text-[10px] text-center text-gray-600 font-black uppercase tracking-widest">
        {method === 'x402' ? 'Settled on Base via EIP-3009' : 'Secured by Stripe encryption'}
      </p>
    </div>
  );
}
