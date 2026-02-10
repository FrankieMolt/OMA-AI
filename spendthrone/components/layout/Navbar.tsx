/**
 * Navbar Component - Main navigation bar
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Heart, Scale, ShoppingCart, Search, User, Sparkles } from 'lucide-react';
import { useApp } from '@/components/providers/AppProvider';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, wishlist, compareList, isCartOpen, toggleCart } = useApp();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;
  const compareCount = compareList.length;

  const navLinks = [
    { href: '/', label: 'Marketplace' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-900/20 group-hover:shadow-purple-900/40 transition-all">
              <ShoppingBag className="text-white" size={20} />
            </div>
            <span className="hidden sm:block text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400">
              SPENDTHRONE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Submit Product Button (Desktop) */}
            <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 hover:border-purple-500/50 rounded-xl text-xs font-bold text-zinc-400 hover:text-white transition-all mr-2">
              <Sparkles size={14} className="text-purple-500" />
              SUBMIT PRODUCT
            </button>

            {/* Wishlist Button */}
            <button
              className="p-2 text-zinc-400 hover:text-pink-400 hover:bg-zinc-900 rounded-xl transition-all relative"
              aria-label="Open wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full text-[10px] flex items-center justify-center font-bold text-white">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </button>

            {/* Compare Button */}
            <button
              className="p-2 text-zinc-400 hover:text-purple-400 hover:bg-zinc-900 rounded-xl transition-all relative"
              aria-label="Open compare"
            >
              <Scale size={20} />
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full text-[10px] flex items-center justify-center font-bold text-white">
                  {compareCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-all relative"
              aria-label="Open cart"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 rounded-full text-[10px] flex items-center justify-center font-bold text-white">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-all"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* User Avatar (Desktop) */}
            <div className="hidden md:block ml-2 p-1 bg-zinc-900 rounded-full hover:ring-2 hover:ring-purple-500 transition-all cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-800 flex items-center justify-center border border-zinc-700">
                <User size={16} className="text-zinc-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pt-4 border-t border-zinc-900"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors text-sm font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
