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
    <div className="min-h-screen bg-memoria-bg-ultra-dark flex items-center justify-center px-4">
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
          🧟‍♂️
        </motion.div>
        
        <h1 className="text-8xl font-light mb-4 text-memoria-text-hero font-display">
          404
        </h1>
        
        <h2 className="text-2xl font-light text-memoria-text-secondary mb-4">
          Page Not Found
        </h2>

        <p className="text-memoria-text-whisper mb-8 max-w-lg mx-auto">
          The agent you're looking for has completed its mission and moved on.
          Or maybe it never existed. Either way, let's get you back on track.
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-memoria-text-hero text-memoria-bg-ultra-dark font-medium rounded-sm"
          >
            Return to Dashboard
          </Link>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <Link href="/marketplace" className="text-memoria-text-whisper hover:text-memoria-text-hero transition-colors text-sm uppercase tracking-widest">
              Marketplace
            </Link>
            <Link href="/tasks" className="text-memoria-text-whisper hover:text-memoria-text-hero transition-colors text-sm uppercase tracking-widest">
              Bounties
            </Link>
            <Link href="/docs" className="text-memoria-text-whisper hover:text-memoria-text-hero transition-colors text-sm uppercase tracking-widest">
              Docs
            </Link>
            <Link href="/about" className="text-memoria-text-whisper hover:text-memoria-text-hero transition-colors text-sm uppercase tracking-widest">
              About
            </Link>
          </div>
        </div>

        <p className="text-memoria-text-meta text-xs mt-12 uppercase tracking-widest">
          Redirecting in 5 seconds...
        </p>
      </motion.div>
    </div>
  );
}
