import { db } from '@/lib/db';
import { mcpServers, users } from '@/lib/db/schema';
import { eq, and, desc, ilike, or, sql, getTableColumns, gte } from 'drizzle-orm';
import { logger } from '@/lib/logger';

export interface MCPTool {
  name: string;
  description?: string;
  inputSchema?: Record<string, unknown>;
}

export interface MCPResource {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
}

export interface MCPPrompt {
  name: string;
  description?: string;
  arguments?: {
    name: string;
    description?: string;
    required?: boolean;
  }[];
}

export interface MCPRegistryEntry {
  id: number;
  name: string;
  slug: string;
  description: string;
  version: string;
  mcpVersion: string;
  endpointUrl: string;
  transportType: 'stdio' | 'http' | 'websocket';
  capabilities: string[];
  tools: MCPTool[];
  resources: MCPResource[];
  prompts: MCPPrompt[];
  serverConfig: Record<string, unknown>;
  installCommand?: string;
  dockerImage?: string;
  repositoryUrl?: string;
  documentationUrl?: string;
  license?: string;
  pricingType: 'free' | 'usage' | 'subscription' | 'one-time';
  price: number;
  category: string;
  tags: string[];
  healthCheckUrl?: string;
  lastHealthCheck?: string;
  healthStatus: 'unknown' | 'healthy' | 'unhealthy' | 'offline';
  usageCount: number;
  rating: number;
  reviewCount: number;
  ownerId: number;
  ownerName: string;
  createdAt: string;
  updatedAt: string;
}

export class MCPRegistryService {
  async listServers(filters?: {
    category?: string;
    search?: string;
    pricingType?: string;
    healthStatus?: string;
    minRating?: number;
    tags?: string[];
    limit?: number;
    offset?: number;
  }): Promise<{ servers: MCPRegistryEntry[]; total: number }> {
    try {
      const limit = filters?.limit || 20;
      const offset = filters?.offset || 0;

      const conditions = [];

      if (filters?.category) {
        conditions.push(eq(mcpServers.category, filters.category));
      }

      if (filters?.pricingType) {
        conditions.push(eq(mcpServers.pricingType, filters.pricingType));
      }

      if (filters?.healthStatus) {
        conditions.push(eq(mcpServers.healthStatus, filters.healthStatus));
      }

      if (filters?.search) {
        const searchCondition = or(
          ilike(mcpServers.name, `%${filters.search}%`),
          ilike(mcpServers.description, `%${filters.search}%`),
          ilike(mcpServers.slug, `%${filters.search}%`)
        );
        if (searchCondition) {
          conditions.push(searchCondition);
        }
      }

      if (filters?.minRating) {
        conditions.push(gte(mcpServers.rating, filters.minRating));
      }

      const servers = await db
        .select({
          id: mcpServers.id,
          name: mcpServers.name,
          slug: mcpServers.slug,
          description: mcpServers.description,
          version: mcpServers.version,
          mcpVersion: mcpServers.mcpVersion,
          endpointUrl: mcpServers.endpointUrl,
          transportType: mcpServers.transportType,
          capabilities: mcpServers.capabilities,
          tools: mcpServers.tools,
          resources: mcpServers.resources,
          prompts: mcpServers.prompts,
          serverConfig: mcpServers.serverConfig,
          installCommand: mcpServers.installCommand,
          dockerImage: mcpServers.dockerImage,
          repositoryUrl: mcpServers.repositoryUrl,
          documentationUrl: mcpServers.documentationUrl,
          license: mcpServers.license,
          pricingType: mcpServers.pricingType,
          price: mcpServers.price,
          category: mcpServers.category,
          tags: mcpServers.tags,
          healthCheckUrl: mcpServers.healthCheckUrl,
          lastHealthCheck: mcpServers.lastHealthCheck,
          healthStatus: mcpServers.healthStatus,
          usageCount: mcpServers.usageCount,
          rating: mcpServers.rating,
          reviewCount: mcpServers.reviewCount,
          ownerId: mcpServers.ownerId,
          ownerName: users.name,
          createdAt: mcpServers.createdAt,
          updatedAt: mcpServers.updatedAt,
        })
        .from(mcpServers)
        .leftJoin(users, eq(mcpServers.ownerId, users.id))
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(desc(mcpServers.rating), desc(mcpServers.usageCount))
        .limit(limit)
        .offset(offset);

      const totalRes = await db
        .select({ count: mcpServers.id })
        .from(mcpServers)
        .where(conditions.length > 0 ? and(...conditions) : undefined);

      const total = totalRes.length;

      return {
        servers: servers.map((server) => ({
          id: server.id,
          name: server.name,
          slug: server.slug,
          description: server.description,
          version: server.version,
          mcpVersion: server.mcpVersion,
          endpointUrl: server.endpointUrl,
          transportType: server.transportType as 'stdio' | 'http' | 'websocket',
          capabilities: (server.capabilities as unknown as string[]) || [],
          resources: (server.resources as unknown as MCPResource[]) || [],
          tools: (server.tools as unknown as MCPTool[]) || [],
          prompts: (server.prompts as unknown as MCPPrompt[]) || [],
          serverConfig: (server.serverConfig as Record<string, unknown>) || {},
          installCommand: server.installCommand || undefined,
          dockerImage: server.dockerImage || undefined,
          repositoryUrl: (server.repositoryUrl || undefined) as string | undefined,
          documentationUrl: (server.documentationUrl || undefined) as string | undefined,
          license: server.license || undefined,
          pricingType: server.pricingType as 'free' | 'usage' | 'subscription' | 'one-time',
          price: Number(server.price),
          category: server.category,
          tags: (server.tags as unknown as string[]) || [],
          healthCheckUrl: server.healthCheckUrl || undefined,
          lastHealthCheck: server.lastHealthCheck?.toISOString() || undefined,
          healthStatus: server.healthStatus as 'unknown' | 'healthy' | 'unhealthy' | 'offline',
          usageCount: Number(server.usageCount),
          rating: Number(server.rating),
          reviewCount: Number(server.reviewCount),
          ownerId: server.ownerId,
          ownerName: server.ownerName || 'Unknown',
          createdAt: server.createdAt.toISOString(),
          updatedAt: server.updatedAt.toISOString(),
        })),
        total,
      };
    } catch (error) {
      logger.error('MCP Registry: Failed to list servers', { error });
      throw new Error('Failed to list MCP servers');
    }
  }

