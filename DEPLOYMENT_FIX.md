# Production Admin Panel Fix Guide

## Problem
The admin panel at seekhosales.com/admin is not working because:
1. Data is stored in-memory (resets on every deployment)
2. Supabase environment variables are not configured in production
3. CRUD operations (add/edit/delete) are not persisting

## Solution: Configure Supabase in Production

### Step 1: Set Environment Variables in Production

You need to add these environment variables to your deployment platform (Vercel/Netlify):

```
NEXT_PUBLIC_SUPABASE_URL=https://dtmczqxnjfkzkioaocwb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_qYp0UM_23dn71NP9YYR9EA_5Ozz32Qg
```

#### For Vercel:
1. Go to https://vercel.com/dashboard
2. Select your project (seekhosales)
3. Go to Settings > Environment Variables
4. Add both variables above
5. Redeploy your application

#### For Netlify:
1. Go to https://app.netlify.com
2. Select your site
3. Go to Site settings > Environment variables
4. Add both variables above
5. Trigger a new deploy

### Step 2: Create Supabase Tables

You need to create 3 tables in your Supabase database:

#### 1. Profile Table
```sql
CREATE TABLE profile (
  name TEXT PRIMARY KEY,
  title TEXT,
  hero_image TEXT,
  bio TEXT,
  social_links JSONB
);
```

#### 2. Custom Blog Posts Table
```sql
CREATE TABLE custom_blog_posts (
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
```

#### 3. Blog Posts (Videos) Table
```sql
CREATE TABLE blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  youtube_id TEXT NOT NULL,
  category TEXT,
  date TEXT,
  thumbnail TEXT
);
```

### Step 3: Enable Row Level Security (RLS)

For each table, run these commands in Supabase SQL Editor:

```sql
-- Enable RLS
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON profile FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON custom_blog_posts FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON blog_posts FOR SELECT USING (true);

-- Allow all operations (for admin panel)
-- Note: In production, you should add proper authentication
CREATE POLICY "Allow all operations" ON profile FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON custom_blog_posts FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON blog_posts FOR ALL USING (true);
```

### Step 4: Verify Setup

After completing the above steps:

1. Go to https://seekhosales.com
2. Check if the site loads correctly
3. Go to https://seekhosales.com/admin
4. Login with password: `admin123`
5. Try adding/editing/deleting content
6. Refresh the page to verify data persists

## How It Works

The app automatically detects the environment:
- **Development** (localhost): Uses local JSON files in `/data` folder
- **Production with Supabase**: Uses Supabase database (persistent)
- **Production without Supabase**: Uses in-memory storage (NOT PERSISTENT - this is your current issue)

Once you add the environment variables, the app will use Supabase and all data will persist correctly.

## Troubleshooting

### Issue: Still seeing old data after deployment
**Solution**: Clear your Supabase tables and let the app reinitialize with default data:
```sql
DELETE FROM profile;
DELETE FROM custom_blog_posts;
DELETE FROM blog_posts;
```

### Issue: Getting Supabase errors
**Solution**: Check that:
1. Tables are created with correct column names (use snake_case: `hero_image`, `social_links`, etc.)
2. RLS policies are set up correctly
3. Environment variables are exactly as shown (no extra spaces)

### Issue: Admin panel login not working
**Solution**: The password is hardcoded as `admin123`. Check browser console for errors.

## Security Note

⚠️ **Important**: The current setup allows anyone to modify data. For production, you should:
1. Add proper authentication to the admin panel
2. Update RLS policies to check for authenticated users
3. Use Supabase Auth or another authentication system

## Next Steps

After fixing the deployment:
1. Test all CRUD operations in production
2. Add your actual content through the admin panel
3. Consider implementing proper authentication
4. Set up automated backups of your Supabase database
