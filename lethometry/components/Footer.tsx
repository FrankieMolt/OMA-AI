'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Twitter, Mail, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Heart size={20} className="text-white" />
              </div>
              <div>
                <span className="font-bold text-white">LETHOMETRY</span>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest">Life & Memory</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              A mindful tool for understanding your time and preserving what matters most.
            </p>
            <p className="text-slate-500 text-xs">
              Built with care for mindful living
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">Death Clock</Link>
              </li>
              <li>
                <Link href="/#memory" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">Memory Tools</Link>
              </li>
              <li>
                <Link href="/#philosophy" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">Philosophy</Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">About</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">Terms of Service</Link>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">GitHub</a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">Twitter</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:hello@lethometry.com" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2">
                  <Mail size={16} />
                  Email Us
                </a>
              </li>
              <li className="text-slate-500 text-xs mt-4">
                Your data stays private. Stored locally only.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 Lethometry. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -4 }}
            className="p-3 bg-slate-900 hover:bg-slate-800 rounded-lg text-emerald-400 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>

        {/* Attribution */}
        <div className="mt-8 pt-8 border-t border-slate-800/50 text-center">
          <p className="text-slate-600 text-xs">
            Life expectancy data from WHO (2023) and UN Population Division. 
            Memory decay research based on peer-reviewed studies.
          </p>
          <p className="text-slate-700 text-xs mt-2 flex items-center justify-center gap-2">
            Made with <Heart size={12} className="text-emerald-500" /> for mindful living
          </p>
        </div>
      </div>
    </footer>
  );
}
