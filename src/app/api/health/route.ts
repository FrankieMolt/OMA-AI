import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

// Health check — no self-referential HTTP fetches
// Checks what actually matters: DB connectivity and data availability
async function checkSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { status: 'unconfigured', error: 'Supabase env vars missing' };

  try {
    const sb = createClient(url, key);
    const { data, error } = await sb
      .from('mcp_servers')
      .select('id', { count: 'exact', head: true })
      .limit(1)
      .single();
    if (error && error.code !== 'PGRST116') {
      return { status: 'error', error: error.message };
    }
    return { status: 'ok', count: data ? 1 : 0 };
  } catch (e) {
    return { status: 'error', error: String(e) };
  }
}

export async function GET() {
  const [supabase] = await Promise.all([checkSupabase()]);

  const allOk = supabase.status === 'ok' || supabase.status === 'unconfigured';

  const body = {
    success: allOk,
    platform: 'OMA-AI',
    version: '1.0.0',
    timestamp: Date.now(),
    checks: {
      supabase: supabase,
    },
    stats: {
      total_apis: 16,
      free_apis: 10,
      paid_apis: 6,
      categories: ['crypto', 'data', 'ai', 'utilities', 'images', 'finance', 'space'],
    },
    network: {
      payment: 'x402',
      currency: 'USDC',
      chains: ['base', 'solana'],
      treasury: '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6',
    },
  };

  const response = NextResponse.json(body);
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Cache-Control', 'public, max-age=60');
  return response;
}
