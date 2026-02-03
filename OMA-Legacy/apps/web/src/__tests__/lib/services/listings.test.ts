import { describe, it, expect } from 'vitest';
import { listingsService } from '@/lib/services/listings';

describe('ListingsService', () => {
  describe('getListings', () => {
    it('should return listings array with pagination', async () => {
      const result = await listingsService.getListings({
        page: 1,
        limit: 10,
        status: 'approved',
      });

      expect(result).toHaveProperty('listings');
      expect(result).toHaveProperty('total');
      expect(Array.isArray(result.listings)).toBe(true);
      expect(typeof result.total).toBe('number');
    });

    it('should handle category filter', async () => {
      const result = await listingsService.getListings({
        page: 1,
        limit: 10,
        category: 'agent',
      });

      expect(Array.isArray(result.listings)).toBe(true);
    });

    it('should handle search query', async () => {
      const result = await listingsService.getListings({
        page: 1,
        limit: 10,
        search: 'test',
      });

      expect(Array.isArray(result.listings)).toBe(true);
    });

    it('should handle different sort options', async () => {
      const sortOptions = ['newest', 'popular', 'price-low', 'price-high', 'rating', 'name'];

      for (const sortBy of sortOptions) {
        const result = await listingsService.getListings({
          page: 1,
          limit: 10,
          sortBy,
        });
        expect(Array.isArray(result.listings)).toBe(true);
      }
    });
  });

  describe('getListingById', () => {
    it('should return null for non-existent ID', async () => {
      const result = await listingsService.getListingById(999999);
      expect(result).toBeNull();
    });
  });

  describe('getListingBySlug', () => {
    it('should return null for non-existent slug', async () => {
      const result = await listingsService.getListingBySlug('non-existent-slug');
      expect(result).toBeNull();
    });
  });

  describe('getFeaturedListings', () => {
    it('should return array of featured listings', async () => {
      const result = await listingsService.getFeaturedListings(10);
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('getCategories', () => {
    it('should return categories array', async () => {
      const result = await listingsService.getCategories();
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
