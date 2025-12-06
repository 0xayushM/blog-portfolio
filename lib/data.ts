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
  heroImage: '/profile.jpg',
  bio: 'With over 15 years of experience in steering multinational corporations toward unprecedented growth, I specialize in building high-performance sales teams and forging lasting C-level relationships.',
  socialLinks: {
    youtube: 'https://www.youtube.com/@SeekhoSales',
    linkedin: 'https://www.linkedin.com/in/seekhosales',
    facebook: 'https://www.facebook.com/SeekhoSales',
    twitter: '',
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
  },
  {
    id: '2',
    title: 'Best Practices in Team Leadership',
    excerpt: 'Discover effective strategies for leading high-performance teams',
    content: 'Leadership is more than just managing people...',
    coverImage: '/blog2.jpg',
    author: 'John Doe',
    date: new Date().toISOString().split('T')[0],
    category: 'Leadership',
    tags: ['Leadership', 'Management'],
  },
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
  },
  {
    id: '2',
    title: '5 Strategies for Scaling Enterprise Teams',
    category: 'Team Building',
    date: 'Oct 28, 2023',
    thumbnail: '/blog2.jpg',
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Learn how to build high-performing sales teams that drive consistent growth.',
  },
  {
    id: '3',
    title: 'Navigating Cross-Cultural Negotiations',
    category: 'Leadership',
    date: 'Oct 12, 2023',
    thumbnail: '/blog3.jpg',
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Master the art of international business relationships and cultural intelligence.',
  },
  {
    id: '4',
    title: 'Leveraging AI in the Sales Funnel',
    category: 'Technology',
    date: 'Sep 30, 2023',
    thumbnail: '/blog4.jpg',
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Discover how artificial intelligence is transforming the sales process.',
  },
];
