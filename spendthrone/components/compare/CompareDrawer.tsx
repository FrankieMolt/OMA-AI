/**
 * CompareDrawer Component - Product comparison drawer
 */

'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Scale, Trash2, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/components/providers/AppProvider';
import { PRODUCTS } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

interface CompareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CompareDrawer({ isOpen, onClose }: CompareDrawerProps) {
  const { compareList, removeFromCompare, addToCart } = useApp();
  
  const compareProducts = useMemo(() => {
    return compareList
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter(Boolean);
  }, [compareList]);

  // Lock body scroll
  useBodyScrollLock(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-[101] w-full max-w-2xl bg-zinc-950 border-l border-zinc-800 flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/95 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Scale className="text-purple-400" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Compare Products</h2>
                  <p className="text-sm text-zinc-500">{compareList.length} {compareList.length === 1 ? 'item' : 'items'}</p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors"
                aria-label="Close compare"
              >
                <X size={24} />
              </button>
            </div>

            {/* Compare Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {compareProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center"
                >
                  <div className="w-24 h-24 rounded-3xl bg-zinc-900 flex items-center justify-center mb-6">
                    <Scale className="text-zinc-700" size={48} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No items to compare</h3>
                  <p className="text-zinc-500 max-w-xs mb-6">
                    Add products from the product cards to compare their features side by side.
                  </p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-2 gap-6">
                  {compareProducts.map((product, index) => {
                    if (!product) return null;
                    
                    return (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden"
                      >
                        {/* Header */}
                        <div className="p-4 border-b border-zinc-800 flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
                              {product.id}
                            </span>
                            <h4 className="font-bold text-white text-sm mt-1 truncate">
                              {product.title}
                            </h4>
                            {product.verified && (
                              <div className="flex items-center gap-1 text-emerald-500 mt-2">
                                <CheckCircle2 size={12} />
                                <span className="text-xs font-medium">Verified</span>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCompare(product.id)}
                            className="p-1 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-2"
                            aria-label="Remove from compare"
                          >
                            <X size={18} />
                          </button>
                        </div>

                        {/* Image */}
                        <div className="aspect-square bg-zinc-800/50 flex items-center justify-center p-8">
                          <ShoppingBag className="text-zinc-600" size={48} />
                        </div>

                        {/* Details */}
                        <div className="p-4 space-y-3">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-1">
                              Price
                            </p>
                            <p className="text-lg font-mono font-bold text-white">
                              {formatPrice(product.price, product.priceType)}
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-1">
                              Category
                            </p>
                            <p className="text-sm text-zinc-400">{product.category}</p>
                          </div>

                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-1">
                              Tags
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {product.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-400"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-1">
                              Description
                            </p>
                            <p className="text-xs text-zinc-500 line-clamp-3">
                              {product.description}
                            </p>
                          </div>
                        </div>

                        {/* Add to Cart */}
                        <div className="p-4 border-t border-zinc-800">
                          <button
                            onClick={() => addToCart(product)}
                            disabled={!product.inStock}
                            className="w-full py-3 bg-zinc-800 text-white font-bold text-sm rounded-xl hover:bg-purple-600 transition-colors disabled:opacity-50"
                          >
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
