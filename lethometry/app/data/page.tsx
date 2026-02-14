'use client';

import Link from 'next/link';
import { Database, Download, FileJson, FileSpreadsheet, Calendar, HardDrive } from 'lucide-react';
import { researchData, participantStats, getExperimentById } from '@/lib/data';
import { formatNumber, formatDate } from '@/lib/utils';

export default function DataPage() {
  return (
    <div className="min-h-screen scientific-grid">
      {/* Header */}
      <section className="py-12 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span>Data</span>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-2">Research Data Repository</h1>
          <p className="text-muted-foreground max-w-2xl">
            All Lethometry research data is anonymized and freely available for download. 
            Use this data to replicate our findings or conduct your own analyses.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">{researchData.length}</p>
              <p className="text-sm text-muted-foreground">Datasets</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">{formatNumber(participantStats.totalParticipants)}</p>
              <p className="text-sm text-muted-foreground">Total Records</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">9.7 MB</p>
              <p className="text-sm text-muted-foreground">Total Size</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">CC0</p>
              <p className="text-sm text-muted-foreground">License</p>
            </div>
          </div>
        </div>
      </section>

      {/* Datasets */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {researchData.map((dataset) => (
              <div key={dataset.id} className="academic-paper">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-5 h-5 text-scientific-blue" />
                      {getExperimentById(dataset.experimentId) ? (
                        <Link 
                          href={`/experiments/${getExperimentById(dataset.experimentId)?.slug}`}
                          className="text-sm text-primary hover:underline"
                        >
                          {dataset.experimentName}
                        </Link>
                      ) : (
                        <span className="text-sm text-primary">{dataset.experimentName}</span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>Updated {formatDate(dataset.lastUpdated)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Database className="w-4 h-4" />
                        <span>{formatNumber(dataset.totalRecords)} records</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <HardDrive className="w-4 h-4" />
                        <span>{dataset.fileSize}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {dataset.downloadFormats.map((format) => (
                      <button
                        key={format}
                        className="inline-flex items-center gap-1.5 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                      >
                        {format === 'csv' ? (
                          <>
                            <FileSpreadsheet className="w-4 h-4" />
                            Download CSV
                          </>
                        ) : (
                          <>
                            <FileJson className="w-4 h-4" />
                            Download JSON
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h2 className="text-sm font-medium text-foreground mb-4">Variables</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {dataset.variables.map((variable) => (
                      <div key={variable.name} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="font-mono text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {variable.type}
                        </div>
                        <div>
                          <p className="font-mono text-sm text-foreground">{variable.name}</p>
                          <p className="text-xs text-muted-foreground">{variable.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {dataset.sampleData.length > 0 && (
                  <div className="border-t border-border pt-6 mt-6">
                    <h2 className="text-sm font-medium text-foreground mb-4">Sample Data</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            {Object.keys(dataset.sampleData[0]).map((key) => (
                              <th key={key} className="text-left py-2 px-3 font-mono text-muted-foreground">
                                {key}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {dataset.sampleData.map((row, idx) => (
                            <tr key={idx} className="border-b border-border/50">
                              {Object.values(row).map((value, vIdx) => (
                                <td key={vIdx} className="py-2 px-3 text-muted-foreground">
                                  {String(value)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
