/**
 * ProductCard Component - Individual product display card
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Scale, ShoppingCart, ShoppingBag, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/types';
import { useApp } from '@/components/providers/AppProvider';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/ui/star-rating';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  onInspect: (product: Product) => void;
  index?: number;
}

export function ProductCard({ product, onInspect, index = 0 }: ProductCardProps) {
  const { 
    addToCart, 
    toggleWishlist, 
    toggleCompare, 
    isInWishlist, 
    isInCompare 
  } = useApp();

  const [imageError, setImageError] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);

  // Get gradient based on category
  const getGradient = (category: string) => {
    const gradients: Record<string, string> = {
      'Extreme Tech': 'from-cyan-500/20 to-blue-500/20',
      'Luxury': 'from-amber-500/20 to-orange-500/20',
      'Pets': 'from-pink-500/20 to-rose-500/20',
      'Clothing': 'from-violet-500/20 to-purple-500/20',
      'Food': 'from-green-500/20 to-emerald-500/20',
      'Survival': 'from-red-500/20 to-orange-500/20',
      'Art & Culture': 'from-fuchsia-500/20 to-pink-500/20',
      'Gadgets': 'from-blue-500/20 to-indigo-500/20',
      'Metaverse': 'from-purple-500/20 to-violet-500/20',
      'Real Estate': 'from-teal-500/20 to-cyan-500/20',
      'Travel': 'from-sky-500/20 to-blue-500/20',
      'Medical': 'from-emerald-500/20 to-teal-500/20',
      'Transportation': 'from-indigo-500/20 to-blue-500/20',
    };
    return gradients[category] || 'from-zinc-700/50 to-zinc-800/50';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/10"
    >
      {/* Image Area */}
      <div className={`relative aspect-[4/3] bg-gradient-to-br ${getGradient(product.category)} overflow-hidden`}>
        {/* Product Image with Fallback */}
        {!imageError ? (
          <Image
            src={product.image}
            alt={product.name || product.title || 'Product Image'}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-zinc-800/50 flex items-center justify-center">
              <ShoppingBag className="text-zinc-600" size={32} />
            </div>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
        
        {/* Floating Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-2.5 rounded-xl backdrop-blur-md transition-all duration-200 hover:scale-110 ${
              inWishlist 
                ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/25' 
                : 'bg-black/50 text-white hover:bg-pink-500'
            }`}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={18} className={inWishlist ? 'fill-current' : ''} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(product.id);
            }}
            className={`p-2.5 rounded-xl backdrop-blur-md transition-all duration-200 hover:scale-110 ${
              inCompare 
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25' 
                : 'bg-black/50 text-white hover:bg-purple-500'
            }`}
            aria-label={inCompare ? 'Remove from compare' : 'Add to compare'}
          >
            <Scale size={18} />
          </button>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="default">
            {product.category}
          </Badge>
        </div>

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-zinc-950/70 flex items-center justify-center backdrop-blur-sm">
            <Badge variant="destructive">Out of Stock</Badge>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
            {product.id}
          </span>
          
          {product.verified && (
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
              <CheckCircle2 size={12} />
              <span>Verified</span>
            </div>
          )}
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors line-clamp-2 leading-tight">
          {product.name || product.title}
        </h3>
        
        {/* Rating */}
        {(product.rating !== undefined) && (
          <div className="mb-3">
            <StarRating 
              rating={product.rating} 
              reviewCount={product.reviewCount || 0}
              
            />
          </div>
        )}
        
        {/* Description */}
        <p className="text-sm text-zinc-500 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-mono font-bold text-white">
            {formatPrice(product.price, product.priceType || 'unit_usd')}
          </span>
          {product.priceType && product.priceType !== 'unit_usd' && (
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
              {product.priceType === 'monthly_usd' ? '/month' : '/year'}
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-0.5 rounded-md bg-zinc-800 text-[10px] text-zinc-400 hover:bg-zinc-700 transition-colors cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {product.affiliateLink ? (
            <a 
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button
                variant="default"
                size="default"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold"
              >
                Buy Now
              </Button>
            </a>
          ) : (
            <Button
              variant="outline"
              size="default"
              className="flex-1"
              onClick={() => onInspect(product)}
            >
              Quick View
            </Button>
          )}
          
          <Button
            variant={inCompare ? 'default' : 'secondary'}
            size="default"
            className="px-3"
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
          >
            <ShoppingCart size={18} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
