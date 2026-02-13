import { NextRequest, NextResponse } from 'next/server';

/**
 * Allow public access to API routes with demo data
 * This bypasses Supabase authentication for production
 */

export interface PublicAccessOptions {
  allowedRoutes?: string[];
  demoMode?: boolean;
}

const DEFAULT_DEMO_DATA = {
  services: [
    { id: 'srv-001', name: 'AI Image Generator', category: 'ai-tools', price: 4.99, rating: 4.7, reviews: 128 },
    { id: 'srv-002', name: 'Text Summarizer', category: 'ai-tools', price: 9.99, rating: 4.5, reviews: 89 },
    { id: 'srv-003', name: 'Code Assistant', category: 'ai-tools', price: 14.99, rating: 4.8, reviews: 234 },
    { id: 'srv-004', name: 'Data Enrichment', category: 'ai-tools', price: 7.99, rating: 4.6, reviews: 156 },
    { id: 'srv-005', name: 'Translation API', category: 'ai-tools', price: 19.99, rating: 4.9, reviews: 412 },
    { id: 'srv-006', name: 'Sentiment Analysis', category: 'ai-tools', price: 12.99, rating: 4.3, reviews: 287 },
    { id: 'srv-007', name: 'Voice Synthesis', category: 'ai-tools', price: 29.99, rating: 4.7, reviews: 523 },
  ],
  tasks: [
    { id: 'task-001', title: 'Build Resume Parser', reward: 500, status: 'open' },
    { id: 'task-002', title: 'Create API Documentation', reward: 350, status: 'in_progress' },
    { id: 'task-003', title: 'Fix Mobile Navigation', reward: 250, status: 'completed' },
    { id: 'task-004', title: 'Optimize Images', reward: 300, status: 'pending' },
  ],
  stats: {
    totalServices: 7,
    totalTasks: 156,
    completedTasks: 89,
    pendingTasks: 67
  }
};

/**
 * Check if request should be allowed without authentication
 */
export function allowPublicAccess(request: NextRequest, options: PublicAccessOptions = {}) {
  const { pathname } = new URL(request.url);
  
  // List of routes that don't require authentication
  const publicRoutes = options.allowedRoutes || [
    '/api/marketplace',
    '/api/health',
    '/api/stats',
    '/api/bounties',
    '/api/docs',
    '/api/services',
    '/api/shorten',
    '/api/qr',
    '/api/resume',
    '/api/search',
    '/api/agents',
    '/api/terminal',
    '/api/links',
    '/api/mcp',
    '/api/payments',
  ];
  
  // Check if route is public
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  // Or if demo mode is enabled
  const isDemoMode = options.demoMode !== false;
  
  // Allow access if public route or demo mode
  if (isPublicRoute || isDemoMode) {
    return {
      allowed: true,
      demoMode: isDemoMode,
      useDemoData: isDemoMode
    };
  }
  
  // Otherwise, require authentication
  return {
    allowed: false,
    demoMode: false,
    useDemoData: false
  };
}

/**
 * Get demo data for API routes
 */
export function getDemoData(endpoint: string) {
  const path = new URL(endpoint, 'http://localhost:3000').pathname;
  
  // Return demo data based on endpoint
  if (path.includes('/api/services')) {
    return { services: DEFAULT_DEMO_DATA.services, stats: DEFAULT_DEMO_DATA.stats };
  }
  
  if (path.includes('/api/tasks')) {
    return { tasks: DEFAULT_DEMO_DATA.tasks, stats: DEFAULT_DEMO_DATA.stats };
  }
  
  if (path.includes('/api/bounties')) {
    return { tasks: DEFAULT_DEMO_DATA.tasks.filter(t => t.status === 'open'), stats: DEFAULT_DEMO_DATA.stats };
  }
  
  if (path.includes('/api/marketplace') || path.includes('/api/links')) {
    return { services: DEFAULT_DEMO_DATA.services.slice(0, 5), pagination: { total: 5, limit: 10, offset: 0, hasMore: true } };
  }
  
  // Default empty response
  return { services: [], tasks: [], stats: DEFAULT_DEMO_DATA.stats };
}

/**
 * Create response with demo data
 */
export function createDemoResponse(data: any, endpoint: string) {
  return NextResponse.json({
    success: true,
    demo: true,
    data,
    _meta: {
      timestamp: new Date().toISOString(),
      endpoint,
      mode: 'demo'
    }
  });
}

/**
 * Create unauthorized response with helpful message
 */
export function createUnauthorizedResponse(message: string = 'Authentication required') {
  return NextResponse.json(
    { 
      success: false, 
      error: message,
      demo: true,
      _meta: {
        timestamp: new Date().toISOString(),
        hint: 'Public demo mode is available'
      }
    },
    { status: 401 }
  );
}
