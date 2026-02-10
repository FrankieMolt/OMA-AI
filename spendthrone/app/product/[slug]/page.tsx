/**
 * Product Detail Page
 */

'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Scale, Star, ShieldCheck, Truck, RefreshCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PRODUCTS, getProductBySlug, getRelatedProducts } from '@/data/products';
import { Product } from '@/types';
import { useApp } from '@/components/providers/AppProvider';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { cart, wishlist, compareList, addToCart, toggleWishlist, toggleCompare } = useApp();

  useEffect(() => {
    if (slug) {
      const foundProduct = getProductBySlug(slug as string);
      setProduct(foundProduct || null);
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <p className="text-zinc-400 mb-8">The extraordinary item you're looking for doesn't exist in this timeline.</p>
        <Link href="/">
          <Button variant="primary">Back to Marketplace</Button>
        </Link>
      </div>
    );
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const relatedProducts = getRelatedProducts(product.id, 4);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 flex items-center justify-center relative group"
          >
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-2/3 h-2/3 object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-6 left-6">
              <Badge variant="purple">{product.category}</Badge>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-6">
              <div className="flex items-center gap-2 text-amber-400 mb-4">
                <Star size={16} fill="currentColor" />
                <span className="text-sm font-medium">{product.rating} ({product.reviewCount} reviews)</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.title}</h1>
              <p className="text-3xl font-bold text-white">
                ${product.price.toLocaleString()}
                <span className="text-sm font-normal text-zinc-400 ml-2">
                  {product.priceType === 'unit_usd' ? '/ unit' : product.priceType === 'monthly_usd' ? '/ month' : '/ year'}
                </span>
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <p className="text-zinc-400 leading-relaxed text-lg">
                {product.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {product.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-400">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full h-14"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart className="mr-2" size={20} />
                Add to Cart
              </Button>
              <div className="flex gap-4">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="flex-grow h-14"
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart className={wishlist.includes(product.id) ? "fill-red-500 text-red-500" : ""} size={20} />
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="flex-grow h-14"
                  onClick={() => toggleCompare(product.id)}
                >
                  <Scale className={compareList.includes(product.id) ? "text-purple-400" : ""} size={20} />
                </Button>
              </div>
            </div>

            <div className="border-t border-zinc-900 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-300">Paradox Safe</p>
                  <p className="text-[10px] text-zinc-500">Timeline Protected</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400">
                  <Truck size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-300">Instant Teleport</p>
                  <p className="text-[10px] text-zinc-500">Standard Delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400">
                  <RefreshCcw size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-300">Reality Sync</p>
                  <p className="text-[10px] text-zinc-500">10-Day Policy</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
