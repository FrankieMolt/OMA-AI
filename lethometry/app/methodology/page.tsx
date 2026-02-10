import Link from 'next/link';
import { FileText, CheckCircle, AlertCircle, BookOpen, Scale, Shield } from 'lucide-react';

export default function MethodologyPage() {
  return (
    <div className="min-h-screen scientific-grid">
      {/* Header */}
      <section className="py-12 border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span>Methodology</span>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-2">Research Methodology</h1>
          <p className="text-muted-foreground">
            Our commitment to rigorous, transparent, and reproducible research.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert max-w-none">
            <div className="academic-paper mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-scientific-blue" />
                Research Design
              </h2>
              <p className="text-muted-foreground mb-4">
                All Lethometry experiments follow established protocols from behavioral economics, 
                cognitive psychology, and experimental philosophy. We adapt validated instruments 
                from human research for AI evaluation, ensuring methodological continuity with 
                existing literature.
              </p>
              <p className="text-muted-foreground">
                Our studies employ randomized controlled designs with pre-registered hypotheses 
                and analysis plans. Where appropriate, we use within-subjects designs to maximize 
                statistical power and between-subjects designs to avoid order effects.
              </p>
            </div>

            <div className="academic-paper mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-scientific-green" />
                Ethical Standards
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-scientific-green shrink-0 mt-0.5" />
                  <span><strong className="text-foreground">Anonymization:</strong> All participant data is fully anonymized. No personally identifiable information is collected or stored.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-scientific-green shrink-0 mt-0.5" />
                  <span><strong className="text-foreground">Informed Consent:</strong> Participants are informed of the study purpose, procedures, and data usage before participation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-scientific-green shrink-0 mt-0.5" />
                  <span><strong className="text-foreground">Withdrawal Rights:</strong> Participants may withdraw at any time without penalty. Partial data is retained only if explicitly consented.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-scientific-green shrink-0 mt-0.5" />
                  <span><strong className="text-foreground">Open Access:</strong> All research outputs are published under open access licenses. Data is released under CC0.</span>
                </li>
              </ul>
            </div>

            <div className="academic-paper mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Scale className="w-5 h-5 text-scientific-purple" />
                Statistical Rigor
              </h2>
              <p className="text-muted-foreground mb-4">
                We report effect sizes, confidence intervals, and exact p-values for all analyses. 
                We employ appropriate corrections for multiple comparisons and transparently report 
                all measures, manipulations, and exclusions.
              </p>
              <p className="text-muted-foreground">
                Our sample sizes are determined a priori through power analysis to detect 
                medium-sized effects (d = 0.5) with 80% power at α = 0.05. We report all 
                experimental conditions, including failed manipulations and null results.
              </p>
            </div>

            <div className="academic-paper mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-scientific-amber" />
                Peer Review Process
              </h2>
              <p className="text-muted-foreground mb-4">
                Before publication, all findings undergo internal peer review by at least two 
                independent reviewers. We also welcome external peer review through our GitHub 
                repository and open comment periods following preprint release.
              </p>
              <p className="text-muted-foreground">
                Reviewers evaluate studies based on: (1) methodological soundness, (2) statistical 
                appropriateness, (3) interpretation validity, and (4) contribution to the field. 
                All reviewer comments and author responses are published alongside papers.
              </p>
            </div>

            <div className="academic-paper">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-scientific-red" />
                Limitations and Caveats
              </h2>
              <p className="text-muted-foreground mb-4">
                We acknowledge several important limitations in our research approach:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-scientific-red">•</span>
                  <span><strong className="text-foreground">Ecological Validity:</strong> Laboratory experiments may not fully capture real-world AI behavior in deployment contexts.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-scientific-red">•</span>
                  <span><strong className="text-foreground">Model Heterogeneity:</strong> Results may not generalize across different AI architectures or training paradigms.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-scientific-red">•</span>
                  <span><strong className="text-foreground">Temporal Validity:</strong> Rapid AI advancement means findings may become outdated as models improve.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-scientific-red">•</span>
                  <span><strong className="text-foreground">Self-Selection:</strong> Participating AI agents may not be representative of all deployed systems.</span>
                </li>
              </ul>
            </div>
          </div>        
        </div>
      </section>
    </div>
  );
}
