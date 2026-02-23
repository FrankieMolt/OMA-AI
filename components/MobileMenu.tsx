"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    { name: "Marketplace", href: "/marketplace" },
    { name: "Agents", href: "/agents" },
    { name: "Docs", href: "/docs" },
    { name: "Bounties", href: "/tasks" },
    { name: "About", href: "/about" },
  ];

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-sm bg-memoria-bg-surface border border-memoria-border-default text-memoria-text-hero hover:bg-memoria-bg-card transition-colors"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 md:hidden bg-memoria-bg-ultra-dark/90 backdrop-blur-sm"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-72 z-50 md:hidden overflow-y-auto bg-memoria-bg-ultra-dark border-l border-memoria-border-muted p-8"
            >
              <div className="pt-12">
                {/* Header */}
                <div className="mb-8">
                  <span className="text-[10px] uppercase tracking-widest text-memoria-text-meta font-mono">
                    Navigation
                  </span>
                  <h2 className="text-xl font-light text-memoria-text-hero mt-2 font-display">
                    Menu
                  </h2>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2">
                  {tabs.map((tab) => (
                    <Link
                      key={tab.name}
                      href={tab.href}
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-left px-4 py-3 rounded-sm text-sm font-light uppercase tracking-widest text-memoria-text-secondary hover:text-memoria-text-hero hover:bg-memoria-bg-surface border border-transparent hover:border-memoria-border-muted transition-all"
                    >
                      {tab.name}
                    </Link>
                  ))}
                </nav>

                {/* Footer */}
                <div className="mt-12 pt-6 border-t border-memoria-border-muted">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-memoria-text-meta">
                    OMA-AI Systems
                  </p>
                  <p className="text-[10px] text-memoria-text-whisper mt-1 font-mono">
                    v1.0.0-Stable
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
