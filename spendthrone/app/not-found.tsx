'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Home, ArrowLeft, Ghost } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 font-sans selection:bg-purple-500">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-purple-900/30">
            <Ghost size={48} className="text-white" />
          </div>
          <h1 className="text-8xl font-black text-white mb-2 tracking-tighter">404</h1>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-400 font-bold uppercase tracking-[0.2em] text-sm">Inventory Anomaly</p>
        </motion.div>
        
        <p className="text-zinc-400 mb-10 leading-relaxed text-lg">
          We couldn't find that product in this reality. It may have been teleported to a different dimension or discontinued by the Temporal Authorities.
        </p>

        <div className="flex flex-col gap-4">
          <Link href="/">
            <button aria-label="Return to marketplace" className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-2xl font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98]">
              <ShoppingBag size={20} />
              Browse Marketplace
            </button>
          </Link>
          <Link href="/">
             <button className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900 text-white hover:bg-zinc-800 rounded-2xl font-bold border border-zinc-800 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                <Home size={20} />
                Back to Home
              </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
