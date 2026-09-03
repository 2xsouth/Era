"use client";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function CodeEditorView() {
  const code = `import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  
  // Handled by AI Developer
  if (data.type === 'analyze') {
    const result = await runAnalysis(data.payload);
    return NextResponse.json({ result });
  }

  return NextResponse.json({ error: 'Unknown type' }, { status: 400 });
}`;

  return (
    <div className="h-full bg-[#1e1e1e] flex flex-col">
      <div className="flex bg-[#2d2d2d] text-gray-400 text-xs px-2 pt-2 border-b border-black/50">
        <div className="px-4 py-2 bg-[#1e1e1e] border-t-2 border-blue-500 flex items-center gap-2">
          <span className="text-blue-400">#</span>
          <span className="text-gray-200">route.ts</span>
        </div>
        <div className="px-4 py-2 hover:bg-[#1e1e1e]/50 cursor-pointer flex items-center gap-2">
          <span className="text-yellow-400">{}</span>
          <span>package.json</span>
        </div>
      </div>
      <div className="flex-1 overflow-auto text-sm">
        <SyntaxHighlighter 
          language="typescript" 
          style={vscDarkPlus} 
          customStyle={{ margin: 0, padding: '1rem', background: 'transparent', height: '100%' }}
          showLineNumbers={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
