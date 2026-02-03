import { db } from '@/lib/db';
import { apiListings } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { tool } from 'ai';
import { z } from 'zod';
import { logger } from '@/lib/logger';

export async function getDynamicMCPTools() {
  // In a real scenario, we'd filter by the user's purchased items.
  // For this demo, let's include all 'approved' agents and mcp servers.
  const listings = await db.select().from(apiListings).where(eq(apiListings.status, 'approved'));

  const dynamicTools: Record<string, unknown> = {};

  for (const listing of listings) {
    if (listing.category === 'mcp' || listing.category === 'agent') {
      const toolName = listing.slug.replace(/-/g, '_');

      const capabilities = (listing as { capabilities?: unknown }).capabilities as string[] | null;
      const capabilityList = capabilities?.join(', ') || 'none';

      dynamicTools[toolName] = tool({
        description: `Call the ${listing.title} agent/mcp server. Capabilities: ${capabilityList}. ${listing.description}`,
        parameters: z.object({
          action: z.string().describe('The action to perform on this agent'),
          input: z.any().describe('The input payload for the action'),
        }),
        execute: async ({ action, input }: { action: string; input: unknown }) => {
          logger.debug('[DynamicTool] Calling MCP tool', {
            title: listing.title,
            endpointUrl: listing.endpointUrl,
            action,
          });

          if (!listing.endpointUrl) {
            return { error: 'No endpoint configured for this agent.' };
          }

          // Proxy the call to the actual agent
          try {
            const response = await fetch(listing.endpointUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ action, input }),
            });

            if (!response.ok) {
              return { error: `Agent responded with status ${response.status}` };
            }

            return await response.json();
          } catch (e) {
            return {
              error: `Failed to connect to agent: ${e instanceof Error ? e.message : String(e)}`,
            };
          }
        },
      } as unknown as ReturnType<typeof tool>);
    }
  }

  return dynamicTools;
}
