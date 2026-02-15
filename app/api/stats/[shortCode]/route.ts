import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { buildShortUrl } from '@/lib/shortener';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  try {
    const { shortCode } = await params;
    const supabase = createClient();
    
    if (!supabase) {
      return NextResponse.json(
        { success: false, error: 'Database not available in demo mode' },
        { status: 503 }
      );
    }
    
    // Get user session
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Fetch the link
    const { data: link, error: linkError } = await supabase
      .from('links')
      .select('*')
      .eq('short_code', shortCode)
      .single();
    
    if (linkError || !link) {
      return NextResponse.json(
        { success: false, error: 'Link not found' },
        { status: 404 }
      );
    }
    
    // Check ownership
    if (link.user_id !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      );
    }
    
    // Fetch total clicks
    const { count: totalClicks } = await supabase
      .from('link_clicks')
      .select('*', { count: 'exact', head: true })
      .eq('link_id', link.id);
    
    // Fetch unique visitors (distinct IP addresses)
    const { data: uniqueVisitorsData } = await supabase
      .from('link_clicks')
      .select('ip_address')
      .eq('link_id', link.id);
    
    const uniqueVisitors = new Set(uniqueVisitorsData?.map(c => c.ip_address) || []).size;
    
    // Fetch clicks by day (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { data: clicksByDay } = await supabase
      .from('link_clicks')
      .select('clicked_at')
      .eq('link_id', link.id)
      .gte('clicked_at', thirtyDaysAgo.toISOString())
      .order('clicked_at', { ascending: true });
    
    // Aggregate clicks by day
    const clicksByDayMap = new Map<string, number>();
    clicksByDay?.forEach(click => {
      const date = new Date(click.clicked_at).toISOString().split('T')[0];
      clicksByDayMap.set(date, (clicksByDayMap.get(date) || 0) + 1);
    });
    
    const clicksByDayArray = Array.from(clicksByDayMap.entries()).map(([date, count]) => ({
      date,
      count
    }));
    
    // Fetch clicks by country
    const { data: clicksByCountry } = await supabase
      .from('link_clicks')
      .select('country')
      .eq('link_id', link.id)
      .not('country', 'is', null);
    
    const countryMap = new Map<string, number>();
    clicksByCountry?.forEach(click => {
      if (click.country) {
        countryMap.set(click.country, (countryMap.get(click.country) || 0) + 1);
      }
    });
    
    const clicksByCountryArray = Array.from(countryMap.entries())
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    // Fetch clicks by device
    const { data: clicksByDevice } = await supabase
      .from('link_clicks')
      .select('device_type')
      .eq('link_id', link.id)
      .not('device_type', 'is', null);
    
    const deviceMap = new Map<string, number>();
    clicksByDevice?.forEach(click => {
      if (click.device_type) {
        deviceMap.set(click.device_type, (deviceMap.get(click.device_type) || 0) + 1);
      }
    });
    
    const clicksByDeviceArray = Array.from(deviceMap.entries())
      .map(([device, count]) => ({ device, count }));
    
    // Fetch clicks by browser
    const { data: clicksByBrowser } = await supabase
      .from('link_clicks')
      .select('browser')
      .eq('link_id', link.id)
      .not('browser', 'is', null);
    
    const browserMap = new Map<string, number>();
    clicksByBrowser?.forEach(click => {
      if (click.browser) {
        browserMap.set(click.browser, (browserMap.get(click.browser) || 0) + 1);
      }
    });
    
    const clicksByBrowserArray = Array.from(browserMap.entries())
      .map(([browser, count]) => ({ browser, count }));
    
    // Fetch recent clicks
    const { data: recentClicks } = await supabase
      .from('link_clicks')
      .select('*')
      .eq('link_id', link.id)
      .order('clicked_at', { ascending: false })
      .limit(50);
    
    return NextResponse.json({
      success: true,
      data: {
        link: {
          ...link,
          short_url: buildShortUrl(link.short_code, link.custom_domain)
        },
        stats: {
          total_clicks: totalClicks || 0,
          unique_visitors: uniqueVisitors,
          clicks_by_day: clicksByDayArray,
          clicks_by_country: clicksByCountryArray,
          clicks_by_device: clicksByDeviceArray,
          clicks_by_browser: clicksByBrowserArray,
          recent_clicks: recentClicks || []
        }
      }
    });
    
  } catch (error) {
    console.error('Get stats API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
