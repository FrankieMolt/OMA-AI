-- Resume Screening API Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Resumes table
CREATE TABLE IF NOT EXISTS resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT,
  file_type VARCHAR(50),
  file_size INTEGER,
  parsed_data JSONB DEFAULT '{}',
  raw_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Job descriptions table
CREATE TABLE IF NOT EXISTS job_descriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  description TEXT NOT NULL,
  requirements JSONB DEFAULT '{}',
  skills_required TEXT[],
  experience_level VARCHAR(50),
  salary_range VARCHAR(100),
  location VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Scores table - stores resume scoring results
CREATE TABLE IF NOT EXISTS scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
  job_id UUID REFERENCES job_descriptions(id) ON DELETE CASCADE,
  score INTEGER CHECK (score >= 0 AND score <= 100),
  match_percentage DECIMAL(5,2),
  analysis JSONB DEFAULT '{}',
  missing_skills TEXT[],
  matching_skills TEXT[],
  experience_match JSONB,
  recommendations TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(resume_id, job_id)
);

-- Usage tracking for subscription management
CREATE TABLE IF NOT EXISTS usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type VARCHAR(50) NOT NULL, -- 'parse', 'score', 'batch'
  resumes_processed INTEGER DEFAULT 1,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, action_type, month, year)
);

-- API keys for enterprise users
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  key_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  permissions JSONB DEFAULT '["read", "write"]',
  last_used_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_resumes_created_at ON resumes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_descriptions_user_id ON job_descriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_scores_resume_id ON scores(resume_id);
CREATE INDEX IF NOT EXISTS idx_scores_job_id ON scores(job_id);
CREATE INDEX IF NOT EXISTS idx_scores_match_percentage ON scores(match_percentage DESC);
CREATE INDEX IF NOT EXISTS idx_usage_tracking_user_month ON usage_tracking(user_id, month, year);

-- Row Level Security policies
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_descriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Resumes: Users can only see their own resumes
CREATE POLICY "Users can view own resumes" ON resumes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own resumes" ON resumes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own resumes" ON resumes
  FOR DELETE USING (auth.uid() = user_id);

-- Job descriptions: Users can only see their own
CREATE POLICY "Users can view own job descriptions" ON job_descriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own job descriptions" ON job_descriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own job descriptions" ON job_descriptions
  FOR DELETE USING (auth.uid() = user_id);

-- Scores: Users can only see scores for their resumes/jobs
CREATE POLICY "Users can view own scores" ON scores
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM resumes r 
      WHERE r.id = scores.resume_id AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own scores" ON scores
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM resumes r 
      WHERE r.id = scores.resume_id AND r.user_id = auth.uid()
    )
  );

-- Usage tracking
CREATE POLICY "Users can view own usage" ON usage_tracking
  FOR SELECT USING (auth.uid() = user_id);

-- API keys
CREATE POLICY "Users can view own api keys" ON api_keys
  FOR SELECT USING (auth.uid() = user_id);

-- Functions

-- Function to get user's monthly usage
CREATE OR REPLACE FUNCTION get_monthly_usage(p_user_id UUID, p_month INTEGER, p_year INTEGER)
RETURNS INTEGER AS $$
DECLARE
  total_usage INTEGER;
BEGIN
  SELECT COALESCE(SUM(resumes_processed), 0)
  INTO total_usage
  FROM usage_tracking
  WHERE user_id = p_user_id
    AND month = p_month
    AND year = p_year;
  
  RETURN total_usage;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment usage
CREATE OR REPLACE FUNCTION increment_usage(
  p_user_id UUID,
  p_action_type VARCHAR,
  p_count INTEGER DEFAULT 1
)
RETURNS VOID AS $$
DECLARE
  current_month INTEGER := EXTRACT(MONTH FROM NOW());
  current_year INTEGER := EXTRACT(YEAR FROM NOW());
BEGIN
  INSERT INTO usage_tracking (user_id, action_type, resumes_processed, month, year)
  VALUES (p_user_id, p_action_type, p_count, current_month, current_year)
  ON CONFLICT (user_id, action_type, month, year)
  DO UPDATE SET 
    resumes_processed = usage_tracking.resumes_processed + p_count,
    created_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get top candidates for a job
CREATE OR REPLACE FUNCTION get_top_candidates(p_job_id UUID, p_limit INTEGER DEFAULT 10)
RETURNS TABLE (
  score_id UUID,
  resume_id UUID,
  candidate_name VARCHAR,
  candidate_email VARCHAR,
  match_percentage DECIMAL,
  score INTEGER,
  matching_skills TEXT[],
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id as score_id,
    s.resume_id,
    r.parsed_data->>'name' as candidate_name,
    r.parsed_data->>'email' as candidate_email,
    s.match_percentage,
    s.score,
    s.matching_skills,
    s.created_at
  FROM scores s
  JOIN resumes r ON r.id = s.resume_id
  WHERE s.job_id = p_job_id
  ORDER BY s.match_percentage DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
