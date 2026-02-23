"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Terminal,
  Zap,
  ShieldAlert,
  Activity,
  Database,
  ChevronRight,
  Play,
  Square,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LogEntry {
  id: string;
  type: "success" | "info" | "warning" | "error";
  icon: typeof Terminal;
  message: string;
  timestamp?: Date;
}

const LOGSOURCES: LogEntry[] = [
  {
    id: "kernel",
    type: "success",
    icon: Terminal,
    message: "Kernel v6.14.3-OMA loaded successfully.",
  },
  {
    id: "network",
    type: "info",
    icon: Database,
    message: "Synchronizing with Base-Mainnet (Chain ID: 8453)...",
  },
  {
    id: "api",
    type: "warning",
    icon: Zap,
    message:
      "High API latency detected on Solana RPC (450ms). Retrying with fallback.",
  },
  {
    id: "security",
    type: "error",
    icon: ShieldAlert,
    message:
      "Unverified agent signature detected from IP 192.168.1.42. Firewall engaged.",
  },
  {
    id: "activity",
    type: "info",
    icon: Activity,
    message: "Agent #8821 completed DeepScrape job. +0.003 USDC earned.",
  },
  {
    id: "wallet",
    type: "success",
    icon: Square,
    message: "AgentWallet adapter v2.4.2 connected. Balance: 0.42 USDC.",
  },
];

export default function DynamicKernelLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLive, setIsLive] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const addRandomLog = () => {
      const source = LOGSOURCES[Math.floor(Math.random() * LOGSOURCES.length)];
      setLogs((prev) => {
        const newLog = { ...source, timestamp: new Date() };
        // Keep only last 10 logs to prevent clutter
        const updated = [newLog, ...prev].slice(0, 10);
        return updated;
      });
    };

    if (isLive) {
      // Add a log every 1-3 seconds
      interval = setInterval(addRandomLog, Math.random() * 2000 + 1000);
    }

    return () => clearInterval(interval);
  }, [isLive]);

  useEffect(() => {
    if (logs.length > 0 && logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-zinc-950 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Terminal size={18} className="text-purple-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Frankie_OS_Kernel_Logs
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
              isLive
                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
          >
            <Play size={12} className={isLive ? "" : "hidden"} />
            <Square size={12} className={!isLive ? "" : "hidden"} />
            <span>{isLive ? "Live Streaming" : "Paused"}</span>
          </button>
        </div>
      </div>

      {/* Log Output */}
      <div className="p-6 font-mono text-sm min-h-[200px] max-h-[300px] overflow-y-auto custom-scrollbar">
        {logs.length === 0 ? (
          <div className="flex items-center justify-center h-full text-zinc-400">
            System idle. Waiting for user initiation...
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {logs.map((log) => (
              <motion.div
                key={log.timestamp?.getTime() || log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-3 mb-3 pb-3 border-b border-zinc-800/50"
              >
                <div className="text-zinc-400 text-[10px] w-16 shrink-0">
                  {log.timestamp
                    ? new Date(log.timestamp).toLocaleTimeString()
                    : "--:--:--"}
                </div>
                <div className="flex-1">
                  <div
                    className={`flex items-center gap-2 mb-1 ${log.type === "error" ? "text-red-400" : log.type === "warning" ? "text-yellow-400" : log.type === "success" ? "text-green-400" : "text-blue-400"}`}
                  >
                    {React.createElement(log.icon, { size: 14 })}
                    <span className="truncate">{log.message}</span>
                  </div>
                  {log.type === "error" && (
                    <span className="text-[10px] text-zinc-600 ml-2">
                      [CRITICAL]
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
