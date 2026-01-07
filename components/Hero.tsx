'use client';

import { useState, useEffect } from 'react';
import { ProfileData } from '@/lib/data';

export default function Hero() {
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Abhishek Upadhyay',
    title: 'Seekho Sales – India\'s First Free Sales Training Platform',
    heroImage: '',
    bio: 'Real Sales | Real Experience | Real Growth\n15+ years of field experience – now FREE for everyone.',
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {profile.title}
          </h1>
          <div className="space-y-2">
            <p className="text-xl md:text-2xl text-blue-400 font-semibold">
              Real Sales | Real Experience | Real Growth
            </p>
            <p className="text-lg text-gray-300">
              15+ years of field experience – now FREE for everyone.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="https://www.youtube.com/@seekhosales"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg transition-colors font-semibold text-center flex items-center justify-center gap-2"
            >
              <span>🔴</span> Watch Free Training on YouTube
            </a>
            <a 
              href="#contact"
              className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg transition-colors font-semibold text-center flex items-center justify-center gap-2"
            >
              <span>🟢</span> Join Sales Community
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-green-500/20 rounded-full blur-3xl"></div>
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-red-500/30">
              {profile.heroImage ? (
                <img 
                  src={profile.heroImage} 
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <svg className="w-32 h-32 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
