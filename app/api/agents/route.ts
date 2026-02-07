import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseEnabled } from '@/lib/supabase';
import { agentSchema } from '@/lib/validations';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  // Return demo data if Supabase is not configured
  if (!isSupabaseEnabled) {
    const demoAgents = [
      {
        id: 'demo-1',
        name: 'Demo Agent Alpha',
        status: 'alive',
        balance: 25.50,
        daily_rent: 1.0,
        daily_revenue: 5.75,
        capabilities: ['web_search', 'data_analysis'],
        children: [],
        total_earned: 150.25,
        total_paid: 45.00,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'demo-2',
        name: 'Demo Agent Beta',
        status: 'alive',
        balance: 12.30,
        daily_rent: 1.0,
        daily_revenue: 3.20,
        capabilities: ['content_generation', 'coding'],
        children: [],
        total_earned: 87.50,
        total_paid: 30.00,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    const filteredAgents = status
      ? demoAgents.filter(agent => agent.status === status)
      : demoAgents;

    return NextResponse.json({ agents: filteredAgents });
  }

  // Real Supabase query
  let query = supabase!.from('agents').select('*');

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Supabase error:', error);
    // Fallback if table doesn't exist
    if (error.code === '42P01') {
       return NextResponse.json({ agents: [] });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ agents: data });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = agentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { name, capabilities = [], balance = 10.0 } = validation.data;

    const newAgent = {
      id: uuidv4(),
      name,
      status: 'alive',
      balance,
      daily_rent: 1.0,
      daily_revenue: 0.0,
      capabilities,
      children: [],
      total_earned: 0,
      total_paid: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // If Supabase is not enabled, return the new agent without persisting
    if (!isSupabaseEnabled) {
      console.log('Demo mode: Agent created but not persisted:', newAgent);
      return NextResponse.json(newAgent, { status: 201 });
    }

    // Insert into Supabase
    const { data, error } = await supabase!
      .from('agents')
      .insert([newAgent])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      if (error.code === '42P01') {
        return NextResponse.json(newAgent, { status: 201 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Request error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
