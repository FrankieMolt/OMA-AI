'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold gradient-text cursor-pointer">
          🦞 OMA-AI
        </Link>
        <div className="flex space-x-4">
          <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link>
          <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
          <Link href="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link>
          <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link>
          <Link href="/docs" className="text-gray-400 hover:text-white transition-colors">Docs</Link>
          <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link>
          <Link href="/" className="btn-primary px-4 py-2 rounded-lg text-sm">Launch App</Link>
        </div>
      </div>
    </nav>
  );
}
