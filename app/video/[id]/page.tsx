'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/lib/data';
import Link from 'next/link';

export default function VideoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch('/api/content?type=blog');
        const posts: BlogPost[] = await response.json();
        const foundPost = posts.find(p => p.id === resolvedParams.id);
        
        if (foundPost) {
          setPost(foundPost);
          document.title = `${foundPost.title} | Video`;
          
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content', foundPost.description);
          } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = foundPost.description;
            document.head.appendChild(meta);
          }
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Error loading video post:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [resolvedParams.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* Navigation */}
      <nav className="bg-[#1e293b] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Link 
            href="/"
            className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors"
          >
            ← Back to Videos
          </Link>
        </div>
      </nav>

      {/* Video Content */}
      <article className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-500/20 text-blue-400 px-4 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
            <span className="text-gray-500 text-sm">{post.date}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {post.title}
          </h1>
        </header>

        {/* YouTube Video */}
        <div className="mb-8">
          <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src={`https://www.youtube.com/embed/${post.youtubeId}`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={post.title}
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">About This Video</h2>
          <div className="p-6 bg-[#1e293b]/50 border border-white/10 rounded-xl">
            <p className="text-gray-300 leading-relaxed text-lg">
              {post.description}
            </p>
          </div>
        </div>

        {/* Watch on YouTube Button */}
        <div className="mb-8 text-center">
          <a
            href={`https://www.youtube.com/watch?v=${post.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg transition-colors font-semibold text-lg"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Watch on YouTube
          </a>
        </div>

        {/* Back to Videos Link */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <Link 
            href="/"
            className="inline-block bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg transition-colors font-semibold"
          >
            ← Back to All Videos
          </Link>
        </div>
      </article>
    </div>
  );
}
