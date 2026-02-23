"use client";

import React, { createContext, useContext, useState } from "react";

// --- Mission Control State ---

interface MissionControlContextType {
  mode: "ACTIVE" | "DO_EVERYTHING" | "PAUSED";
  activeTask: string | null;
  addTask: (task: string) => void;
  removeTask: (id: string) => void;
  toggleMode: () => void;
}

export const MissionControlContext = createContext<
  MissionControlContextType | undefined
>(undefined);

// --- Component ---
export default function MissionControlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<"ACTIVE" | "DO_EVERYTHING" | "PAUSED">(
    "ACTIVE",
  );
  const [activeTask, setActiveTask] = useState<string | null>(null);

  // "Do Everything" Logic
  const handleAddTask = (task: string) => {
    setActiveTask(task);
    setMode("DO_EVERYTHING");
    // Simulate adding the task
  };

  const handleRemoveTask = (id: string) => {
    setActiveTask(null);
  };

  const toggleMode = () => {
    const newMode = mode === "ACTIVE" ? "DO_EVERYTHING" : "PAUSED";
    setMode(newMode);
  };

  return (
    <MissionControlContext.Provider
      value={{
        mode,
        activeTask,
        addTask: handleAddTask,
        removeTask: handleRemoveTask,
        toggleMode,
      }}
    >
      {children}
    </MissionControlContext.Provider>
  );
}
