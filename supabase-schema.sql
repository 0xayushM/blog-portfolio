-- Create profile table
CREATE TABLE IF NOT EXISTS profile (
  name TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  "heroImage" TEXT NOT NULL,
  bio TEXT NOT NULL,
  "socialLinks" JSONB
);

-- Create custom_blog_posts table
CREATE TABLE IF NOT EXISTS custom_blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  "coverImage" TEXT NOT NULL,
  author TEXT NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] NOT NULL
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  "youtubeId" TEXT NOT NULL,
  description TEXT NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_custom_blog_posts_date ON custom_blog_posts(date DESC);
CREATE INDEX IF NOT EXISTS idx_custom_blog_posts_category ON custom_blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts(date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);

-- Enable Row Level Security (RLS)
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON profile
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON custom_blog_posts
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON blog_posts
  FOR SELECT USING (true);

-- Create policies for authenticated write access (you can modify these based on your auth setup)
-- For now, allowing all operations for development. You should restrict these in production.
CREATE POLICY "Enable insert for all users" ON profile
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON profile
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON profile
  FOR DELETE USING (true);

CREATE POLICY "Enable insert for all users" ON custom_blog_posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON custom_blog_posts
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON custom_blog_posts
  FOR DELETE USING (true);

CREATE POLICY "Enable insert for all users" ON blog_posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON blog_posts
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON blog_posts
  FOR DELETE USING (true);
