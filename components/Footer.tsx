export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400">© 2024 John Doe. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a>
            <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
            <a href="#books" className="text-gray-400 hover:text-white transition-colors">Books</a>
            <a href="#blog" className="text-gray-400 hover:text-white transition-colors">Blog</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
