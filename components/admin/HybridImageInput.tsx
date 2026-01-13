'use client';

import { useState } from 'react';

interface HybridImageInputProps {
  label: string;
  currentImage: string;
  onImageChange: (url: string) => void;
  placeholder?: string;
}

export default function HybridImageInput({ 
  label, 
  currentImage, 
  onImageChange,
  placeholder = "Image URL or path"
}: HybridImageInputProps) {
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Invalid file type. Only images are allowed.');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError('File too large. Maximum size is 5MB.');
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        onImageChange(data.url);
      } else {
        setUploadError(data.error || 'Upload failed');
      }
    } catch (error) {
      setUploadError('Failed to upload image');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium mb-2">{label}</label>
      
      {/* Mode Toggle */}
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => setUploadMode('url')}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            uploadMode === 'url'
              ? 'bg-blue-500 text-white'
              : 'bg-[#0a0f1e] text-gray-400 hover:text-white border border-white/10'
          }`}
        >
          🔗 Paste URL
        </button>
        <button
          type="button"
          onClick={() => setUploadMode('file')}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            uploadMode === 'file'
              ? 'bg-blue-500 text-white'
              : 'bg-[#0a0f1e] text-gray-400 hover:text-white border border-white/10'
          }`}
        >
          📁 Upload File
        </button>
      </div>

      {/* URL Input Mode */}
      {uploadMode === 'url' && (
        <div>
          <input
            type="text"
            value={currentImage}
            onChange={(e) => onImageChange(e.target.value)}
            className="w-full px-4 py-2 bg-[#0a0f1e] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder={placeholder}
          />
          <p className="text-xs text-gray-500 mt-1">
            Paste a direct image URL (e.g., from Imgur, or use /image.jpg for local files)
          </p>
        </div>
      )}

      {/* File Upload Mode */}
      {uploadMode === 'file' && (
        <div>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={uploading}
            />
            <div className="space-y-2">
              {uploading ? (
                <>
                  <div className="text-4xl">⏳</div>
                  <p className="text-sm text-gray-400">Uploading...</p>
                </>
              ) : (
                <>
                  <div className="text-4xl">📤</div>
                  <p className="text-sm text-gray-300">
                    Drag & drop an image here, or click to browse
                  </p>
                  <p className="text-xs text-gray-500">
                    Max 5MB • JPG, PNG, GIF, WebP
                  </p>
                </>
              )}
            </div>
          </div>
          {uploadError && (
            <p className="text-xs text-red-400 mt-2">{uploadError}</p>
          )}
        </div>
      )}

      {/* Image Preview */}
      {currentImage && (
        <div className="mt-3 relative w-full h-48 rounded-lg overflow-hidden border border-white/10">
          <img
            src={currentImage}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23334155" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="14"%3EInvalid URL%3C/text%3E%3C/svg%3E';
            }}
          />
          {currentImage && (
            <button
              type="button"
              onClick={() => onImageChange('')}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
              title="Remove image"
            >
              ×
            </button>
          )}
        </div>
      )}
    </div>
  );
}