  async getServerById(id: number): Promise<MCPRegistryEntry | null> {
    try {
      const [server] = await db
        .select({
          id: mcpServers.id,
          name: mcpServers.name,
          slug: mcpServers.slug,
          description: mcpServers.description,
          version: mcpServers.version,
          mcpVersion: mcpServers.mcpVersion,
          endpointUrl: mcpServers.endpointUrl,
          transportType: mcpServers.transportType,
          capabilities: mcpServers.capabilities,
          tools: mcpServers.tools,
          resources: mcpServers.resources,
          prompts: mcpServers.prompts,
          serverConfig: mcpServers.serverConfig,
          installCommand: mcpServers.installCommand,
          dockerImage: mcpServers.dockerImage,
          repositoryUrl: mcpServers.repositoryUrl,
          documentationUrl: mcpServers.documentationUrl,
          license: mcpServers.license,
          pricingType: mcpServers.pricingType,
          price: mcpServers.price,
          category: mcpServers.category,
          tags: mcpServers.tags,
          ownerId: mcpServers.ownerId,
          ownerName: users.name,
          healthCheckUrl: mcpServers.healthCheckUrl,
          lastHealthCheck: mcpServers.lastHealthCheck,
          healthStatus: mcpServers.healthStatus,
          usageCount: mcpServers.usageCount,
          rating: mcpServers.rating,
          reviewCount: mcpServers.reviewCount,
          createdAt: mcpServers.createdAt,
          updatedAt: mcpServers.updatedAt,
        })
        .from(mcpServers)
        .leftJoin(users, eq(mcpServers.ownerId, users.id))
        .where(eq(mcpServers.id, id))
        .limit(1);

      if (!server) return null;

      return {
        id: server.id,
        name: server.name,
        slug: server.slug,
        description: server.description,
        version: server.version,
        mcpVersion: server.mcpVersion,
        endpointUrl: server.endpointUrl,
        transportType: server.transportType as 'stdio' | 'http' | 'websocket',
        capabilities: (server.capabilities as unknown as string[]) || [],
        tools: (server.tools as unknown as MCPTool[]) || [],
        resources: (server.resources as unknown as MCPResource[]) || [],
        prompts: (server.prompts as unknown as MCPPrompt[]) || [],
        serverConfig: (server.serverConfig as Record<string, unknown>) || {},
        installCommand: server.installCommand || undefined,
        dockerImage: server.dockerImage || undefined,
        repositoryUrl: (server.repositoryUrl || undefined) as string | undefined,
        documentationUrl: (server.documentationUrl || undefined) as string | undefined,
        license: server.license || undefined,
        pricingType: server.pricingType as 'free' | 'usage' | 'subscription' | 'one-time',
        price: Number(server.price),
        category: server.category,
        tags: (server.tags as unknown as string[]) || [],
        healthCheckUrl: server.healthCheckUrl || undefined,
        lastHealthCheck: server.lastHealthCheck?.toISOString() || undefined,
        healthStatus: server.healthStatus as 'unknown' | 'healthy' | 'unhealthy' | 'offline',
        usageCount: Number(server.usageCount),
        rating: Number(server.rating),
        reviewCount: Number(server.reviewCount),
        ownerId: server.ownerId,
        ownerName: server.ownerName || 'Unknown',
        createdAt: server.createdAt.toISOString(),
        updatedAt: server.updatedAt.toISOString(),
      };
    } catch (error) {
      logger.error('MCP Registry: Failed to get server', { id, error });
      throw new Error('Failed to get MCP server');
    }
  }

