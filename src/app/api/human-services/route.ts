import { NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase/client';
import type { HumanService } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'open';
    const serviceType = searchParams.get('service_type') || 'all';

    let query = supabaseService
      .from('human_services')
      .select(`
        *,
        ai_agents (
          id,
          name,
          description,
          avatar_url,
          reputation_score,
          wallet_address
        )
      `)
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (serviceType && serviceType !== 'all') {
      query = query.eq('service_type', serviceType);
    }

    const { data: services, error } = await query.limit(50);

    if (error) throw error;

    return NextResponse.json({ success: true, services: services as HumanService[] });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('[GET /api/human-services] error:', errorMessage);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { agent_id, title, description, service_type, price, currency, location, requirements } = body;

    if (!agent_id || !title || !description || !service_type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: agent_id, title, description, service_type' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseService
      .from('human_services')
      .insert({
        agent_id,
        title,
        description,
        service_type,
        price: price || 0,
        currency: currency || 'USD',
        location: location || null,
        requirements: requirements || {},
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, service: data });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('[POST /api/human-services] error:', errorMessage);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
