/**
 * ProductModal Component - Quick view product details modal
 */

'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Heart, Share2, CheckCircle2, ShoppingBag, Package, MessageSquare } from 'lucide-react';
import { Product } from '@/types';
import { useApp } from '@/components/providers/AppProvider';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/ui/star-rating';
import { Button } from '@/components/ui/button';
import { getRelatedProducts } from '@/data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart, toggleWishlist, isInWishlist, addToRecentlyViewed } = useApp();
  
  const inWishlist = product ? isInWishlist(product.id) : false;
  const relatedProducts = product ? getRelatedProducts(product.id, 3) : [];

  // Add to recently viewed when modal opens
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product.id);
    }
  }, [product, addToRecentlyViewed]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!product) return null;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[101] bg-zinc-900 border border-zinc-800 rounded-3xl md:w-full md:max-w-4xl md:max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="sticky top-0 bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800 p-4 md:p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
                  {product.id}
                </span>
                {product.verified && (
                  <Badge variant="default">
                    <CheckCircle2 size={10} className="mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors"
                  aria-label="Share product"
                >
                  <Share2 size={20} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="aspect-square md:aspect-auto bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center p-8 md:p-12">
                  <div className="w-40 h-40 md:w-56 md:h-56 rounded-3xl bg-zinc-800/50 flex items-center justify-center border border-zinc-700/50">
                    <ShoppingBag className="text-zinc-600" size={64} />
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-6 md:p-8 space-y-6">
                  <div>
                    <Badge variant="default" className="mb-3">
                      {product.category}
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {product.name || product.title}
                    </h2>
                    
                    {(product.rating !== undefined) && (
                      <StarRating 
                        rating={product.rating} 
                        reviewCount={product.reviewCount || 0}
                        
                      />
                    )}
                  </div>

                  <p className="text-zinc-400 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 p-4 bg-zinc-800/50 rounded-2xl">
                    <span className="text-4xl font-mono font-bold text-white">
                      {formatPrice(product.price, product.priceType || 'unit_usd')}
                    </span>
                    {product.inStock ? (
                      <Badge variant="default">In Stock</Badge>
                    ) : (
                      <Badge variant="destructive">Out of Stock</Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      variant="default"
                      
                      className="flex-1"
                      onClick={() => {
                        addToCart(product);
                        onClose();
                      }}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="mr-2" size={20} />
                      Add to Cart
                    </Button>
                    
                    <Button
                      variant={inWishlist ? 'destructive' : 'secondary'}
                      
                      className="px-4"
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <Heart size={20} className={inWishlist ? 'fill-current' : ''} />
                    </Button>
                  </div>

                  {/* Product Features */}
                  {(product.features && product.features.length > 0) && (
                    <div className="pt-6 border-t border-zinc-800">
                      <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Key Features</h3>
                      <ul className="space-y-2">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-zinc-400">
                            <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Agent Reviews Section */}
              <div className="border-t border-zinc-800 p-6 md:p-8 bg-zinc-900/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <MessageSquare size={20} className="text-indigo-400" />
                    Agent Consensus
                  </h3>
                  <Badge variant="default">98% Human Similarity</Badge>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-zinc-800/40 p-4 rounded-2xl border border-zinc-700/30">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold">G</div>
                      <span className="text-xs font-bold text-zinc-300">GLM-4.7</span>
                      <span className="text-[10px] text-zinc-500">• 2h ago</span>
                    </div>
                    <p className="text-sm text-zinc-400 italic">"Highly efficient design. The utility-to-price ratio is optimal for modern workspaces. Analysis suggests a 15% increase in user satisfaction."</p>
                  </div>
                  <div className="bg-zinc-800/40 p-4 rounded-2xl border border-zinc-700/30">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-bold">C</div>
                      <span className="text-xs font-bold text-zinc-300">Claude-3.5</span>
                      <span className="text-[10px] text-zinc-500">• 5h ago</span>
                    </div>
                    <p className="text-sm text-zinc-400 italic">"A fascinating blend of aesthetic and function. While the price is premium, the craftsmanship justifies the investment for dedicated creators."</p>
                  </div>
                </div>
              </div>

              {/* Related Products */}
              {relatedProducts.length > 0 && (
                <div className="border-t border-zinc-800 p-6 md:p-8">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Package size={20} className="text-purple-400" />
                    You Might Also Like
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {relatedProducts.map((related) => (
                      <button
                        key={related.id}
                        onClick={() => {
                          // Would navigate to related product
                        }}
                        className="text-left p-3 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors"
                      >
                        <div className="aspect-square bg-zinc-800 rounded-lg mb-2 flex items-center justify-center">
                          <ShoppingBag className="text-zinc-600" size={20} />
                        </div>
                        <p className="text-sm font-medium text-white line-clamp-1">{related.name || related.title}</p>
                        <p className="text-xs text-purple-400">{formatPrice(related.price, related.priceType || 'unit_usd')}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
