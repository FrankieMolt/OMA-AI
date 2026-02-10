/**
 * AppProvider - Main application context provider
 */

'use client';

import React, { createContext, useContext, useCallback, useState, ReactNode } from 'react';
import { CartItem, Product } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { useToast } from './ToastProvider';
import { STORAGE_KEYS, APP_CONFIG } from '@/lib/constants';
import { PRODUCTS } from '@/data/products';

interface AppContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  toggleCart: () => void;

  // Products
  PRODUCTS: Product[];

  // Wishlist
  wishlist: string[];
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;

  // Compare
  compareList: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  toggleCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;

  // Recently Viewed
  recentlyViewed: string[];
  addToRecentlyViewed: (id: string) => void;
  clearRecentlyViewed: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { addToast } = useToast();

  // Cart state
  const [cart, setCart] = useLocalStorage<CartItem[]>(STORAGE_KEYS.CART, []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Wishlist state
  const [wishlist, setWishlist] = useLocalStorage<string[]>(STORAGE_KEYS.WISHLIST, []);
  
  // Compare state
  const [compareList, setCompareList] = useLocalStorage<string[]>(STORAGE_KEYS.COMPARE, []);
  
  // Recently viewed
  const { recentlyViewed, addToRecentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

  // Cart actions
  const addToCart = useCallback((product: Product) => {
    const productName = product.name || product.title || 'Untitled Product';
    
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        addToast(`Added another ${productName} to cart`, 'success');
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      addToast(`${productName} added to cart`, 'success');
      return [
        ...prev,
        {
          id: product.id,
          title: productName,
          price: product.price,
          priceType: product.priceType || 'unit_usd',
          quantity: 1,
          image: product.image,
        },
      ];
    });
  }, [setCart, addToast]);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    addToast('Item removed from cart', 'info');
  }, [setCart, addToast]);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, [setCart, removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    addToast('Cart cleared', 'info');
  }, [setCart, addToast]);

  const toggleCart = useCallback(() => {
    setIsCartOpen((prev) => !prev);
  }, []);

  // Cart computed values
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wishlist actions
  const addToWishlist = useCallback((id: string) => {
    setWishlist((prev) => {
      if (prev.includes(id)) return prev;
      addToast('Added to wishlist', 'success');
      return [...prev, id];
    });
  }, [setWishlist, addToast]);

  const removeFromWishlist = useCallback((id: string) => {
    setWishlist((prev) => prev.filter((i) => i !== id));
    addToast('Removed from wishlist', 'info');
  }, [setWishlist, addToast]);

  const toggleWishlist = useCallback((id: string) => {
    if (wishlist.includes(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  }, [wishlist, addToWishlist, removeFromWishlist]);

  const isInWishlist = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  // Compare actions
  const addToCompare = useCallback((id: string) => {
    setCompareList((prev) => {
      if (prev.includes(id)) return prev;
      if (prev.length >= APP_CONFIG.MAX_COMPARE_ITEMS) {
        addToast(`Can only compare up to ${APP_CONFIG.MAX_COMPARE_ITEMS} items`, 'error');
        return prev;
      }
      addToast('Added to compare', 'success');
      return [...prev, id];
    });
  }, [setCompareList, addToast]);

  const removeFromCompare = useCallback((id: string) => {
    setCompareList((prev) => prev.filter((i) => i !== id));
  }, [setCompareList]);

  const toggleCompare = useCallback((id: string) => {
    if (compareList.includes(id)) {
      removeFromCompare(id);
    } else {
      addToCompare(id);
    }
  }, [compareList, addToCompare, removeFromCompare]);

  const isInCompare = useCallback((id: string) => compareList.includes(id), [compareList]);

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        toggleCart,
        PRODUCTS,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        compareList,
        addToCompare,
        removeFromCompare,
        toggleCompare,
        isInCompare,
        recentlyViewed,
        addToRecentlyViewed,
        clearRecentlyViewed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
