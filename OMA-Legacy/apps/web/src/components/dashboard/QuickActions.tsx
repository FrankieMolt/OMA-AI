'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import strings from '@/constants/text.json';

interface QuickActionsProps {
  className?: string;
}

export function QuickActions({ className }: QuickActionsProps) {
  return (
    <div className={`glass-card border-none rounded-xl ${className || ''}`}>
      <div className="p-6">
        <h3 className="text-foreground font-bold flex items-center gap-2 mb-4">
          <LightningIcon className="w-5 h-5 text-primary" />
          {strings.dashboard.quick_actions.title}
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {/* Deploy New Agent */}
          <Button
            asChild
            variant="default"
            className={cn(
              'w-full justify-start h-auto py-3 px-4 transition-all duration-300 group/btn',
              'bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-[10px] shadow-neon'
            )}
          >
            <Link href="/dashboard/create">
              <PlusIcon
                className={cn(
                  'w-4 h-4 mr-3 shrink-0 transition-transform duration-300 group-hover/btn:scale-110',
                  'text-primary-foreground'
                )}
              />
              <div className="flex flex-col items-start overflow-hidden">
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  {strings.dashboard.quick_actions.deploy.title}
                </span>
                <span className="text-[9px] opacity-60 font-medium truncate w-full">
                  {strings.dashboard.quick_actions.deploy.desc}
                </span>
              </div>
            </Link>
          </Button>

          {/* Browse Marketplace */}
          <Button
            asChild
            variant="outline"
            className={cn(
              'w-full justify-start h-auto py-3 px-4 transition-all duration-300 group/btn',
              'glass-panel text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-foreground/5'
            )}
          >
            <Link href="/marketplace">
              <TrendingUpIcon
                className={cn(
                  'w-4 h-4 mr-3 shrink-0 transition-transform duration-300 group-hover/btn:scale-110',
                  'text-primary'
                )}
              />
              <div className="flex flex-col items-start overflow-hidden">
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  {strings.dashboard.quick_actions.browse.title}
                </span>
                <span className="text-[9px] opacity-60 font-medium truncate w-full">
                  {strings.dashboard.quick_actions.browse.desc}
                </span>
              </div>
            </Link>
          </Button>

          {/* Manage Wallet */}
          <Button
            asChild
            variant="outline"
            className={cn(
              'w-full justify-start h-auto py-3 px-4 transition-all duration-300 group/btn',
              'glass-panel text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-foreground/5'
            )}
          >
            <Link href="/dashboard/wallet">
              <CoinsIcon
                className={cn(
                  'w-4 h-4 mr-3 shrink-0 transition-transform duration-300 group-hover/btn:scale-110',
                  'text-primary'
                )}
              />
              <div className="flex flex-col items-start overflow-hidden">
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  {strings.dashboard.quick_actions.wallet.title}
                </span>
                <span className="text-[9px] opacity-60 font-medium truncate w-full">
                  {strings.dashboard.quick_actions.wallet.desc}
                </span>
              </div>
            </Link>
          </Button>

          {/* View Documentation */}
          <Button
            asChild
            variant="outline"
            className={cn(
              'w-full justify-start h-auto py-3 px-4 transition-all duration-300 group/btn',
              'glass-panel text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-foreground/5'
            )}
          >
            <Link href="/docs">
              <BookOpenIcon
                className={cn(
                  'w-4 h-4 mr-3 shrink-0 transition-transform duration-300 group-hover/btn:scale-110',
                  'text-primary'
                )}
              />
              <div className="flex flex-col items-start overflow-hidden">
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  {strings.dashboard.quick_actions.docs.title}
                </span>
                <span className="text-[9px] opacity-60 font-medium truncate w-full">
                  {strings.dashboard.quick_actions.docs.desc}
                </span>
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function LightningIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function CoinsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  );
}

function BookOpenIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
