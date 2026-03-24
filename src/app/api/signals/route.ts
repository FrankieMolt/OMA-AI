import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({
    success: false,
    error: "Trading signals coming soon",
    note: "This feature will be available when we launch our trading MCP"
  });
  response.headers.set('Access-Control-Allow-Origin', '*');
  return response;
}
