'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useGlobalShortcuts() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K - Search (already implemented)
      
      // Cmd/Ctrl + / - Shortcuts help
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        alert('Shortcuts:\nCmd+K: Search\nCmd+/: Help\nCmd+D: Dark mode\nEscape: Close modal');
      }

      // Cmd/Ctrl + D - Toggle dark mode
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault();
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', 
          document.documentElement.classList.contains('dark') ? 'dark' : 'light'
        );
      }

      // Escape - Close any modal
      if (e.key === 'Escape') {
        const modal = document.querySelector('[role="dialog"]');
        if (modal) {
          const closeButton = modal.querySelector('[aria-label="Close"]') as HTMLButtonElement;
          closeButton?.click();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);
}
