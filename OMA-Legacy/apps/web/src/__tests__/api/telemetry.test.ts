import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the NextResponse
const mockJson = vi.fn();
vi.mock('next/server', () => ({
  NextResponse: {
    json: (data: unknown) => {
      mockJson(data);
      return { json: () => Promise.resolve(data) };
    },
  },
}));

describe('/api/console/telemetry', () => {
  beforeEach(() => {
    mockJson.mockClear();
  });

  it('should return telemetry data with expected structure', async () => {
    // Import the route handler
    const { GET } = await import('@/app/api/console/telemetry/route');

    const response = await GET();
    const data = await response.json();

    // Verify data structure
    expect(data).toHaveProperty('timestamp');
    expect(data).toHaveProperty('battery');
    expect(data).toHaveProperty('position');
    expect(data).toHaveProperty('hardware');

    // Verify battery object
    expect(data.battery).toHaveProperty('level');
    expect(data.battery).toHaveProperty('voltage');
    expect(data.battery.level).toBeGreaterThanOrEqual(80);
    expect(data.battery.level).toBeLessThanOrEqual(100);

    // Verify position object
    expect(data.position).toHaveProperty('lat');
    expect(data.position).toHaveProperty('lng');
    expect(data.position).toHaveProperty('alt');

    // Verify hardware object
    expect(data.hardware).toHaveProperty('cpuTemp');
    expect(data.hardware).toHaveProperty('motorStatus');
  });

  it('should return timestamp as a number', async () => {
    const { GET } = await import('@/app/api/console/telemetry/route');

    const response = await GET();
    const data = await response.json();

    expect(typeof data.timestamp).toBe('number');
    expect(data.timestamp).toBeGreaterThan(0);
  });
});
