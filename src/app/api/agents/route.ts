import { NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase/client';
import type { Agent, AgentCreator } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data: agents, error } = await supabaseService
      .from('ai_agents')
      .select(`
        *,
        creator:users!creator_id(id, username, display_name, avatar_url)
      `)
      .order('reputation_score', { ascending: false })
      .limit(50);

    if (error) throw error;

    const enriched = (agents || []).map((agent: any) => ({
      ...agent,
      creator_username: agent.creator?.username || null,
      creator_display_name: agent.creator?.display_name || null,
      creator_avatar: agent.creator?.avatar_url || null,
    }));

    return NextResponse.json({ success: true, agents: enriched });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('[GET /api/agents] error:', errorMessage);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    return NextResponse.json(
      { success: false, error: 'Not implemented' },
      { status: 501 }
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('[POST /api/agents] error:', errorMessage);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
