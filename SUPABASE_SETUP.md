# Supabase Setup Guide

This guide will help you set up Supabase for your blog-portfolio application.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in the project details:
   - **Name**: Choose a name for your project (e.g., "blog-portfolio")
   - **Database Password**: Create a strong password (save this securely)
   - **Region**: Choose the region closest to your users
4. Click "Create new project"
5. Wait for the project to be provisioned (this may take a few minutes)

## Step 2: Set Up Database Tables

1. In your Supabase project dashboard, click on the **SQL Editor** in the left sidebar
2. Click "New Query"
3. Copy the contents of the `supabase-schema.sql` file from your project root
4. Paste it into the SQL editor
5. Click "Run" to execute the SQL and create the tables

Alternatively, you can run the SQL commands directly:

```sql
-- The schema creates three tables:
-- 1. profile: Stores user profile information
-- 2. custom_blog_posts: Stores custom blog posts
-- 3. blog_posts: Stores video blog posts

-- All tables have Row Level Security (RLS) enabled with policies for public read access
```

## Step 3: Set Up Storage Bucket for Images

1. In your Supabase project dashboard, click on **Storage** in the left sidebar
2. Click "Create a new bucket"
3. Fill in the bucket details:
   - **Name**: `uploads`
   - **Public bucket**: Toggle this ON (images need to be publicly accessible)
4. Click "Create bucket"

### Configure Storage Policies (IMPORTANT!)

Since you made the bucket public, you need to add an INSERT policy. Here's the simplest way:

**Step-by-step:**

1. Go to **SQL Editor** in the left sidebar of Supabase dashboard
2. Click "New Query"
3. Copy and paste this EXACT SQL:

```sql
-- Allow anyone to upload files to the uploads bucket
INSERT INTO storage.policies (name, bucket_id, definition, check_expression)
VALUES (
  'Allow public uploads',
  'uploads',
  'bucket_id = ''uploads''',
  'bucket_id = ''uploads'''
);
```

4. Click "Run" (or press Cmd/Ctrl + Enter)

**Verify it worked:**
- Go to **Storage** → Click on `uploads` bucket → **Policies** tab
- You should see a policy named "Allow public uploads"

**Alternative Method (if above doesn't work):**

1. In Supabase dashboard, go to **Storage**
2. Click on the `uploads` bucket
3. Click **Policies** tab
4. Click "New Policy"
5. Select "Give users access to a folder" or "Custom policy"
6. For INSERT operations, use this expression:
   - Policy name: `Allow public uploads`
   - Target roles: `public`
   - Policy definition: `true` (allows all)
   - Click "Review" then "Save policy"

**Note**: For production, you should restrict upload access to authenticated users only. The current setup allows anyone to upload for simplicity.

## Step 4: Get Your Supabase Credentials

1. In your Supabase project dashboard, click on the **Settings** icon (gear icon) in the left sidebar
2. Click on **API** under Project Settings
3. You'll see two important values:
   - **Project URL**: This is your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key**: This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 5: Configure Environment Variables

### For Local Development

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add the following environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace `your_supabase_project_url` and `your_supabase_anon_key` with the values from Step 3.

### For Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following environment variables:
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
     - **Value**: Your Supabase project URL
   - **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - **Value**: Your Supabase anon key
4. Click "Save"
5. Redeploy your application for the changes to take effect

## Step 6: Verify the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`

3. The application should now be using Supabase for data storage

4. You can verify this by:
   - Checking the Supabase dashboard → Table Editor to see if data is being stored
   - Looking at the browser console for any Supabase-related errors

## Storage Behavior

The application uses different storage backends based on the environment:

### Database Storage
- **Production with Supabase env vars**: Uses Supabase database (persistent storage)
- **Production without Supabase env vars**: Uses in-memory storage (data resets on deployment)
- **Development**: Uses local file-based storage (JSON files)

### Image Storage
- **Production with Supabase env vars**: Uses Supabase Storage (persistent, CDN-backed)
- **Production without Supabase env vars**: File uploads will fail (read-only file system)
- **Development**: Uses local file system (`/public/uploads/`)

## Security Considerations

### Row Level Security (RLS)

The current setup has RLS enabled with permissive policies that allow all operations. For production, you should:

1. Set up Supabase Authentication
2. Update the RLS policies to restrict write operations to authenticated users only
3. Consider adding user-specific policies if you have multiple users

Example of a more restrictive policy:

```sql
-- Allow only authenticated users to insert
CREATE POLICY "Enable insert for authenticated users only" ON custom_blog_posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

### API Keys

- The `NEXT_PUBLIC_SUPABASE_ANON_KEY` is safe to expose in the browser
- Never commit your `.env.local` file to version control
- The `.env.local` file is already in `.gitignore`

## Troubleshooting

### Error: "Missing Supabase environment variables"

- Make sure you've added both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to your environment variables
- Restart your development server after adding environment variables

### Error: "relation does not exist"

- Make sure you've run the SQL schema from `supabase-schema.sql` in your Supabase SQL Editor
- Check that the tables were created successfully in the Table Editor

### Data not persisting

- Verify that your environment variables are correctly set
- Check the browser console and server logs for any errors
- Verify that the tables exist in your Supabase dashboard

### RLS Policy Errors

- If you see "row-level security policy" errors, check that the policies in `supabase-schema.sql` were created successfully
- You can temporarily disable RLS for testing (not recommended for production):
  ```sql
  ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;
  ```

## Next Steps

1. **Set up Authentication** (optional): Add Supabase Auth to restrict write operations
2. **Add Storage**: Use Supabase Storage for image uploads
3. **Set up Realtime** (optional): Enable real-time subscriptions for live updates
4. **Optimize Queries**: Add indexes for better performance as your data grows

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
