"use client";

import { createContext, useContext, useState } from "react";

interface APISelectionContextType {
  selectedAPIs: string[];
  toggleAPI: (apiId: string) => void;
  selectAll: (apiIds: string[]) => void;
  clearSelection: () => void;
  exportSelected: (format: "csv" | "json") => void;
}

const APISelectionContext = createContext<APISelectionContextType | undefined>(
  undefined,
);

export function APISelectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedAPIs, setSelectedAPIs] = useState<string[]>([]);

  const toggleAPI = (apiId: string) => {
    setSelectedAPIs((prev) =>
      prev.includes(apiId)
        ? prev.filter((id) => id !== apiId)
        : [...prev, apiId],
    );
  };

  const selectAll = (apiIds: string[]) => {
    setSelectedAPIs(apiIds);
  };

  const clearSelection = () => {
    setSelectedAPIs([]);
  };

  const exportSelected = (format: "csv" | "json") => {
    // This will be connected to real data
    const data = selectedAPIs.map((id) => ({ id, name: `API ${id}` }));

    let content: string;
    let filename: string;
    let mimeType: string;

    if (format === "csv") {
      const header = "ID,Name\n";
      const rows = data.map((d) => `${d.id},${d.name}`).join("\n");
      content = header + rows;
      filename = "apis-export.csv";
      mimeType = "text/csv";
    } else {
      content = JSON.stringify(data, null, 2);
      filename = "apis-export.json";
      mimeType = "application/json";
    }

    // Trigger download
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <APISelectionContext.Provider
      value={{
        selectedAPIs,
        toggleAPI,
        selectAll,
        clearSelection,
        exportSelected,
      }}
    >
      {children}
    </APISelectionContext.Provider>
  );
}

export function useAPISelection() {
  const context = useContext(APISelectionContext);
  if (!context)
    throw new Error("useAPISelection must be used within APISelectionProvider");
  return context;
}
