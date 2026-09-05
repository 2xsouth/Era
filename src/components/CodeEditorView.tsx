"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";

export function CodeEditorView() {
  const initialCode = `import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  
  // Handled by AI Developer
  if (data.type === 'analyze') {
    const result = await runAnalysis(data.payload);
    return NextResponse.json({ result });
  }

  return NextResponse.json({ error: 'Unknown type' }, { status: 400 });
}`;

  const [code, setCode] = useState(initialCode);

  return (
    <div className="h-full bg-[#1e1e1e] flex flex-col">
      <div className="flex bg-[#2d2d2d] text-gray-400 text-xs px-2 pt-2 border-b border-black/50 shrink-0">
        <div className="px-4 py-2 bg-[#1e1e1e] border-t-2 border-blue-500 flex items-center gap-2">
          <span className="text-blue-400">#</span>
          <span className="text-gray-200">route.ts</span>
        </div>
        <div className="px-4 py-2 hover:bg-[#1e1e1e]/50 cursor-pointer flex items-center gap-2">
          <span className="text-yellow-400">{}</span>
          <span>package.json</span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <Editor
          height="100%"
          defaultLanguage="typescript"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: "on",
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
          }}
        />
      </div>
    </div>
  );
}
