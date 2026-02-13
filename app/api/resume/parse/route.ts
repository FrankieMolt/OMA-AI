import { NextRequest, NextResponse } from 'next/server';
import { ResumeParser } from '@/lib/resume-parser';
import { createClient } from '@supabase/supabase-js';

// Create Supabase client only if credentials are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAdmin = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    // Check content type
    const contentType = request.headers.get('content-type') || '';
    
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Content-Type must be multipart/form-data' },
        { status: 400 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF, DOC, DOCX, and TXT are supported' },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Parse resume
    const parsedData = await ResumeParser.parseBuffer(buffer, file.type);

    // Save to database if userId provided
    if (userId) {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;
      
      const { data: storageData, error: storageError } = await supabaseAdmin
        .storage
        .from('resumes')
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: false
        });

      if (storageError) {
        console.error('Storage upload error:', storageError);
      }

      // Get public URL
      let fileUrl = null;
      if (storageData) {
        const { data: urlData } = supabaseAdmin
          .storage
          .from('resumes')
          .getPublicUrl(fileName);
        fileUrl = urlData?.publicUrl;
      }

      // Save to database
      const { data: resumeData, error: dbError } = await supabaseAdmin
        .from('resumes')
        .insert({
          file_name: file.name,
          file_url: fileUrl,
          file_type: file.type,
          file_size: file.size,
          parsed_data: parsedData,
          raw_text: parsedData.rawText,
          user_id: userId
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database insert error:', dbError);
      }

      // Track usage
      await supabaseAdmin.rpc('increment_usage', {
        p_user_id: userId,
        p_action_type: 'parse',
        p_count: 1
      });

      return NextResponse.json({
        success: true,
        data: {
          id: resumeData?.id,
          parsedData,
          fileUrl
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        parsedData
      }
    });

  } catch (error) {
    console.error('Resume parse error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to parse resume',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET method for retrieving parsed resumes
export async function GET(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const resumeId = searchParams.get('resumeId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    let query = supabaseAdmin
      .from('resumes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (resumeId) {
      query = query.eq('id', resumeId);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data
    });

  } catch (error) {
    console.error('Get resumes error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve resumes' },
      { status: 500 }
    );
  }
}

// CORS headers
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
