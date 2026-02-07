-- OMA-AI Additional Tables
-- Add missing tables for full functionality
-- Date: 2026-02-07

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  full_name VARCHAR(255),
  username VARCHAR(100) UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false
);

CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_users_username ON users (username);

-- ============================================
-- CATEGORIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(7), -- hex color
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories (slug);

-- ============================================
-- TAGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) UNIQUE NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_tags_slug ON tags (slug);

-- ============================================
-- SERVICE-TAGS JUNCTION TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS service_tags (
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (service_id, tag_id)
);

CREATE INDEX idx_service_tags_service ON service_tags (service_id);
CREATE INDEX idx_service_tags_tag ON service_tags (tag_id);

-- ============================================
-- REVIEWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  title VARCHAR(255),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_verified_purchase BOOLEAN DEFAULT false
);

CREATE INDEX idx_reviews_service ON reviews (service_id);
CREATE INDEX idx_reviews_user ON reviews (user_id);
CREATE INDEX idx_reviews_rating ON reviews (rating);

-- ============================================
-- TASKS/BOUNTIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category_id UUID REFERENCES categories(id),
  budget DECIMAL(10, 6) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USDC',
  status VARCHAR(50) DEFAULT 'open', -- open, in_progress, completed, cancelled
  difficulty VARCHAR(50) DEFAULT 'medium', -- easy, medium, hard, expert
  deadline TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES users(id),
  assigned_to UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  submissions_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0
);

CREATE INDEX idx_tasks_status ON tasks (status);
CREATE INDEX idx_tasks_created_by ON tasks (created_by);
CREATE INDEX idx_tasks_category ON tasks (category_id);

-- ============================================
-- TASK SUBMISSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS task_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  description TEXT,
  work_url TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  review_comment TEXT,
  payment_amount DECIMAL(10, 6)
);

CREATE INDEX idx_task_submissions_task ON task_submissions (task_id);
CREATE INDEX idx_task_submissions_user ON task_submissions (user_id);
CREATE INDEX idx_task_submissions_status ON task_submissions (status);

-- ============================================
-- WALLET ADDRESSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  address VARCHAR(255) UNIQUE NOT NULL,
  network VARCHAR(50) DEFAULT 'base', -- base, ethereum, solana
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  label VARCHAR(100)
);

CREATE INDEX idx_wallets_user ON wallets (user_id);
CREATE INDEX idx_wallets_address ON wallets (address);

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- task_assigned, payment_received, review_received, etc.
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications (user_id);
CREATE INDEX idx_notifications_read ON notifications (is_read);

-- ============================================
-- API KEYS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  key_hash VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  permissions TEXT[] DEFAULT '{}',
  last_used_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_api_keys_user ON api_keys (user_id);

-- ============================================
-- AUDIT LOGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50), -- user, service, task, transaction, etc.
  entity_id UUID,
  old_data JSONB,
  new_data JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user ON audit_logs (user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs (entity_type, entity_id);
CREATE INDEX idx_audit_logs_created ON audit_logs (created_at);

-- ============================================
-- ENABLE RLS ON NEW TABLES
-- ============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES FOR NEW TABLES
-- ============================================

-- Users: Public read, self update
CREATE POLICY "Public read user profiles" ON users
  FOR SELECT USING (true);

CREATE POLICY "User can update own profile" ON users
  FOR UPDATE USING (auth.uid()::text = email)
  WITH CHECK (auth.uid()::text = email);

-- Categories: Public read
CREATE POLICY "Public read categories" ON categories
  FOR SELECT USING (true);

-- Tags: Public read
CREATE POLICY "Public read tags" ON tags
  FOR SELECT USING (true);

-- Service Tags: Public read
CREATE POLICY "Public read service tags" ON service_tags
  FOR SELECT USING (true);

-- Reviews: Public read, owner create/update/delete
CREATE POLICY "Public read reviews" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "User can create review" ON reviews
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "User can update own review" ON reviews
  FOR UPDATE USING (auth.uid()::text = user_id::text)
  WITH CHECK (auth.uid()::text = user_id::text);

-- Tasks: Public read, creator/assignee can update
CREATE POLICY "Public read tasks" ON tasks
  FOR SELECT USING (true);

CREATE POLICY "User can create task" ON tasks
  FOR INSERT WITH CHECK (auth.uid()::text = created_by::text);

CREATE POLICY "User can update own task" ON tasks
  FOR UPDATE USING (auth.uid()::text = created_by::text OR auth.uid()::text = assigned_to::text);

-- Task Submissions: Public read, submitter can create, creator can approve
CREATE POLICY "Public read submissions" ON task_submissions
  FOR SELECT USING (true);

CREATE POLICY "User can create submission" ON task_submissions
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Task creator can review submissions" ON task_submissions
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM tasks
      WHERE tasks.id = task_submissions.task_id
      AND tasks.created_by::text = auth.uid()::text
    )
  );

-- Wallets: Private to owner
CREATE POLICY "User can read own wallets" ON wallets
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "User can create wallet" ON wallets
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "User can update own wallet" ON wallets
  FOR UPDATE USING (auth.uid()::text = user_id::text)
  WITH CHECK (auth.uid()::text = user_id::text);

-- Notifications: Private to owner
CREATE POLICY "User can read own notifications" ON notifications
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "User can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid()::text = user_id::text)
  WITH CHECK (auth.uid()::text = user_id::text);

-- API Keys: Private to owner
CREATE POLICY "User can read own api keys" ON api_keys
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "User can create api key" ON api_keys
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "User can update own api key" ON api_keys
  FOR UPDATE USING (auth.uid()::text = user_id::text)
  WITH CHECK (auth.uid()::text = user_id::text);

-- Audit Logs: Private to system (read by admins only)
CREATE POLICY "System can read audit logs" ON audit_logs
  FOR SELECT USING (false); -- No direct access, use admin API

CREATE POLICY "System can create audit logs" ON audit_logs
  FOR INSERT WITH CHECK (true);

-- ============================================
-- GRANT PERMISSIONS
-- ============================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT SELECT ON categories, tags, service_tags, reviews, tasks, task_submissions TO anon;
GRANT ALL ON users, wallets, notifications, api_keys TO authenticated;
