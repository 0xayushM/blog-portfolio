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
    instagram?: string;
    email?: string;
  };
}

// Default data
export const defaultProfile: ProfileData = {
  name: 'Seekho Sales',
  title: 'Driving Global Growth Through Strategic Sales Leadership',
  heroImage: '/hero_image.jpeg',
  bio: 'With over 15 years of experience in steering multinational corporations toward unprecedented growth, I specialize in building high-performance sales teams and forging lasting C-level relationships.',
  socialLinks: {
    youtube: 'https://www.youtube.com/@seekhosales',
    linkedin: 'https://www.linkedin.com/in/seekhosales',
    facebook: 'https://www.facebook.com/seekhosaleswithabhishek',
    twitter: 'https://x.com/Seekhosales1',
    instagram: 'https://www.instagram.com/seekhosales',
    email: '',
  },
};

export const defaultCustomBlogPosts: CustomBlogPost[] = [];

export const defaultBlogPosts: BlogPost[] = [];
