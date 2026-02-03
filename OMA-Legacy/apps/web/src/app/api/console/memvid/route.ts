import path from 'path';
import { NextResponse } from 'next/server';
import { AgentMemory } from '@oma/core/memory';
import { memvid } from '@/lib/memory/memvid';

export const runtime = 'nodejs';

let memoryInstance: AgentMemory | null = null;
let memoryInit: Promise<AgentMemory> | null = null;

async function getMemory(): Promise<AgentMemory> {
  if (memoryInstance) return memoryInstance;
  if (memoryInit) return memoryInit;

  memoryInit = (async () => {
    const memoryPath = path.join(process.cwd(), 'context', 'memories', 'memvid.mv2');
    const memory = new AgentMemory({ path: memoryPath });
    await memory.initialize();
    memoryInstance = memory;
    return memory;
  })();

  return memoryInit;
}

export async function GET() {
  const memory = await getMemory();
  const frames = await memory.search('', { limit: 1, includeImages: true });
  const latest = frames[0];

  if (!latest) {
    return NextResponse.json({ status: 'empty' });
  }

  return NextResponse.json({
    id: latest.id,
    imageData: latest.imageData,
    timestamp: latest.timestamp,
    metadata: {
      objects_detected: latest.tags.length ? latest.tags : ['frame'],
      confidence: latest.metadata?.confidence ?? 0.72,
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const memory = await getMemory();
  const text = typeof body.text === 'string' ? body.text : 'video_frame';
  const tags = Array.isArray(body.tags) ? body.tags : [];
  const type = body.type || 'observation';
  const importance = typeof body.importance === 'number' ? body.importance : 0.6;
  const imageData = typeof body.imageData === 'string' ? body.imageData : undefined;
  const metadata = body.metadata && typeof body.metadata === 'object' ? body.metadata : undefined;

  // Perform Scan if image data exists
  let scanResult: { qr?: string; text?: string } = {};
  if (imageData) {
    scanResult = await memvid.scanFrame(imageData);
    if (scanResult.qr) tags.push('qr_detected');
    if (scanResult.text) tags.push('ocr_text');
  }

  const frame = await memory.add(text, {
    imageData,
    type,
    importance,
    tags,
    metadata: { ...metadata, scan: scanResult },
  });

  return NextResponse.json({
    id: frame.id,
    imageData: frame.imageData,
    timestamp: frame.timestamp,
    scan: scanResult,
  });
}
