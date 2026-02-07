import { NextRequest, NextResponse } from 'next/server';

// Demo authentication (replace with real Supabase auth in production)
const DEMO_TOKEN = 'demo-token-123456';
const DEMO_USER = {
  id: 'user-123',
  email: 'demo@oma-ai.com',
  fullName: 'Demo User',
  username: 'demo',
  role: 'user',
  wallet: '0x1234567890abcdef1234567890abcdef12345678'
};

// POST /api/auth/signup - Create new user account
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, fullName, username } = body;

    // Validate required fields
    if (!email || !password || !fullName || !username) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Validate username
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        { error: 'Username must be 3-20 characters (letters, numbers, underscores only)' },
        { status: 400 }
      );
    }

    // Check if demo mode
    const isDemo = process.env.NODE_ENV === 'development';

    if (isDemo) {
      // Demo mode: Return success
      return NextResponse.json({
        success: true,
        message: 'Account created successfully',
        user: {
          ...DEMO_USER,
          email,
          fullName,
          username
        }
      });
    }

    // TODO: Implement real Supabase auth signup
    // 1. Create Supabase user
    // 2. Create user profile in public.users table
    // 3. Return user data and token

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: crypto.randomUUID(),
        email,
        fullName,
        username,
        role: 'user'
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
