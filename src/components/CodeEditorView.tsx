"use client";

import { useState, useEffect, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { Save, FileCode2, Code2, FileJson, Loader2 } from "lucide-react";

const FILES = [
  { name: "page.tsx (Demo)", path: "src/app/demo/page.tsx", icon: <FileCode2 className="w-4 h-4 text-blue-400" />, language: "typescript" },
  { name: "BrowserPreview.tsx", path: "src/components/BrowserPreview.tsx", icon: <FileCode2 className="w-4 h-4 text-blue-400" />, language: "typescript" },
  { name: "page.tsx (Main)", path: "src/app/page.tsx", icon: <FileCode2 className="w-4 h-4 text-blue-400" />, language: "typescript" },
  { name: "package.json", path: "package.json", icon: <FileJson className="w-4 h-4 text-yellow-400" />, language: "json" },
];

export function CodeEditorView() {
  const [activeFile, setActiveFile] = useState(FILES[0]);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const fetchFile = useCallback(async (path: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/file?path=${encodeURIComponent(path)}`);
      if (res.ok) {
        const data = await res.json();
        setCode(data.content);
        setHasChanges(false);
      } else {
        setCode("// Error loading file");
      }
    } catch (e) {
      setCode("// Error loading file");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFile(activeFile.path);
  }, [activeFile, fetchFile]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/file?path=${encodeURIComponent(activeFile.path)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: code }),
      });
      if (res.ok) {
        setHasChanges(false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  // Keyboard shortcut for saving
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code, activeFile]);

  return (
    <div className="h-full bg-[#1e1e1e] flex flex-row font-sans">
      {/* Sidebar Explorer */}
      <div className="w-64 bg-[#252526] border-r border-black/50 flex flex-col">
        <div className="p-3 text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
          <Code2 className="w-4 h-4" />
          Explorer
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {FILES.map((file) => (
            <div
              key={file.path}
              onClick={() => setActiveFile(file)}
              className={`flex items-center gap-2 px-4 py-1.5 text-sm cursor-pointer transition-colors ${
                activeFile.path === file.path
                  ? "bg-[#37373d] text-white"
                  : "text-gray-400 hover:bg-[#2a2d2e] hover:text-gray-200"
              }`}
            >
              {file.icon}
              <span className="truncate">{file.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Editor Tabs / Toolbar */}
        <div className="flex bg-[#2d2d2d] text-gray-300 text-sm border-b border-black/50 shrink-0 justify-between items-center pr-4">
          <div className="flex">
            <div className="px-4 py-2 bg-[#1e1e1e] border-t-2 border-blue-500 flex items-center gap-2">
              {activeFile.icon}
              <span className="font-mono">{activeFile.name}</span>
              {hasChanges && <div className="w-2 h-2 rounded-full bg-white ml-2"></div>}
            </div>
          </div>
          
          <button 
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className={`flex items-center gap-2 px-3 py-1 rounded text-xs font-medium transition-colors ${
              hasChanges && !isSaving
                ? "bg-blue-600 text-white hover:bg-blue-500" 
                : "bg-white/5 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Save
          </button>
        </div>
        
        {/* Monaco Editor */}
        <div className="flex-1 overflow-hidden relative">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            <Editor
              height="100%"
              language={activeFile.language}
              theme="vs-dark"
              value={code}
              onChange={(value) => {
                setCode(value || "");
                setHasChanges(true);
              }}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                wordWrap: "on",
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: "smooth",
                formatOnPaste: true,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
