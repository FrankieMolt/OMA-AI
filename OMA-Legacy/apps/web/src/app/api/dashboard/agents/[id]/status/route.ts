import { NextRequest, NextResponse } from 'next/server';
import { db, agents } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const statusSchema = z.object({
  status: z.enum(['active', 'inactive', 'maintenance']),
});

function mapAgent(agent: typeof agents.$inferSelect) {
  return {
    id: agent.id,
    name: agent.name,
    description: agent.description,
    category: agent.category as 'agent' | 'mcp' | 'api',
    pricingType: agent.pricingType as 'free' | 'usage' | 'subscription' | 'one-time',
    price: Number(agent.baseCostUsd || 0),
    capabilities: Array.isArray(agent.capabilities) ? agent.capabilities : [],
    tags: [],
    status: agent.status as 'active' | 'inactive' | 'maintenance',
    totalCalls: 0,
    revenue: 0,
    rating: 0,
    lastUsed: (agent.updatedAt || agent.createdAt).toISOString(),
    createdAt: agent.createdAt.toISOString(),
  };
}

export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
  try {
    const id = Number(context.params.id);
    if (!Number.isFinite(id)) {
      return NextResponse.json({ error: 'Invalid agent id' }, { status: 400 });
    }

    const body = await request.json();
    const validated = statusSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: 'Invalid status', details: validated.error.errors },
        { status: 400 }
      );
    }

    const [updated] = await db
      .update(agents)
      .set({ status: validated.data.status, updatedAt: new Date() })
      .where(eq(agents.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    return NextResponse.json(mapAgent(updated));
  } catch {  
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}
