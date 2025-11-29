'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { validatePassword, setAuthToken, isAuthenticated } from '@/lib/auth';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (validatePassword(password)) {
      setAuthToken();
      router.push('/admin/dashboard');
    } else {
      setError('Invalid password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1e] px-4">
      <div className="max-w-md w-full">
        <div className="bg-[#1e293b] rounded-2xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔐</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
            <p className="text-gray-400">Enter your password to access the dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a0f1e] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Enter admin password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-blue-400 hover:text-blue-300 text-sm">
              ← Back to Home
            </a>
          </div>

          <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-blue-300 text-center">
              <strong>Default Password:</strong> admin123
            </p>
            <p className="text-xs text-gray-400 text-center mt-2">
              Change this in production by setting NEXT_PUBLIC_ADMIN_PASSWORD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
