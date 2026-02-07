import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseEnabled } from '@/lib/supabase';

// GET /api/user/me - Get current user profile
export async function GET(request: NextRequest) {
  try {
    // 1. Check Authentication (Mock for now, replace with Supabase Auth Middleware)
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Demo Mode Logic
    if (!isSupabaseEnabled) {
      return NextResponse.json({
        user: {
          id: 'demo-user-123',
          email: 'demo@oma-ai.com',
          fullName: 'Demo User',
          username: 'demouser',
          avatar_url: null,
          role: 'user',
          wallet: '0x1234567890abcdef1234567890abcdef12345678',
          created_at: new Date().toISOString()
        }
      });
    }

    // 2. Real Supabase Logic
    // const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    // ...

    // For now, returning demo response until Auth Middleware is fully wired
    return NextResponse.json({
        user: {
          id: 'user-real-123',
          email: 'real@oma-ai.com',
          fullName: 'Real User',
          role: 'user'
        }
    });

  } catch (error) {
    console.error('User API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT /api/user/me - Update profile
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        // Validation logic here...
        
        return NextResponse.json({ success: true, message: "Profile updated" });
    } catch (error) {
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}
