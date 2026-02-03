'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface OnPageNavigationProps {
  className?: string;
}

export function OnPageNavigation({ className }: OnPageNavigationProps) {
  const [headings, setHeadings] = React.useState<{ id: string; title: string; level: number }[]>(
    []
  );
  const [activeId, setActiveId] = React.useState<string>('');

  React.useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3'));
    const mapped = elements.map((elem) => ({
      id: elem.id || elem.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
      title: elem.textContent || '',
      level: Number(elem.tagName.substring(1)),
    }));

    // Ensure IDs exist
    elements.forEach((elem, i) => {
      if (!elem.id) {
        elem.id = mapped[i].id;
      }
    });

    setHeadings(mapped);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%' }
    );

    elements.forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className={cn('hidden xl:block', className)}>
      <div className="sticky top-16 -mt-10 max-h-[calc(100vh-3.5rem)] overflow-y-auto pt-10 pb-6">
        <h4 className="mb-2 text-sm font-semibold">On This Page</h4>
        <ul className="grid gap-2 text-sm">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  'block transition-colors hover:text-foreground',
                  heading.level === 3 ? 'pl-4' : '',
                  activeId === heading.id ? 'font-medium text-primary' : 'text-muted-foreground'
                )}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`#${heading.id}`)?.scrollIntoView({
                    behavior: 'smooth',
                  });
                  setActiveId(heading.id);
                }}
              >
                {heading.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
