import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseEnabled } from '@/lib/supabase';

// POST /api/contact - Submit contact form
export async function POST(request: NextRequest) {
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

    // Demo Mode
    if (!isSupabaseEnabled) {
      console.log('Demo Contact Submission:', body);
      return NextResponse.json({ success: true, message: 'Message sent (demo)' });
    }

    // Real: Store in DB (if we had a messages table) or send email
    // For now, we'll log to console or use a 'messages' table if we created one.
    // I'll create a 'messages' table migration later if needed, but for now 
    // let's assume we just log it or send to an internal slack/email via generic webhook
    
    // TODO: Implement email sending via Resend/SendGrid or store in DB
    
    return NextResponse.json({ success: true, message: 'Message received' });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
