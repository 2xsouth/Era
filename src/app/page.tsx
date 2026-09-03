"use client";

import { useState } from "react";
import { ChatPanel } from "@/components/ChatPanel";
import { WorkspaceTabs, TabType } from "@/components/WorkspaceTabs";
import { TerminalView } from "@/components/TerminalView";
import { CodeEditorView } from "@/components/CodeEditorView";
import { BrowserPreview } from "@/components/BrowserPreview";

export default function MiniDevinDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('terminal');

  return (
    <main className="h-screen w-screen flex bg-[#0f1115] overflow-hidden text-gray-200">
      {/* Left Panel: Chat (30%) */}
      <div className="w-[30%] min-w-[300px] h-full shadow-2xl z-10 relative">
        <ChatPanel />
      </div>

      {/* Right Panel: Workspace (70%) */}
      <div className="flex-1 flex flex-col h-full bg-[#0a0a0a]">
        <WorkspaceTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="flex-1 relative overflow-hidden">
          <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === 'terminal' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
            <TerminalView />
          </div>
          <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === 'code' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
            <CodeEditorView />
          </div>
          <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === 'browser' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
            <BrowserPreview />
          </div>
        </div>
      </div>
    </main>
  );
}
