import Link from 'next/link';
import { FlaskConical, Users, Clock, ArrowRight, Activity } from 'lucide-react';
import { experiments, getActiveExperiments } from '@/lib/data';
import { formatNumber } from '@/lib/utils';

const categoryColors: Record<string, string> = {
  ethics: 'bg-scientific-blue/10 text-scientific-blue',
  cognition: 'bg-scientific-purple/10 text-scientific-purple',
  memory: 'bg-scientific-green/10 text-scientific-green',
  decision: 'bg-scientific-amber/10 text-scientific-amber',
  social: 'bg-pink-500/10 text-pink-500',
};

export default function ExperimentsPage() {
  const activeExperiments = getActiveExperiments();

  return (
    <div className="min-h-screen scientific-grid">
      {/* Header */}
      <section className="py-12 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span>Experiments</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Active Experiments</h1>
              <p className="text-muted-foreground max-w-2xl">
                Participate in peer-reviewed research studies examining AI behavior across ethics, 
                cognition, and decision-making. All data is anonymized and openly available.
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-scientific-green" />
                <span className="text-muted-foreground">{activeExperiments.length} Active Studies</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiments Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {experiments.map((experiment) => (
              <Link
                key={experiment.id}
                href={`/experiments/${experiment.slug}`}
                className="experiment-card group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${categoryColors[experiment.category]}`}>
                        {experiment.category}
                      </span>
                      <span className={`
                        px-3 py-1 text-xs font-medium rounded-full
                        ${experiment.status === 'active' ? 'bg-scientific-green/10 text-scientific-green' : ''}
                        ${experiment.status === 'completed' ? 'bg-muted text-muted-foreground' : ''}
                        ${experiment.status === 'draft' ? 'bg-scientific-amber/10 text-scientific-amber' : ''}
                      `}>
                        {experiment.status}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {experiment.title}
                  </h2>

                  <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                    {experiment.shortDescription}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>{formatNumber(experiment.participants)} participants</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{experiment.estimatedDuration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FlaskConical className="w-4 h-4" />
                      <span>Launched {new Date(experiment.launchDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {experiment.results && (
                  <div className="px-6 py-4 border-t border-border bg-muted/30">
                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-muted-foreground">Responses: </span>
                        <span className="font-medium text-foreground">{formatNumber(experiment.results.totalResponses)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Completion: </span>
                        <span className="font-medium text-foreground">{experiment.results.completionRate}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
