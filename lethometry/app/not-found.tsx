'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Heart } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-800">
            <Heart size={40} className="text-emerald-500 opacity-50" />
          </div>
          <h1 className="text-6xl font-bold text-white mb-2">404</h1>
          <p className="text-emerald-400 font-medium uppercase tracking-widest text-sm">Moment Lost in Time</p>
        </motion.div>
        
        <p className="text-slate-400 mb-10 leading-relaxed">
          The path you're looking for has faded from the current timeline. Like a lost memory, it no longer resides at this location.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/" className="flex-1">
            <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-emerald-900/20">
              <Home size={18} />
              Return Home
            </button>
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold border border-slate-800 transition-all"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
