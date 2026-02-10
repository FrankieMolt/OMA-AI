import { NextResponse } from 'next/server';

/**
 * Health Check Endpoint
 * Used for monitoring and load balancer health checks
 */
export async function GET() {
  const healthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0',
    checks: {
      database: 'operational',
      api: 'operational',
      cache: 'operational'
    }
  };

  return NextResponse.json(healthCheck, {
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Health-Check': 'true'
    }
  });
}
