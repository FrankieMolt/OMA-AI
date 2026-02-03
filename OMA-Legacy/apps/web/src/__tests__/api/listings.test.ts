import { describe, it, expect } from 'vitest';
import { GET as GETListings } from '@/app/api/listings/route';

describe('API: /api/listings', () => {
  it('should return listings array', async () => {
    const request = new Request('http://localhost:3000/api/listings', {
      method: 'GET',
    });

    const response = await GETListings(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data.data)).toBe(true);
    expect(typeof data.meta).toBe('object');
  });

  it('should handle pagination parameters', async () => {
    const request = new Request('http://localhost:3000/api/listings?page=1&limit=10', {
      method: 'GET',
    });

    const response = await GETListings(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.meta.page).toBe(1);
    expect(data.meta.limit).toBe(10);
  });
});
