import fs from 'fs';
import path from 'path';
import { ProfileData, CustomBlogPost, BlogPost, defaultProfile, defaultCustomBlogPosts, defaultBlogPosts } from './data';

const DATA_DIR = path.join(process.cwd(), 'data');
const PROFILE_FILE = path.join(DATA_DIR, 'profile.json');
const CUSTOM_BLOG_FILE = path.join(DATA_DIR, 'custom-blog.json');
const BLOG_FILE = path.join(DATA_DIR, 'blog.json');

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Initialize files with default data if they don't exist
function initializeFiles() {
  ensureDataDir();

  if (!fs.existsSync(PROFILE_FILE)) {
    fs.writeFileSync(PROFILE_FILE, JSON.stringify(defaultProfile, null, 2));
  }

  if (!fs.existsSync(CUSTOM_BLOG_FILE)) {
    fs.writeFileSync(CUSTOM_BLOG_FILE, JSON.stringify(defaultCustomBlogPosts, null, 2));
  }

  if (!fs.existsSync(BLOG_FILE)) {
    fs.writeFileSync(BLOG_FILE, JSON.stringify(defaultBlogPosts, null, 2));
  }
}

// Read profile data
export function readProfile(): ProfileData {
  initializeFiles();
  const data = fs.readFileSync(PROFILE_FILE, 'utf-8');
  return JSON.parse(data);
}

// Write profile data
export function writeProfile(profile: ProfileData): void {
  ensureDataDir();
  fs.writeFileSync(PROFILE_FILE, JSON.stringify(profile, null, 2));
}

// Read custom blog posts data
export function readCustomBlogPosts(): CustomBlogPost[] {
  initializeFiles();
  const data = fs.readFileSync(CUSTOM_BLOG_FILE, 'utf-8');
  return JSON.parse(data);
}

// Write custom blog posts data
export function writeCustomBlogPosts(posts: CustomBlogPost[]): void {
  ensureDataDir();
  fs.writeFileSync(CUSTOM_BLOG_FILE, JSON.stringify(posts, null, 2));
}

// Read blog posts data
export function readBlogPosts(): BlogPost[] {
  initializeFiles();
  const data = fs.readFileSync(BLOG_FILE, 'utf-8');
  return JSON.parse(data);
}

// Write blog posts data
export function writeBlogPosts(posts: BlogPost[]): void {
  ensureDataDir();
  fs.writeFileSync(BLOG_FILE, JSON.stringify(posts, null, 2));
}

// Add a new custom blog post
export function addCustomBlogPost(post: Omit<CustomBlogPost, 'id'>): CustomBlogPost {
  const posts = readCustomBlogPosts();
  const newPost: CustomBlogPost = {
    id: Date.now().toString(),
    ...post,
  };
  posts.push(newPost);
  writeCustomBlogPosts(posts);
  return newPost;
}

// Update a custom blog post
export function updateCustomBlogPost(id: string, data: Partial<CustomBlogPost>): CustomBlogPost | null {
  const posts = readCustomBlogPosts();
  const index = posts.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  posts[index] = { ...posts[index], ...data };
  writeCustomBlogPosts(posts);
  return posts[index];
}

// Delete a custom blog post
export function deleteCustomBlogPost(id: string): boolean {
  const posts = readCustomBlogPosts();
  const filteredPosts = posts.filter(p => p.id !== id);
  
  if (filteredPosts.length === posts.length) return false;
  
  writeCustomBlogPosts(filteredPosts);
  return true;
}

// Add a new blog post
export function addBlogPost(post: Omit<BlogPost, 'id' | 'date'>): BlogPost {
  const posts = readBlogPosts();
  const newPost: BlogPost = {
    id: Date.now().toString(),
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }),
    ...post,
  };
  posts.push(newPost);
  writeBlogPosts(posts);
  return newPost;
}

// Update a blog post
export function updateBlogPost(id: string, data: Partial<BlogPost>): BlogPost | null {
  const posts = readBlogPosts();
  const index = posts.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  posts[index] = { ...posts[index], ...data };
  writeBlogPosts(posts);
  return posts[index];
}

// Delete a blog post
export function deleteBlogPost(id: string): boolean {
  const posts = readBlogPosts();
  const filteredPosts = posts.filter(p => p.id !== id);
  
  if (filteredPosts.length === posts.length) return false;
  
  writeBlogPosts(filteredPosts);
  return true;
}
