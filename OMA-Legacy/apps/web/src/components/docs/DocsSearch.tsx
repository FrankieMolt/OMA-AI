'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import strings from '@/constants/text.json';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useRouter } from 'next/navigation';

export function DocsSearch() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'relative inline-flex h-10 w-full items-center justify-start rounded-full border border-border/60 bg-foreground/5 px-4 py-2 text-sm font-medium text-muted-foreground gap-2 transition-all hover:bg-foreground/10 hover:border-border/80 sm:pr-12 md:w-40 lg:w-64 backdrop-blur-md'
        )}
      >
        <Search className="h-4 w-4 text-primary" />
        <span className="hidden lg:inline-flex">{strings.docs.search.button_full}</span>
        <span className="inline-flex lg:hidden">{strings.docs.search.button_compact}</span>
        <kbd className="pointer-events-none absolute right-2 top-[0.4rem] hidden h-6 select-none items-center gap-1 rounded-full border border-border/60 bg-foreground/5 px-2 font-mono text-[10px] font-medium opacity-100 sm:flex text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={strings.docs.search.dialog_placeholder} />
        <CommandList>
          <CommandEmpty>{strings.docs.search.empty}</CommandEmpty>
          <CommandGroup heading={strings.docs.search.group_links}>
            <CommandItem onSelect={() => runCommand(() => router.push('/docs/introduction'))}>
              {strings.docs.search.link_introduction}
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/docs/quick-start'))}>
              {strings.docs.search.link_quick_start}
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/docs/a2a'))}>
              {strings.docs.search.link_a2a}
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/docs/x402'))}>
              {strings.docs.search.link_x402}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
