import { NextResponse } from 'next/server';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const svcKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const results: Record<string, unknown> = {};
  const keys = [
    { name: 'service_role', key: svcKey },
    { name: 'anon', key: anonKey },
  ];

  for (const { name, key } of keys) {
    if (!key) { results[name] = 'MISSING'; continue; }
    try {
      const res = await fetch(`${url}/rest/v1/mcp_servers?select=id,name&limit=1`, {
        headers: { 'apikey': key },
      });
      const body = await res.text();
      results[name] = { status: res.status, body: body.slice(0, 100) };
    } catch (e) {
      results[name] = { error: (e as Error).message };
    }
  }

  return NextResponse.json(results);
}
