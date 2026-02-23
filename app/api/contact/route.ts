import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseEnabled } from '@/lib/supabase';
import { checkRateLimit, createRateLimitResponse, addSecurityHeaders } from '@/lib/security';

// POST /api/contact - Submit contact form
export async function POST(request: NextRequest) {
  // Rate limiting: 3 requests per hour per IP to prevent spam
  const rateLimitResult = await checkRateLimit(request, 3, 60 * 60 * 1000);
  if (!rateLimitResult.success) {
    return createRateLimitResponse(rateLimitResult.resetTime!);
  }

  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !message) {
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

    // Validate field lengths to prevent abuse
    if (name.length > 100 || email.length > 255) {
      return NextResponse.json(
        { error: 'Field exceeds maximum length' },
        { status: 400 }
      );
    }

    if (subject && subject.length > 200) {
      return NextResponse.json(
        { error: 'Subject exceeds maximum length' },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 5000 characters' },
        { status: 400 }
      );
    }

    // Demo Mode
    if (!isSupabaseEnabled) {
      const response = NextResponse.json({ success: true, message: 'Message sent (demo)' });
      return addSecurityHeaders(response);
    }

    // Real: Store in DB (if we had a messages table) or send email
    // For now, we'll log to console or use a 'messages' table if we created one.
    // I'll create a 'messages' table migration later if needed, but for now
    // let's assume we just log it or send to an internal slack/email via generic webhook

    // TODO: Implement email sending via Resend/SendGrid or store in DB

    const response = NextResponse.json({ success: true, message: 'Message received' });
    return addSecurityHeaders(response);

  } catch (error) {
    const response = NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    return addSecurityHeaders(response);
  }
}
