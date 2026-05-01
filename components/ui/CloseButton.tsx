export function CloseButton({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <button
      className={`sm:absolute top-4 right-4 z-20 rounded-full bg-white p-2 shadow-md hover:bg-gray-100 focus:outline-none ${className}`}
      aria-label="Close"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
