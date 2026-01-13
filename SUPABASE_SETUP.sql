-- Supabase Database Setup for Seekho Sales Website
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- ============================================
-- STEP 1: Create Tables
-- ============================================

-- 1. Profile Table
CREATE TABLE IF NOT EXISTS profile (
  name TEXT PRIMARY KEY,
  title TEXT,
  hero_image TEXT,
  bio TEXT,
  social_links JSONB DEFAULT '{}'::jsonb
);

-- 2. Custom Blog Posts Table (Articles)
CREATE TABLE IF NOT EXISTS custom_blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  author TEXT,
  date TEXT,
  cover_image TEXT,
  tags TEXT[]
);

-- 3. Blog Posts Table (YouTube Videos)
CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  youtube_id TEXT NOT NULL,
  category TEXT,
  date TEXT,
  thumbnail TEXT
);

-- ============================================
-- STEP 2: Enable Row Level Security (RLS)
-- ============================================

ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 3: Create RLS Policies
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access on profile" ON profile;
DROP POLICY IF EXISTS "Allow all operations on profile" ON profile;
DROP POLICY IF EXISTS "Allow public read access on custom_blog_posts" ON custom_blog_posts;
DROP POLICY IF EXISTS "Allow all operations on custom_blog_posts" ON custom_blog_posts;
DROP POLICY IF EXISTS "Allow public read access on blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow all operations on blog_posts" ON blog_posts;

-- Profile Policies
CREATE POLICY "Allow public read access on profile"
  ON profile FOR SELECT
  USING (true);

CREATE POLICY "Allow all operations on profile"
  ON profile FOR ALL
  USING (true);

-- Custom Blog Posts Policies
CREATE POLICY "Allow public read access on custom_blog_posts"
  ON custom_blog_posts FOR SELECT
  USING (true);

CREATE POLICY "Allow all operations on custom_blog_posts"
  ON custom_blog_posts FOR ALL
  USING (true);

-- Blog Posts Policies
CREATE POLICY "Allow public read access on blog_posts"
  ON blog_posts FOR SELECT
  USING (true);

CREATE POLICY "Allow all operations on blog_posts"
  ON blog_posts FOR ALL
  USING (true);

-- ============================================
-- STEP 4: Insert Default Data (Optional)
-- ============================================

-- Insert default profile if not exists
INSERT INTO profile (name, title, hero_image, bio, social_links)
VALUES (
  'Abhishek Upadhyay',
  'Seekho Sales – India''s First Free Sales Training Platform',
  '',
  'Real Sales | Real Experience | Real Growth
15+ years of field experience – now FREE for everyone.',
  '{
    "youtube": "https://www.youtube.com/@seekhosales",
    "linkedin": "https://www.linkedin.com/in/seekhosales",
    "facebook": "https://www.facebook.com/seekhosaleswithabhishek",
    "twitter": "https://x.com/Seekhosales1",
    "instagram": "https://www.instagram.com/seekhosales",
    "email": ""
  }'::jsonb
)
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check if tables were created successfully
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('profile', 'custom_blog_posts', 'blog_posts');

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('profile', 'custom_blog_posts', 'blog_posts');

-- Check policies
SELECT tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';

-- View profile data
SELECT * FROM profile;

-- Count blog posts
SELECT 
  (SELECT COUNT(*) FROM custom_blog_posts) as custom_blog_count,
  (SELECT COUNT(*) FROM blog_posts) as blog_count;
