"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen bg-memoria-bg-ultra-dark flex items-center justify-center">
      <div className="text-center">
        {/* Animated Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-6xl mb-8"
        >
          🧟‍♂️
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-light text-memoria-text-hero mb-4 uppercase tracking-[0.2em] font-display"
        >
          Loading OMA-AI
        </motion.div>

        {/* Loading Spinner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2 text-memoria-text-whisper"
        >
          <motion.div className="w-6 h-6 border-2 border-memoria-text-hero border-t-transparent rounded-full animate-spin" />
          <span className="text-lg">Loading marketplace...</span>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <div className="w-64 h-1 bg-memoria-bg-surface rounded-full overflow-hidden mx-auto">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-memoria-text-hero"
            />
          </div>
          <p className="text-sm text-memoria-text-meta mt-3 uppercase tracking-widest">
            Preparing your experience...
          </p>
        </motion.div>
      </div>
    </div>
  );
}
