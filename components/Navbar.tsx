'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, XCircle } from 'lucide-react';
import SearchOverlay from './SearchOverlay';

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
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

  // Close mobile menu
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Close search overlay
  const closeSearch = () => setIsSearchOpen(false);

  const navLinks = [
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/tasks', label: 'Bounties' },
    { href: '/docs', label: 'Docs' },
    { href: '/about', label: 'About' },
  ];

  return (
    <>
      <nav
        className={`glass sticky top-0 z-40 px-6 py-4 transition-all duration-200 ${
          scrolled ? 'shadow-lg' : ''
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold gradient-text hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
            aria-label="OMA-AI Home"
          >
            OMA-AI
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6" role="menubar">
            {navLinks.map((link) => (
              <li key={link.href} role="none">
                <Link
                  href={link.href}
                  className={`nav-link ${
                    pathname === link.href ? 'active' : ''
                  }`}
                  role="menuitem"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 focus:bg-zinc-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Open search"
            >
              <Search size={18} aria-hidden="true" />
            </button>
            <button className="hidden md:block btn-primary px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-950">
              Get API Key
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-zinc-800 focus:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeMobileMenu}
            role="presentation"
            aria-hidden="true"
          />
          {/* Mobile Menu Content */}
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-zinc-900 border-l border-zinc-800 p-6 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white">Menu</h2>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-lg hover:bg-zinc-800 focus:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Close menu"
              >
                <X size={24} aria-hidden="true" />
              </button>
            </div>

            <nav className="flex flex-col gap-4" role="navigation" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`text-lg py-2 px-4 rounded-lg transition-colors ${
                    pathname === link.href
                      ? 'bg-purple-600/20 text-purple-400 font-medium'
                      : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/pricing"
                onClick={closeMobileMenu}
                className="text-lg py-2 px-4 rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                Pricing
              </Link>
            </nav>

            <hr className="border-zinc-800 my-6" role="separator" />

            <div className="mt-auto">
              <button className="w-full btn-primary px-6 py-3 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-900">
                Get API Key
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
}
