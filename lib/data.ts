// This file stores the portfolio data
// In production, this would be replaced with a database

export interface CustomBlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  thumbnail: string;
  youtubeId: string;
  description: string;
}

export interface ProfileData {
  name: string;
  title: string;
  heroImage: string;
  bio: string;
  socialLinks?: {
    youtube?: string;
    linkedin?: string;
    facebook?: string;
    twitter?: string;
    email?: string;
  };
}

// Default data
export const defaultProfile: ProfileData = {
  name: 'John Doe',
  title: 'Driving Global Growth Through Strategic Sales Leadership',
  heroImage: '/hero_image.jpeg',
  bio: 'With over 15 years of experience in steering multinational corporations toward unprecedented growth, I specialize in building high-performance sales teams and forging lasting C-level relationships.',
  socialLinks: {
    youtube: 'https://www.youtube.com/@seekhosales',
    linkedin: 'https://www.linkedin.com/in/seekhosales',
    facebook: 'https://www.facebook.com/SeekhoSales',
    twitter: 'https://x.com/Seekhosales1',
    email: '',
  },
};

export const defaultCustomBlogPosts: CustomBlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Modern Web Development',
    excerpt: 'Learn the fundamentals of building modern web applications',
    content: 'This is a comprehensive guide to modern web development...',
    coverImage: '/blog1.jpg',
    author: 'John Doe',
    date: new Date().toISOString().split('T')[0],
    category: 'Technology',
    tags: ['Web Development', 'Tutorial'],
  }
];

export const defaultBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Global Sales: A 2024 Outlook',
    category: 'Sales Strategy',
    date: 'Nov 15, 2023',
    thumbnail: '/blog1.jpg',
    youtubeId: 'dQw4w9WgXcQ',
    description: 'An in-depth analysis of emerging market trends and the role of AI in sales automation.',
  }
];
