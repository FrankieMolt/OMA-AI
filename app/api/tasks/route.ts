import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseEnabled } from '@/lib/supabase';
import { checkRateLimit, createRateLimitResponse, addSecurityHeaders } from '@/lib/security';

// GET /api/tasks - List all tasks/bounties
export async function GET(request: NextRequest) {
  // Rate limiting: 60 requests per minute per IP
  const rateLimitResult = await checkRateLimit(request, 60, 60 * 1000);
  if (!rateLimitResult.success) {
    return createRateLimitResponse(rateLimitResult.resetTime!);
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const category = searchParams.get('category');
  const difficulty = searchParams.get('difficulty');
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');

  // Return demo data if Supabase is not configured
  if (!isSupabaseEnabled) {
    const demoTasks = [
      {
        id: 'task-1',
        title: 'Build AI Agent for Task Management',
        description: 'Create an autonomous AI agent that can manage tasks, prioritize work, and integrate with popular project management tools.',
        category: { name: 'AI & Machine Learning', slug: 'ai-ml', color: '#667eea' },
        budget: 500.00,
        currency: 'USDC',
        status: 'open',
        difficulty: 'expert',
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        created_by: 'demo-user',
        submissions_count: 0,
        views_count: 125
      },
      {
        id: 'task-2',
        title: 'Develop x402 Payment Integration Guide',
        description: 'Write comprehensive documentation and code examples for integrating x402 payment protocol into web applications. Include examples for React, Python, and Go.',
        category: { name: 'Developer Tools', slug: 'developer-tools', color: '#f59e0b' },
        budget: 250.00,
        currency: 'USDC',
        status: 'open',
        difficulty: 'medium',
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        created_by: 'demo-user',
        submissions_count: 0,
        views_count: 89
      },
      {
        id: 'task-3',
        title: 'Create NLP Service for Sentiment Analysis',
        description: 'Build a high-performance natural language processing API that can analyze sentiment from text in real-time. Must support multiple languages and provide confidence scores.',
        category: { name: 'Data & Analytics', slug: 'data-analytics', color: '#f093fb' },
        budget: 750.00,
        currency: 'USDC',
        status: 'in_progress',
        difficulty: 'hard',
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
        created_by: 'demo-user',
        submissions_count: 3,
        views_count: 234
      }
    ];

    return NextResponse.json({ tasks: demoTasks, total: demoTasks.length });
  }

  // Build query
  let query = supabase!
    .from('tasks')
    .select(`
        *,
        categories (name, slug, color, icon)
      `);

  // Apply filters
  if (status) {
    query = query.eq('status', status);
  }
  if (category) {
    query = query.eq('category_id', category);
  }
  if (difficulty) {
    query = query.eq('difficulty', difficulty);
  }

  // Apply sorting and pagination
  query = query.order('created_at', { ascending: false });
  query = query.range(offset, offset + limit - 1);

  // Get total count
  const { count, error: countError } = await supabase!
    .from('tasks')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('Count error:', countError);
    return NextResponse.json({ error: countError.message }, { status: 500 });
  }

  // Execute query
  const { data, error } = await query;

  if (error) {
    console.error('Tasks error:', error);
    if (error.code === '42P01') {
      return NextResponse.json({ tasks: [], total: 0 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const response = NextResponse.json({ tasks: data, total: count || 0 });
  return addSecurityHeaders(response);
}

// POST /api/tasks - Create a new task/bounty
export async function POST(request: NextRequest) {
  // Rate limiting: 10 requests per 15 minutes per IP
  const rateLimitResult = await checkRateLimit(request, 10, 15 * 60 * 1000);
  if (!rateLimitResult.success) {
    return createRateLimitResponse(rateLimitResult.resetTime!);
  }

  try {
    const body = await request.json();
    const {
      title,
      description,
      category_id,
      budget,
      currency = 'USDC',
      difficulty = 'medium',
      deadline
    } = body;

    // Validate required fields
    if (!title || !description || !category_id || !budget) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, category_id, budget' },
        { status: 400 }
      );
    }

    // Validate budget
    if (typeof budget !== 'number' || budget <= 0) {
      return NextResponse.json(
        { error: 'Budget must be a positive number' },
        { status: 400 }
      );
    }

    // Validate difficulty
    const validDifficulties = ['easy', 'medium', 'hard', 'expert'];
    if (!validDifficulties.includes(difficulty)) {
      return NextResponse.json(
        { error: `Invalid difficulty. Must be one of: ${validDifficulties.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate string lengths to prevent abuse
    if (title.length > 200 || description.length > 5000) {
      return NextResponse.json(
        { error: 'Field exceeds maximum length' },
        { status: 400 }
      );
    }

    // Validate currency
    const validCurrencies = ['USDC', 'ETH', 'DAI'];
    if (!validCurrencies.includes(currency)) {
      return NextResponse.json(
        { error: `Invalid currency. Must be one of: ${validCurrencies.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate deadline format
    if (deadline) {
      const deadlineDate = new Date(deadline);
      if (isNaN(deadlineDate.getTime())) {
        return NextResponse.json(
          { error: 'Invalid deadline format' },
          { status: 400 }
        );
      }
    }

    // If Supabase is not enabled, return demo response
    if (!isSupabaseEnabled) {
      const newTask = {
        id: `task-${Date.now()}`,
        title,
        description,
        category_id,
        budget,
        currency,
        difficulty,
        status: 'open',
        created_by: 'demo-user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        submissions_count: 0,
        views_count: 0
      };

      console.log('Demo mode: Task created but not persisted:', newTask);
      const response = NextResponse.json(newTask, { status: 201 });
      return addSecurityHeaders(response);
    }

    // Create task
    const { data, error } = await supabase!
      .from('tasks')
      .insert([{
        title,
        description,
        category_id,
        budget,
        currency,
        difficulty,
        status: 'open',
        deadline: deadline || null
      }])
      .select()
      .single();

    if (error) {
      console.error('Create task error:', error);
      if (error.code === '42P01') {
        const response = NextResponse.json({ error: 'Tasks table not found' }, { status: 500 });
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
