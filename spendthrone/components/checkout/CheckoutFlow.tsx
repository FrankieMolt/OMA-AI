/**
 * CheckoutFlow Component - Multi-step checkout process (mock)
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, CreditCard, MapPin, ShoppingBag, Sparkles, Lock } from 'lucide-react';
import { useApp } from '@/components/providers/AppProvider';
import { formatPrice, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';

interface CheckoutFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'complete';

export function CheckoutFlow({ isOpen, onClose }: CheckoutFlowProps) {
  const [step, setStep] = useState<CheckoutStep>('cart');
  const { cart, cartTotal, clearCart, PRODUCTS } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);

  // Get full product details
  const cartProducts = cart.map((item) => ({
    ...item,
    product: PRODUCTS.find((p: Product) => p.id === item.id),
  }));

  const handleNext = () => {
    if (step === 'cart') setStep('shipping');
    else if (step === 'shipping') setStep('payment');
    else if (step === 'payment') {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep('complete');
        clearCart();
      }, 2000);
    }
  };

  const handleClose = () => {
    if (step === 'complete') {
      clearCart();
    }
    onClose();
    setStep('cart');
  };

  const steps = [
    { id: 'cart', label: 'Cart', icon: ShoppingBag },
    { id: 'shipping', label: 'Shipping', icon: MapPin },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'complete', label: 'Complete', icon: CheckCircle2 },
  ] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[101] bg-zinc-900 border border-zinc-800 rounded-3xl md:w-full md:max-w-2xl md:max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/95 backdrop-blur-md">
              <h2 className="text-xl font-bold text-white">Checkout</h2>
              <button
                onClick={handleClose}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="p-5 border-b border-zinc-800 bg-zinc-900/50">
              <div className="flex items-center justify-between">
                {steps.map((s, index) => {
                  const isCurrent = step === s.id;
                  const isPast = steps.findIndex((x) => x.id === step) > index;
                  const Icon = s.icon;
                  
                  return (
                    <div key={s.id} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                            isPast && 'bg-purple-600 text-white',
                            isCurrent && 'bg-purple-500 text-white ring-4 ring-purple-500/20',
                            !isPast && !isCurrent && 'bg-zinc-800 text-zinc-600'
                          )}
                        >
                          {isPast ? (
                            <CheckCircle2 size={18} />
                          ) : (
                            <Icon size={18} />
                          )}
                        </div>
                        <span
                          className={cn(
                            'text-xs mt-2 font-medium transition-colors',
                            isPast && 'text-zinc-400',
                            isCurrent && 'text-white',
                            !isPast && !isCurrent && 'text-zinc-600'
                          )}
                        >
                          {s.label}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={cn(
                            'flex-1 h-0.5 mx-2 transition-colors',
                            isPast && 'bg-purple-600',
                            !isPast && 'bg-zinc-800'
                          )}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                {/* Cart Summary */}
                {step === 'cart' && (
                  <motion.div
                    key="cart"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-bold text-white">Order Summary</h3>
                    <div className="space-y-3">
                      {cartProducts.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-3 bg-zinc-800/50 rounded-xl">
                          <div className="w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0">
                            <ShoppingBag className="text-zinc-600" size={24} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-white text-sm truncate">{item.title}</h4>
                            <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-mono font-bold text-purple-400">
                            {formatPrice(item.price * item.quantity, item.priceType)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-zinc-800/50 rounded-xl space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-500">Subtotal</span>
                        <span className="text-white">{formatPrice(cartTotal, 'unit_usd')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-500">Shipping</span>
                        <span className="text-emerald-400">Free</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-2 border-t border-zinc-700">
                        <span className="text-white">Total</span>
                        <span className="text-white">{formatPrice(cartTotal, 'unit_usd')}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Shipping Form (Mock) */}
                {step === 'shipping' && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-bold text-white">Shipping Address</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:border-purple-500"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Street Address"
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:border-purple-500"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        className="px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:border-purple-500"
                      />
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        className="px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:border-purple-500"
                    />
                  </motion.div>
                )}

                {/* Payment Form (Mock) */}
                {step === 'payment' && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-bold text-white">Payment Method</h3>
                    <div className="p-4 bg-zinc-800/50 rounded-xl space-y-4">
                      <div className="flex items-center gap-2 text-emerald-400 text-sm">
                        <Lock size={14} />
                        <span>Secure 256-bit SSL encryption</span>
                      </div>
                      
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="w-full px-4 py-3 bg-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="px-4 py-3 bg-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <input
                          type="text"
                          placeholder="CVC"
                          className="px-4 py-3 bg-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Cardholder Name"
                        className="w-full px-4 py-3 bg-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Complete */}
                {step === 'complete' && (
                  <motion.div
                    key="complete"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <CheckCircle2 className="text-emerald-400" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Order Confirmed!</h3>
                    <p className="text-zinc-500 mb-6">
                      Thank you for your order. You&apos;ll receive a confirmation email shortly.
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-full text-sm text-zinc-400">
                      <Sparkles size={14} />
                      <span>Your weird stuff is on the way!</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {step !== 'complete' && (
              <div className="p-5 border-t border-zinc-800 bg-zinc-900/50 flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    if (step === 'cart') handleClose();
                    else if (step === 'shipping') setStep('cart');
                    else if (step === 'payment') setStep('shipping');
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="default"
                  className="flex-1"
                  onClick={handleNext}
                  isLoading={isProcessing}
                >
                  {step === 'payment' ? 'Complete Order' : 'Continue'}
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </div>
            )}

            {step === 'complete' && (
              <div className="p-5 border-t border-zinc-800">
                <Button
                  variant="default"
                  className="w-full"
                  onClick={handleClose}
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
