export function SolanaLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 397 313"
      className={className}
      aria-label="Solana Logo"
    >
      <defs>
        <linearGradient id="solana-gradient" x1="0.597" y1="0.106" x2="0.309" y2="0.887">
          <stop offset="0" stopColor="#9945FF" />
          <stop offset="1" stopColor="#14F195" />
        </linearGradient>
      </defs>
      <path
        fill="url(#solana-gradient)"
        d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.8c-5.8 0-8.7-7-4.6-11.1l62.4-62.7zM332.4 75.1c-2.4 2.4-5.7 3.8-9.2 3.8H5.8c-5.8 0-8.7-7-4.6-11.1l62.7-62.7c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7zM64.6 156.5c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.8c-5.8 0-8.7-7-4.6-11.1l62.4-62.7z"
      />
    </svg>
  );
}
