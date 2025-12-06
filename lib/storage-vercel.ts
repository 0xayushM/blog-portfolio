import { ProfileData, CustomBlogPost, BlogPost, defaultProfile, defaultCustomBlogPosts, defaultBlogPosts } from './data';

// In-memory storage for Vercel deployment
// Note: This resets on each deployment. For persistence, use a database like Vercel Postgres or KV
let profileData: ProfileData = { ...defaultProfile };
let customBlogPosts: CustomBlogPost[] = [...defaultCustomBlogPosts];
let blogPosts: BlogPost[] = [...defaultBlogPosts];

// Read profile data
export function readProfile(): ProfileData {
  return profileData;
}

// Write profile data
export function writeProfile(profile: ProfileData): void {
  profileData = { ...profile };
}

// Read custom blog posts data
export function readCustomBlogPosts(): CustomBlogPost[] {
  return customBlogPosts;
}

// Write custom blog posts data
export function writeCustomBlogPosts(posts: CustomBlogPost[]): void {
  customBlogPosts = [...posts];
}

// Read blog posts data
export function readBlogPosts(): BlogPost[] {
  return blogPosts;
}

// Write blog posts data
export function writeBlogPosts(posts: BlogPost[]): void {
  blogPosts = [...posts];
}

// Add a new custom blog post
export function addCustomBlogPost(post: Omit<CustomBlogPost, 'id'>): CustomBlogPost {
  const newPost: CustomBlogPost = {
    id: Date.now().toString(),
    ...post,
  };
  customBlogPosts.push(newPost);
  return newPost;
}

// Update a custom blog post
export function updateCustomBlogPost(id: string, data: Partial<CustomBlogPost>): CustomBlogPost | null {
  const index = customBlogPosts.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  customBlogPosts[index] = { ...customBlogPosts[index], ...data };
  return customBlogPosts[index];
}

// Delete a custom blog post
export function deleteCustomBlogPost(id: string): boolean {
  const initialLength = customBlogPosts.length;
  customBlogPosts = customBlogPosts.filter(p => p.id !== id);
  return customBlogPosts.length < initialLength;
}

// Add a new blog post
export function addBlogPost(post: Omit<BlogPost, 'id' | 'date'>): BlogPost {
  const newPost: BlogPost = {
    id: Date.now().toString(),
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }),
    ...post,
  };
  blogPosts.push(newPost);
  return newPost;
}

// Update a blog post
export function updateBlogPost(id: string, data: Partial<BlogPost>): BlogPost | null {
  const index = blogPosts.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  blogPosts[index] = { ...blogPosts[index], ...data };
  return blogPosts[index];
}

// Delete a blog post
export function deleteBlogPost(id: string): boolean {
  const initialLength = blogPosts.length;
  blogPosts = blogPosts.filter(p => p.id !== id);
  return blogPosts.length < initialLength;
}
