import { NextRequest, NextResponse } from 'next/server';
import { db, agents, users } from '@/lib/db';
import { desc, eq } from 'drizzle-orm';
import { createAgentSchema } from '@/lib/validators';

const DEFAULT_LIMIT = 50;

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

function buildSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const offsetParam = searchParams.get('offset');
    const limit = Math.min(Number(limitParam || DEFAULT_LIMIT), 200);
    const offset = Number(offsetParam || 0);

    const rows = await db
      .select()
      .from(agents)
      .orderBy(desc(agents.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(rows.map(mapAgent));
  } catch {  
    return NextResponse.json({ error: 'Failed to load agents' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createAgentSchema.safeParse({
      name: body?.name,
      description: body?.description,
      category: body?.category,
      strategy: body?.strategy,
      capabilities: Array.isArray(body?.capabilities) ? body.capabilities : [],
      pricingType: body?.pricingType,
      baseCostUsd: toNumber(body?.price),
      maxCostUsd: toNumber(body?.maxCostUsd),
      models: Array.isArray(body?.models) ? body.models : undefined,
      mcpStack: body?.mcpStack,
      executionPolicy: body?.executionPolicy,
      sla: body?.sla,
      riskDisclosure: body?.riskDisclosure,
    });

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: validated.error.errors },
        { status: 400 }
      );
    }

    let [owner] = await db.select().from(users).where(eq(users.email, 'admin@oma.com')).limit(1);
    if (!owner) {
      [owner] = await db.select().from(users).limit(1);
    }

    if (!owner) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const baseSlug = buildSlug(validated.data.name);
    const existing = await db
      .select({ slug: agents.slug })
      .from(agents)
      .where(eq(agents.slug, baseSlug));
    const finalSlug = existing.length > 0 ? `${baseSlug}-${Date.now()}` : baseSlug;

    const statusValue = typeof body?.status === 'string' ? body.status : 'active';
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

    const [created] = await db
      .insert(agents)
      .values({
        name: validated.data.name,
        slug: finalSlug,
        description: validated.data.description,
        category: validated.data.category,
        strategy: validated.data.strategy,
        capabilities: validated.data.capabilities,
        pricingType: validated.data.pricingType,
        baseCostUsd: validated.data.baseCostUsd,
        maxCostUsd: validated.data.maxCostUsd,
        models: validated.data.models,
        mcpStack: validated.data.mcpStack,
        executionPolicy: executionPolicyValue,
        sla: slaValue,
        riskDisclosure: validated.data.riskDisclosure,
        status: statusValue,
        ownerId: owner.id,
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json(mapAgent(created), { status: 201 });
  } catch {  
    return NextResponse.json({ error: 'Failed to create agent' }, { status: 500 });
  }
}
