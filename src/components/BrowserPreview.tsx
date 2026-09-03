"use client";

import { RefreshCw, ArrowLeft, ArrowRight, Home, Lock } from "lucide-react";

export function BrowserPreview() {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Browser Chrome */}
      <div className="bg-gray-100 border-b border-gray-200 p-2 flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-400">
          <ArrowLeft className="w-4 h-4 cursor-pointer hover:text-gray-600" />
          <ArrowRight className="w-4 h-4 cursor-pointer hover:text-gray-600" />
          <RefreshCw className="w-4 h-4 cursor-pointer hover:text-gray-600" />
          <Home className="w-4 h-4 cursor-pointer hover:text-gray-600 ml-2" />
        </div>
        
        <div className="flex-1 bg-white border border-gray-200 rounded-md px-3 py-1 flex items-center gap-2 text-sm text-gray-600">
          <Lock className="w-3 h-3 text-green-600" />
          <span>localhost:3000</span>
        </div>
      </div>
      
      {/* Mock Content */}
      <div className="flex-1 p-8 bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl mx-auto shadow-lg animate-bounce" />
          <h1 className="text-2xl font-bold text-gray-800">Your App is Running</h1>
          <p className="text-gray-500 max-w-md mx-auto">
            The AI has successfully compiled and launched the development server. This preview will update automatically when changes are made.
          </p>
        </div>
      </div>
    </div>
  );
}
