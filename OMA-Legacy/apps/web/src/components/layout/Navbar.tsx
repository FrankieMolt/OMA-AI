'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WalletButton } from '@/components/wallet/WalletButton';
import { ModeToggle } from '@/components/layout/mode-toggle';
import { SolanaLogo } from '@/components/ui/solana-logo';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import React from 'react';
import strings from '@/constants/text.json';

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: strings.nav.dashboard, href: '/dashboard' },
    { name: strings.nav.docs, href: '/docs' },
    { name: strings.nav.a2a, href: '/a2a' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav h-16 flex items-center justify-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <Link
            href="/"
            className="flex items-center space-x-2.5 transition-all hover:scale-105 active:scale-95 group"
          >
            <div className="size-9 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 shadow-neon-sm group-hover:bg-primary/15 group-hover:border-primary/40 transition-all duration-300">
              <SolanaLogo className="h-6 w-8 drop-shadow-[0_0_6px_rgba(var(--primary),0.35)]" />
            </div>
            <span className="font-black text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">
              {strings.common.app_name}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-foreground/70 hover:text-foreground">{strings.nav.directory}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md glass-panel p-6 no-underline outline-none focus:shadow-md hover:bg-foreground/5 transition-colors"
                          href="/marketplace"
                        >
                          <SolanaLogo className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            {strings.nav.marketplace}
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            {strings.nav.marketplace_desc}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/skills" title={strings.nav.skills}>
                      {strings.nav.skills_desc}
                    </ListItem>
                    <ListItem href="/mcp" title={strings.nav.mcp_servers}>
                      {strings.nav.mcp_servers_desc}
                    </ListItem>
                    <ListItem href="/agents" title={strings.nav.agents}>
                      {strings.nav.agents_desc}
                    </ListItem>
                    <ListItem href="/subagents" title={strings.nav.sub_agents}>
                      {strings.nav.sub_agents_desc}
                    </ListItem>
                    <ListItem href="/workflows" title={strings.nav.workflows}>
                      {strings.nav.workflows_desc}
                    </ListItem>
                    <ListItem href="/n8n" title={strings.nav.n8n}>
                      {strings.nav.n8n_desc}
                    </ListItem>
                    <ListItem href="/x402" title={strings.nav.x402}>
                      {strings.nav.x402_desc}
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/generate" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {strings.nav.generate}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.name}>
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-foreground/70 hover:text-foreground")}>
                      {link.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

        <Link
            href="/agent"
            className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary via-foreground to-primary animate-text-shimmer bg-[length:200%_auto] hover:text-primary transition-all flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/70 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {strings.nav.ultimate_agent}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <Link href="/dashboard/create">
              <Button
                variant="neon"
                size="sm"
                className="h-9 px-5 rounded-full font-semibold text-[11px] tracking-wide"
              >
                {strings.nav.publish_agent}
              </Button>
            </Link>
          </div>
          <div className="h-8 w-px bg-border/70 hidden sm:block" />
          <ModeToggle />
          <WalletButton />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground/60 hover:text-foreground hover:bg-foreground/5 rounded-xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-x-0 top-16 border-b border-border/70 glass-enhanced md:hidden z-40"
        >
          <nav className="flex flex-col p-6 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-semibold text-foreground/80 hover:text-primary transition-colors flex items-center justify-between group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </Link>
            ))}
            <div className="h-px bg-border/60" />
            <Link
              href="/dashboard/create"
              className="text-lg font-bold text-primary flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {strings.nav.publish_agent}{' '}
              <span className="text-[10px] bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                {strings.nav.new}
              </span>
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
