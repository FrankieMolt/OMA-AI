import { NextResponse } from 'next/server';

// Simple email storage (for demo - replace with real email service)
const emailStorage: any[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'message', 'category'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate message length
    if (body.message.length < 10 || body.message.length > 5000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 5000 characters' },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = ['general', 'support', 'bug-report', 'feature-request', 'mcp-inquiry', 'business-inquiry'];
    if (!validCategories.includes(body.category)) {
      return NextResponse.json(
        { error: `Invalid category. Must be one of: ${validCategories.join(', ')}` },
        { status: 400 }
      );
    }

    // Store email (in production, send via email service like Resend, SendGrid, etc.)
    const submission = {
      id: crypto.randomUUID(),
      ...body,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    emailStorage.push(submission);

    // TODO: Integrate email service (Resend, SendGrid, AWS SES)
    // Email config needed: SMTP or API keys from environment variables
    // Current implementation: In-memory storage (for demo purposes)
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'OMA-Ai Support <support@oma-ai.com>',
    //   to: body.email,
    //   subject: `[${body.category}] ${body.subject}`,
    //   html: createEmailTemplate(body)
    // });

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully! We will respond within 24 hours.',
      id: submission.id
    }, { status: 200 });

  } catch (error) {
    console.error('[Contact Form] Error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

// Rate limiting middleware
export const runtime = 'nodejs';

// Cache control
export const dynamic = 'force-dynamic';
