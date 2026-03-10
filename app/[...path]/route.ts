import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);
  
  // Remove leading slash
  let filename = pathname.slice(1);
  
  // Default to index.html
  if (!filename || filename === '/') {
    filename = 'index.html';
  }
  
  // Security: prevent directory traversal
  if (filename.includes('..') || filename.includes('//')) {
    return new NextResponse('Forbidden', { status: 403 });
  }
  
  const filePath = path.join(PUBLIC_DIR, filename);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    // Try adding .html
    const htmlPath = path.join(PUBLIC_DIR, `${filename}.html`);
    if (fs.existsSync(htmlPath)) {
      const content = fs.readFileSync(htmlPath);
      return new NextResponse(content, {
        headers: { 'Content-Type': 'text/html' }
      });
    }
    return new NextResponse('Not Found', { status: 404 });
  }
  
  const content = fs.readFileSync(filePath);
  const ext = path.extname(filename).toLowerCase();
  
  const contentTypes: Record<string, string> = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
  };
  
  return new NextResponse(content, {
    headers: {
      'Content-Type': contentTypes[ext] || 'text/plain'
    }
  });
}