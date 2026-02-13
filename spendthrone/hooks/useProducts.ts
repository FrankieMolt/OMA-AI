'use client';

import { useState, useEffect, useCallback } from 'react';

interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  affiliateLink: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isOnSale?: boolean;
  verified?: boolean;
}

interface UseProductsOptions {
  initialPage?: number;
  limit?: number;
  category?: string;
  search?: string;
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  total: number;
  loadMore: () => void;
  refresh: () => void;
}

export function useProducts(options: UseProductsOptions = {}): UseProductsReturn {
  const { initialPage = 1, limit = 12, category = 'all', search = '' } = options;
  
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchProducts = useCallback(async (pageNum: number, append: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: String(pageNum),
        limit: String(limit),
        category,
        ...(search && { search })
      });
      
      const res = await fetch(`/api/products?${params}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      
      const data = await res.json();
      
      setProducts(prev => append ? [...prev, ...data.products] : data.products);
      setHasMore(data.pagination.hasMore);
      setTotal(data.pagination.total);
      setPage(pageNum);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [category, search, limit]);

  // Initial fetch and when filters change
  useEffect(() => {
    fetchProducts(1, false);
  }, [fetchProducts]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchProducts(page + 1, true);
    }
  }, [loading, hasMore, page, fetchProducts]);

  const refresh = useCallback(() => {
    fetchProducts(1, false);
  }, [fetchProducts]);

  return { products, loading, error, hasMore, total, loadMore, refresh };
}