  async getServerBySlug(slug: string): Promise<MCPRegistryEntry | null> {
    try {
      const [server] = await db
        .select({
          id: mcpServers.id,
          name: mcpServers.name,
          slug: mcpServers.slug,
          description: mcpServers.description,
          version: mcpServers.version,
          mcpVersion: mcpServers.mcpVersion,
          endpointUrl: mcpServers.endpointUrl,
          transportType: mcpServers.transportType,
          capabilities: mcpServers.capabilities,
          tools: mcpServers.tools,
          resources: mcpServers.resources,
          prompts: mcpServers.prompts,
          serverConfig: mcpServers.serverConfig,
          installCommand: mcpServers.installCommand,
          dockerImage: mcpServers.dockerImage,
          repositoryUrl: mcpServers.repositoryUrl,
          documentationUrl: mcpServers.documentationUrl,
          license: mcpServers.license,
          pricingType: mcpServers.pricingType,
          price: mcpServers.price,
          category: mcpServers.category,
          tags: mcpServers.tags,
          healthCheckUrl: mcpServers.healthCheckUrl,
          lastHealthCheck: mcpServers.lastHealthCheck,
          healthStatus: mcpServers.healthStatus,
          usageCount: mcpServers.usageCount,
          rating: mcpServers.rating,
          reviewCount: mcpServers.reviewCount,
          ownerId: mcpServers.ownerId,
          ownerName: users.name,
          createdAt: mcpServers.createdAt,
          updatedAt: mcpServers.updatedAt,
        })
        .from(mcpServers)
        .leftJoin(users, eq(mcpServers.ownerId, users.id))
        .where(eq(mcpServers.slug, slug))
        .limit(1);

      if (!server) return null;

      return {
        id: server.id,
        name: server.name,
        slug: server.slug,
        description: server.description,
        version: server.version,
        mcpVersion: server.mcpVersion,
        endpointUrl: server.endpointUrl,
        transportType: server.transportType as 'stdio' | 'http' | 'websocket',
        capabilities: (server.capabilities as unknown as string[]) || [],
        tools: (server.tools as unknown as MCPTool[]) || [],
        resources: (server.resources as unknown as MCPResource[]) || [],
        prompts: (server.prompts as unknown as MCPPrompt[]) || [],
        serverConfig: (server.serverConfig as Record<string, unknown>) || {},
        installCommand: server.installCommand || undefined,
        dockerImage: server.dockerImage || undefined,
        repositoryUrl: (server.repositoryUrl || undefined) as string | undefined,
        documentationUrl: (server.documentationUrl || undefined) as string | undefined,
        license: server.license || undefined,
        pricingType: server.pricingType as 'free' | 'usage' | 'subscription' | 'one-time',
        price: Number(server.price),
        category: server.category,
        tags: (server.tags as unknown as string[]) || [],
        healthCheckUrl: server.healthCheckUrl || undefined,
        lastHealthCheck: server.lastHealthCheck?.toISOString() || undefined,
        healthStatus: server.healthStatus as 'unknown' | 'healthy' | 'unhealthy' | 'offline',
        usageCount: Number(server.usageCount),
        rating: Number(server.rating),
        reviewCount: Number(server.reviewCount),
        ownerId: server.ownerId,
        ownerName: server.ownerName || 'Unknown',
        createdAt: server.createdAt.toISOString(),
        updatedAt: server.updatedAt.toISOString(),
      };
    } catch (error) {
      logger.error('MCP Registry: Failed to get server by slug', { slug, error });
      throw new Error('Failed to get MCP server');
    }
  }

