"use client";

import { motion } from "framer-motion";
import { Send, Bot, User, Command } from "lucide-react";
import { useState } from "react";

export function ChatPanel() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, role: "agent", text: "Hello! I am Era South, your autonomous AI developer. What would you like to build today?" },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { id: Date.now(), role: "user", text: input }]);
    setInput("");
    
    // Mock response
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { id: Date.now(), role: "agent", text: "I'll get right on that. I'm initializing a workspace and fetching the necessary context." }
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-black/40 border-r border-white/10 backdrop-blur-md">
      <div className="p-4 border-b border-white/10 flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg shadow-purple-500/20">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-sm font-semibold text-gray-200">Era South AI</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id} 
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'agent' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
              {msg.role === 'agent' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>
            <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${msg.role === 'agent' ? 'bg-white/5 text-gray-300 rounded-tl-none' : 'bg-blue-600/20 text-blue-100 rounded-tr-none'}`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-4 border-t border-white/10">
        <form onSubmit={handleSubmit} className="relative">
          <Command className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Give instructions to the AI..." 
            className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-12 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
          />
          <button 
            type="submit" 
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
