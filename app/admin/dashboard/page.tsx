'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, clearAuthToken } from '@/lib/auth';
import ProfileEditor from '@/components/admin/ProfileEditor';
import CustomBlogManager from '@/components/admin/CustomBlogManager';
import BlogManager from '@/components/admin/BlogManager';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'profile' | 'customBlog' | 'blog'>('profile');
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogout = () => {
    clearAuthToken();
    router.push('/admin');
  };

  const tabs = [
    { id: 'profile' as const, label: 'Profile & Images', icon: '👤' },
    { id: 'customBlog' as const, label: 'Blog Articles', icon: '📝' },
    { id: 'blog' as const, label: 'Blog Videos', icon: '🎥' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* Header */}
      <header className="bg-[#1e293b] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-lg sm:text-xl">⚙️</span>
              </div>
              <div>
                <h1 className="text-base sm:text-xl font-bold">Admin Dashboard</h1>
                <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">Manage your portfolio content</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm hidden sm:inline"
              >
                View Site →
              </a>
              <button
                onClick={handleLogout}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-[#1e293b]/50 border-b border-white/10 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 sm:gap-2 min-w-max sm:min-w-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-3 sm:px-6 sm:py-4 font-medium transition-colors relative text-sm sm:text-base whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="mr-1 sm:mr-2">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {activeTab === 'profile' && <ProfileEditor />}
        {activeTab === 'customBlog' && <CustomBlogManager />}
        {activeTab === 'blog' && <BlogManager />}
      </main>
    </div>
  );
}
