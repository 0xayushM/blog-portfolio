// This file stores the portfolio data
// In production, this would be replaced with a database

export interface Book {
  id: string;
  title: string;
  description: string;
  cover: string;
  link: string;
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
}

// Default data
export const defaultProfile: ProfileData = {
  name: 'John Doe',
  title: 'Driving Global Growth Through Strategic Sales Leadership',
  heroImage: '/profile.jpg',
  bio: 'With over 15 years of experience in steering multinational corporations toward unprecedented growth, I specialize in building high-performance sales teams and forging lasting C-level relationships.',
};

export const defaultBooks: Book[] = [
  {
    id: '1',
    title: 'The Future of Sales Leadership',
    description: 'A comprehensive guide to modern sales strategies and team building',
    cover: '/book1.jpg',
    link: '#',
  },
  {
    id: '2',
    title: 'Strategic Growth Playbook',
    description: 'Proven frameworks for scaling enterprise sales teams',
    cover: '/book2.jpg',
    link: '#',
  },
  {
    id: '3',
    title: 'Global Market Expansion',
    description: 'Navigate international markets with confidence',
    cover: '/book3.jpg',
    link: '#',
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
