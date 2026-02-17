"use client";

import Image from "next/image";

interface ResultDisplayProps {
  imageBase64: string;
  onReset: () => void;
}

export default function ResultDisplay({
  imageBase64,
  onReset,
}: ResultDisplayProps) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageBase64;
    link.download = "jci-losev-fotograf.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in">
      {/* Başarı mesajı */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
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
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="font-medium">Görsel başarıyla oluşturuldu!</span>
        </div>
      </div>

      {/* Oluşturulan görsel */}
      <div className="rounded-2xl overflow-hidden shadow-xl mb-6">
        <Image
          src={imageBase64}
          alt="Oluşturulan görsel"
          width={512}
          height={512}
          className="w-full h-auto"
        />
      </div>

      {/* Butonlar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleDownload}
          className="
            flex-1 px-6 py-3 rounded-xl
            bg-coral text-white font-semibold
            shadow-lg hover:bg-coral/90 hover:shadow-xl
            transition-all duration-200
            flex items-center justify-center gap-2
          "
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          İndir
        </button>

        <button
          onClick={onReset}
          className="
            flex-1 px-6 py-3 rounded-xl
            border-2 border-coral text-coral font-semibold
            hover:bg-coral/10
            transition-all duration-200
            flex items-center justify-center gap-2
          "
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Yeni Bir Tane Oluştur
        </button>
      </div>
    </div>
  );
}
