'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

interface ProvidersProps {
  children: React.ReactNode;
}

// Create a client instance that will be used throughout the app
export function QueryProvider({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Stale while revalidate strategy
            // Show cached data immediately, then fetch fresh data in background
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)

            // Retry failed requests
            retry: (failureCount, error) => {
              // Don't retry on 404 or 401 errors
              if (error instanceof Error && error.message.includes('404')) {
                return false;
              }
              if (error instanceof Error && error.message.includes('401')) {
                return false;
              }
              // Retry up to 3 times
              return failureCount < 3;
            },

            // Retry delay with exponential backoff
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

            // Refetch on window focus
            refetchOnWindowFocus: false, // Disabled for better UX

            // Refetch on reconnect
            refetchOnReconnect: true,

            // Refetch on mount
            refetchOnMount: 'always',
          },

          mutations: {
            // Retry failed mutations
            retry: 1,

            // Error handling
            onError: (error) => {
              console.error('Mutation error:', error);
            },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

// Hook for API calls with caching
export function useAPICache() {
  // This is a placeholder - actual implementation would use useQuery
  // Example:
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ['api', 'list'],
  //   queryFn: fetchAPIList,
  //   staleTime: 5 * 60 * 1000, // 5 minutes
  // });

  return {
    // Return cached data and functions
  };
}

// Predefined cache keys for consistency
export const cacheKeys = {
  apis: ['apis'] as const,
  api: (id: string) => ['api', id] as const,
  categories: ['categories'] as const,
  trending: ['trending'] as const,
  stats: ['stats'] as const,
  developers: ['developers'] as const,
  docs: ['docs'] as const,

  // Filtered queries
  filteredAPIs: (filters: any) => ['apis', 'filtered', filters] as const,
  searchAPIs: (query: string) => ['apis', 'search', query] as const,
};

// Helper function to invalidate related caches
export function invalidateCache(queryClient: QueryClient, key: readonly unknown[]) {
  queryClient.invalidateQueries({ queryKey: key });
}

// Helper function to set cache data manually
export function setCacheData(queryClient: QueryClient, key: readonly unknown[], data: any) {
  queryClient.setQueryData(key, data);
}

// Prefetch data for future use
export function prefetchCache(
  queryClient: QueryClient,
  key: readonly unknown[],
  fetcher: () => Promise<any>
) {
  queryClient.prefetchQuery({
    queryKey: key,
    queryFn: fetcher,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
