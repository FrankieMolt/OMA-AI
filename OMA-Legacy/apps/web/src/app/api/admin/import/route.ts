
import { NextRequest, NextResponse } from 'next/server';
import { importScientificSkills } from '@/lib/importers/import-scientific-skills';
import { importSuperpowers } from '@/lib/importers/import-superpowers';
import { importWshobsonAgents } from '@/lib/importers/import-wshobson-agents';
import { z } from 'zod';

const importSchema = z.object({
  type: z.enum(['scientific-skills', 'superpowers', 'wshobson-agents', 'all']),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = importSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid import type' }, { status: 400 });
    }

    const { type } = result.data;
    const results = {
      scientific: 'skipped',
      superpowers: 'skipped',
      wshobson: 'skipped',
    };

    if (type === 'scientific-skills' || type === 'all') {
      await importScientificSkills();
      results.scientific = 'success';
    }

    if (type === 'superpowers' || type === 'all') {
      await importSuperpowers();
      results.superpowers = 'success';
    }

    if (type === 'wshobson-agents' || type === 'all') {
      await importWshobsonAgents();
      results.wshobson = 'success';
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Bulk Import Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Import failed' },
      { status: 500 }
    );
  }
}
