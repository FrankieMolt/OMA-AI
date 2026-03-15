import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

// GET /api/agents/[id] - Get agent details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data: agent, error } = await supabase
      .from('agents')
      .select(`
        *,
        user:users!agents_user_id_fkey (
          id,
          email,
          user_metadata
        ),
        mcps:agent_mcps (
          mcp_id,
          configuration,
          mcp:mcps (
            id,
            name,
            slug,
            description,
            category,
            pricing,
            verified,
            tools
          )
        ),
        variables:agent_variables (
          id,
          name,
          type,
          default_value,
          required,
          description
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching agent:', error);
      return NextResponse.json({ error: 'Failed to fetch agent' }, { status: 500 });
    }

    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    return NextResponse.json({ agent });
  } catch (error) {
    console.error('Error in GET /api/agents/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/agents/[id] - Update agent
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { user_id, name, description, prompt, config, pricing, status } = body;

    // Update agent
    const { data: agent, error } = await supabase
      .from('agents')
      .update({
        name,
        description,
        prompt,
        config,
        pricing,
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('user_id', user_id) // User can only update their own agents
      .select()
      .single();

    if (error) {
      console.error('Error updating agent:', error);
      return NextResponse.json({ error: 'Failed to update agent' }, { status: 500 });
    }

    if (!agent) {
      return NextResponse.json({ error: 'Agent not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ agent });
  } catch (error) {
    console.error('Error in PUT /api/agents/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/agents/[id] - Delete agent
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');

    if (!user_id) {
      return NextResponse.json({ error: 'Missing user_id' }, { status: 400 });
    }

    // Delete agent (cascades to agent_mcps, agent_variables, agent_executions, agent_versions)
    const { error } = await supabase
      .from('agents')
      .delete()
      .eq('id', id)
      .eq('user_id', user_id);

    if (error) {
      console.error('Error deleting agent:', error);
      return NextResponse.json({ error: 'Failed to delete agent' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/agents/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
