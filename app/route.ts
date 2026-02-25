import { NextResponse } from 'next/server';

export async function GET() {
  // Read and serve the index.html file
  const fs = await import('fs');
  const path = await import('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public', 'index.html');
    const content = fs.readFileSync(filePath, 'utf-8');
    return new NextResponse(content, {
      headers: { 'Content-Type': 'text/html' }
    });
  } catch {
    return new NextResponse('Not Found', { status: 404 });
  }
}