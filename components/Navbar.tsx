'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
import SearchOverlay from './SearchOverlay';

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="glass sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold gradient-text cursor-pointer hover:opacity-90 transition-opacity">
            OMA-AI
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/how-it-works" className="nav-link flex items-center gap-2">
              How It Works
            </Link>
            <Link href="/tasks" className="nav-link">
              Bounties
            </Link>
            <Link href="/docs" className="nav-link flex items-center gap-2">
              Docs
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <button className="hidden md:block btn-primary px-4 py-2 rounded-lg text-sm">
              Get API Key
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-zinc-800 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-zinc-900 border-l border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-bold text-white">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <Link
                href="/how-it-works"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg text-zinc-300 hover:text-white transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="/tasks"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg text-zinc-300 hover:text-white transition-colors"
              >
                Bounties
              </Link>
              <Link
                href="/docs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg text-zinc-300 hover:text-white transition-colors"
              >
                Docs
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg text-zinc-300 hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/pricing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg text-zinc-300 hover:text-white transition-colors"
              >
                Pricing
              </Link>
              <hr className="border-zinc-800 my-4" />
              <button className="w-full btn-primary px-6 py-3 rounded-lg text-center">
                Get API Key
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
