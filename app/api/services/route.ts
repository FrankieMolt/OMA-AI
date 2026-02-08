import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseEnabled } from '@/lib/supabase';
import { checkRateLimit, createRateLimitResponse, addSecurityHeaders } from '@/lib/security';

// GET /api/services - List all services with optional filtering
export async function GET(request: NextRequest) {
  // Rate limiting: 60 requests per minute per IP
  const rateLimitResult = await checkRateLimit(request, 60, 60 * 1000);
  if (!rateLimitResult.success) {
    return createRateLimitResponse(rateLimitResult.resetTime!);
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  const search = searchParams.get('search');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const sort = searchParams.get('sort') || 'created_at';
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');

  // Return demo data if Supabase is not configured
  if (!isSupabaseEnabled) {
    const demoServices = [
      {
        id: 'demo-1',
        name: 'GPT-4 Turbo',
        description: 'Advanced large language model for complex reasoning, coding, and creative tasks.',
        price_per_use: 0.01,
        type: 'model',
        seller_wallet: '0x123...',
        capabilities: ['text-generation', 'reasoning', 'coding'],
        tags: ['llm', 'gpt', 'nlp'],
        rating: 5.0,
        rating_count: 100,
        total_sales: 500,
        status: 'active'
      },
      {
        id: 'demo-2',
        name: 'Image Recognition API',
        description: 'Identify objects, scenes, and text in images with state-of-the-art accuracy.',
        price_per_use: 0.001,
        type: 'api',
        seller_wallet: '0x456...',
        capabilities: ['object-detection', 'scene-recognition'],
        tags: ['computer-vision', 'ai'],
        rating: 4.5,
        rating_count: 50,
        total_sales: 250,
        status: 'active'
      }
    ];

    return NextResponse.json({ services: demoServices, total: demoServices.length });
  }

  // Build query - simplified without joins to missing tables
  let query = supabase!.from('services')
    .select('*');

  // Apply filters
  if (tag) {
    query = query.contains('tags', [tag]);
  }
  if (search) {
    // Sanitize search input to prevent SQL injection
    const sanitizedSearch = search
      .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens
      .trim()
      .substring(0, 100); // Limit length

    if (sanitizedSearch.length > 0) {
      query = query.or(`name.ilike.%${sanitizedSearch}%,description.ilike.%${sanitizedSearch}%`);
    }
  }
  if (minPrice) {
    const parsedMinPrice = parseFloat(minPrice);
    if (!isNaN(parsedMinPrice) && parsedMinPrice >= 0) {
      query = query.gte('price_per_use', parsedMinPrice);
    }
  }
  if (maxPrice) {
    const parsedMaxPrice = parseFloat(maxPrice);
    if (!isNaN(parsedMaxPrice) && parsedMaxPrice >= 0) {
      query = query.lte('price_per_use', parsedMaxPrice);
    }
  }

  // Apply sorting
  query = query.order(sort, { ascending: false });

  // Apply pagination
  query = query.range(offset, offset + limit - 1);

  // Get total count
  const { count, error: countError } = await supabase!
    .from('services')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('Count error:', countError);
    return NextResponse.json({ error: countError.message }, { status: 500 });
  }

  // Execute query
  const { data, error } = await query;

  if (error) {
    console.error('Services error:', error);
    if (error.code === '42P01') {
      return NextResponse.json({ services: [], total: 0 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const response = NextResponse.json({ services: data, total: count || 0 });
  return addSecurityHeaders(response);
}

// POST /api/services - Create a new service
export async function POST(request: NextRequest) {
  // Rate limiting: 10 requests per 15 minutes per IP
  const rateLimitResult = await checkRateLimit(request, 10, 15 * 60 * 1000);
  if (!rateLimitResult.success) {
    return createRateLimitResponse(rateLimitResult.resetTime!);
  }

  try {
    const body = await request.json();
    const {
      name,
      description,
      type,
      price_per_use,
      x402_endpoint,
      seller_wallet,
      capabilities = [],
      tags = [],
      category_id
    } = body;

    // Validate required fields
    if (!name || !description || !type || !price_per_use || !x402_endpoint || !seller_wallet) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate price
    if (typeof price_per_use !== 'number' || price_per_use < 0) {
      return NextResponse.json(
        { error: 'Price must be a non-negative number' },
        { status: 400 }
      );
    }

    // Validate string lengths to prevent abuse
    if (name.length > 200 || description.length > 2000 || x402_endpoint.length > 500) {
      return NextResponse.json(
        { error: 'Field exceeds maximum length' },
        { status: 400 }
      );
    }

    // Validate type
    const validTypes = ['model', 'api', 'service'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // If Supabase is not enabled, return demo response
    if (!isSupabaseEnabled) {
      const newService = {
        id: `demo-${Date.now()}`,
        name,
        description,
        type,
        price_per_use,
        x402_endpoint,
        seller_wallet,
        capabilities,
        tags,
        rating: 0,
        rating_count: 0,
        total_sales: 0,
        total_revenue: 0,
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      console.log('Demo mode: Service created but not persisted:', newService);
      const response = NextResponse.json(newService, { status: 201 });
      return addSecurityHeaders(response);
    }

    // Create service
    const { data, error } = await supabase!
      .from('services')
      .insert([{
        name,
        description,
        type,
        price_per_use,
        x402_endpoint,
        seller_wallet,
        capabilities,
        tags,
        status: 'active'
      }])
      .select()
      .single();

    if (error) {
      console.error('Create service error:', error);
      if (error.code === '42P01') {
        const response = NextResponse.json({ error: 'Services table not found' }, { status: 500 });
        return addSecurityHeaders(response);
      }
      const response = NextResponse.json({ error: 'Database error' }, { status: 500 });
      return addSecurityHeaders(response);
    }

    const response = NextResponse.json(data, { status: 201 });
    return addSecurityHeaders(response);
  } catch (error) {
    console.error('Request error:', error);
    const response = NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    return addSecurityHeaders(response);
  }
}
