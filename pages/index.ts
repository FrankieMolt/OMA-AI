import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.redirect(new URL('/index.html', 'http://localhost:3000'));
}