import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url);

  // Remove leading slash
  let filename = pathname.slice(1);

  // Default to index.html
  if (!filename || filename === '/') {
    filename = 'index.html';
  }

  // Security: resolve the path and verify it stays within PUBLIC_DIR
  // This prevents all path traversal attacks including "/.well-known/../.ssh/"
  const resolvedPath = path.resolve(PUBLIC_DIR, filename);
  if (!resolvedPath.startsWith(PUBLIC_DIR + path.sep) && resolvedPath !== PUBLIC_DIR) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // Check if file exists
  if (!fs.existsSync(resolvedPath)) {
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

  const content = fs.readFileSync(resolvedPath);
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
