'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  homeHref?: string;
  homeLabel?: string;
}

export function Breadcrumbs({
  items,
  homeHref = '/',
  homeLabel = 'Home',
}: BreadcrumbsProps) {
  return (
    <nav
      className="flex items-center gap-2 text-sm text-gray-400 mb-6"
      aria-label="Breadcrumb"
    >
      <Link
        href={homeHref}
        className="hover:text-white transition-colors flex items-center gap-1"
        aria-label={homeLabel}
      >
        <Home size={16} />
      </Link>

      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2">
          <ChevronRight size={16} className="text-gray-600" />
          <Link
            href={item.href}
            className={
              index === items.length - 1
                ? 'text-white font-medium'
                : 'hover:text-white transition-colors'
            }
            aria-current={index === items.length - 1 ? 'page' : undefined}
          >
            {item.name}
          </Link>
        </div>
      ))}
    </nav>
  );
}

// Predefined breadcrumbs for common routes
export const MarketplaceBreadcrumbs = () => (
  <Breadcrumbs items={[{ name: 'MCP Marketplace', href: '/mcps' }]} />
);

export const WalletBreadcrumbs = () => (
  <Breadcrumbs items={[{ name: 'Wallet', href: '/wallet' }]} />
);

export const TransactionsBreadcrumbs = () => (
  <Breadcrumbs items={[{ name: 'Transactions', href: '/transactions' }]} />
);
