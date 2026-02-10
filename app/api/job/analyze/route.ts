import { NextRequest, NextResponse } from 'next/server';
import { AIScorer } from '@/lib/ai-scorer';
import { createClient } from '@supabase/supabase-js';

// Create Supabase client only if credentials are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAdmin = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { description, userId, save = true } = body;

    if (!description) {
      return NextResponse.json(
        { error: 'Job description is required' },
        { status: 400 }
      );
    }

    // Initialize AI scorer
    const geminiApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!geminiApiKey) {
      return NextResponse.json(
        { error: 'AI analysis service not configured' },
        { status: 500 }
      );
    }

    const scorer = new AIScorer(geminiApiKey);
    
    // Analyze job description
    const analysis = await scorer.analyzeJobDescription(description);

    // Save to database if requested
    let savedJobId = null;
    if (save && userId && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('job_descriptions')
        .insert({
          title: analysis.title,
          description: description,
          requirements: {
            requiredSkills: analysis.requiredSkills,
            preferredSkills: analysis.preferredSkills,
            minExperience: analysis.minExperience,
            educationLevel: analysis.educationLevel,
            responsibilities: analysis.responsibilities
          },
          skills_required: analysis.requiredSkills,
          experience_level: analysis.minExperience > 0 
            ? `${analysis.minExperience}+ years` 
            : 'Not specified',
          user_id: userId
        })
        .select()
        .single();

      if (!error && data) {
        savedJobId = data.id;
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        jobId: savedJobId,
        title: analysis.title,
        requiredSkills: analysis.requiredSkills,
        preferredSkills: analysis.preferredSkills,
        minExperience: analysis.minExperience,
        educationLevel: analysis.educationLevel,
        responsibilities: analysis.responsibilities
      }
    });

  } catch (error) {
    console.error('Job analyze error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to analyze job description',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET method to retrieve job descriptions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const jobId = searchParams.get('jobId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    let query = supabaseAdmin
      .from('job_descriptions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (jobId) {
      query = query.eq('id', jobId);
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
    console.error('Get jobs error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve job descriptions' },
      { status: 500 }
    );
  }
}

// DELETE method to remove job description
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');
    const userId = searchParams.get('userId');

    if (!jobId || !userId) {
      return NextResponse.json(
        { error: 'jobId and userId are required' },
        { status: 400 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const { error } = await supabaseAdmin
      .from('job_descriptions')
      .delete()
      .eq('id', jobId)
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: 'Job description deleted'
    });

  } catch (error) {
    console.error('Delete job error:', error);
    return NextResponse.json(
      { error: 'Failed to delete job description' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
