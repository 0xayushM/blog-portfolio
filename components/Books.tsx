'use client';

import { useState, useEffect } from 'react';
import { Book } from '@/lib/data';

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch('/api/content?type=books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error('Error loading books:', err));
  }, []);

  return (
    <section id="books" className="py-20 bg-[#0d1425]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-4">Published Books</h2>
        <p className="text-gray-400 mb-12 text-lg">
          Sharing insights and strategies from years of experience in sales leadership
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {books.map((book, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="bg-[#1e293b]/50 rounded-xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="aspect-[3/4] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-6xl">📚</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{book.description}</p>
                  <button className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-2">
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
