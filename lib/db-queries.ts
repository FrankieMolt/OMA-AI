// Optimized database queries with caching

const CACHE_TTL = 60 * 1000; // 1 minute

const cache = new Map<string, { data: unknown; timestamp: number }>();

export async function cachedQuery(key: string, queryFn: () => Promise<unknown>) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const data = await queryFn();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}

// Pagination helper
export function getPagination(page: number, limit: number = 20) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  return { from, to };
}

// Search helper
export function buildSearchQuery(searchTerm: string, fields: string[]) {
  const conditions = fields.map((field) => `${field}.ilike.%${searchTerm}%`);
  return conditions.join(',');
}
