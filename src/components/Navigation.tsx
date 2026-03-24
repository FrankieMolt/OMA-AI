'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, Cpu, Brain, Globe, Wallet, ChevronDown } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    { name: 'MCP Marketplace', href: '/mcps', icon: '🔌' },
    { name: 'Agent Skills', href: '/skills', icon: '🧠' },
    { name: 'AI Models', href: '/models', icon: '🤖' },
    { name: 'GPU Compute', href: '/compute', icon: '⚡' },
  ];

  const navItems = [
    { 
      name: 'Products', 
      href: '#',
      dropdown: products
    },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Docs', href: '/docs' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-50 p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className="p-2 bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-lg text-white hover:bg-zinc-800"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'bg-zinc-950/95 backdrop-blur border-b border-zinc-800' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">O</span>
              </div>
              <span className="text-xl font-bold text-white hidden sm:block">OMA-AI</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {/* Products Dropdown */}
              <div className="relative group">
                <button className="px-3 py-2 text-gray-300 hover:text-white flex items-center gap-1">
                  Products <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-2 shadow-xl min-w-48">
                    {products.map((p) => (
                      <Link key={p.href} href={p.href} className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-zinc-800 rounded-lg">
                        <span>{p.icon}</span>
                        {p.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              {navItems.filter(n => !n.dropdown).map((item) => (
                <Link key={item.href} href={item.href} className="px-3 py-2 text-gray-300 hover:text-white hover:bg-zinc-800/50 rounded-lg">
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA & Wallet */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/wallet" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white">
                <Wallet className="w-4 h-4" />
                Connect
              </Link>
              <Link href="/mcps" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                Explore MCPs
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          className="md:hidden overflow-hidden bg-zinc-950 border-b border-zinc-800"
        >
          <div className="container mx-auto px-4 py-4 space-y-2">
            <div className="py-2">
              <span className="text-xs font-semibold text-zinc-500 px-3">PRODUCTS</span>
            </div>
            {products.map((p) => (
              <Link key={p.href} href={p.href} className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-zinc-800 rounded-lg" onClick={() => setIsOpen(false)}>
                <span>{p.icon}</span>
                {p.name}
              </Link>
            ))}
            <div className="border-t border-zinc-800 my-2" />
            {navItems.filter(n => !n.dropdown).map((item) => (
              <Link key={item.href} href={item.href} className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-zinc-800 rounded-lg" onClick={() => setIsOpen(false)}>
                {item.name}
              </Link>
            ))}
            <Link href="/wallet" className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:text-white">
              <Wallet className="w-4 h-4" /> Connect Wallet
            </Link>
            <Link href="/mcps" className="block px-4 py-3 bg-green-600 text-white rounded-lg text-center font-medium" onClick={() => setIsOpen(false)}>
              Explore MCPs
            </Link>
          </div>
        </motion.div>
      </nav>
    </>
  );
}
