/**
 * Main Page - SpendThrone home page with full functionality
 */

'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Zap, ShoppingBag, Sparkles } from 'lucide-react';
import { AppProvider, useApp } from '@/components/providers/AppProvider';
import { ToastProvider } from '@/components/providers/ToastProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductModal } from '@/components/product/ProductModal';
import { CategoryFilter } from '@/components/product/CategoryFilter';
import { SearchBar } from '@/components/search/SearchBar';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WishlistDrawer } from '@/components/wishlist/WishlistDrawer';
import { CompareDrawer } from '@/components/compare/CompareDrawer';
import { CheckoutFlow } from '@/components/checkout/CheckoutFlow';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PRODUCTS } from '@/data/products';
import { Product, SortOption } from '@/types';
import { useDebounce } from '@/hooks/useDebounce';

// Inner component with access to context
function SpendThronePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  
  const { cart, wishlist, compareList, cartTotal, addToRecentlyViewed } = useApp();

  // Debounce search query
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search filter
      const matchesSearch = !debouncedSearch || 
        product.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        product.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(debouncedSearch.toLowerCase())) ||
        product.category.toLowerCase().includes(debouncedSearch.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [debouncedSearch, selectedCategory]);

  // Handle product inspection
  const handleInspect = (product: Product) => {
    setSelectedProduct(product);
    addToRecentlyViewed(product.id);
  };

  // Handle checkout
  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-purple-500 selection:text-white">
      {/* Demo/Showcase Disclaimer */}
      <div className="bg-amber-500/10 border-b border-amber-500/30 py-3 px-4 text-center">
        <p className="text-sm text-amber-400">
          <span className="font-semibold uppercase tracking-wider">Showcase Mode:</span>
          <span className="ml-2 text-zinc-400">All products are fictional and for demonstration purposes only.</span>
        </p>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold uppercase tracking-[0.2em] mb-8"
          >
            <Zap size={10} className="fill-current" />
            The Sovereign Marketplace
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-[0.9] uppercase italic"
          >
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400">
              Weird
            </span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-amber-400 to-purple-400">
              Extreme
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-12 font-medium"
          >
            The curated kingdom of the weirdest, most viral products on Earth.
            WTF-level technology for the modern age.
          </motion.p>

          {/* Search Bar */}
          {showSearchBar && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={() => setSearchQuery('')}
              />
            </motion.div>
          )}

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mb-8"
          >
            <div className="flex items-center gap-2 text-zinc-600">
              <Sparkles size={16} className="text-purple-400" />
              <span className="text-sm">{PRODUCTS.length} Products</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-600">
              <Badge variant="success" size="sm">{PRODUCTS.filter(p => p.verified).length} Verified</Badge>
            </div>
            <div className="flex items-center gap-2 text-zinc-600">
              <ShoppingBag size={16} className="text-pink-400" />
              <span className="text-sm">Free Shipping</span>
            </div>
          </motion.div>

          {/* Search Toggle Button (when searchBar is hidden) */}
          {!showSearchBar && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                variant="outline"
                onClick={() => setShowSearchBar(true)}
              >
                Search Products
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <ProductGrid
            products={filteredProducts}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onInspect={handleInspect}
          />
        </div>
      </section>

      {/* Drawers & Modals */}
      <CartDrawer
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        onCheckout={handleCheckout}
      />
      
      <WishlistDrawer
        isOpen={showWishlist}
        onClose={() => setShowWishlist(false)}
      />
      
      <CompareDrawer
        isOpen={showCompare}
        onClose={() => setShowCompare(false)}
      />
      
      <CheckoutFlow
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
      />
      
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

// Page wrapper
export default function Page() {
  return (
    <SpendThronePage />
  );
}
