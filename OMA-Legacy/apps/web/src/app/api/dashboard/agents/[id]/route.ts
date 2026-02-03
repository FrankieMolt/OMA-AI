import { NextRequest, NextResponse } from 'next/server';
import { db, agents } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { updateAgentSchema } from '@/lib/validators';

function toNumber(value: unknown) {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : undefined;
  }
  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

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
    const validated = updateAgentSchema.safeParse({
      name: body?.name,
      description: body?.description,
      category: body?.category,
      strategy: body?.strategy,
      capabilities: Array.isArray(body?.capabilities) ? body.capabilities : undefined,
      pricingType: body?.pricingType,
      baseCostUsd: toNumber(body?.price ?? body?.baseCostUsd),
      maxCostUsd: toNumber(body?.maxCostUsd),
      models: Array.isArray(body?.models) ? body.models : undefined,
      mcpStack: body?.mcpStack,
      executionPolicy: body?.executionPolicy,
      sla: body?.sla,
      riskDisclosure: body?.riskDisclosure,
      status: body?.status,
      reputationWeight: toNumber(body?.reputationWeight),
    });

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: validated.error.errors },
        { status: 400 }
      );
    }

    const executionPolicyValue =
      typeof validated.data.executionPolicy === 'string'
        ? validated.data.executionPolicy
        : validated.data.executionPolicy
          ? JSON.stringify(validated.data.executionPolicy)
          : undefined;
    const slaValue =
      typeof validated.data.sla === 'string'
        ? validated.data.sla
        : validated.data.sla
          ? JSON.stringify(validated.data.sla)
          : undefined;

    const updateValues = {
      ...validated.data,
      executionPolicy: executionPolicyValue,
      sla: slaValue,
      updatedAt: new Date(),
    };

    const [updated] = await db
      .update(agents)
      .set(updateValues)
      .where(eq(agents.id, id))
      .returning();
    if (!updated) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    return NextResponse.json(mapAgent(updated));
  } catch {  
    return NextResponse.json({ error: 'Failed to update agent' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: { params: { id: string } }) {
  try {
    const id = Number(context.params.id);
    if (!Number.isFinite(id)) {
      return NextResponse.json({ error: 'Invalid agent id' }, { status: 400 });
    }

    const [deleted] = await db.delete(agents).where(eq(agents.id, id)).returning();
    if (!deleted) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {  
    return NextResponse.json({ error: 'Failed to delete agent' }, { status: 500 });
  }
}
