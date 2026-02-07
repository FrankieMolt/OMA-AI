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

// POST /api/auth/login - Sign in user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
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

    // Check if demo mode
    const isDemo = process.env.NODE_ENV === 'development';

    if (isDemo) {
      // Demo mode: Accept any email/password
      if (email === DEMO_USER.email && password.length >= 8) {
        return NextResponse.json({
          success: true,
          message: 'Login successful',
          token: DEMO_TOKEN,
          user: DEMO_USER
        });
      }

      // For demo, accept any credentials
      return NextResponse.json({
        success: true,
        message: 'Login successful (demo mode)',
        token: `demo-token-${Date.now()}`,
        user: {
          ...DEMO_USER,
          email,
          username: email.split('@')[0]
        }
      });
    }

    // TODO: Implement real Supabase auth login
    // 1. Authenticate with Supabase
    // 2. Get user data from public.users table
    // 3. Return token and user data

    return NextResponse.json(
      { error: 'Authentication not implemented yet' },
      { status: 501 }
    );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
