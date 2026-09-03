"use client";

import { Terminal } from "lucide-react";
import { motion } from "framer-motion";

export function TerminalView() {
  const logs = [
    { time: "14:32:01", text: "Initializing workspace..." },
    { time: "14:32:02", text: "Cloning repository era-south/frontend-app", color: "text-blue-400" },
    { time: "14:32:05", text: "Resolving dependencies..." },
    { time: "14:32:08", text: "Added 142 packages, and audited 143 packages in 3s", color: "text-green-400" },
    { time: "14:32:09", text: "Starting development server..." },
    { time: "14:32:10", text: "Ready in 1250ms", color: "text-green-400" },
    { time: "14:32:12", text: "Agent is planning the implementation for 'Dark Mode'..." },
    { time: "14:32:15", text: "Applying diffs to src/app/globals.css", color: "text-purple-400" },
    { time: "14:32:18", text: "Compiling /page (client and server)..." },
  ];

  return (
    <div className="h-full bg-[#0a0a0a] text-gray-300 font-mono text-sm p-4 overflow-y-auto flex flex-col">
      <div className="flex-1 space-y-1">
        {logs.map((log, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="flex gap-4 hover:bg-white/5 px-2 py-0.5 rounded transition-colors"
          >
            <span className="text-gray-600 shrink-0">[{log.time}]</span>
            <span className={log.color || "text-gray-300"}>{log.text}</span>
          </motion.div>
        ))}
        <div className="flex gap-4 px-2 py-0.5 animate-pulse">
          <span className="text-gray-600 shrink-0">[14:32:20]</span>
          <span className="text-gray-400">Waiting for changes...<span className="animate-ping">_</span></span>
        </div>
      </div>
    </div>
  );
}
