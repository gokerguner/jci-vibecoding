"use client";

interface GenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}

export default function GenerateButton({
  onClick,
  disabled,
  isLoading,
}: GenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        w-full max-w-md mx-auto
        px-8 py-4 rounded-xl
        font-semibold text-lg
        shadow-lg
        transition-all duration-200
        flex items-center justify-center gap-3
        ${
          disabled || isLoading
            ? "bg-coral/50 text-white/70 cursor-not-allowed"
            : "bg-coral text-white hover:bg-coral/90 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
        }
      `}
    >
      {isLoading ? (
        <>
          <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Oluşturuluyor...</span>
        </>
      ) : (
        <>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          <span>Oluştur</span>
        </>
      )}
    </button>
  );
}
