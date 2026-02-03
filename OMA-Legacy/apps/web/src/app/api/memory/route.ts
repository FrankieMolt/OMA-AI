import { NextRequest, NextResponse } from 'next/server';
import { memvid, type SmartFrame } from '@/lib/memory/memvid';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { withRateLimit } from '@/lib/rate-limit';

const memoryTypeMap = {
  conversation: 'interaction',
  fact: 'fact',
  rule: 'system',
  preference: 'reflection',
} as const satisfies Record<'conversation' | 'fact' | 'rule' | 'preference', SmartFrame['type']>;

const saveMemory = async (
  content: string,
  type: SmartFrame['type'] = 'interaction',
  tags?: string[]
) => {
  return memvid.addFrame(content, type, 0.5, tags);
};

const listMemories = async () => {
  return memvid.queryStream('', 10);
};

async function handleGet(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // Access request to avoid unused var warning if necessary, or just keep it
    if (request.method !== 'GET') return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });

    const memories = await listMemories();
    return NextResponse.json(memories);
  } catch {  
    return NextResponse.json({ error: 'Failed to fetch memories' }, { status: 500 });
  }
}

export const GET = withRateLimit(handleGet, { windowMs: 60 * 1000, maxRequests: 60 });

async function handlePost(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const schema = z.object({
      content: z.string(),
      type: z.enum(['conversation', 'fact', 'rule', 'preference']),
      tags: z.array(z.string()).optional(),
    });
    const validated = schema.parse(body);
    const memory = await saveMemory(
      validated.content,
      memoryTypeMap[validated.type],
      validated.tags
    );
    return NextResponse.json(memory);
  } catch {  
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export const POST = withRateLimit(handlePost, {
  windowMs: 60 * 1000,
  maxRequests: 20,
  keyPrefix: 'ratelimit-memory',
});
