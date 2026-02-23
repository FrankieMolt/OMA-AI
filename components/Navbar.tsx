/**
 * Unified Navbar - shadcn/ui + Memoria Design
 * Accessibility: ARIA roles, labels, and semantic HTML.
 */

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Box } from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/ui/button";

// Design Tokens
import { spacing } from "@/lib/memoria/tokens";

const navLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/tasks", label: "Bounties" },
  { href: "/docs", label: "Docs" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-14 flex justify-between items-center transition-all duration-300 ${
          scrolled
            ? "py-3 bg-background/80 backdrop-blur-xl border-b border-memoria-border-muted"
            : "py-5 bg-transparent border-b border-transparent"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 no-underline group"
          aria-label="OMA-AI Home"
        >
          <div className="w-8 h-8 bg-memoria-bg-surface border border-memoria-border-default rounded-sm flex items-center justify-center group-hover:border-memoria-border-active transition-colors">
            <Box size={14} className="text-memoria-text-hero" />
          </div>
          <span className="text-lg font-normal text-memoria-text-hero tracking-tight">
            OMA-AI
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[10px] uppercase tracking-widest no-underline transition-colors ${
                pathname === link.href
                  ? "text-memoria-text-hero"
                  : "text-memoria-text-whisper hover:text-memoria-text-hero"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-memoria-text-hero"
            aria-label="Open mobile navigation menu"
          >
            <Menu size={20} />
          </Button>

          <Link
            href="/login"
            className="hidden md:block no-underline"
            aria-label="Sign In to your OMA-AI account"
          >
            <span className="text-[11px] uppercase tracking-widest text-memoria-text-label hover:text-memoria-text-hero transition-colors">
              Sign In
            </span>
          </Link>

          <Button
            className="bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm px-5 h-9 text-[11px] font-semibold uppercase tracking-wider hover:bg-memoria-text-secondary transition-all"
            aria-label="Start building with OMA-AI"
          >
            Start Building
          </Button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-memoria-bg-ultra-dark p-10 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="label-whisper">Menu</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-memoria-text-hero"
                aria-label="Close mobile menu"
              >
                <X size={24} />
              </Button>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-4xl font-light no-underline font-display transition-colors ${
                    pathname === link.href
                      ? "text-memoria-text-hero"
                      : "text-memoria-text-whisper"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
