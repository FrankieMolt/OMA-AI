'use client';

import { useMemo } from 'react';

export type DateFormat = 'relative' | 'full' | 'date' | 'time' | 'datetime';

/**
 * useDateFormatter - Hook for consistent date formatting across the app
 * 
 * Provides multiple format options:
 * - relative: "5m ago", "2h ago", "3d ago"
 * - full: "March 15, 2024 at 2:30 PM"
 * - date: "Mar 15, 2024"
 * - time: "2:30 PM"
 * - datetime: "Mar 15, 2:30 PM"
 * 
 * @param dateString - ISO date string to format
 * @param format - Format style to use (default: 'relative')
 * @returns Formatted date string
 * 
 * @example
 * const formatted = useDateFormatter(tx.created_at, 'relative');
 * // "Just now", "5m ago", "2h ago", "3d ago", "Mar 15, 2024"
 */
export function useDateFormatter(
  dateString: string | null | undefined,
  format: DateFormat = 'relative'
): string {
  return useMemo(() => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    
    switch (format) {
      case 'relative': {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffSecs = Math.floor(diffMs / 1000);
        const diffMins = Math.floor(diffSecs / 60);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffSecs < 60) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        
        // Fall through to date format for older
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
        });
      }
      
      case 'full':
        return date.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      
      case 'date':
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
      
      case 'time':
        return date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        });
      
      case 'datetime':
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      
      default:
        return date.toLocaleDateString();
    }
  }, [dateString, format]);
}

/**
 * Format date for API responses and debugging
 */
export function formatISODate(date: Date): string {
  return date.toISOString();
}
