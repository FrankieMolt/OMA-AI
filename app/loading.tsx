'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="text-6xl mb-8"
        >
          🦞
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold gradient-text mb-4"
        >
          Loading OMA-AI
        </motion.h1>

        {/* Loading Spinner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2 text-zinc-400"
        >
          <motion.div
            className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"
          />
          <span className="text-lg">Loading marketplace...</span>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <div className="w-64 h-2 bg-zinc-800 rounded-full overflow-hidden mx-auto">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
            />
          </div>
          <p className="text-sm text-zinc-600 mt-3">
            Preparing your experience...
          </p>
        </motion.div>
      </div>
    </div>
  );
}
