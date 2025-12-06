'use client';

import { useState, useEffect } from 'react';
import { CustomBlogPost } from '@/lib/data';

export default function CustomBlog() {
  const [posts, setPosts] = useState<CustomBlogPost[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    fetch('/api/content?type=customBlog')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Error loading custom blog posts:', err));
  }, []);

  const categories = ['All', ...Array.from(new Set(posts.map(post => post.category)))];

  const filteredPosts = activeFilter === 'All' 
    ? posts 
    : posts.filter(post => post.category === activeFilter);

  return (
    <section id="custom-blog" className="py-20 bg-[#0d1425]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-4">Blog Articles</h2>
        <p className="text-gray-400 mb-8 text-lg">
          In-depth articles and insights on various topics
        </p>

        {/* Filter Buttons */}
        {categories.length > 1 && (
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
        )}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div key={post.id} className="group cursor-pointer">
              <div className="bg-[#1e293b]/50 rounded-xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="aspect-[16/9] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden">
                  {post.coverImage ? (
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-6xl">📝</span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mb-3 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.author}</span>
                    <button className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-2">
                      Read More →
                    </button>
                  </div>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-xs text-gray-500 bg-[#0a0f1e] px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">No blog posts yet</p>
          </div>
        )}
      </div>
    </section>
  );
}
