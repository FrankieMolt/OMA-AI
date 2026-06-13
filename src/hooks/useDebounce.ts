'use client';

import { useState, useEffect } from 'react';

/**
 * useDebounce - Delays updating a value until after a specified delay
 * 
 * Use case: Filter inputs that trigger expensive operations (API calls,
 * filtering large lists). Prevents rapid-fire updates while user is typing.
 * 
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 300ms)
 * @returns The debounced value
 * 
 * @example
 * const debouncedSearch = useDebounce(searchTerm, 500);
 * useEffect(() => { fetchResults(debouncedSearch); }, [debouncedSearch]);
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
