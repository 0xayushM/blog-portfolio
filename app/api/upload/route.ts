import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Check if we should use Supabase Storage
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
const useSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Ensure upload directory exists (for local development)
async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

// Upload to Supabase Storage
async function uploadToSupabase(file: File) {
  const { createClient } = await import('@supabase/supabase-js');
  
  // Create a Supabase client with anon key for server-side
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  });
  
  // Generate unique filename
  const timestamp = Date.now();
  const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filename = `${timestamp}-${originalName}`;

  // Convert file to buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(filename, buffer, {
      contentType: file.type,
      upsert: false
    });

  if (error) {
    console.error('Supabase upload error:', error);
    throw new Error(`Failed to upload to Supabase Storage: ${error.message}`);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('uploads')
    .getPublicUrl(filename);

  return { url: publicUrl, filename };
}

// Upload to local file system
async function uploadToLocal(file: File) {
  // Generate unique filename
  const timestamp = Date.now();
  const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filename = `${timestamp}-${originalName}`;
  const filepath = path.join(UPLOAD_DIR, filename);

  // Ensure upload directory exists
  await ensureUploadDir();

  // Convert file to buffer and save
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  await writeFile(filepath, buffer);

  return { url: `/uploads/${filename}`, filename };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Upload based on environment
    console.log('Upload environment:', { isProduction, useSupabase });
    let result;
    if (isProduction && useSupabase) {
      console.log('Using Supabase Storage');
      result = await uploadToSupabase(file);
    } else {
      console.log('Using local file system');
      result = await uploadToLocal(file);
    }

    return NextResponse.json({
      success: true,
      url: result.url,
      filename: result.filename,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to upload file';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
