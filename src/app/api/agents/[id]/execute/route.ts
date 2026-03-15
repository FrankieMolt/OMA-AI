import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

// POST /api/agents/[id]/execute - Execute or test agent
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { user_message, variables = {}, user_id, payment_signature } = body;

    // Determine execution mode
    const isTest = !!user_id; // If user_id provided, it's a test execution
    const isPublic = !!payment_signature; // If payment_signature provided, it's a paid public execution

    // Build query based on mode
    let query = supabase
      .from('agents')
      .select(`
        *,
        mcps:agent_mcps (
          mcp_id,
          configuration,
          mcp:mcps (
            id,
            name,
            slug,
            endpoint,
            tools
          )
        )
      `)
      .eq('id', id);

    // For public execution, require active status
    if (isPublic) {
      query = query.eq('status', 'active');
    }

    // Fetch agent
    const { data: agent, error: agentError } = await query.single();

    if (agentError || !agent) {
      return NextResponse.json(
        { error: isPublic ? 'Agent not found or not active' : 'Agent not found' },
        { status: 404 }
      );
    }

    const startTime = Date.now();

    // Execute agent
    let executionResult;
    let mcpCalls = [];
    let status = 'success';
    let errorMessage = null;

    try {
      // In production, this would:
      // 1. Send prompt + variables to LLM (OpenRouter)
      // 2. LLM decides which MCPs to call
      // 3. Call MCPs via their endpoints
      // 4. Collect results
      // 5. Format response
      // 6. Return to user

      // For now, simulate execution
      if (isTest) {
        executionResult = {
          response: `This is a test execution of agent "${agent.name}". In production, this would process: "${user_message}" and call ${agent.mcps?.length || 0} MCPs.`,
          variables_used: variables,
          mode: 'test',
        };
      } else {
        executionResult = {
          response: `Agent "${agent.name}" executed successfully.`,
          variables_used: variables,
          mode: 'production',
        };
      }

      // Simulate MCP calls (in production, these would be real)
      if (agent.mcps && agent.mcps.length > 0) {
        mcpCalls = agent.mcps.map((mcp: any) => ({
          mcp_name: mcp.mcp?.name,
          mcp_id: mcp.mcp_id,
          status: 'success',
          duration_ms: Math.floor(Math.random() * 500) + 100,
          result: { message: 'Tool executed successfully' },
        }));
      }
    } catch (error) {
      status = 'error';
      errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Agent execution error:', error);
    }

    const durationMs = Date.now() - startTime;

    // Log execution
    await supabase.from('agent_executions').insert({
      agent_id: id,
      user_id: user_id || null, // null for public executions
      status,
      duration_ms: durationMs,
      mcp_calls: mcpCalls,
      cost: agent.pricing || 0,
      error_message: errorMessage,
    });

    const response: any = {
      success: status === 'success',
      result: executionResult,
      mcp_calls: mcpCalls,
      duration_ms: durationMs,
    };

    if (status === 'error') {
      response.status = status;
      response.error = errorMessage;
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in POST /api/agents/[id]/execute:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
