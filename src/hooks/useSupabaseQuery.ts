'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSupabaseClient } from '@/lib/supabase/client';

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface UseSupabaseQueryOptions<T> {
  /** Table name to query */
  table: string;
  /** Initial filters to apply */
  filters?: Record<string, unknown>;
  /** Columns to select (default: '*') */
  select?: string;
  /** Sort configuration */
  order?: { column: string; ascending?: boolean };
  /** Enable refetch on window focus */
  refetchOnFocus?: boolean;
  /** Stale time in milliseconds (default: 5 minutes) */
  staleTime?: number;
  /** Transform function for results */
  transform?: (data: unknown) => T;
  /** Query key suffix for cache uniqueness */
  queryKeySuffix?: string;
}

/**
 * useSupabaseQuery - Generic hook for Supabase queries
 * 
 * Abstracts common Supabase patterns:
 * - Loading state tracking
 * - Error handling
 * - Optional data transformation
 * - Query invalidation helpers
 * 
 * @example
 * const { data, loading, error, refetch } = useSupabaseQuery({
 *   table: 'mcp_servers',
 *   filters: { verified: true },
 *   select: 'id, name, category',
 * });
 */
export function useSupabaseQuery<T>({
  table,
  filters = {},
  select = '*',
  order,
  refetchOnFocus = false,
  staleTime = 5 * 60 * 1000,
  transform,
  queryKeySuffix,
}: UseSupabaseQueryOptions<T>) {
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);
  const supabase = getSupabaseClient();

  // Build query key from options
  const queryKey = ['supabase-query', table, filters, select, queryKeySuffix];

  const queryFn = useCallback(async () => {
    if (!supabase) {
      throw new Error('Supabase client not available');
    }

    setLoadingState('loading');
    setError(null);

    try {
      let query = supabase.from(table).select(select);

      // Apply filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (typeof value === 'string' && value.startsWith('fn:')) {
            // Allow function-based filters (e.g., 'fn:or' for OR conditions)
            const fnName = value.slice(3);
            if (fnName === 'or') {
              query = query.or(filters['or'] as string);
            }
          } else {
            query = query.eq(key, value);
          }
        }
      });

      // Apply ordering
      if (order) {
        query = query.order(order.column, { ascending: order.ascending ?? false });
      }

      const { data, error: supabaseError } = await query;

      if (supabaseError) {
        throw supabaseError;
      }

      const result = transform ? transform(data) : data;
      setLoadingState('success');
      return result as T;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Query failed';
      setError(errorMessage);
      setLoadingState('error');
      throw err;
    }
  }, [supabase, table, filters, select, order, transform, queryKeySuffix]);

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey,
    queryFn,
    staleTime,
    refetchOnWindowFocus: refetchOnFocus,
    retry: 1,
  });

  // Sync with React Query loading state
  useEffect(() => {
    if (isLoading || isFetching) {
      setLoadingState('loading');
    }
  }, [isLoading, isFetching]);

  return {
    data: data as T | undefined,
    loading: loadingState === 'loading',
    loadingState,
    error,
    refetch,
    isRefetching: isFetching && !isLoading,
  };
}

/**
 * usePaginatedSupabaseQuery - Hook for paginated Supabase queries
 * 
 * @example
 * const { data, loading, error, loadMore, hasMore } = usePaginatedSupabaseQuery({
 *   table: 'transactions',
 *   pageSize: 20,
 *   filters: { wallet: address },
 * });
 */
export function usePaginatedSupabaseQuery<T>({
  table,
  pageSize = 20,
  filters = {},
  select = '*',
  order = { column: 'created_at', ascending: false },
}: Omit<UseSupabaseQueryOptions<T>, 'queryKeySuffix'> & { pageSize?: number }) {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const supabase = getSupabaseClient();

  const queryClient = useQueryClient();

  const fetchPage = useCallback(async (pageNum: number) => {
    if (!supabase) return { data: [], hasMore: false };

    const from = (pageNum - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase.from(table).select(select);

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query = query.eq(key, value);
      }
    });

    const { data, error } = await query
      .order(order.column, { ascending: order.ascending })
      .range(from, to);

    if (error || !data) {
      return { data: [], hasMore: false };
    }

    return {
      data: data as T[],
      hasMore: data.length === pageSize,
    };
  }, [supabase, table, filters, select, order, pageSize]);

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    const nextPage = page + 1;
    const result = await fetchPage(nextPage);
    
    if (result.data.length > 0) {
      setAllData(prev => [...prev, ...result.data]);
      setPage(nextPage);
      setHasMore(result.hasMore);
    } else {
      setHasMore(false);
    }
    setIsLoadingMore(false);
  }, [page, hasMore, isLoadingMore, fetchPage]);

  const reset = useCallback(() => {
    setPage(1);
    setAllData([]);
    setHasMore(true);
    queryClient.invalidateQueries({ queryKey: ['paginated', table] });
  }, [queryClient, table]);

  // Initial fetch
  useEffect(() => {
    const init = async () => {
      const result = await fetchPage(1);
      setAllData(result.data);
      setHasMore(result.hasMore);
    };
    init();
  }, [fetchPage]);

  return {
    data: allData,
    loading: page === 1 && allData.length === 0,
    isLoadingMore,
    hasMore,
    loadMore,
    reset,
    page,
  };
}
