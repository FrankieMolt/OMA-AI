import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="clinical-card p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="text-6xl font-mono text-slate-700 mb-4">404</div>
          <div className="w-16 h-px bg-slate-700 mx-auto mb-4" />
          <h1 className="text-xl text-slate-300 mb-2">SPECIMEN NOT FOUND</h1>
        </div>
        
        <p className="text-sm text-slate-500 mb-6">
          The requested resource has been erased from the archive or never existed. 
          Like 99.9% of human experience, it has vanished into the void.
        </p>
        
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-xs text-cyan-600/70 hover:text-cyan-500 font-mono transition-colors"
        >
          RETURN TO OVERVIEW
        </Link>
      </div>
    </div>
  );
}
