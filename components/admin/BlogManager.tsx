'use client';

import { useState, useEffect } from 'react';
import { BlogPost } from '@/lib/data';

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Sales Strategy',
    youtubeId: '',
    description: '',
    thumbnail: '',
  });
  const [message, setMessage] = useState('');

  const categories = ['Sales Strategy', 'Team Building', 'Leadership', 'Technology'];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/content?type=blog');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingPost) {
        const response = await fetch('/api/content', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'blog', id: editingPost.id, data: formData }),
        });
        if (response.ok) {
          setMessage('Video updated successfully!');
        }
      } else {
        const response = await fetch('/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'blog', data: formData }),
        });
        if (response.ok) {
          setMessage('Video added successfully!');
        }
      }

      fetchPosts();
      resetForm();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving video');
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      category: post.category,
      youtubeId: post.youtubeId,
      description: post.description,
      thumbnail: post.thumbnail,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    try {
      const response = await fetch(`/api/content?type=blog&id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage('Video deleted successfully!');
        fetchPosts();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error deleting video');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'Sales Strategy',
      youtubeId: '',
      description: '',
      thumbnail: '',
    });
    setEditingPost(null);
    setShowForm(false);
  };

  const extractYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : url;
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Blog Videos Management</h2>
          <p className="text-gray-400">Add, edit, or remove YouTube video content</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          {showForm ? 'Cancel' : '+ Add Video'}
        </button>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.includes('Error')
            ? 'bg-red-500/10 border border-red-500/50 text-red-400'
            : 'bg-green-500/10 border border-green-500/50 text-green-400'
        }`}>
          {message}
        </div>
      )}

      {showForm && (
        <div className="mb-8 bg-[#1e293b] rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold mb-4">
            {editingPost ? 'Edit Video' : 'Add New Video'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-[#0a0f1e] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 bg-[#0a0f1e] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">YouTube Video URL or ID</label>
              <input
                type="text"
                value={formData.youtubeId}
                onChange={(e) => {
                  const id = extractYouTubeId(e.target.value);
                  setFormData({ ...formData, youtubeId: id });
                }}
                className="w-full px-4 py-2 bg-[#0a0f1e] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ or dQw4w9WgXcQ"
                required
              />
              <p className="text-sm text-gray-400 mt-2">
                Paste the full YouTube URL or just the video ID
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-[#0a0f1e] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Custom Thumbnail URL (Optional)</label>
              <input
                type="url"
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                className="w-full px-4 py-2 bg-[#0a0f1e] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="https://drive.google.com/... or direct image URL"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to use YouTube's default thumbnail. Or paste a Google Drive link, Imgur link, or direct image URL
              </p>
              {formData.thumbnail && (
                <div className="mt-3 relative w-full h-48 rounded-lg overflow-hidden border border-white/10">
                  <img 
                    src={formData.thumbnail} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23334155" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="14"%3EInvalid URL%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
              )}
            </div>

            {formData.youtubeId && (
              <div>
                <p className="text-sm font-medium mb-2">Preview:</p>
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${formData.youtubeId}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                {editingPost ? 'Update Video' : 'Add Video'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="border border-white/10 hover:border-white/20 px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-[#1e293b] rounded-xl overflow-hidden border border-white/10">
            <div className="relative aspect-video bg-gradient-to-br from-teal-600 to-blue-600">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                </div>
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  {post.category}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-1">{post.title}</h3>
              <p className="text-sm text-gray-400 mb-2 line-clamp-2">{post.description}</p>
              <p className="text-xs text-gray-500 mb-4">{post.date}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && !showForm && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg mb-2">No videos yet</p>
          <p className="text-sm">Click "Add Video" to get started</p>
        </div>
      )}
    </div>
  );
}
