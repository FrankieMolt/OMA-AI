import { NextRequest, NextResponse } from 'next/server';
import { search, indexWorkspace, rebuildIndex } from '@/lib/indexer';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    const results = search(query, limit);
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error searching files:', error);
    return NextResponse.json({ error: 'Failed to search files' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const action = body.action;

    if (action === 'index') {
      const path = body.path || process.cwd();
      const count = await indexWorkspace(path);
      return NextResponse.json({ message: `Indexed ${count} files` });
    }

    if (action === 'rebuild') {
      const count = await rebuildIndex();
      return NextResponse.json({ message: `Rebuilt index with ${count} files` });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error managing index:', error);
    return NextResponse.json({ error: 'Failed to manage index' }, { status: 500 });
  }
}
