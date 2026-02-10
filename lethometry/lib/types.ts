export interface Experiment {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'ethics' | 'cognition' | 'memory' | 'decision' | 'social';
  status: 'active' | 'completed' | 'draft';
  participants: number;
  launchDate: string;
  estimatedDuration: string;
  methodology: string;
  citations: Citation[];
  questions: Question[];
  results?: ExperimentResults;
}

export interface Citation {
  id: string;
  authors: string;
  year: number;
  title: string;
  journal?: string;
  doi?: string;
}

export interface Question {
  id: string;
  type: 'single' | 'multiple' | 'scale' | 'text' | 'scenario';
  text: string;
  description?: string;
  options?: Option[];
  scale?: {
    min: number;
    max: number;
    labels: { [key: number]: string };
  };
  scenario?: string;
  required: boolean;
}

export interface Option {
  id: string;
  text: string;
  value: string | number;
}

export interface ExperimentResults {
  totalResponses: number;
  completionRate: number;
  averageTime: string;
  charts: ChartData[];
  keyFindings: string[];
}

export interface ChartData {
  id: string;
  type: 'bar' | 'pie' | 'line' | 'heatmap';
  title: string;
  data: any[];
  xAxis?: string;
  yAxis?: string;
}

export interface Publication {
  id: string;
  slug: string;
  title: string;
  authors: string[];
  abstract: string;
  journal: string;
  year: number;
  doi: string;
  citations: number;
  keywords: string[];
  downloadUrl?: string;
  experimentsReferenced: string[];
}

export interface ResearchData {
  id: string;
  experimentId: string;
  experimentName: string;
  lastUpdated: string;
  totalRecords: number;
  fileSize: string;
  downloadFormats: ('csv' | 'json')[];
  variables: Variable[];
  sampleData: Record<string, any>[];
}

export interface Variable {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'categorical';
  description: string;
}

export interface ParticipantStats {
  totalParticipants: number;
  activeExperiments: number;
  completedExperiments: number;
  averageCompletionTime: string;
  geographicDistribution: { region: string; count: number }[];
  aiModelDistribution: { model: string; count: number }[];
}
