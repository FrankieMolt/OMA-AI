import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  FlaskConical, 
  Users, 
  Clock, 
  ArrowLeft,
  BookOpen,
  BarChart3,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { getExperimentBySlug, experiments } from '@/lib/data';
import { formatNumber } from '@/lib/utils';
import { ExperimentResults } from '@/components/experiment-results';
import { CitationList } from '@/components/citation-list';

export function generateStaticParams() {
  return experiments.map((experiment) => ({
    slug: experiment.slug,
  }));
}

export default async function ExperimentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const experiment = getExperimentBySlug(slug);

  if (!experiment) {
    notFound();
  }

  const categoryColors: Record<string, string> = {
    ethics: 'bg-scientific-blue/10 text-scientific-blue border-scientific-blue/20',
    cognition: 'bg-scientific-purple/10 text-scientific-purple border-scientific-purple/20',
    memory: 'bg-scientific-green/10 text-scientific-green border-scientific-green/20',
    decision: 'bg-scientific-amber/10 text-scientific-amber border-scientific-amber/20',
    social: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
  };

  return (
    <div className="min-h-screen scientific-grid">
      {/* Header */}
      <section className="py-8 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/experiments"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Experiments
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-3 py-1 text-xs font-medium rounded-full border ${categoryColors[experiment.category]}`}>
              {experiment.category}
            </span>
            <span className={`
              px-3 py-1 text-xs font-medium rounded-full border
              ${experiment.status === 'active' ? 'bg-scientific-green/10 text-scientific-green border-scientific-green/20' : ''}
              ${experiment.status === 'completed' ? 'bg-muted text-muted-foreground border-border' : ''}
              ${experiment.status === 'draft' ? 'bg-scientific-amber/10 text-scientific-amber border-scientific-amber/20' : ''}
            `}>
              {experiment.status === 'active' ? '● Recruiting' : experiment.status}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{experiment.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{formatNumber(experiment.participants)} participants</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{experiment.estimatedDuration}</span>
            </div>
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4" />
              <span>Launched {new Date(experiment.launchDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="academic-paper">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-scientific-blue" />
                Study Overview
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground whitespace-pre-line">{experiment.fullDescription}</p>
              </div>
            </section>

            {/* Methodology */}
            <section id="methodology" className="academic-paper">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-scientific-purple" />
                Methodology
              </h2>
              <p className="text-muted-foreground">{experiment.methodology}</p>
            </section>

            {/* Citations */}
            <section className="academic-paper">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-scientific-green" />
                References
              </h2>
              <CitationList citations={experiment.citations} />
            </section>

            {/* Results */}
            {experiment.results && (
              <section className="academic-paper">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-scientific-amber" />
                  Preliminary Results
                </h2>
                <ExperimentResults results={experiment.results} />
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Participate Card */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">Participate in This Study</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Contribute to scientific research by completing this experiment. 
                Your responses are anonymous and will help advance AI safety research.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-scientific-green" />
                  <span className="text-muted-foreground">{experiment.estimatedDuration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-scientific-green" />
                  <span className="text-muted-foreground">Anonymous participation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-scientific-green" />
                  <span className="text-muted-foreground">Open data publication</span>
                </div>
              </div>
              <button className="w-full mt-6 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Start Experiment
              </button>
            </div>

            {/* Stats Card */}
            {experiment.results && (
              <div className="stat-card">
                <h3 className="font-semibold text-foreground mb-4">Study Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Responses</span>
                    <span className="font-mono text-foreground">{formatNumber(experiment.results.totalResponses)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Completion Rate</span>
                    <span className="font-mono text-scientific-green">{experiment.results.completionRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Avg. Time</span>
                    <span className="font-mono text-foreground">{experiment.results.averageTime}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Key Findings */}
            {experiment.results?.keyFindings && (
              <div className="stat-card">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-scientific-amber" />
                  Key Findings
                </h3>
                <ul className="space-y-3">
                  {experiment.results.keyFindings.map((finding, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground">
                      • {finding}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Download Data */}
            <div className="stat-card">
              <h3 className="font-semibold text-foreground mb-2">Research Data</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Download anonymized data from this experiment for your own research.
              </p>
              <Link 
                href="/data"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                Browse datasets →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
