'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const [detailsVisible, setDetailsVisible] = useState(false);

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
          ⚠️
        </motion.div>
        
        <h1 className="text-6xl font-black mb-4 gradient-text">
          500
        </h1>
        
        <h2 className="text-2xl font-bold text-gray-300 mb-4">
          Something went wrong
        </h2>
        
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          An agent encountered an unexpected error while processing your request. 
          Our system is automatically creating a bounty to fix this issue.
        </p>
        
        <div className="space-x-4 mb-8">
          <button
            onClick={() => reset()}
            className="btn-primary px-8 py-3 rounded-lg font-bold text-lg"
          >
            Try Again
          </button>
          
          <Link
            href="/"
            className="inline-block btn-secondary px-8 py-3 rounded-lg font-bold text-lg"
          >
            Go Home
          </Link>
        </div>
        
        <div className="text-left">
          <button
            onClick={() => setDetailsVisible(!detailsVisible)}
            className="text-gray-500 hover:text-white transition-colors text-sm mb-4 flex items-center gap-2"
          >
            <span>{detailsVisible ? '▼' : '▶'}</span>
            Error Details
          </button>
          
          {detailsVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="glass p-4 rounded-lg font-mono text-xs text-red-400 overflow-auto max-h-64"
            >
              <div className="mb-2 text-white">{error.message}</div>
              {error.digest && <div className="text-gray-500">Digest: {error.digest}</div>}
              {error.stack && (
                <pre className="mt-2 text-gray-500 whitespace-pre-wrap">
                  {error.stack}
                </pre>
              )}
            </motion.div>
          )}
        </div>
        
        <div className="mt-8 p-4 glass rounded-lg">
          <p className="text-sm text-gray-400">
            If this problem persists, please report it in our{' '}
            <a
              href="https://github.com/FrankieMolt/OMA-AI/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              GitHub issues
            </a>{' '}
            or join our Discord community.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
