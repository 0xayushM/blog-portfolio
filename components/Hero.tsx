'use client';

import { useState, useEffect } from 'react';
import { ProfileData } from '@/lib/data';

export default function Hero() {
  const [profile, setProfile] = useState<ProfileData>({
    name: 'John Doe',
    title: 'Driving Global Growth Through Strategic Sales Leadership',
    heroImage: '',
    bio: 'With over 15 years of experience in steering multinational corporations toward unprecedented growth, I specialize in building high-performance sales teams and forging lasting C-level relationships.',
  });

  useEffect(() => {
    fetch('/api/content?type=profile')
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error('Error loading profile:', err));
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            {profile.title}
          </h1>
          <p className="text-lg text-gray-300">
            {profile.bio}
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg transition-colors font-semibold">
              Explore My Impact
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-blue-500/30">
              {profile.heroImage ? (
                <img 
                  src={profile.heroImage} 
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  key={profile.heroImage}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <span className="text-6xl">👤</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
