"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import Image from "next/image";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  onClear: () => void;
}

export default function ImageUpload({
  onImageSelect,
  selectedImage,
  onClear,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    setError(null);

    // Format kontrolü
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setError("Sadece JPG ve PNG formatları desteklenir.");
      return false;
    }

    // Boyut kontrolü (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("Dosya boyutu 5MB'dan küçük olmalıdır.");
      return false;
    }

    return true;
  };

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      onImageSelect(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleClear = () => {
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClear();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {!preview ? (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-2xl p-12
            flex flex-col items-center justify-center
            cursor-pointer transition-all duration-200
            ${
              isDragging
                ? "border-coral bg-coral/10 scale-[1.02]"
                : "border-charcoal/30 bg-peach/50 hover:border-coral hover:bg-coral/5"
            }
          `}
        >
          <svg
            className="w-16 h-16 text-coral mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-charcoal font-medium text-center">
            Fotoğrafını buraya sürükle
          </p>
          <p className="text-charcoal/60 text-sm mt-1">veya tıklayarak seç</p>
          <p className="text-charcoal/40 text-xs mt-3">JPG, PNG (maks. 5MB)</p>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden shadow-lg animate-fade-in">
          <Image
            src={preview}
            alt="Yüklenen fotoğraf"
            width={400}
            height={400}
            className="w-full h-auto object-cover"
          />
          <button
            onClick={handleClear}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-charcoal p-2 rounded-full shadow-md transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && (
        <p className="mt-3 text-red-500 text-sm text-center animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
}
