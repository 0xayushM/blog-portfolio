import { NextRequest, NextResponse } from 'next/server';

// Use Supabase storage when environment variables are present
const useSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';

let storageModule;
if (useSupabase) {
  // Use Supabase if credentials are available (works in both dev and production)
  storageModule = require('@/lib/storage-supabase');
} else if (isProduction) {
  // Fallback to in-memory storage in production without Supabase
  storageModule = require('@/lib/storage-vercel');
} else {
  // Use local file storage in development without Supabase
  storageModule = require('@/lib/storage');
}

const { 
  readProfile, 
  writeProfile, 
  readCustomBlogPosts, 
  readBlogPosts,
  addCustomBlogPost,
  updateCustomBlogPost,
  deleteCustomBlogPost,
  addBlogPost,
  updateBlogPost,
  deleteBlogPost
} = storageModule;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  try {
    switch (type) {
      case 'profile':
        return NextResponse.json(await readProfile());
      case 'customBlog':
        return NextResponse.json(await readCustomBlogPosts());
      case 'blog':
        return NextResponse.json(await readBlogPosts());
      case 'all':
        return NextResponse.json({ 
          profile: await readProfile(), 
          customBlogPosts: await readCustomBlogPosts(), 
          blogPosts: await readBlogPosts() 
        });
      default:
        return NextResponse.json({ 
          profile: await readProfile(), 
          customBlogPosts: await readCustomBlogPosts(), 
          blogPosts: await readBlogPosts() 
        });
    }
  } catch (error) {
    console.error('Error reading data:', error);
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    switch (type) {
      case 'profile':
        const currentProfile = await readProfile();
        const updatedProfile = { ...currentProfile, ...data };
        await writeProfile(updatedProfile);
        return NextResponse.json({ success: true, data: updatedProfile });
      
      case 'customBlog':
        const newCustomPost = await addCustomBlogPost(data);
        return NextResponse.json({ success: true, data: newCustomPost });
      
      case 'blog':
        const newPost = await addBlogPost(data);
        return NextResponse.json({ success: true, data: newPost });
      
      default:
        return NextResponse.json({ success: false, error: 'Invalid type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, id, data } = body;

    switch (type) {
      case 'customBlog':
        const updatedCustomPost = await updateCustomBlogPost(id, data);
        if (updatedCustomPost) {
          return NextResponse.json({ success: true, data: updatedCustomPost });
        }
        return NextResponse.json({ success: false, error: 'Custom blog post not found' }, { status: 404 });
      
      case 'blog':
        const updatedPost = await updateBlogPost(id, data);
        if (updatedPost) {
          return NextResponse.json({ success: true, data: updatedPost });
        }
        return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
      
      default:
        return NextResponse.json({ success: false, error: 'Invalid type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating data:', error);
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
    }

    switch (type) {
      case 'customBlog':
        const customPostDeleted = await deleteCustomBlogPost(id);
        if (customPostDeleted) {
          return NextResponse.json({ success: true });
        }
        return NextResponse.json({ success: false, error: 'Custom blog post not found' }, { status: 404 });
      
      case 'blog':
        const postDeleted = await deleteBlogPost(id);
        if (postDeleted) {
          return NextResponse.json({ success: true });
        }
        return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
      
      default:
        return NextResponse.json({ success: false, error: 'Invalid type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error deleting data:', error);
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