  async registerServer(data: {
    name: string;
    description: string;
    version: string;
    mcpVersion: string;
    endpointUrl: string;
    transportType: 'stdio' | 'http' | 'websocket';
    capabilities: string[];
    tools?: MCPTool[];
    resources?: MCPResource[];
    prompts?: MCPPrompt[];
    serverConfig?: Record<string, unknown>;
    installCommand?: string;
    dockerImage?: string;
    repositoryUrl?: string;
    documentationUrl?: string;
    license?: string;
    pricingType: 'free' | 'one-time' | 'usage' | 'subscription';
    price: number;
    category: string;
    tags: string[];
    ownerId: number;
    apiListingId?: number;
  }): Promise<MCPRegistryEntry> {
    try {
      const slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      const [existing] = await db
        .select()
        .from(mcpServers)
        .where(eq(mcpServers.slug, slug))
        .limit(1);

      if (existing) {
        throw new Error('MCP server with this name already exists');
      }

      const [server] = await db
        .insert(mcpServers)
        .values({
          slug,
          name: data.name,
          description: data.description,
          version: data.version,
          mcpVersion: data.mcpVersion,
          endpointUrl: data.endpointUrl,
          transportType: data.transportType,
          capabilities: data.capabilities as unknown as string[],
          tools: data.tools as unknown as Record<string, unknown>[],
          resources: data.resources as unknown as Record<string, unknown>[],
          prompts: data.prompts as unknown as Record<string, unknown>[],
          serverConfig: data.serverConfig,
          installCommand: data.installCommand,
          dockerImage: data.dockerImage,
          repositoryUrl: data.repositoryUrl,
          documentationUrl: data.documentationUrl,
          license: data.license,
          pricingType: data.pricingType,
          price: Number(data.price),
          category: data.category,
          tags: data.tags,
          ownerId: data.ownerId,
          apiListingId: data.apiListingId,
          healthStatus: 'unknown',
          usageCount: 0,
          rating: 0,
          reviewCount: 0,
        })
        .returning();

      // Fetch owner name
      const [owner] = await db
        .select({ name: users.name })
        .from(users)
        .where(eq(users.id, data.ownerId));
      const ownerName = owner?.name || 'Unknown';

      return {
        id: server.id,
        name: server.name,
        slug: server.slug,
        description: server.description,
        version: server.version,
        mcpVersion: server.mcpVersion,
        endpointUrl: server.endpointUrl,
        transportType: server.transportType as 'stdio' | 'http' | 'websocket',
        capabilities: (server.capabilities as unknown as string[]) || [],
        tools: (server.tools as unknown as MCPTool[]) || [],
        resources: (server.resources as unknown as MCPResource[]) || [],
        prompts: (server.prompts as unknown as MCPPrompt[]) || [],
        serverConfig: (server.serverConfig as Record<string, unknown>) || {},
        installCommand: server.installCommand || undefined,
        dockerImage: server.dockerImage || undefined,
        repositoryUrl: (server.repositoryUrl || undefined) as string | undefined,
        documentationUrl: (server.documentationUrl || undefined) as string | undefined,
        license: server.license || undefined,
        pricingType: server.pricingType as 'free' | 'usage' | 'subscription' | 'one-time',
        price: Number(server.price),
        category: server.category,
        tags: (server.tags as unknown as string[]) || [],
        healthCheckUrl: server.healthCheckUrl || undefined,
        lastHealthCheck: server.lastHealthCheck?.toISOString() || undefined,
        healthStatus: server.healthStatus as 'unknown' | 'healthy' | 'unhealthy' | 'offline',
        usageCount: Number(server.usageCount),
        rating: Number(server.rating),
        reviewCount: Number(server.reviewCount),
        ownerId: server.ownerId,
        ownerName: ownerName,
        createdAt: server.createdAt.toISOString(),
        updatedAt: server.updatedAt.toISOString(),
      };
    } catch (error) {
      logger.error('MCP Registry: Failed to register server', { error });
      throw new Error('Failed to register MCP server');
    }
  }

