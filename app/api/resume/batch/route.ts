import { NextRequest, NextResponse } from 'next/server';
import { AIScorer } from '@/lib/ai-scorer';
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

    const body = await request.json();
    const { 
      resumeIds, 
      jobDescription, 
      jobId,
      userId 
    } = body;

    if (!resumeIds || !Array.isArray(resumeIds) || resumeIds.length === 0) {
      return NextResponse.json(
        { error: 'At least one resumeId is required' },
        { status: 400 }
      );
    }

    if (!jobDescription) {
      return NextResponse.json(
        { error: 'Job description is required' },
        { status: 400 }
      );
    }

    // Limit batch size
    if (resumeIds.length > 50) {
      return NextResponse.json(
        { error: 'Maximum 50 resumes allowed per batch' },
        { status: 400 }
      );
    }

    // Fetch resumes from database
    const { data: resumes, error: fetchError } = await supabaseAdmin
      .from('resumes')
      .select('*')
      .in('id', resumeIds)
      .eq('user_id', userId);

    if (fetchError || !resumes) {
      return NextResponse.json(
        { error: 'Failed to fetch resumes' },
        { status: 500 }
      );
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

    // Get or create job description
    let savedJobId = jobId;
    if (userId && !jobId) {
      const { data: jobData } = await supabaseAdmin
        .from('job_descriptions')
        .insert({
          title: 'Batch Scoring Job',
          description: jobDescription,
          user_id: userId
        })
        .select()
        .single();

      if (jobData) {
        savedJobId = jobData.id;
      }
    }

    // Score each resume
    const results = await Promise.all(
      resumes.map(async (resume) => {
        try {
          const parsedData = resume.parsed_data;
          const scoreResult = await scorer.scoreResume(parsedData, jobDescription);

          // Save score to database
          if (savedJobId) {
            await supabaseAdmin
              .from('scores')
              .upsert({
                resume_id: resume.id,
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
          }

          return {
            resumeId: resume.id,
            fileName: resume.file_name,
            candidateName: parsedData.name || 'Unknown',
            candidateEmail: parsedData.email || '',
            score: scoreResult.overallScore,
            matchPercentage: scoreResult.matchPercentage,
            matchingSkills: scoreResult.skillMatch.matching,
            missingSkills: scoreResult.skillMatch.missing,
            analysis: scoreResult.analysis,
            recommendations: scoreResult.recommendations,
            strengths: scoreResult.strengths,
            weaknesses: scoreResult.weaknesses
          };
        } catch (err) {
          console.error(`Error scoring resume ${resume.id}:`, err);
          return {
            resumeId: resume.id,
            fileName: resume.file_name,
            candidateName: resume.parsed_data?.name || 'Unknown',
            error: 'Failed to score'
          };
        }
      })
    );

    // Sort by match percentage (descending)
    const sortedResults = results
      .filter((r): r is Exclude<typeof r, { error: string }> => !('error' in r))
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    // Track usage
    if (userId) {
      await supabaseAdmin.rpc('increment_usage', {
        p_user_id: userId,
        p_action_type: 'batch',
        p_count: resumeIds.length
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        jobId: savedJobId,
        totalProcessed: results.length,
        successful: sortedResults.length,
        failed: results.length - sortedResults.length,
        results: sortedResults
      }
    });

  } catch (error) {
    console.error('Batch score error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process batch',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET method to retrieve batch results
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
    const jobId = searchParams.get('jobId');

    if (!jobId) {
      return NextResponse.json(
        { error: 'jobId is required' },
        { status: 400 }
      );
    }

    // Get top candidates
    const { data, error } = await supabaseAdmin
      .rpc('get_top_candidates', {
        p_job_id: jobId,
        p_limit: 50
      });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data
    });

  } catch (error) {
    console.error('Get batch results error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve batch results' },
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
