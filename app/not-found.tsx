import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-9xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        404
      </div>
      <h1 className="text-2xl font-light mb-8 text-memoria-text-whisper">
        Page not found
      </h1>
      <p className="text-memoria-text-meta mb-8 max-w-md text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-memoria-text-hero text-memoria-bg-ultra-dark rounded font-semibold hover:bg-memoria-text-secondary transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
