'use client';

import { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';

export default function ProfileEditor() {
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    heroImage: '',
    bio: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/content?type=profile');
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'profile', data: profile }),
      });

      if (response.ok) {
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Profile & Images</h2>
        <p className="text-gray-400">Update your profile information and images</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#1e293b] rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2 bg-[#0a0f1e] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Title/Headline</label>
              <input
                type="text"
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="w-full px-4 py-2 bg-[#0a0f1e] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Driving Global Growth Through Strategic Sales Leadership"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 bg-[#0a0f1e] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Your professional bio..."
              />
            </div>
          </div>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold mb-4">Profile Image</h3>
          
          <ImageUpload
            label="Upload Profile Image"
            currentImage={profile.heroImage}
            onUploadComplete={(url) => setProfile({ ...profile, heroImage: url })}
          />

          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Or paste image URL</label>
            <input
              type="url"
              value={profile.heroImage}
              onChange={(e) => setProfile({ ...profile, heroImage: e.target.value })}
              className="w-full px-4 py-2 bg-[#0a0f1e] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        {message && (
          <div className={`p-4 rounded-lg ${
            message.includes('Error') 
              ? 'bg-red-500/10 border border-red-500/50 text-red-400'
              : 'bg-green-500/10 border border-green-500/50 text-green-400'
          }`}>
            {message}
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={fetchProfile}
            className="border border-white/10 hover:border-white/20 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
