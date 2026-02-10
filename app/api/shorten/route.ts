import { NextRequest, NextResponse } from 'next/server';
import { createClient, isSupabaseEnabled } from '@/lib/supabase';
import { 
  generateShortCode, 
  isValidUrl, 
  normalizeUrl, 
  buildShortUrl,
  isValidShortCode 
} from '@/lib/shortener';
import { headers } from 'next/headers';

const RATE_LIMIT = 100; // requests per hour
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in ms

// Demo data for when Supabase is not configured
const DEMO_LINKS: Map<string, any> = new Map();

async function checkRateLimit(
  ipAddress: string, 
  userId: string | null
): Promise<{ allowed: boolean; remaining: number; resetAt: Date }> {
  // If Supabase not enabled, allow all requests (demo mode)
  if (!isSupabaseEnabled) {
    return { allowed: true, remaining: RATE_LIMIT, resetAt: new Date(Date.now() + RATE_WINDOW) };
  }
  
  const supabase = createClient();
  const windowStart = new Date(Date.now() - RATE_WINDOW);
  
  let query = supabase
    .from('rate_limits')
    .select('count')
    .eq('action', 'shorten')
    .gte('window_start', windowStart.toISOString());
    
  if (userId) {
    query = query.eq('user_id', userId);
  } else {
    query = query.eq('ip_address', ipAddress);
  }
  
  const { data, error } = await query.single();
  
  if (error && error.code !== 'PGRST116') {
    console.error('Rate limit check error:', error);
    // Allow on error to not block legitimate users
    return { allowed: true, remaining: RATE_LIMIT, resetAt: new Date(Date.now() + RATE_WINDOW) };
  }
  
  const currentCount = data?.count || 0;
  const remaining = Math.max(0, RATE_LIMIT - currentCount);
  const resetAt = new Date(Date.now() + RATE_WINDOW);
  
  if (currentCount >= RATE_LIMIT) {
    return { allowed: false, remaining: 0, resetAt };
  }
  
  // Increment or create rate limit entry
  if (userId) {
    await supabase.rpc('increment_rate_limit', {
      p_user_id: userId,
      p_action: 'shorten',
      p_window_start: windowStart.toISOString()
    });
  }
  
  return { allowed: true, remaining: remaining - 1, resetAt };
}

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers();
    const ipAddress = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     headersList.get('x-real-ip') || 
                     'unknown';
    
    // Check rate limit
    const rateLimitCheck = await checkRateLimit(ipAddress, null);
    
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Rate limit exceeded. Try again later.',
          resetAt: rateLimitCheck.resetAt
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(RATE_LIMIT),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitCheck.resetAt.toISOString()
          }
        }
      );
    }
    
    const body = await request.json();
    const { url, custom_code, custom_domain, title, description } = body;
    
    // Validate URL
    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400 }
      );
    }
    
    const normalizedUrl = normalizeUrl(url);
    
    if (!isValidUrl(normalizedUrl)) {
      return NextResponse.json(
        { success: false, error: 'Invalid URL provided' },
        { status: 400 }
      );
    }
    
    // Validate custom code if provided
    let shortCode: string;
    if (custom_code) {
      if (!isValidShortCode(custom_code)) {
        return NextResponse.json(
          { success: false, error: 'Custom code must be 4-10 alphanumeric characters' },
          { status: 400 }
        );
      }
      shortCode = custom_code;
    } else {
      shortCode = generateShortCode(7);
    }
    
    // DEMO MODE: Return demo response when Supabase not configured
    if (!isSupabaseEnabled) {
      const demoLink = {
        short_code: shortCode,
        short_url: buildShortUrl(shortCode, custom_domain),
        original_url: normalizedUrl,
        created_at: new Date().toISOString()
      };
      
      DEMO_LINKS.set(shortCode, demoLink);
      
      return NextResponse.json(
        {
          success: true,
          data: demoLink,
          demo: true,
          message: 'Demo mode - configure Supabase for persistence'
        },
        { status: 201 }
      );
    }
    
    // PRODUCTION MODE: Use Supabase
    const supabase = createClient();
    
    // Get user session if authenticated
    const { data: { user } } = await supabase.auth.getUser();
    
    // Check if custom code is available
    if (custom_code) {
      const { data: existing } = await supabase
        .from('links')
        .select('id')
        .eq('short_code', custom_code)
        .single();
        
      if (existing) {
        return NextResponse.json(
          { success: false, error: 'Custom code is already taken' },
          { status: 409 }
        );
      }
    } else {
      // Generate unique short code
      let attempts = 0;
      const maxAttempts = 10;
      
      do {
        shortCode = generateShortCode(7);
        const { data: existing } = await supabase
          .from('links')
          .select('id')
          .eq('short_code', shortCode)
          .single();
          
        if (!existing) break;
        attempts++;
      } while (attempts < maxAttempts);
      
      if (attempts >= maxAttempts) {
        return NextResponse.json(
          { success: false, error: 'Failed to generate unique short code. Please try again.' },
          { status: 500 }
        );
      }
    }
    
    // Create the link
    const { data: link, error: insertError } = await supabase
      .from('links')
      .insert({
        short_code: shortCode,
        original_url: normalizedUrl,
        user_id: user?.id || null,
        custom_domain: custom_domain || null,
        title: title || null,
        description: description || null
      })
      .select()
      .single();
    
    if (insertError) {
      console.error('Failed to create link:', insertError);
      return NextResponse.json(
        { success: false, error: 'Failed to create short URL' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      {
        success: true,
        data: {
          short_code: link.short_code,
          short_url: buildShortUrl(link.short_code, link.custom_domain),
          original_url: link.original_url,
          created_at: link.created_at
        }
      },
      {
        status: 201,
        headers: {
          'X-RateLimit-Limit': String(RATE_LIMIT),
          'X-RateLimit-Remaining': String(rateLimitCheck.remaining),
          'X-RateLimit-Reset': rateLimitCheck.resetAt.toISOString()
        }
      }
    );
    
  } catch (error) {
    console.error('Shorten API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // DEMO MODE: Return demo links when Supabase not configured
    if (!isSupabaseEnabled) {
      const demoLinks = Array.from(DEMO_LINKS.values()).slice(0, 50);
      return NextResponse.json({
        success: true,
        data: {
          links: demoLinks,
          pagination: {
            total: demoLinks.length,
            limit: 50,
            offset: 0,
            has_more: false
          }
        },
        demo: true,
        message: 'Demo mode - configure Supabase for persistence'
      });
    }
    
    // PRODUCTION MODE: Use Supabase
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
    
    // Fetch user's links
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
    
    return NextResponse.json({
      success: true,
      data: {
        links: links.map(link => ({
          ...link,
          short_url: buildShortUrl(link.short_code, link.custom_domain)
        })),
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
