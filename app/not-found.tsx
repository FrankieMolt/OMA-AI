'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect to home after 5 seconds
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-9xl mb-6"
        >
          🦞
        </motion.div>
        
        <h1 className="text-6xl font-black mb-4 gradient-text">
          404
        </h1>
        
        <h2 className="text-2xl font-bold text-gray-300 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          The agent you're looking for has completed its mission and moved on. 
          Or maybe it never existed. Either way, let's get you back on track.
        </p>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block btn-primary px-8 py-3 rounded-lg font-bold text-lg"
          >
            Return to Dashboard
          </Link>
          
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Link href="/agents" className="text-gray-400 hover:text-white transition-colors">
              Agents
            </Link>
            <Link href="/marketplace" className="text-gray-400 hover:text-white transition-colors">
              Marketplace
            </Link>
            <Link href="/personas" className="text-gray-400 hover:text-white transition-colors">
              Personas
            </Link>
            <Link href="/skills" className="text-gray-400 hover:text-white transition-colors">
              Skills
            </Link>
            <Link href="/wallet" className="text-gray-400 hover:text-white transition-colors">
              Wallet
            </Link>
            <Link href="/tasks" className="text-gray-400 hover:text-white transition-colors">
              Bounties
            </Link>
            <Link href="/terminal" className="text-gray-400 hover:text-white transition-colors">
              Terminal
            </Link>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mt-8 animate-pulse">
          Redirecting to dashboard in 5 seconds...
        </p>
      </motion.div>
    </div>
  );
}
