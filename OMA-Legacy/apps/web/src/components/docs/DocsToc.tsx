'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { List } from 'lucide-react';
import strings from '@/constants/text.json';

type DocsTocItem = { id: string; title: string; level?: number };

export function DocsToc({ items }: { items?: DocsTocItem[] }) {
  const [headings, setHeadings] = React.useState<{ id: string; title: string; level: number }[]>(
    []
  );

  React.useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3'));
    const mapped = elements.map((elem) => ({
      id: elem.id || elem.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
      title: elem.textContent || '',
      level: Number(elem.tagName.substring(1)),
    }));
    setHeadings(mapped);
  }, []);

  const tocItems =
    items && items.length > 0
      ? items.map((item) => ({ ...item, level: item.level ?? 2 }))
      : headings;

  if (tocItems.length === 0) return null;

  return (
    <div className="my-8 p-6 rounded-xl border border-border/60 bg-foreground/[0.03] backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4 text-muted-foreground">
        <List className="size-4" />
        <span className="text-sm font-semibold uppercase tracking-wider">{strings.docs.toc.title}</span>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
        {tocItems.map((heading) => (
          <li
            key={heading.id}
            className={cn(
              'flex items-center gap-2 transition-colors hover:text-primary',
              heading.level === 3 ? 'pl-4 opacity-70' : 'font-medium'
            )}
          >
            <span className="size-1 rounded-full bg-primary/30" />
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(`#${heading.id}`)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {heading.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
