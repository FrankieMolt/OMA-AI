import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseEnabled, handleSupabaseError } from '@/lib/supabase';
import { checkRateLimit, createRateLimitResponse, addSecurityHeaders } from '@/lib/security';

// Demo data for tasks
const demoTasks = [
  {
    id: 'task-1',
    title: 'Build Multi-Agent Orchestration System',
    description: 'Create a system where multiple AI agents collaborate on complex tasks. Must support agent-to-agent communication, task delegation, and consensus mechanisms. Target: $52B agent market by 2030.',
    category: { name: 'AI & Machine Learning', slug: 'ai-ml', color: '#667eea' },
    budget: 2500.00,
    currency: 'USDC',
    status: 'open',
    difficulty: 'expert',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    created_by: 'oma-ai-team',
    submissions_count: 0,
    views_count: 1250
  },
  {
    id: 'task-2',
    title: 'MCP Server for Salesforce Integration',
    description: 'Build an MCP server that connects agents to Salesforce CRM. Must support create, read, update operations on Leads, Opportunities, and Contacts with proper authentication.',
    category: { name: 'MCP Servers', slug: 'mcp-servers', color: '#f59e0b' },
    budget: 1500.00,
    currency: 'USDC',
    status: 'open',
    difficulty: 'hard',
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    created_by: 'enterprise-client',
    submissions_count: 2,
    views_count: 890
  },
  {
    id: 'task-3',
    title: 'x402 Payment Protocol Documentation',
    description: 'Write comprehensive documentation and code examples for integrating x402 payment protocol. Include React, Python, Go, and Rust examples. Target: enable 40% of enterprise apps with agents by 2026.',
    category: { name: 'Documentation', slug: 'documentation', color: '#10b981' },
    budget: 750.00,
    currency: 'USDC',
    status: 'open',
    difficulty: 'medium',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    created_by: 'oma-ai-team',
    submissions_count: 5,
    views_count: 2100
  },
  {
    id: 'task-4',
    title: 'Real-Time Voice Agent Demo',
    description: 'Build a demo showing an agent conducting phone calls using ElevenLabs TTS and Deepgram STT. Must handle interruptions and natural conversation flow.',
    category: { name: 'Audio & Voice', slug: 'audio-voice', color: '#8b5cf6' },
    budget: 2000.00,
    currency: 'USDC',
    status: 'open',
    difficulty: 'expert',
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    created_by: 'voice-ai-startup',
    submissions_count: 1,
    views_count: 567
  },
  {
    id: 'task-5',
    title: 'Agent Memory System with Semantic Search',
    description: 'Implement a persistent memory system for AI agents using vector embeddings. Must support episodic memory, semantic retrieval, and context compression.',
    category: { name: 'AI & Machine Learning', slug: 'ai-ml', color: '#667eea' },
    budget: 3000.00,
    currency: 'USDC',
    status: 'in_progress',
    difficulty: 'expert',
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    created_by: 'research-lab',
    submissions_count: 3,
    views_count: 1890
  },
  {
    id: 'task-6',
    title: 'Web Scraping Agent with Anti-Detection',
    description: 'Build an agent that can scrape e-commerce sites while evading detection. Must handle CAPTCHAs, rate limiting, and rotating proxies. Integrate with ClawPod.',
    category: { name: 'Data & Analytics', slug: 'data-analytics', color: '#f093fb' },
    budget: 1200.00,
    currency: 'USDC',
    status: 'open',
    difficulty: 'hard',
    deadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
    created_by: 'data-company',
    submissions_count: 0,
    views_count: 445
  },
  {
    id: 'task-7',
    title: 'Low-Code Agent Workflow Builder',
    description: 'Create a visual builder for agent workflows. Drag-and-drop interface for connecting MCP servers, defining triggers, and setting up multi-step automation chains.',
    category: { name: 'Developer Tools', slug: 'developer-tools', color: '#3b82f6' },
    budget: 5000.00,
    currency: 'USDC',
    status: 'open',
    difficulty: 'expert',
    deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    created_by: 'oma-ai-team',
    submissions_count: 0,
    views_count: 2340
  },
  {
    id: 'task-8',
    title: 'Agent Governance & Safety Layer',
    description: 'Implement safety guardrails for autonomous agents. Content filtering, action approval workflows, rate limiting, and audit logging. Critical for enterprise adoption.',
    category: { name: 'Security', slug: 'security', color: '#ef4444' },
    budget: 4000.00,
    currency: 'USDC',
    status: 'in_progress',
    difficulty: 'expert',
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    created_by: 'enterprise-client',
    submissions_count: 2,
    views_count: 1567
  }
];

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
    let filteredTasks = [...demoTasks];
    
    if (status) {
      filteredTasks = filteredTasks.filter(t => t.status === status);
    }
    if (difficulty) {
      filteredTasks = filteredTasks.filter(t => t.difficulty === difficulty);
    }
    
    // Apply pagination
    const paginatedTasks = filteredTasks.slice(offset, offset + limit);
    
    return NextResponse.json({ tasks: paginatedTasks, total: filteredTasks.length });
  }

  try {
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

    // Execute query
    const { data, error } = await query;

    if (error) {
      const result = handleSupabaseError(error, { tasks: demoTasks, total: demoTasks.length });
      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 500 });
      }
      return NextResponse.json(result);
    }

    // Get total count (handle errors gracefully)
    const { count, error: countError } = await supabase!
      .from('tasks')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.warn('Count query failed:', countError);
    }

    const response = NextResponse.json({ tasks: data || [], total: count || data?.length || 0 });
    return addSecurityHeaders(response);
  } catch (error) {
    console.error('Tasks API error:', error);
    // Return demo data as fallback
    return NextResponse.json({ tasks: demoTasks, total: demoTasks.length });
  }
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

    // Create new task object
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

    // If Supabase is not enabled, return the new agent without persisting
    if (!isSupabaseEnabled) {
      console.log('Demo mode: Task created but not persisted:', newTask);
      const response = NextResponse.json(newTask, { status: 201 });
      return addSecurityHeaders(response);
    }

    // Insert into Supabase
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
      const result = handleSupabaseError(error, newTask);
      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 500 });
      }
      return NextResponse.json(result, { status: 201 });
    }

    const response = NextResponse.json(data, { status: 201 });
    return addSecurityHeaders(response);
  } catch (error) {
    console.error('Request error:', error);
    const response = NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    return addSecurityHeaders(response);
  }
}
