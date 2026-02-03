'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const sidebarNav = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Quick Start', href: '/docs/quick-start' },
      { title: 'Agent Development', href: '/docs/agent-development' },
      { title: 'Wallet Guide', href: '/docs/wallet-guide' },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { title: 'Blink Agents', href: '/docs/blink-agents' },
      { title: 'MCP Servers', href: '/docs/mcp-servers' },
      { title: 'A2A Protocol', href: '/docs/a2a' },
      { title: 'x402 Payments', href: '/docs/x402' },
      { title: 'Monetization', href: '/docs/monetization' },
      { title: 'Marketplace', href: '/docs/marketplace' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { title: 'API Reference', href: '/docs/api-reference' },
      { title: 'Pricing', href: '/docs/pricing' },
      { title: 'Troubleshooting', href: '/docs/troubleshooting' },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
      <ScrollArea className="h-full py-6 pr-6 lg:py-8">
        <div className="w-full">
          {sidebarNav.map((section, index) => (
            <div key={index} className="pb-4">
              <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">{section.title}</h4>
              {section.items?.length && (
                <div className="grid grid-flow-row auto-rows-max text-sm">
                  {section.items.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      className={cn(
                        'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline',
                        pathname === item.href
                          ? 'font-medium text-foreground underline'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
