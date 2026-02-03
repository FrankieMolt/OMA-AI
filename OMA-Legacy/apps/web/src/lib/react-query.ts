import {
  QueryClient,
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';

const QUERY_STALE_TIME = 5 * 60 * 1000;
const QUERY_CACHE_TIME = 10 * 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME,
      gcTime: QUERY_CACHE_TIME,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

export function useListings(params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sortBy?: string;
  status?: string;
  pricingType?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  featured?: boolean;
  verified?: boolean;
  tags?: string[];
  capabilities?: string[];
}) {
  return useQuery({
    queryKey: ['listings', params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.set('page', params.page.toString());
      if (params?.limit) queryParams.set('limit', params.limit.toString());
      if (params?.search) queryParams.set('search', params.search);
      if (params?.category) queryParams.set('category', params.category);
      if (params?.sortBy) queryParams.set('sortBy', params.sortBy);
      if (params?.status) queryParams.set('status', params.status);
      if (params?.pricingType) queryParams.set('pricingType', params.pricingType);
      if (params?.minPrice !== undefined) queryParams.set('minPrice', params.minPrice.toString());
      if (params?.maxPrice !== undefined) queryParams.set('maxPrice', params.maxPrice.toString());
      if (params?.minRating !== undefined)
        queryParams.set('minRating', params.minRating.toString());
      if (params?.featured !== undefined) queryParams.set('featured', params.featured.toString());
      if (params?.verified !== undefined) queryParams.set('verified', params.verified.toString());
      if (params?.tags?.length) queryParams.set('tags', params.tags.join(','));
      if (params?.capabilities?.length)
        queryParams.set('capabilities', params.capabilities.join(','));

      const response = await fetch(`/api/listings?${queryParams.toString()}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch listings');
      }

      const data = await response.json();
      return {
        listings: data.data || [],
        meta: data.meta || { page: 1, limit: 20, total: 0 },
      };
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useListing(id: number | string) {
  return useQuery({
    queryKey: ['listing', id],
    queryFn: async () => {
      const response = await fetch(`/api/listings/${id}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch listing');
      }
      return response.json();
    },
    enabled: !!id,
  });
}

export function useWalletBalance(includeOnchain = false) {
  return useQuery({
    queryKey: ['wallet', 'balance', { includeOnchain }],
    queryFn: async () => {
      const response = await fetch(`/api/wallet/balance?includeOnchain=${includeOnchain}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch balance');
      }
      const data = await response.json();
      return {
        balances: data.balances,
        wallet: data.wallet,
        conversionRate: data.conversionRate,
      };
    },
    staleTime: 30 * 1000,
  });
}

export function useTransactionHistory(params?: {
  type?: 'deposit' | 'withdrawal' | 'payment' | 'all';
  status?: 'pending' | 'completed' | 'failed' | 'all';
  limit?: number;
  offset?: number;
  startDate?: string;
  endDate?: string;
}) {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (params?.type && params.type !== 'all') queryParams.set('type', params.type);
      if (params?.status && params.status !== 'all') queryParams.set('status', params.status);
      if (params?.limit) queryParams.set('limit', params.limit.toString());
      if (params?.offset !== undefined) queryParams.set('offset', params.offset.toString());
      if (params?.startDate) queryParams.set('startDate', params.startDate);
      if (params?.endDate) queryParams.set('endDate', params.endDate);

      const response = await fetch(`/api/wallet/history?${queryParams.toString()}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch transaction history');
      }
      const data = await response.json();
      return {
        transactions: data.transactions || [],
        pagination: data.pagination || {
          limit: 20,
          offset: 0,
          total: 0,
          totalPages: 1,
          currentPage: 1,
        },
        summary: data.summary || {},
        filters: data.filters || {},
      };
    },
  });
}

export function useDeposit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { txId: string; amount: string }) => {
      const response = await fetch('/api/wallet/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Deposit failed');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet', 'balance'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
}

export function useWithdraw() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { amount: string; recipientAddress: string }) => {
      const response = await fetch('/api/wallet/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Withdrawal failed');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet', 'balance'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
}

export { useQuery, useMutation, useInfiniteQuery, useQueryClient };
