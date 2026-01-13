'use client';

import { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';

export default function ProfileEditor() {
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    heroImage: '',
    bio: '',
    socialLinks: {
      youtube: '',
      linkedin: '',
      facebook: '',
      twitter: '',
      instagram: '',
      email: '',
    },
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
                placeholder="Abhishek Upadhyay"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Main Title (Large Heading)</label>
              <input
                type="text"
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="w-full px-4 py-2 bg-[#0a0f1e] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Seekho Sales – India's First Free Sales Training Platform"
              />
              <p className="text-xs text-gray-500 mt-1">This appears as the main heading in the hero section</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subtitle & Description</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 bg-[#0a0f1e] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Real Sales | Real Experience | Real Growth&#10;15+ years of field experience – now FREE for everyone."
              />
              <p className="text-xs text-gray-500 mt-1">First line appears in blue, second line in gray. Use line breaks to separate.</p>
            </div>
          </div>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold mb-4">Social Links</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">YouTube</label>
              <input
                type="url"
                value={profile.socialLinks?.youtube || ''}
                onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, youtube: e.target.value } })}
                className="w-full px-4 py-2 bg-[#0a0f1e] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="https://www.youtube.com/@YourChannel"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">LinkedIn</label>
              <input
                type="url"
                value={profile.socialLinks?.linkedin || ''}
                onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, linkedin: e.target.value } })}
                className="w-full px-4 py-2 bg-[#0a0f1e] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="https://www.linkedin.com/in/yourprofile"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Facebook</label>
              <input
                type="url"
                value={profile.socialLinks?.facebook || ''}
                onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, facebook: e.target.value } })}
                className="w-full px-4 py-2 bg-[#0a0f1e] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="https://www.facebook.com/YourPage"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Twitter/X</label>
              <input
                type="url"
                value={profile.socialLinks?.twitter || ''}
                onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, twitter: e.target.value } })}
                className="w-full px-4 py-2 bg-[#0a0f1e] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="https://twitter.com/yourhandle"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Instagram</label>
              <input
                type="url"
                value={profile.socialLinks?.instagram || ''}
                onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, instagram: e.target.value } })}
                className="w-full px-4 py-2 bg-[#0a0f1e] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="https://www.instagram.com/yourhandle"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={profile.socialLinks?.email || ''}
                onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, email: e.target.value } })}
                className="w-full px-4 py-2 bg-[#0a0f1e] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="your.email@example.com"
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
