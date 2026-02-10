import Link from 'next/link';
import { BookOpen, Users, TrendingUp, ExternalLink, Download } from 'lucide-react';
import { publications, experiments } from '@/lib/data';

export default function PublicationsPage() {
  // Helper function to get experiment slug by ID
  const getExperimentSlug = (expId: string) => {
    const exp = experiments.find(e => e.id === expId);
    return exp?.slug || expId;
  };

  return (
    <div className="min-h-screen scientific-grid">
      {/* Header */}
      <section className="py-12 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span>Publications</span>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-2">Research Publications</h1>
          <p className="text-muted-foreground max-w-2xl">
            Peer-reviewed publications based on Lethometry experiments. All research is open access 
            and reproducible using our publicly available datasets.
          </p>
        </div>
      </section>

      {/* Publications */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {publications.map((pub) => (
              <article key={pub.id} className="academic-paper">
                <div className="flex flex-wrap gap-2 mb-4">
                  {pub.keywords.map((keyword) => (
                    <span 
                      key={keyword} 
                      className="px-2.5 py-0.5 bg-muted text-muted-foreground text-xs rounded"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                <h2 className="text-xl font-semibold text-foreground mb-3">{pub.title}</h2>

                <p className="text-sm text-muted-foreground mb-4">
                  {pub.authors.join(', ')} ({pub.year})
                </p>

                <p className="text-muted-foreground mb-6 leading-relaxed">{pub.abstract}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <BookOpen className="w-4 h-4" />
                    <span>{pub.journal}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <TrendingUp className="w-4 h-4" />
                    <span>{pub.citations} citations</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View on DOI
                  </a>
                  <button className="inline-flex items-center gap-1.5 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                  <Link
                    href={`/experiments/${getExperimentSlug(pub.experimentsReferenced[0])}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                  >
                    <Users className="w-4 h-4" />
                    View Experiment
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
