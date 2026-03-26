'use client';

import { useState, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFetchState<T>(initialData: T | null = null): [
  T | null,
  boolean,
  Error | null,
  (fetcher: () => Promise<T>) => Promise<void>
] {
  const [state, setState] = useState<FetchState<T>>({
    data: initialData,
    loading: false,
    error: null,
  });

  const fetch = useCallback(async (fetcher: () => Promise<T>): Promise<void> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await fetcher();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState(prev => ({ ...prev, loading: false, error: error as Error }));
    }
  }, []);

  return [state.data, state.loading, state.error, fetch];
}

export default useFetchState;
