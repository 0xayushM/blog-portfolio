'use client';

import { useState, useEffect } from 'react';

export default function Navigation() {
  const [name, setName] = useState('John Doe');

  useEffect(() => {
    fetch('/api/content?type=profile')
      .then(res => res.json())
      .then(data => setName(data.name))
      .catch(err => console.error('Error loading profile:', err));
  }, []);

  const initial = name.charAt(0).toUpperCase();

  return (
    <nav className="fixed top-0 w-full bg-[#0a0f1e]/90 backdrop-blur-md z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">{initial}</span>
          </div>
          <span className="text-xl font-semibold">{name}</span>
        </div>
        <div className="hidden md:flex gap-8">
          <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
          <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
          <a href="#books" className="hover:text-blue-400 transition-colors">Books</a>
          <a href="#blog" className="hover:text-blue-400 transition-colors">Blog</a>
          <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg transition-colors">
          Contact Me
        </button>
      </div>
    </nav>
  );
}
