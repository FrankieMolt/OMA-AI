/**
 * useBodyScrollLock - Hook to lock/unlock body scroll
 * Used in drawers, modals, and overlays
 */

import { useMemo } from 'react';

export function useBodyScrollLock(isLocked: boolean) {
  useMemo(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isLocked ? 'hidden' : 'unset';
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isLocked]);
}
