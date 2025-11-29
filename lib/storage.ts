import fs from 'fs';
import path from 'path';
import { ProfileData, Book, BlogPost, defaultProfile, defaultBooks, defaultBlogPosts } from './data';

const DATA_DIR = path.join(process.cwd(), 'data');
const PROFILE_FILE = path.join(DATA_DIR, 'profile.json');
const BOOKS_FILE = path.join(DATA_DIR, 'books.json');
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

  if (!fs.existsSync(BOOKS_FILE)) {
    fs.writeFileSync(BOOKS_FILE, JSON.stringify(defaultBooks, null, 2));
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

// Read books data
export function readBooks(): Book[] {
  initializeFiles();
  const data = fs.readFileSync(BOOKS_FILE, 'utf-8');
  return JSON.parse(data);
}

// Write books data
export function writeBooks(books: Book[]): void {
  ensureDataDir();
  fs.writeFileSync(BOOKS_FILE, JSON.stringify(books, null, 2));
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

// Add a new book
export function addBook(book: Omit<Book, 'id'>): Book {
  const books = readBooks();
  const newBook: Book = {
    id: Date.now().toString(),
    ...book,
  };
  books.push(newBook);
  writeBooks(books);
  return newBook;
}

// Update a book
export function updateBook(id: string, data: Partial<Book>): Book | null {
  const books = readBooks();
  const index = books.findIndex(b => b.id === id);
  
  if (index === -1) return null;
  
  books[index] = { ...books[index], ...data };
  writeBooks(books);
  return books[index];
}

// Delete a book
export function deleteBook(id: string): boolean {
  const books = readBooks();
  const filteredBooks = books.filter(b => b.id !== id);
  
  if (filteredBooks.length === books.length) return false;
  
  writeBooks(filteredBooks);
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
