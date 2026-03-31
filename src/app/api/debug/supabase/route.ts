import { NextResponse } from 'next/server';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const result: Record<string, unknown> = {
    url: url ? 'SET' : 'MISSING',
    urlValue: url,
    keyPrefix: key ? key.slice(0, 20) : 'MISSING',
    keyFull: key ?? 'MISSING',
  };

  if (url && key) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15_000);

      const res = await fetch(`${url}/rest/v1/mcp_servers?select=id,name&limit=3`, {
        headers: {
          'apikey': key,
        },
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const body = await res.text();
      result.httpStatus = res.status;
      result.responseBody = body;
    } catch (e) {
      result.fetchError = (e as Error).message;
      result.fetchErrorName = (e as Error).name;
    }
  }

  return NextResponse.json(result);
}
