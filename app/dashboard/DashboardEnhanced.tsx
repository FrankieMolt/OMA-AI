'use client';

import { useState } from 'react';
import { Search, Moon, Sun, Download, Trash2, CheckSquare } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useToast } from '@/components/ToastProvider';
import { useAPISelection } from '@/components/APISelectionContext';
import { SearchModal } from '@/components/SearchModal';

export default function EnhancedDashboard() {
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();
  const { selectedAPIs, toggleAPI, clearSelection, exportSelected } = useAPISelection();
  const [searchOpen, setSearchOpen] = useState(false);

  const handleExport = (format: 'csv' | 'json') => {
    if (selectedAPIs.length === 0) {
      addToast('Please select APIs to export', 'warning');
      return;
    }
    exportSelected(format);
    addToast(`Exported ${selectedAPIs.length} APIs as ${format.toUpperCase()}`, 'success');
  };

  const handleClear = () => {
    clearSelection();
    addToast('Selection cleared', 'info');
  };

  return (
    <>
      {/* Quick Actions Bar */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-memoria-bg-card border border-memoria-border-default rounded hover:border-memoria-border-active transition-colors"
        >
          <Search size={16} />
          <span className="text-sm">Search...</span>
          <kbd className="px-2 py-1 text-xs bg-memoria-bg-surface rounded">⌘K</kbd>
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 bg-memoria-bg-card border border-memoria-border-default rounded hover:border-memoria-border-active transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {selectedAPIs.length > 0 && (
          <>
            <button
              onClick={() => handleExport('csv')}
              className="flex items-center gap-2 px-4 py-2 bg-green-900 border border-green-700 rounded hover:bg-green-800 transition-colors text-sm"
            >
              <Download size={16} />
              Export CSV ({selectedAPIs.length})
            </button>

            <button
              onClick={() => handleExport('json')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-900 border border-blue-700 rounded hover:bg-blue-800 transition-colors text-sm"
            >
              <Download size={16} />
              Export JSON
            </button>

            <button
              onClick={handleClear}
              className="flex items-center gap-2 px-4 py-2 bg-red-900 border border-red-700 rounded hover:bg-red-800 transition-colors text-sm"
            >
              <Trash2 size={16} />
              Clear
            </button>
          </>
        )}
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSearch={(query) => {
          addToast(`Searching for "${query}"...`, 'info');
          // Implement actual search
        }}
      />
    </>
  );
}
