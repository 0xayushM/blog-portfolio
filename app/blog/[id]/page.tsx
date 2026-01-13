'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { CustomBlogPost } from '@/lib/data';
import Link from 'next/link';

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [post, setPost] = useState<CustomBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch('/api/content?type=customBlog');
        const posts: CustomBlogPost[] = await response.json();
        const foundPost = posts.find(p => p.id === resolvedParams.id);
        
        if (foundPost) {
          setPost(foundPost);
          document.title = `${foundPost.title} | Blog`;
          
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content', foundPost.excerpt);
          } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = foundPost.excerpt;
            document.head.appendChild(meta);
          }
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Error loading blog post:', error);
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
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link 
            href="/"
            className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </nav>

      {/* Blog Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
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
          
          <div className="flex items-center gap-4 text-gray-400">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              {post.author}
            </span>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Excerpt */}
        <div className="mb-8 p-6 bg-blue-500/10 border-l-4 border-blue-500 rounded-r-lg">
          <p className="text-lg text-gray-300 italic">
            {post.excerpt}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
            {post.content}
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="bg-[#1e293b] text-gray-300 px-4 py-2 rounded-full text-sm border border-white/10"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back to Blog Link */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <Link 
            href="/"
            className="inline-block bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg transition-colors font-semibold"
          >
            ← Back to All Articles
          </Link>
        </div>
      </article>
    </div>
  );
}
