'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  currentImage?: string;
  label?: string;
  accept?: string;
}

export default function ImageUpload({ 
  onUploadComplete, 
  currentImage, 
  label = 'Upload Image',
  accept = 'image/*'
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(currentImage || '');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await uploadFile(files[0]);
    }
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await uploadFile(files[0]);
    }
  };

  const uploadFile = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setError('');
    setUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to server
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        onUploadComplete(data.url);
      } else {
        setError(data.error || 'Upload failed');
        setPreview(currentImage || '');
      }
    } catch (err) {
      setError('Failed to upload image');
      setPreview(currentImage || '');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">{label}</label>
      
      {/* Drag and Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          transition-all duration-200
          ${isDragging 
            ? 'border-blue-500 bg-blue-500/10' 
            : 'border-white/20 hover:border-blue-500/50 bg-[#0a0f1e]'
          }
          ${uploading ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />

        {preview ? (
          <div className="space-y-3">
            <div className="relative w-full max-w-xs mx-auto aspect-square rounded-lg overflow-hidden border border-white/10">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-400">
              Click or drag to replace image
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-16 h-16 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">📁</span>
            </div>
            <div>
              <p className="text-white font-medium">
                {uploading ? 'Uploading...' : 'Drop image here or click to browse'}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                PNG, JPG, GIF, WebP up to 5MB
              </p>
            </div>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0a0f1e]/80 rounded-lg">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm text-gray-300">Uploading...</p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      <p className="text-xs text-gray-500">
        💡 Tip: You can drag and drop an image file directly onto this area
      </p>
    </div>
  );
}
