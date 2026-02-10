-- URL Shortener Database Schema
-- Run this in Supabase SQL Editor

-- Links table
CREATE TABLE IF NOT EXISTS links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  short_code VARCHAR(10) UNIQUE NOT NULL,
  original_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  clicks INTEGER DEFAULT 0,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  custom_domain VARCHAR(255),
  title VARCHAR(255),
  description TEXT,
  is_active BOOLEAN DEFAULT true
);

-- Link clicks analytics table
CREATE TABLE IF NOT EXISTS link_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  link_id UUID REFERENCES links(id) ON DELETE CASCADE,
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address VARCHAR(45),
  user_agent TEXT,
  referrer TEXT,
  country VARCHAR(2),
  city VARCHAR(100),
  device_type VARCHAR(20),
  browser VARCHAR(50),
  os VARCHAR(50)
);

-- Rate limiting table
CREATE TABLE IF NOT EXISTS rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ip_address VARCHAR(45),
  action VARCHAR(50) NOT NULL,
  count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, action, window_start),
  UNIQUE(ip_address, action, window_start)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_links_short_code ON links(short_code);
CREATE INDEX IF NOT EXISTS idx_links_user_id ON links(user_id);
CREATE INDEX IF NOT EXISTS idx_links_created_at ON links(created_at);
CREATE INDEX IF NOT EXISTS idx_link_clicks_link_id ON link_clicks(link_id);
CREATE INDEX IF NOT EXISTS idx_link_clicks_clicked_at ON link_clicks(clicked_at);
CREATE INDEX IF NOT EXISTS idx_rate_limits_user_action ON rate_limits(user_id, action, window_start);
CREATE INDEX IF NOT EXISTS idx_rate_limits_ip_action ON rate_limits(ip_address, action, window_start);

-- Enable Row Level Security
ALTER TABLE links ENABLE ROW LEVEL SECURITY;
ALTER TABLE link_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Links RLS policies
CREATE POLICY "Links are viewable by everyone" 
  ON links FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert their own links" 
  ON links FOR INSERT 
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own links" 
  ON links FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own links" 
  ON links FOR DELETE 
  USING (auth.uid() = user_id);

-- Link clicks RLS policies
CREATE POLICY "Link clicks are viewable by link owner" 
  ON link_clicks FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM links 
      WHERE links.id = link_clicks.link_id 
      AND links.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can insert link clicks" 
  ON link_clicks FOR INSERT 
  WITH CHECK (true);

-- Rate limits RLS policies
CREATE POLICY "Users can view their own rate limits" 
  ON rate_limits FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert rate limits" 
  ON rate_limits FOR INSERT 
  WITH CHECK (true);

-- Function to increment click count
CREATE OR REPLACE FUNCTION increment_link_clicks(link_uuid UUID)
RETURNS void AS $$
BEGIN
  UPDATE links 
  SET clicks = clicks + 1 
  WHERE id = link_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clean up old rate limits (run periodically)
CREATE OR REPLACE FUNCTION cleanup_old_rate_limits()
RETURNS void AS $$
BEGIN
  DELETE FROM rate_limits 
  WHERE window_start < NOW() - INTERVAL '1 hour';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment rate limit counter
CREATE OR REPLACE FUNCTION increment_rate_limit(
  p_user_id UUID,
  p_action VARCHAR,
  p_window_start TIMESTAMP WITH TIME ZONE
)
RETURNS void AS $$
BEGIN
  INSERT INTO rate_limits (user_id, action, window_start, count)
  VALUES (p_user_id, p_action, p_window_start, 1)
  ON CONFLICT (user_id, action, window_start)
  DO UPDATE SET count = rate_limits.count + 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
