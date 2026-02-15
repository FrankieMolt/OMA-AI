/**
 * WishlistDrawer Component - Wishlist slide-out drawer
 */

'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingCart, Trash2, ShoppingBag, Sparkles } from 'lucide-react';
import { useApp } from '@/components/providers/AppProvider';
import { PRODUCTS } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
  const { wishlist, removeFromWishlist, addToCart } = useApp();
  
  const wishlistProducts = useMemo(() => {
    return wishlist
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter(Boolean);
  }, [wishlist]);

  // Lock body scroll
  useBodyScrollLock(isOpen);

  const handleAddAllToCart = () => {
    wishlistProducts.forEach((product) => {
      if (product) addToCart(product);
    });
  };

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
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
                  <Heart className="text-pink-400" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Your Wishlist</h2>
                  <p className="text-sm text-zinc-500">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {wishlistProducts.length === 0 ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 rounded-3xl bg-zinc-900 flex items-center justify-center mb-6">
                    <Heart className="text-zinc-700" size={48} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Your wishlist is empty</h3>
                  <p className="text-zinc-500 max-w-xs mb-6">Save items you love to your wishlist and they&apos;ll be waiting for you.</p>
                  <Button variant="default" onClick={onClose}>Explore Products</Button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {wishlistProducts.map((product, index) => {
                    if (!product) return null;
                    return (
                      <motion.div
                        key={product.id}
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
                            <h4 className="font-bold text-white text-sm mb-1 truncate">{product.title}</h4>
                            <p className="text-xs text-zinc-500 mb-2">{product.category}</p>
                            <p className="font-mono font-bold text-purple-400">{formatPrice(product.price, product.priceType || "unit_usd")}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button onClick={() => addToCart(product)} disabled={!product.inStock} className="p-2 text-zinc-400 hover:text-white hover:bg-purple-500 rounded-lg transition-colors disabled:opacity-50">
                              <ShoppingCart size={18} />
                            </button>
                            <button onClick={() => removeFromWishlist(product.id)} className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {wishlistProducts.length > 0 && (
              <div className="p-5 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-md">
                <Button variant="default" size="lg" className="w-full" onClick={handleAddAllToCart}>
                  <Sparkles className="mr-2" size={18} />
                  Add All to Cart
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
