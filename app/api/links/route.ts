import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { buildShortUrl } from '@/lib/shortener';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get user session
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // Fetch user's links with click stats
    const { data: links, error, count } = await supabase
      .from('links')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (error) {
      console.error('Failed to fetch links:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch links' },
        { status: 500 }
      );
    }
    
    // Enhance links with short URLs
    const enhancedLinks = links.map(link => ({
      ...link,
      short_url: buildShortUrl(link.short_code, link.custom_domain)
    }));
    
    return NextResponse.json({
      success: true,
      data: {
        links: enhancedLinks,
        pagination: {
          total: count || 0,
          limit,
          offset,
          has_more: (count || 0) > offset + limit
        }
      }
    });
    
  } catch (error) {
    console.error('Get links API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
