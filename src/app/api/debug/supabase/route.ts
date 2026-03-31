import { NextResponse } from 'next/server';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const result: Record<string, unknown> = {
    url: url ? 'SET' : 'MISSING',
    urlValue: url,
    key: key ? `SET (${key.slice(0, 20)}...)` : 'MISSING',
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

      result.httpStatus = res.status;
      result.httpOk = res.ok;
      result.headers = Object.fromEntries(res.headers.entries());
      const data = await res.json();
      result.rowCount = Array.isArray(data) ? data.length : 'not-array';
      result.firstRow = data[0] ?? null;
    } catch (e) {
      result.fetchError = (e as Error).message;
      result.fetchErrorName = (e as Error).name;
    }
  }

  return NextResponse.json(result);
}
