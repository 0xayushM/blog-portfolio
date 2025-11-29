// Simple authentication utility
// In production, use a proper authentication service

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

export function validatePassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function setAuthToken() {
  if (typeof window !== 'undefined') {
    const token = btoa(`auth:${Date.now()}`);
    localStorage.setItem('admin_token', token);
    return token;
  }
  return null;
}

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin_token');
  }
  return null;
}

export function clearAuthToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token');
  }
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}
