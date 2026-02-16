'use client';

import { useAPISelection } from './APISelectionContext';
import { useToast } from './ToastProvider';

export function BulkActions() {
  const { selectedAPIs, clearSelection, exportSelected } = useAPISelection();
  const { addToast } = useToast();

  if (selectedAPIs.length === 0) return null;

  const handleExport = (format: 'csv' | 'json') => {
    exportSelected(format);
    addToast(`Exported ${selectedAPIs.length} APIs as ${format.toUpperCase()}`, 'success');
    clearSelection();
  };

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 bg-memoria-bg-card border border-memoria-border-default rounded-lg shadow-xl p-4 flex items-center gap-4">
      <span className="text-memoria-text-hero">
        {selectedAPIs.length} selected
      </span>
      
      <button
        onClick={() => handleExport('csv')}
        className="px-4 py-2 bg-memoria-bg-surface hover:bg-memoria-bg-ultra-dark rounded text-sm"
      >
        Export CSV
      </button>
      
      <button
        onClick={() => handleExport('json')}
        className="px-4 py-2 bg-memoria-bg-surface hover:bg-memoria-bg-ultra-dark rounded text-sm"
      >
        Export JSON
      </button>
      
      <button
        onClick={clearSelection}
        className="px-4 py-2 text-memoria-text-meta hover:text-memoria-text-hero text-sm"
      >
        Clear
      </button>
    </div>
  );
}
