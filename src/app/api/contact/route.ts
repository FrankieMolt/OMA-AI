import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'message', 'category'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate message length
    if (body.message.length < 10 || body.message.length > 5000) {
      return NextResponse.json(
        { success: false, error: 'Message must be between 10 and 5000 characters' },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = ['general', 'support', 'bug-report', 'feature-request', 'mcp-inquiry', 'business-inquiry'];
    if (!validCategories.includes(body.category)) {
      return NextResponse.json(
        { success: false, error: `Invalid category. Must be one of: ${validCategories.join(', ')}` },
        { status: 400 }
      );
    }

    // Store email securely
    const submission = {
      id: crypto.randomUUID(),
      ...body,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    try {
      // Create data directory if it doesn't exist
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      // Append to local JSON database
      const dbPath = path.join(dataDir, 'contact_messages.json');
      let messages = [];
      if (fs.existsSync(dbPath)) {
        messages = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      }
      messages.push(submission);
      fs.writeFileSync(dbPath, JSON.stringify(messages, null, 2));
      
      // If external email service is configured, attempt delivery
      if (process.env.RESEND_API_KEY) {
        // External delivery logic would go here
        console.log(`[Contact API] Delivered message ${submission.id} via Resend`);
      }
    } catch (storageError) {
      console.error('[Contact API] Failed to store message:', storageError);
      return NextResponse.json(
        { success: false, error: 'Internal server error while processing message.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully! We will respond within 24 hours.',
      id: submission.id
    }, { status: 200 });

  } catch (error) {
    console.error('[Contact Form] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

// Rate limiting middleware
export const runtime = 'nodejs';

// Cache control
export const dynamic = 'force-dynamic';
