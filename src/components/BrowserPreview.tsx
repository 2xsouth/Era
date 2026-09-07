"use client";

import { useState } from "react";
import { RefreshCw, ArrowLeft, ArrowRight, Home, Lock } from "lucide-react";

export function BrowserPreview() {
  const [url, setUrl] = useState("http://localhost:3001/demo");
  const [inputUrl, setInputUrl] = useState("localhost:3001/demo");
  const [key, setKey] = useState(0);

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let finalUrl = inputUrl;
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'http://' + finalUrl;
    }
    setUrl(finalUrl);
  };

  return (
    <div className="h-full bg-white flex flex-col text-gray-800">
      {/* Browser Chrome */}
      <div className="bg-gray-100 border-b border-gray-200 p-2 flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-400">
          <ArrowLeft className="w-4 h-4 cursor-pointer hover:text-gray-600" />
          <ArrowRight className="w-4 h-4 cursor-pointer hover:text-gray-600" />
          <RefreshCw className="w-4 h-4 cursor-pointer hover:text-gray-600" onClick={handleRefresh} />
          <Home className="w-4 h-4 cursor-pointer hover:text-gray-600 ml-2" onClick={() => { setUrl("http://localhost:3001/demo"); setInputUrl("localhost:3001/demo"); }} />
        </div>
        
        <form onSubmit={handleNavigate} className="flex-1 bg-white border border-gray-200 rounded-md px-3 flex items-center gap-2 text-sm">
          <Lock className="w-3 h-3 text-green-600" />
          <input 
            type="text" 
            value={inputUrl} 
            onChange={(e) => setInputUrl(e.target.value)} 
            className="flex-1 py-1 outline-none bg-transparent"
            spellCheck="false"
          />
        </form>
      </div>
      
      {/* Active Iframe Content */}
      <div className="flex-1 bg-white relative">
        <iframe 
          key={key}
          src={url} 
          className="absolute inset-0 w-full h-full border-none"
          title="Browser Preview"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
        />
      </div>
    </div>
  );
}
