/**
 * MCP Registration API
 * POST /api/mcp/register - Register new MCP skill with OMA marketplace
 */

import type { NextApiRequest, NextApiResponse } from 'next';

// Mock database for MVP (replace with real Supabase queries)
const MCP_SKILLS: Record<string, any> = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      name,
      slug,
      category,
      description,
      author,
      repository_url,
      documentation_url,
      mcp_endpoint,
      pricing_usdc,
      x402_enabled,
    } = req.body;

    // Validate required fields
    if (!name || !slug || !category || !description || !author || !mcp_endpoint) {
      return res.status(400).json({
        error: 'Missing required fields',
        details: {
          name: name ? 'present' : 'missing',
          slug: slug ? 'present' : 'missing',
          category: category ? 'present' : 'missing',
          description: description ? 'present' : 'missing',
          author: author ? 'present' : 'missing',
          mcp_endpoint: mcp_endpoint ? 'present' : 'missing',
        },
      });
    }

    // Validate slug format
    if (!slug.match(/^[a-z0-9-]+$/)) {
      return res.status(400).json({
        error: 'Invalid slug format',
        details: 'Slug must contain only lowercase letters, numbers, and hyphens',
      });
    }

    // Validate MCP endpoint format
    if (!mcp_endpoint.match(/^(stdio|https?):\/\//)) {
      return res.status(400).json({
        error: 'Invalid MCP endpoint format',
        details: 'MCP endpoint must start with "stdio://" or "https://"',
      });
    }

    // Check if slug already exists
    if (MCP_SKILLS[slug]) {
      return res.status(409).json({
        error: 'MCP skill with this slug already exists',
        existing_skill: MCP_SKILLS[slug],
      });
    }

    // Generate MCP skill ID
    const skillId = `mcp_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    // Create MCP skill record
    const mcpSkill = {
      id: skillId,
      name,
      slug,
      category: Array.isArray(category) ? category : [category],
      description,
      author,
      repository_url: repository_url || null,
      documentation_url: documentation_url || null,
      mcp_endpoint,
      pricing_usdc: pricing_usdc || 0.001,
      x402_enabled: x402_enabled !== false,
      verified: false, // Requires manual verification
      rating: 0,
      total_calls: 0,
      success_rate: 100.00,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Store in database (mock for MVP)
    MCP_SKILLS[slug] = mcpSkill;

    res.status(201).json({
      success: true,
      mcp_skill: mcpSkill,
      message: 'MCP skill registered successfully',
      next_steps: [
        'Test your MCP endpoint locally',
        'Deploy to production (Vercel, Railway, etc.)',
        'Update MCP endpoint to production URL',
        'Submit for verification',
      ],
    });
  } catch (error) {
    console.error('Error registering MCP skill:', error);
    res.status(500).json({
      error: 'Failed to register MCP skill',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
