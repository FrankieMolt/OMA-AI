/**
 * MCP Marketplace API - List Skills (Real Database Version)
 * GET /api/mcp/list?page=1&limit=20&category=all&verified=false&sort=rating
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase, type MCP_Skill, TABLES } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=60');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      page = '1',
      limit = '20',
      category = 'all',
      verified,
      search,
      sort = 'rating',
    } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const offset = (pageNum - 1) * limitNum;

    // Build query
    let query = supabase
      .from(TABLES.MCP_SKILLS)
      .select('*', { count: 'exact' });

    // Filter by category
    if (category !== 'all' && category !== undefined) {
      query = query.contains('category', [category as string]);
    }

    // Filter by verification status
    if (verified === 'true') {
      query = query.eq('verified', true);
    } else if (verified === 'false') {
      query = query.eq('verified', false);
    }

    // Search by name or description
    if (search && search !== undefined) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Sorting
    switch (sort) {
      case 'rating':
        query = query.order('rating', { ascending: false, nullsFirst: false });
        break;
      case 'calls':
        query = query.order('total_calls', { ascending: false, nullsFirst: false });
        break;
      case 'price':
        query = query.order('pricing_usdc', { ascending: true });
        break;
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
      default:
        query = query.order('rating', { ascending: false, nullsFirst: false });
    }

    // Pagination
    query = query.range(offset, offset + limitNum - 1);

    // Execute query
    const { data: skills, error, count } = await query;

    if (error) {
      console.error('Error fetching MCP skills:', error);
      return res.status(500).json({
        error: 'Failed to fetch MCP skills',
        details: error.message,
      });
    }

    // Get unique categories
    const { data: allSkills } = await supabase
      .from(TABLES.MCP_SKILLS)
      .select('category');

    const categories = [
      ...new Set(allSkills?.flatMap((skill) => skill.category) || []),
    ].sort();

    // Get statistics
    const { count: verifiedCount } = await supabase
      .from(TABLES.MCP_SKILLS)
      .select('*', { count: 'exact', head: true })
      .eq('verified', true);

    const totalSkills = count || 0;
    const totalPages = Math.ceil(totalSkills / limitNum);

    res.status(200).json({
      success: true,
      data: skills || [],
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalSkills,
        totalPages,
        hasNextPage: offset + limitNum < totalSkills,
        hasPrevPage: pageNum > 1,
      },
      filters: {
        categories,
        verifiedSkillsCount: verifiedCount || 0,
        totalSkills,
      },
    });
  } catch (error) {
    console.error('Error in MCP list handler:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
