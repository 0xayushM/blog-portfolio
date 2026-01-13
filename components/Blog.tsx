'use client';

import { useState, useEffect } from 'react';
import { BlogPost } from '@/lib/data';

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch('/api/content?type=blog')
      .then(res => res.json())
      .then(data => setBlogPosts(data))
      .catch(err => console.error('Error loading blog posts:', err));
  }, []);

  const categories = ['All', 'Sales Strategy', 'Team Building', 'Leadership', 'Technology'];

  const filteredPosts = activeFilter === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeFilter);

  return (
    <section id="blog" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-4">Insights & Strategies</h2>
        <p className="text-gray-400 mb-8 text-lg">
          A collection of articles and videos on leadership, sales, and market trends
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeFilter === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-[#1e293b]/50 text-gray-300 hover:bg-[#1e293b] border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <a 
              key={post.id} 
              href={`/video/${post.id}`}
              className="group cursor-pointer block"
            >
              <div className="bg-[#1e293b]/50 rounded-xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-300">
                <div className="relative aspect-video bg-gradient-to-br from-teal-600 to-blue-600">
                  {post.thumbnail ? (
                    <img 
                      src={post.thumbnail} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src={`https://img.youtube.com/vi/${post.youtubeId}/maxresdefault.jpg`}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://img.youtube.com/vi/${post.youtubeId}/hqdefault.jpg`;
                      }}
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{post.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <span className="text-blue-400 group-hover:text-blue-300 font-semibold">
                      Watch Now →
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
