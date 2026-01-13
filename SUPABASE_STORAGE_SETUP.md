# Supabase Storage Setup Guide

## Step 1: Create Storage Bucket

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click on **Storage** in the left sidebar
4. Click **New bucket**
5. Configure the bucket:
   - **Name**: `uploads`
   - **Public bucket**: ✅ **Enable** (so images are publicly accessible)
   - Click **Create bucket**

## Step 2: Set Bucket Policies (Important!)

After creating the bucket, you need to set up policies to allow uploads:

1. Click on the `uploads` bucket
2. Go to **Policies** tab
3. Click **New Policy**

### Policy 1: Allow Public Read Access

```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'uploads' );
```

Or use the UI:
- **Policy name**: Public Access
- **Allowed operation**: SELECT
- **Target roles**: public
- **USING expression**: `bucket_id = 'uploads'`

### Policy 2: Allow Authenticated Uploads

```sql
CREATE POLICY "Allow uploads"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'uploads' );
```

Or use the UI:
- **Policy name**: Allow uploads
- **Allowed operation**: INSERT
- **Target roles**: authenticated, anon
- **WITH CHECK expression**: `bucket_id = 'uploads'`

### Policy 3: Allow Authenticated Updates

```sql
CREATE POLICY "Allow updates"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'uploads' );
```

### Policy 4: Allow Authenticated Deletes

```sql
CREATE POLICY "Allow deletes"
ON storage.objects FOR DELETE
USING ( bucket_id = 'uploads' );
```

## Step 3: Verify Setup

1. Go back to Storage → uploads bucket
2. Try uploading a test image through the Supabase UI
3. Click on the uploaded file and copy the public URL
4. Open the URL in a new tab - you should see the image

## Step 4: Test in Your App

Once the bucket is set up:

1. Go to http://localhost:3000/admin
2. Try uploading an image in the Profile section
3. The image should upload to Supabase Storage
4. You'll get a public URL like: `https://[project-id].supabase.co/storage/v1/object/public/uploads/[filename]`

## Troubleshooting

### Images not uploading?
- Check that the bucket is **public**
- Verify the policies are set correctly
- Check browser console for errors

### Images not displaying?
- Verify the public URL is accessible
- Check CORS settings in Supabase (usually auto-configured)

### 403 Forbidden errors?
- The bucket might not be public
- Policies might not allow anon access

## Production Deployment

The same bucket works for both development and production. Just make sure your environment variables are set in Vercel/Netlify:

```
NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
```