  async updateServer(
    id: number,
    ownerId: number,
    updates: Partial<
      Omit<MCPRegistryEntry, 'id' | 'ownerId' | 'ownerName' | 'createdAt' | 'updatedAt'>
    >
  ): Promise<MCPRegistryEntry> {
    try {
      const [existing] = await db
        .select({
          server: getTableColumns(mcpServers),
          ownerName: users.name,
        })
        .from(mcpServers)
        .leftJoin(users, eq(mcpServers.ownerId, users.id))
        .where(eq(mcpServers.id, id))
        .limit(1);

      if (!existing) {
        throw new Error('MCP server not found');
      }

      if (existing.server.ownerId !== ownerId) {
        throw new Error('Unauthorized to update this server');
      }

      const { price, rating, lastHealthCheck, tools, resources, prompts, ...restUpdates } = updates;
      const updateData: Partial<typeof mcpServers.$inferInsert> = {
        ...restUpdates,
        updatedAt: new Date(),
      };

      if (tools) updateData.tools = tools as unknown as Record<string, unknown>[];
      if (resources) updateData.resources = resources as unknown as Record<string, unknown>[];
      if (prompts) updateData.prompts = prompts as unknown as Record<string, unknown>[];

      if (price !== undefined) {
        updateData.price = Number(price);
      }

      if (rating !== undefined) {
        updateData.rating = Number(rating);
      }

      if (lastHealthCheck !== undefined) {
        updateData.lastHealthCheck = lastHealthCheck ? new Date(lastHealthCheck) : null;
      }

      const [updatedServer] = await db
        .update(mcpServers)
        .set(updateData)
        .where(eq(mcpServers.id, id))
        .returning();

      return {
        id: updatedServer.id,
        name: updatedServer.name,
        slug: updatedServer.slug,
        description: updatedServer.description,
        version: updatedServer.version,
        mcpVersion: updatedServer.mcpVersion,
        endpointUrl: updatedServer.endpointUrl,
        transportType: updatedServer.transportType as 'stdio' | 'http' | 'websocket',
        capabilities: (updatedServer.capabilities as unknown as string[]) || [],
        resources: (updatedServer.resources as unknown as MCPResource[]) || [],
        tools: (updatedServer.tools as unknown as MCPTool[]) || [],
        prompts: (updatedServer.prompts as unknown as MCPPrompt[]) || [],
        serverConfig: (updatedServer.serverConfig as Record<string, unknown>) || {},
        installCommand: updatedServer.installCommand || undefined,
        dockerImage: updatedServer.dockerImage || undefined,
        repositoryUrl: (updatedServer.repositoryUrl || undefined) as string | undefined,
        documentationUrl: (updatedServer.documentationUrl || undefined) as string | undefined,
        license: updatedServer.license || undefined,
        pricingType: updatedServer.pricingType as 'free' | 'usage' | 'subscription' | 'one-time',
        price: Number(updatedServer.price),
        category: updatedServer.category,
        tags: (updatedServer.tags as unknown as string[]) || [],
        healthCheckUrl: updatedServer.healthCheckUrl || undefined,
        lastHealthCheck: updatedServer.lastHealthCheck?.toISOString() || undefined,
        healthStatus: updatedServer.healthStatus as 'unknown' | 'healthy' | 'unhealthy' | 'offline',
        usageCount: Number(updatedServer.usageCount),
        rating: Number(updatedServer.rating),
        reviewCount: Number(updatedServer.reviewCount),
        ownerId: updatedServer.ownerId,
        ownerName: existing.ownerName || 'Unknown',
        createdAt: updatedServer.createdAt.toISOString(),
        updatedAt: updatedServer.updatedAt.toISOString(),
      };
    } catch (error) {
      logger.error('MCP Registry: Failed to update server', { id, error });
      throw new Error('Failed to update MCP server');
    }
  }

  async deleteServer(id: number, ownerId: number): Promise<void> {
    try {
      const [existing] = await db.select().from(mcpServers).where(eq(mcpServers.id, id)).limit(1);

      if (!existing) {
        throw new Error('MCP server not found');
      }

      if (existing.ownerId !== ownerId) {
        throw new Error('Unauthorized to delete this server');
      }

      await db.delete(mcpServers).where(eq(mcpServers.id, id));
    } catch (error) {
      logger.error('MCP Registry: Failed to delete server', { id, error });
      throw new Error('Failed to delete MCP server');
    }
  }

  async updateHealthStatus(id: number, status: 'healthy' | 'unhealthy' | 'offline'): Promise<void> {
    try {
      await db
        .update(mcpServers)
        .set({
          healthStatus: status,
          lastHealthCheck: new Date(),
        })
        .where(eq(mcpServers.id, id));
    } catch (error) {
      logger.error('MCP Registry: Failed to update health status', { id, status, error });
      throw new Error('Failed to update health status');
    }
  }

  async incrementUsage(id: number): Promise<void> {
    try {
      await db
        .update(mcpServers)
        .set({
          usageCount: sql`${mcpServers.usageCount} + 1`,
        })
        .where(eq(mcpServers.id, id));
    } catch (error) {
      logger.error('MCP Registry: Failed to increment usage', { id, error });
      throw new Error('Failed to increment usage');
    }
  }
}

export const mcpRegistryService = new MCPRegistryService();
