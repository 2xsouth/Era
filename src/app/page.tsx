"use client";

import { motion } from "framer-motion";
import { Bot, GitPullRequest, GitBranch, Activity, Terminal, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen p-8 md:p-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-purple-500/20">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Era South AI Developer
              </h1>
              <p className="text-gray-400 text-sm mt-1">Autonomous Software Engineering Agent</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-300">System Online</span>
          </div>
        </motion.header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Agents Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-400" />
                  Active Workflows
                </h2>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/20">
                  1 In Progress
                </span>
              </div>

              {/* Workflow Item */}
              <div className="bg-black/20 border border-white/5 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg text-white mb-1">Issue #42: Implement Dark Mode</h3>
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                      <GitBranch className="w-4 h-4" />
                      era-south/frontend-app
                    </p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium border border-purple-500/20">
                    Coding Phase
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>

                <div className="pt-2 flex gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Planning</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Context</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
                    <span>Writing Code...</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent PRs */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
                <GitPullRequest className="w-5 h-5 text-purple-400" />
                Recently Created PRs
              </h2>
              
              <div className="space-y-4">
                {[
                  { id: '#128', title: 'Fix: Authentication middleware bypass', time: '2 hours ago', status: 'Merged' },
                  { id: '#127', title: 'Feat: Add GitHub OAuth integration', time: '5 hours ago', status: 'Open' },
                  { id: '#126', title: 'Chore: Update LangChain dependencies', time: '1 day ago', status: 'Merged' }
                ].map((pr, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl ${pr.status === 'Merged' ? 'bg-purple-500/20 text-purple-400' : 'bg-green-500/20 text-green-400'}`}>
                        <GitPullRequest className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-200">{pr.title}</h4>
                        <span className="text-xs text-gray-500">{pr.id} • {pr.time}</span>
                      </div>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${pr.status === 'Merged' ? 'bg-purple-500/10 text-purple-300' : 'bg-green-500/10 text-green-300'}`}>
                      {pr.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Logs Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="p-6 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl h-full flex flex-col font-mono">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <h2 className="text-sm font-semibold flex items-center gap-2 text-gray-300">
                  <Terminal className="w-4 h-4" />
                  Agent Output
                </h2>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
              </div>

              <div className="flex-1 space-y-3 text-xs text-gray-400 overflow-y-auto">
                <p><span className="text-blue-400">[14:32:01]</span> Webhook received: issues.opened</p>
                <p><span className="text-blue-400">[14:32:05]</span> Initializing LangGraph workflow...</p>
                <p><span className="text-blue-400">[14:32:06]</span> <span className="text-green-400">--- PLANNER ---</span></p>
                <p><span className="text-blue-400">[14:32:15]</span> Target files identified: src/components/Header.tsx</p>
                <p><span className="text-blue-400">[14:32:16]</span> <span className="text-green-400">--- FETCH CONTEXT ---</span></p>
                <p><span className="text-blue-400">[14:32:18]</span> Downloaded 1 file from GitHub.</p>
                <p><span className="text-blue-400">[14:32:19]</span> <span className="text-green-400">--- CODER ---</span></p>
                <p className="text-gray-200 animate-pulse">Generating file diffs for Header.tsx...</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
