'use client';
import {ProfileData, defaultProfile} from '@/lib/data'
import { useState, useEffect } from 'react';
import { useRequestInfo } from '@/components/RequestInfoProvider';

export default function Navigation() {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const { open } = useRequestInfo();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/content?type=profile');
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-[#0a0f1e]/90 backdrop-blur-md z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-xl font-semibold">{profile.name}</span>
        </div>
        <div className="hidden md:flex gap-8">
          <button onClick={() => scrollToSection('home')} className="hover:text-red-400 transition-colors">Home</button>
          <button onClick={() => scrollToSection('about')} className="hover:text-red-400 transition-colors">About</button>
          <button onClick={() => scrollToSection('courses')} className="hover:text-red-400 transition-colors">Courses</button>
          <button onClick={() => scrollToSection('youtube')} className="hover:text-red-400 transition-colors">YouTube</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-red-400 transition-colors">Contact</button>
          <button onClick={open} className="hover:text-red-400 transition-colors">Get In Touch</button>
        </div>
        <a 
          href="https://www.youtube.com/@seekhosales"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition-colors"
        >
          Subscribe
        </a>
      </div>
    </nav>
  );
}
