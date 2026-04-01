import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.seekhosales.com';
  
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/admin/dashboard`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { data: blogPosts } = await supabase
      .from('blog_posts')
      .select('id, updated_at')
      .eq('published', true);

    const { data: videos } = await supabase
      .from('videos')
      .select('id, updated_at')
      .eq('published', true);

    const blogPages: MetadataRoute.Sitemap = (blogPosts || []).map((post) => ({
      url: `${baseUrl}/blog/${post.id}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    const videoPages: MetadataRoute.Sitemap = (videos || []).map((video) => ({
      url: `${baseUrl}/video/${video.id}`,
      lastModified: new Date(video.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    return [...staticPages, ...blogPages, ...videoPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}
