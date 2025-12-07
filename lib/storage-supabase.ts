import { supabase } from './supabase';
import { ProfileData, CustomBlogPost, BlogPost, defaultProfile, defaultCustomBlogPosts, defaultBlogPosts } from './data';

// Initialize default data in Supabase if tables are empty
async function initializeDefaultData() {
  try {
    // Check if profile exists
    const { data: profileData, error: profileError } = await supabase
      .from('profile')
      .select('*')
      .limit(1);

    if (profileError) throw profileError;

    // If no profile exists, insert default
    if (!profileData || profileData.length === 0) {
      await supabase.from('profile').insert([defaultProfile]);
    }

    // Check if custom blog posts exist
    const { data: customBlogData, error: customBlogError } = await supabase
      .from('custom_blog_posts')
      .select('*')
      .limit(1);

    if (customBlogError) throw customBlogError;

    // If no custom blog posts exist, insert defaults
    if (!customBlogData || customBlogData.length === 0) {
      await supabase.from('custom_blog_posts').insert(defaultCustomBlogPosts);
    }

    // Check if blog posts exist
    const { data: blogData, error: blogError } = await supabase
      .from('blog_posts')
      .select('*')
      .limit(1);

    if (blogError) throw blogError;

    // If no blog posts exist, insert defaults
    if (!blogData || blogData.length === 0) {
      await supabase.from('blog_posts').insert(defaultBlogPosts);
    }
  } catch (error) {
    console.error('Error initializing default data:', error);
  }
}

// Read profile data
export async function readProfile(): Promise<ProfileData> {
  try {
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .limit(1)
      .single();

    if (error) {
      console.error('Error reading profile:', error);
      // If no profile exists, initialize and return default
      await initializeDefaultData();
      return defaultProfile;
    }

    return data as ProfileData;
  } catch (error) {
    console.error('Error reading profile:', error);
    return defaultProfile;
  }
}

// Write profile data
export async function writeProfile(profile: ProfileData): Promise<void> {
  try {
    // First, check if a profile exists
    const { data: existingProfile } = await supabase
      .from('profile')
      .select('*')
      .limit(1)
      .single();

    if (existingProfile) {
      // Update existing profile
      const { error } = await supabase
        .from('profile')
        .update(profile)
        .eq('name', existingProfile.name);

      if (error) throw error;
    } else {
      // Insert new profile
      const { error } = await supabase
        .from('profile')
        .insert([profile]);

      if (error) throw error;
    }
  } catch (error) {
    console.error('Error writing profile:', error);
    throw error;
  }
}

// Read custom blog posts data
export async function readCustomBlogPosts(): Promise<CustomBlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('custom_blog_posts')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error reading custom blog posts:', error);
      await initializeDefaultData();
      return defaultCustomBlogPosts;
    }

    return (data || []) as CustomBlogPost[];
  } catch (error) {
    console.error('Error reading custom blog posts:', error);
    return defaultCustomBlogPosts;
  }
}

// Write custom blog posts data
export async function writeCustomBlogPosts(posts: CustomBlogPost[]): Promise<void> {
  try {
    // Delete all existing posts
    await supabase.from('custom_blog_posts').delete().neq('id', '');

    // Insert new posts
    if (posts.length > 0) {
      const { error } = await supabase
        .from('custom_blog_posts')
        .insert(posts);

      if (error) throw error;
    }
  } catch (error) {
    console.error('Error writing custom blog posts:', error);
    throw error;
  }
}

// Read blog posts data
export async function readBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error reading blog posts:', error);
      await initializeDefaultData();
      return defaultBlogPosts;
    }

    return (data || []) as BlogPost[];
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return defaultBlogPosts;
  }
}

// Write blog posts data
export async function writeBlogPosts(posts: BlogPost[]): Promise<void> {
  try {
    // Delete all existing posts
    await supabase.from('blog_posts').delete().neq('id', '');

    // Insert new posts
    if (posts.length > 0) {
      const { error } = await supabase
        .from('blog_posts')
        .insert(posts);

      if (error) throw error;
    }
  } catch (error) {
    console.error('Error writing blog posts:', error);
    throw error;
  }
}

// Add a new custom blog post
export async function addCustomBlogPost(post: Omit<CustomBlogPost, 'id'>): Promise<CustomBlogPost> {
  const newPost: CustomBlogPost = {
    id: Date.now().toString(),
    ...post,
  };

  try {
    const { data, error } = await supabase
      .from('custom_blog_posts')
      .insert([newPost])
      .select()
      .single();

    if (error) throw error;

    return data as CustomBlogPost;
  } catch (error) {
    console.error('Error adding custom blog post:', error);
    throw error;
  }
}

// Update a custom blog post
export async function updateCustomBlogPost(id: string, updateData: Partial<CustomBlogPost>): Promise<CustomBlogPost | null> {
  try {
    const { data, error } = await supabase
      .from('custom_blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return data as CustomBlogPost;
  } catch (error) {
    console.error('Error updating custom blog post:', error);
    return null;
  }
}

// Delete a custom blog post
export async function deleteCustomBlogPost(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('custom_blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('Error deleting custom blog post:', error);
    return false;
  }
}

// Add a new blog post
export async function addBlogPost(post: Omit<BlogPost, 'id' | 'date'>): Promise<BlogPost> {
  const newPost: BlogPost = {
    id: Date.now().toString(),
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }),
    ...post,
  };

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([newPost])
      .select()
      .single();

    if (error) throw error;

    return data as BlogPost;
  } catch (error) {
    console.error('Error adding blog post:', error);
    throw error;
  }
}

// Update a blog post
export async function updateBlogPost(id: string, updateData: Partial<BlogPost>): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return data as BlogPost;
  } catch (error) {
    console.error('Error updating blog post:', error);
    return null;
  }
}

// Delete a blog post
export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
}
