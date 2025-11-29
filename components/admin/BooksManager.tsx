'use client';

import { useState, useEffect } from 'react';
import { Book } from '@/lib/data';
import ImageUpload from './ImageUpload';

export default function BooksManager() {
  const [books, setBooks] = useState<Book[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cover: '',
    link: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/content?type=books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingBook) {
        // Update existing book
        const response = await fetch('/api/content', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'book', id: editingBook.id, data: formData }),
        });
        if (response.ok) {
          setMessage('Book updated successfully!');
        }
      } else {
        // Add new book
        const response = await fetch('/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'book', data: formData }),
        });
        if (response.ok) {
          setMessage('Book added successfully!');
        }
      }

      fetchBooks();
      resetForm();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving book');
    }
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      description: book.description,
      cover: book.cover,
      link: book.link,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this book?')) return;

    try {
      const response = await fetch(`/api/content?type=book&id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage('Book deleted successfully!');
        fetchBooks();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error deleting book');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', cover: '', link: '' });
    setEditingBook(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Books Management</h2>
          <p className="text-gray-400">Add, edit, or remove published books</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          {showForm ? 'Cancel' : '+ Add Book'}
        </button>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.includes('Error')
            ? 'bg-red-500/10 border border-red-500/50 text-red-400'
            : 'bg-green-500/10 border border-green-500/50 text-green-400'
        }`}>
          {message}
        </div>
      )}

      {showForm && (
        <div className="mb-8 bg-[#1e293b] rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold mb-4">
            {editingBook ? 'Edit Book' : 'Add New Book'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-[#0a0f1e] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-[#0a0f1e] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <ImageUpload
                label="Upload Book Cover"
                currentImage={formData.cover}
                onUploadComplete={(url) => setFormData({ ...formData, cover: url })}
              />
              
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Or paste image URL</label>
                <input
                  type="url"
                  value={formData.cover}
                  onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0a0f1e] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="https://example.com/book-cover.jpg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Purchase Link</label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="w-full px-4 py-2 bg-[#0a0f1e] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="https://amazon.com/..."
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                {editingBook ? 'Update Book' : 'Add Book'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="border border-white/10 hover:border-white/20 px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-[#1e293b] rounded-xl overflow-hidden border border-white/10">
            <div className="aspect-[3/4] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              {book.cover ? (
                <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
              ) : (
                <span className="text-6xl">📚</span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">{book.title}</h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">{book.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(book)}
                  className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {books.length === 0 && !showForm && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg mb-2">No books yet</p>
          <p className="text-sm">Click "Add Book" to get started</p>
        </div>
      )}
    </div>
  );
}
