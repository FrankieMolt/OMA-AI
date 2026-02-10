import { NextRequest, NextResponse } from 'next/server';
import { AIScorer } from '@/lib/ai-scorer';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      resumeId, 
      jobId, 
      jobDescription, 
      resumeData,
      userId 
    } = body;

    // Validate inputs
    if (!jobDescription) {
      return NextResponse.json(
        { error: 'Job description is required' },
        { status: 400 }
      );
    }

    if (!resumeId && !resumeData) {
      return NextResponse.json(
        { error: 'Either resumeId or resumeData is required' },
        { status: 400 }
      );
    }

    // Get resume data
    let parsedResume = resumeData;
    let savedResumeId = resumeId;

    if (resumeId && !resumeData) {
      // Fetch from database
      const { data: resume, error } = await supabaseAdmin
        .from('resumes')
        .select('*')
        .eq('id', resumeId)
        .single();

      if (error || !resume) {
        return NextResponse.json(
          { error: 'Resume not found' },
          { status: 404 }
        );
      }

      parsedResume = resume.parsed_data;
      savedResumeId = resume.id;
    }

    // Initialize AI scorer
    const geminiApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!geminiApiKey) {
      return NextResponse.json(
        { error: 'AI scoring service not configured' },
        { status: 500 }
      );
    }

    const scorer = new AIScorer(geminiApiKey);
    
    // Score the resume
    const scoreResult = await scorer.scoreResume(parsedResume, jobDescription);

    // Get or create job description record
    let savedJobId = jobId;
    if (userId && jobDescription) {
      if (!jobId) {
        // Create new job description
        const { data: jobData, error: jobError } = await supabaseAdmin
          .from('job_descriptions')
          .insert({
            title: parsedResume.name ? `Job for ${parsedResume.name}` : 'Untitled Job',
            description: jobDescription,
            user_id: userId
          })
          .select()
          .single();

        if (!jobError && jobData) {
          savedJobId = jobData.id;
        }
      }

      // Save score to database
      if (savedResumeId && savedJobId) {
        const { error: scoreError } = await supabaseAdmin
          .from('scores')
          .upsert({
            resume_id: savedResumeId,
            job_id: savedJobId,
            score: scoreResult.overallScore,
            match_percentage: scoreResult.matchPercentage,
            analysis: {
              overall: scoreResult.analysis,
              skillMatch: scoreResult.skillMatch,
              experienceMatch: scoreResult.experienceMatch,
              educationMatch: scoreResult.educationMatch
            },
            matching_skills: scoreResult.skillMatch.matching,
            missing_skills: scoreResult.skillMatch.missing,
            recommendations: scoreResult.recommendations
          }, {
            onConflict: 'resume_id,job_id'
          });

        if (scoreError) {
          console.error('Score save error:', scoreError);
        }

        // Track usage
        await supabaseAdmin.rpc('increment_usage', {
          p_user_id: userId,
          p_action_type: 'score',
          p_count: 1
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        score: scoreResult.overallScore,
        matchPercentage: scoreResult.matchPercentage,
        analysis: scoreResult.analysis,
        skillMatch: scoreResult.skillMatch,
        experienceMatch: scoreResult.experienceMatch,
        educationMatch: scoreResult.educationMatch,
        recommendations: scoreResult.recommendations,
        strengths: scoreResult.strengths,
        weaknesses: scoreResult.weaknesses,
        resumeId: savedResumeId,
        jobId: savedJobId
      }
    });

  } catch (error) {
    console.error('Resume score error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to score resume',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET method to retrieve scores
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const resumeId = searchParams.get('resumeId');
    const jobId = searchParams.get('jobId');

    if (!resumeId && !jobId) {
      return NextResponse.json(
        { error: 'Either resumeId or jobId is required' },
        { status: 400 }
      );
    }

    let query = supabaseAdmin
      .from('scores')
      .select(`
        *,
        resumes (id, file_name, parsed_data),
        job_descriptions (id, title)
      `);

    if (resumeId) {
      query = query.eq('resume_id', resumeId);
    }

    if (jobId) {
      query = query.eq('job_id', jobId);
    }

    const { data, error } = await query.order('match_percentage', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data
    });

  } catch (error) {
    console.error('Get scores error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve scores' },
      { status: 500 }
    );
  }
}

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
