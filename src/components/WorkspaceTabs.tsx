"use client";

import { Terminal, Code, LayoutTemplate } from "lucide-react";

export type TabType = 'terminal' | 'code' | 'browser';

interface WorkspaceTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export function WorkspaceTabs({ activeTab, setActiveTab }: WorkspaceTabsProps) {
  const tabs = [
    { id: 'terminal', label: 'Terminal', icon: Terminal },
    { id: 'code', label: 'Code', icon: Code },
    { id: 'browser', label: 'Browser', icon: LayoutTemplate },
  ] as const;

  return (
    <div className="flex bg-black/60 border-b border-white/10 px-2 pt-2 gap-1 backdrop-blur-md">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 text-sm rounded-t-lg transition-colors ${
            activeTab === tab.id 
              ? 'bg-[#0a0a0a] text-white border-t border-l border-r border-white/10 shadow-[0_-4px_10px_rgba(0,0,0,0.5)] z-10 relative' 
              : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
          }`}
        >
          <tab.icon className="w-4 h-4" />
          {tab.label}
        </button>
      ))}
    </div>
  );
}
