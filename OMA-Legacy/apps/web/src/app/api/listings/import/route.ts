import { NextRequest, NextResponse } from 'next/server';
import { GithubImportService } from '@/lib/services/github';
import { db, apiListings, mcpServers, skills, users } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const importSchema = z.object({
  url: z.string().url(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = importSchema.parse(body);

    const repoInfo = GithubImportService.parseUrl(url);
    if (!repoInfo) {
      return NextResponse.json({ error: 'Invalid GitHub URL' }, { status: 400 });
    }

    // Fetch Repo Data
    const repo = await GithubImportService.fetchRepo(repoInfo.owner, repoInfo.repo);
    const readme = await GithubImportService.fetchReadme(repoInfo.owner, repoInfo.repo);
    const analysis = GithubImportService.analyzeContent(repo, readme);

    // Get Admin User (or current user in real auth)
    let [owner] = await db.select().from(users).where(eq(users.email, 'admin@oma.com'));
    if (!owner) {
      // Fallback to first user
      [owner] = await db.select().from(users).limit(1);
    }

    // Prepare Listing Data
    const listingValues = {
      title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      slug: repo.name.toLowerCase(),
      description: repo.description || 'Imported from GitHub',
      category: analysis.category,
      type: analysis.category,
      pricingType: 'free',
      price: 0,
      currency: 'USDC',
      ownerId: owner.id,
      capabilities: analysis.capabilities,
      tags: [...(repo.topics || []), 'github-import', analysis.category],
      status: 'approved', // Auto-approve for demo
      verified: false,
      featured: false,
      installCommand: `git clone ${repo.html_url}`,
      endpointUrl: repo.html_url,
      metadata: {
        github: {
          stars: repo.stargazers_count,
          owner: repo.owner.login,
          url: repo.html_url,
        }
      }
    };

    // Check existing
    const [existing] = await db
      .select()
      .from(apiListings)
      .where(eq(apiListings.slug, listingValues.slug));

    let listingId: number;

    if (existing) {
      const [updated] = await db
        .update(apiListings)
        .set(listingValues)
        .where(eq(apiListings.slug, listingValues.slug))
        .returning();
      listingId = updated.id;
    } else {
      const [inserted] = await db.insert(apiListings).values(listingValues).returning();
      listingId = inserted.id;
    }

    // Add to specific tables based on category
    if (analysis.category === 'mcp') {
      const mcpValues = {
        name: listingValues.title,
        slug: listingValues.slug,
        description: listingValues.description,
        endpointUrl: listingValues.endpointUrl,
        transportType: 'stdio' as const, // Default for repos
        capabilities: listingValues.capabilities,
        pricingType: 'free',
        price: 0,
        category: 'mcp',
        tags: listingValues.tags,
        ownerId: owner.id,
        apiListingId: listingId,
        status: 'approved',
        healthStatus: 'healthy' as const,
      };

      const [existingMcp] = await db.select().from(mcpServers).where(eq(mcpServers.slug, listingValues.slug));
      if (existingMcp) {
        await db.update(mcpServers).set(mcpValues).where(eq(mcpServers.slug, listingValues.slug));
      } else {
        await db.insert(mcpServers).values(mcpValues);
      }
    } else if (analysis.category === 'skill') {
      const skillValues = {
        name: listingValues.title,
        slug: listingValues.slug,
        description: listingValues.description,
        category: 'coding',
        tags: listingValues.tags,
        capabilities: listingValues.capabilities,
        pricingType: 'free',
        price: 0,
        ownerId: owner.id,
        status: 'active',
        featured: false,
        verified: false,
        githubUrl: repo.html_url,
      };

      const [existingSkill] = await db.select().from(skills).where(eq(skills.slug, listingValues.slug));
      if (existingSkill) {
        await db.update(skills).set(skillValues).where(eq(skills.slug, listingValues.slug));
      } else {
        await db.insert(skills).values(skillValues);
      }
    }

    return NextResponse.json({ success: true, data: listingValues });

  } catch (error) {
    console.error('GitHub Import Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Import failed' },
      { status: 500 }
    );
  }
}
