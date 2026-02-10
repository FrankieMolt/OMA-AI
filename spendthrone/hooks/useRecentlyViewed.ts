/**
 * useRecentlyViewed - Track and manage recently viewed products
 */

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS, APP_CONFIG } from '@/lib/constants';

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage<string[]>(
    STORAGE_KEYS.RECENTLY_VIEWED,
    []
  );

  const addToRecentlyViewed = useCallback((productId: string) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists (to move to front)
      const filtered = prev.filter((id) => id !== productId);
      // Add to front and limit to max items
      return [productId, ...filtered].slice(0, APP_CONFIG.MAX_RECENTLY_VIEWED);
    });
  }, [setRecentlyViewed]);

  const removeFromRecentlyViewed = useCallback((productId: string) => {
    setRecentlyViewed((prev) => prev.filter((id) => id !== productId));
  }, [setRecentlyViewed]);

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
  }, [setRecentlyViewed]);

  return {
    recentlyViewed,
    addToRecentlyViewed,
    removeFromRecentlyViewed,
    clearRecentlyViewed,
  };
}
