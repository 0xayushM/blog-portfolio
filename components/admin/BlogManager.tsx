'use client';

import { useState, useEffect } from 'react';
import { BlogPost } from '@/lib/data';
import HybridImageInput from './HybridImageInput';

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
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Blog Videos Management</h2>
          <p className="text-sm sm:text-base text-gray-400">Add, edit, or remove YouTube video content</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base whitespace-nowrap w-full sm:w-auto"
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
        <div className="mb-6 sm:mb-8 bg-[#1e293b] rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/10">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            {editingPost ? 'Edit Video' : 'Add New Video'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
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

            <HybridImageInput
              label="Custom Thumbnail (Optional)"
              currentImage={formData.thumbnail}
              onImageChange={(url) => setFormData({ ...formData, thumbnail: url })}
              placeholder="Leave empty to use YouTube's default thumbnail"
            />

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

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition-colors w-full sm:w-auto"
              >
                {editingPost ? 'Update Video' : 'Add Video'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="border border-white/10 hover:border-white/20 px-6 py-3 rounded-lg font-semibold transition-colors w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-[#1e293b] rounded-lg sm:rounded-xl overflow-hidden border border-white/10">
            <div className="aspect-video bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center overflow-hidden">
              {post.thumbnail ? (
                <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${post.youtubeId}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500">{post.date}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
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
