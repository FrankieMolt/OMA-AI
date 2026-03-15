import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { handleApiError, validateRequiredFields, withCache } from '@/lib/utils/api-error';

// GET /api/agents - List all agents (public or user's own)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('agents')
      .select(`
        *,
        user:users!agents_user_id_fkey (
          id,
          email,
          user_metadata
        )
      `);

    // Filter by status
    if (status) {
      query = query.eq('status', status);
    }

    // Filter by user
    if (userId) {
      query = query.eq('user_id', userId);
    }

    // Search by name or description
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Pagination
    query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      return handleApiError(error, 'GET /api/agents', {
        userMessage: 'Failed to fetch agents',
        statusCode: 500,
      });
    }

    const response = NextResponse.json({
      agents: data,
      count,
      offset,
      limit,
    });
    response.headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  } catch (error) {
    return handleApiError(error, 'GET /api/agents');
  }
}

// POST /api/agents - Create new agent
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const validationError = validateRequiredFields(body, ['user_id', 'name', 'slug', 'prompt', 'config']);
    if (validationError) {
      return validationError;
    }

    const { user_id, name, slug, description, prompt, config, pricing } = body;

    // Generate slug if not provided
    const agentSlug = slug || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    // Create agent
    const { data: agent, error } = await supabase
      .from('agents')
      .insert({
        user_id,
        name,
        slug: agentSlug,
        description: description || '',
        prompt,
        config,
        pricing: pricing || 0,
        status: 'draft',
      })
      .select()
      .single();

    if (error) {
      return handleApiError(error, 'POST /api/agents', {
        userMessage: 'Failed to create agent',
        statusCode: 500,
      });
    }

    return NextResponse.json({ agent }, { status: 201 });
  } catch (error) {
    return handleApiError(error, 'POST /api/agents');
  }
}
