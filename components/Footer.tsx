'use client';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-white font-semibold">Seekho Sales by Abhishek Upadhyay</p>
            <p className="text-gray-400 text-sm">India's First Free Sales Training Platform</p>
          </div>
          <div className="flex gap-6">
            <button onClick={() => scrollToSection('home')} className="text-gray-400 hover:text-red-400 transition-colors">Home</button>
            <button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-red-400 transition-colors">About</button>
            <button onClick={() => scrollToSection('courses')} className="text-gray-400 hover:text-red-400 transition-colors">Courses</button>
            <button onClick={() => scrollToSection('youtube')} className="text-gray-400 hover:text-red-400 transition-colors">YouTube</button>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm">© 2024 Seekho Sales. Everyone deserves to learn sales.</p>
        </div>
      </div>
    </footer>
  );
}
