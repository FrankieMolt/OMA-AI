'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Terminal, 
  FileCode, 
  Wallet, 
  Settings, 
  Users, 
  ShieldCheck,
  Zap,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
  { name: 'Frankie OS', href: '/frankie-os', icon: Terminal },
  { name: 'API Docs', href: '/api-docs', icon: FileCode },
  { name: 'Tasks', href: '/tasks', icon: Zap },
  { name: 'Governance', href: '/governance', icon: ShieldCheck },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-[60] p-2 bg-zinc-900 border border-zinc-800 rounded-lg lg:hidden"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-zinc-950 border-r border-zinc-900 flex flex-col"
          >
            {/* Logo */}
            <div className="p-8 border-b border-zinc-900/50">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="text-white fill-current" size={24} />
                </div>
                <span className="text-2xl font-bold tracking-tighter text-white">OMA-AI</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-2 py-8">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-purple-600/10 text-purple-400 border border-purple-500/20 shadow-lg shadow-purple-900/10' 
                        : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={20} className={isActive ? 'text-purple-400' : 'group-hover:text-zinc-300'} />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {isActive && <div className="w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.5)]" />}
                  </Link>
                );
              })}
            </nav>

            {/* Wallet Quick Look */}
            <div className="p-6 border-t border-zinc-900/50 bg-zinc-900/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  <Wallet size={12} />
                  <span>Agent Wallet</span>
                </div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-mono font-bold text-white">1,240.42</span>
                  <span className="text-xs font-bold text-zinc-600">USDC</span>
                </div>
                <div className="text-[10px] text-zinc-500 font-mono truncate">
                  0x71C...3A9f
                </div>
              </div>

              <Link 
                href="/wallet"
                className="mt-6 w-full py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-xs font-bold text-zinc-300 flex items-center justify-center gap-2 transition-all"
              >
                Manage Assets
                <ChevronRight size={14} />
              </Link>
            </div>

            {/* User / Settings */}
            <div className="p-4 border-t border-zinc-900/50">
              <Link
                href="/settings"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300 transition-all"
              >
                <Settings size={20} />
                <span className="font-medium">System Settings</span>
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
