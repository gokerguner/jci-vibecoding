"use client";

import { useState } from "react";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";
import GenerateButton from "@/components/GenerateButton";
import ResultDisplay from "@/components/ResultDisplay";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setError(null);
    setResultImage(null);
  };

  const handleClear = () => {
    setSelectedImage(null);
    setError(null);
    setResultImage(null);
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await fetch(`${API_URL}/api/generate`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Bir hata oluştu");
      }

      const data = await response.json();
      setResultImage(data.image_base64);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Görsel oluşturulurken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setResultImage(null);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="pt-8 pb-4">
        <div className="max-w-2xl mx-auto px-4 flex justify-center items-center gap-8">
          <Image
            src="/jci_logo.png"
            alt="JCI Logo"
            width={100}
            height={40}
            className="h-10 w-auto"
          />
          <Image
            src="/losev_logo.jpg"
            alt="LÖSEV Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
            İyiliğin Bir Parçası Ol
          </h1>
          <p className="text-charcoal/70 text-lg mb-8">
            Fotoğrafını yükle, maskotumuzla birlikte özel bir görsel oluştur ve
            sosyal sorumluluk hareketine katıl!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-4 px-4">
        <div className="max-w-2xl mx-auto">
          {!resultImage ? (
            <div className="space-y-8">
              {/* Upload Area */}
              <ImageUpload
                onImageSelect={handleImageSelect}
                selectedImage={selectedImage}
                onClear={handleClear}
              />

              {/* Generate Button */}
              <GenerateButton
                onClick={handleGenerate}
                disabled={!selectedImage}
                isLoading={isLoading}
              />

              {/* Error Message */}
              {error && (
                <div className="text-center animate-fade-in">
                  <p className="text-red-500 bg-red-50 px-4 py-3 rounded-xl inline-block">
                    {error}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <ResultDisplay imageBase64={resultImage} onReset={handleReset} />
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 mt-8">
        <div className="max-w-2xl mx-auto text-center text-charcoal/50 text-sm">
          <p>JCI & LÖSEV Sosyal Sorumluluk Projesi</p>
          <p className="mt-1">Lösemili çocuklara umut olmak için bir adım at.</p>
        </div>
      </footer>
    </main>
  );
}
