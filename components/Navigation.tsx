'use client';

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full bg-[#0a0f1e]/90 backdrop-blur-md z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-xl font-semibold">Seekho Sales</span>
        </div>
        <div className="hidden md:flex gap-8">
          <a href="#home" className="hover:text-red-400 transition-colors">Home</a>
          <a href="#about" className="hover:text-red-400 transition-colors">About</a>
          <a href="#courses" className="hover:text-red-400 transition-colors">Courses</a>
          <a href="#youtube" className="hover:text-red-400 transition-colors">YouTube</a>
          <a href="#contact" className="hover:text-red-400 transition-colors">Contact</a>
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
