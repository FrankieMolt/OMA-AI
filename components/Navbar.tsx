'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X } from 'lucide-react';
import SearchOverlay from './SearchOverlay';

const navLinks = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/tasks', label: 'Bounties' },
  { href: '/docs', label: 'Docs' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveLink(pathname);
  }, [pathname]);

  // Handle escape key to close menus
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const closeSearch = () => setIsSearchOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/50 shadow-lg shadow-black/20' 
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/"
                className="text-xl md:text-2xl font-bold gradient-text focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg px-2 py-1 -ml-2"
                aria-label="OMA-AI Home"
              >
                OMA-AI
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-1" role="menubar">
              {navLinks.map((link) => {
                const isActive = activeLink === link.href;
                return (
                  <li key={link.href} role="none">
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={link.href}
                        className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          isActive 
                            ? 'text-purple-400' 
                            : 'text-zinc-400 hover:text-white'
                        }`}
                        role="menuitem"
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {link.label}
                        {isActive && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  </li>
                );
              })}
            </ul>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 md:gap-4">
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-xl bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Open search"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                <Search size={18} aria-hidden="true" />
              </motion.button>
              
              <motion.button
                className="hidden md:flex btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                Get API Key
              </motion.button>
              
              <motion.button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2.5 rounded-xl bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Open menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                <Menu size={22} aria-hidden="true" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden"
              onClick={closeMobileMenu}
              role="presentation"
              aria-hidden="true"
            />
            
            {/* Mobile Menu Content */}
            <motion.div
              id="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-[280px] bg-zinc-900 border-l border-zinc-800 z-50 md:hidden shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-zinc-800">
                  <h2 className="text-lg font-bold text-white">Menu</h2>
                  <motion.button
                    onClick={closeMobileMenu}
                    className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                    aria-label="Close menu"
                    whileHover={{ scale: 1.05, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={20} aria-hidden="true" />
                  </motion.button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 py-4 px-3" aria-label="Mobile navigation">
                  <ul className="space-y-1" role="menu">
                    {navLinks.map((link, index) => {
                      const isActive = activeLink === link.href;
                      return (
                        <motion.li
                          key={link.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          role="none"
                        >
                          <Link
                            href={link.href}
                            onClick={closeMobileMenu}
                            className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                              isActive
                                ? 'bg-purple-600/20 text-purple-400 border border-purple-600/30'
                                : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                            }`}
                            role="menuitem"
                            aria-current={isActive ? 'page' : undefined}
                          >
                            {link.label}
                            {isActive && (
                              <motion.span
                                layoutId="mobileActive"
                                className="ml-auto w-2 h-2 rounded-full bg-purple-500"
                              />
                            )}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Footer */}
                <div className="p-5 border-t border-zinc-800">
                  <motion.button
                    className="w-full btn-primary py-3 rounded-xl text-center font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                    whileTap={{ scale: 0.98 }}
                  >
                    Get API Key
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
}
