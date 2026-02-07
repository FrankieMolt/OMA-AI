import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseEnabled } from '@/lib/supabase';

// GET /api/reviews - Get reviews for a service
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const service_id = searchParams.get('service_id');
  const limit = parseInt(searchParams.get('limit') || '20');
  const offset = parseInt(searchParams.get('offset') || '0');

  // Return demo data if Supabase is not configured
  if (!isSupabaseEnabled) {
    const demoReviews = [
      {
        id: 'review-1',
        service_id: service_id || 'demo-1',
        user_id: 'user-1',
        rating: 5,
        title: 'Excellent LLM for complex tasks',
        comment: 'GPT-4 Turbo has been incredibly helpful for coding, writing, and complex reasoning tasks. The speed and accuracy are outstanding.',
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        is_verified_purchase: true
      },
      {
        id: 'review-2',
        service_id: service_id || 'demo-2',
        user_id: 'user-2',
        rating: 4,
        title: 'Great for autonomous research',
        comment: 'Saves hours of research time. Sometimes misses recent sources but overall very reliable.',
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        is_verified_purchase: true
      }
    ];

    return NextResponse.json({ reviews: demoReviews, total: demoReviews.length });
  }

  if (!service_id) {
    return NextResponse.json({ error: 'service_id is required' }, { status: 400 });
  }

  // Build query
  let query = supabase!
    .from('reviews')
    .select(`
        *,
        users (full_name, avatar_url, username)
      `)
    .eq('service_id', service_id)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  // Get total count
  const { count, error: countError } = await supabase!
    .from('reviews')
    .select('*', { count: 'exact', head: true })
    .eq('service_id', service_id);

  if (countError) {
    console.error('Count error:', countError);
    return NextResponse.json({ error: countError.message }, { status: 500 });
  }

  // Execute query
  const { data, error } = await query;

  if (error) {
    console.error('Reviews error:', error);
    if (error.code === '42P01') {
      return NextResponse.json({ reviews: [], total: 0 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ reviews: data, total: count || 0 });
}

// POST /api/reviews - Create a new review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      service_id,
      user_id,
      rating,
      title,
      comment,
      is_verified_purchase = false
    } = body;

    // Validate required fields
    if (!service_id || !user_id || !rating || !title) {
      return NextResponse.json(
        { error: 'Missing required fields: service_id, user_id, rating, title' },
        { status: 400 }
      );
    }

    // Validate rating (1-5)
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // If Supabase is not enabled, return demo response
    if (!isSupabaseEnabled) {
      const newReview = {
        id: `review-${Date.now()}`,
        service_id,
        user_id,
        rating,
        title,
        comment,
        is_verified_purchase,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      console.log('Demo mode: Review created but not persisted:', newReview);
      return NextResponse.json(newReview, { status: 201 });
    }

    // Create review
    const { data, error } = await supabase!
      .from('reviews')
      .insert([{
        service_id,
        user_id,
        rating,
        title,
        comment,
        is_verified_purchase
      }])
      .select()
      .single();

    if (error) {
      console.error('Create review error:', error);
      if (error.code === '42P01') {
        return NextResponse.json({ error: 'Reviews table not found' }, { status: 500 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Update service rating and count
    await supabase!.rpc('update_service_rating', { p_service_id: service_id });

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Request error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
