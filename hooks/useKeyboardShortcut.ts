import { useEffect } from 'react';

export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  modifiers: { meta?: boolean; ctrl?: boolean; shift?: boolean } = {}
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const metaMatch = modifiers.meta ? (e.metaKey || e.ctrlKey) : !e.metaKey || e.ctrlKey;
      const ctrlMatch = modifiers.ctrl ? e.ctrlKey : !e.ctrlKey || e.metaKey;
      const shiftMatch = modifiers.shift ? e.shiftKey : !e.shiftKey;
      
      if (
        e.key.toLowerCase() === key.toLowerCase() &&
        metaMatch &&
        ctrlMatch &&
        shiftMatch
      ) {
        e.preventDefault();
        callback();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [key, callback, modifiers]);
}
