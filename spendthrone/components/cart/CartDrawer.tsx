/**
 * CartDrawer Component - Shopping cart slide-out drawer
 */

'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { useApp } from '@/components/providers/AppProvider';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartDrawer({ isOpen, onClose, onCheckout }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useApp();

  // Lock body scroll
  useBodyScrollLock(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-[101] w-full max-w-md bg-zinc-950 border-l border-zinc-800 flex flex-col"
          >
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/95 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <ShoppingCart className="text-purple-400" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Your Cart</h2>
                  <p className="text-sm text-zinc-500">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 rounded-3xl bg-zinc-900 flex items-center justify-center mb-6">
                    <ShoppingBag className="text-zinc-700" size={48} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Your cart is empty</h3>
                  <p className="text-zinc-500 max-w-xs mb-6">Looks like you haven&apos;t added any weird and wonderful items yet.</p>
                  <Button variant="primary" onClick={onClose}>Start Shopping</Button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 group hover:border-zinc-700 transition-colors"
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-zinc-800 rounded-xl flex-shrink-0 flex items-center justify-center">
                          <ShoppingBag className="text-zinc-600" size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-white text-sm mb-1 truncate">{item.title}</h4>
                          <p className="text-xs text-zinc-500 mb-2">
                            {item.priceType === 'unit_usd' ? 'One-time' : item.priceType === 'monthly_usd' ? 'Monthly' : 'Yearly'}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 flex items-center justify-center transition-colors">
                                <Minus size={14} />
                              </button>
                              <span className="w-8 text-center font-mono font-bold">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 flex items-center justify-center transition-colors">
                                <Plus size={14} />
                              </button>
                            </div>
                            <span className="font-mono font-bold text-purple-400">{formatPrice(item.price * item.quantity, item.priceType)}</span>
                          </div>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="p-2 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-md space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">Subtotal</span>
                    <span className="text-white font-medium">{formatPrice(cartTotal, 'unit_usd')}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">Shipping</span>
                    <span className="text-emerald-400 font-medium">Free</span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-bold pt-2 border-t border-zinc-800">
                    <span className="text-white">Total</span>
                    <span className="text-white font-mono">{formatPrice(cartTotal, 'unit_usd')}</span>
                  </div>
                </div>
                <Button variant="primary" size="lg" className="w-full" onClick={onCheckout}>
                  <Sparkles className="mr-2" size={18} />
                  Proceed to Checkout
                  <ArrowRight className="ml-2" size={18} />
                </Button>
                <button onClick={clearCart} className="w-full py-2 text-zinc-500 hover:text-red-400 text-sm transition-colors">
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
