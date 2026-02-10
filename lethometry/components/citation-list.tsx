import { Citation } from '@/lib/types';

interface CitationListProps {
  citations: Citation[];
}

export function CitationList({ citations }: CitationListProps) {
  return (
    <div className="space-y-4">
      {citations.map((citation, idx) => (
        <div key={citation.id} className="p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-foreground">
            <span className="font-mono text-muted-foreground mr-2">[{idx + 1}]</span>
            {citation.authors} ({citation.year}). {citation.title}.
            {citation.journal && (
              <span className="italic"> {citation.journal}</span>
            )}
            {citation.doi && (
              <span className="text-muted-foreground"> DOI: {citation.doi}</span>
            )}
          </p>
          {citation.doi && (
            <a
              href={`https://doi.org/${citation.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline mt-2 inline-block"
            >
              View on DOI →
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
