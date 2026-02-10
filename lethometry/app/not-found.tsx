import Link from 'next/link';
import { FlaskConical, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen scientific-grid flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
          <FlaskConical className="w-8 h-8 text-muted-foreground" />
        </div>
        
        <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
        <h2 className="text-xl font-semibold text-foreground mb-4">Experiment Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page or experiment you're looking for doesn't exist or has been moved.
        </p>
        
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Home
        </Link>
      </div>
    </div>
  );
}
