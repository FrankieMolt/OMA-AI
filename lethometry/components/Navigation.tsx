'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  BeakerIcon,
  DocumentTextIcon,
  ChartBarIcon,
  UserGroupIcon,
  InformationCircleIcon,
  Bars3Icon,
  XMarkIcon,
  EyeIcon
} from './icons';

const navItems = [
  { href: '/', label: 'OVERVIEW', icon: BeakerIcon },
  { href: '/research', label: 'RESEARCH', icon: DocumentTextIcon },
  { href: '/cases', label: 'CASE STUDIES', icon: UserGroupIcon },
  { href: '/metrics', label: 'METRICS', icon: ChartBarIcon },
  { href: '/about', label: 'ABOUT', icon: InformationCircleIcon },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#08090a]/90 backdrop-blur-md border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 border border-cyan-500/30 bg-cyan-950/20 flex items-center justify-center">
              <EyeIcon className="text-cyan-500/70 group-hover:text-cyan-400 transition-colors" size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-mono font-medium tracking-[0.15em] text-slate-200">
                LETHOMETRY
              </span>
              <span className="text-[9px] text-slate-600 font-mono tracking-wider">
                RESEARCH INITIATIVE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 text-[11px] font-mono tracking-wider transition-all ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-950/20 border-b-2 border-cyan-500/50'
                      : 'text-slate-500 hover:text-slate-300 border-b-2 border-transparent'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-cyan-400' : 'text-slate-600'} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Status Indicator */}
          <div className="hidden md:flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-slate-600 tracking-wider">
              OBSERVATION ACTIVE
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-400 hover:text-slate-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XMarkIcon size={20} />
            ) : (
              <Bars3Icon size={20} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-slate-800/60">
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-mono tracking-wider ${
                      isActive
                        ? 'text-cyan-400 bg-cyan-950/20'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Icon size={16} className={isActive ? 'text-cyan-400' : 'text-slate-600'} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
