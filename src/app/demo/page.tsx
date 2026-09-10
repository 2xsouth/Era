"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, ChevronRight, Activity, Users, Box } from "lucide-react";

export default function DemoPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-indigo-500/30">
      {/* Animated Background Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-blue-600/15 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col min-h-screen">
        
        {/* Navigation */}
        <nav className="flex items-center justify-between py-6 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">Nexus<span className="text-indigo-400">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">Platform</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full text-sm font-medium transition-all">
            Dashboard
          </button>
        </nav>

        {/* Hero Section */}
        <motion.div 
          className="flex-1 flex flex-col items-center justify-center text-center mt-12 mb-24"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            <span>Introducing Next-Gen Intelligence</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight mb-8 max-w-4xl leading-tight">
            Make incredible things with <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              unmatched precision
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
            Experience the future of development. Nexus AI provides you with the tools you need to create, scale, and optimize your workflows seamlessly.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4">
            <button className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold overflow-hidden transition-all hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                Start Building Now
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="px-8 py-4 rounded-full font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 backdrop-blur-sm transition-all">
              View Documentation
            </button>
          </motion.div>
        </motion.div>

        {/* Stats / Dashboard Preview */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-20"
        >
          {/* Card 1 */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 hover:bg-white/[0.07] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">99.9%</h3>
            <p className="text-gray-400 text-sm">Uptime guaranteed across all enterprise plans with active failover.</p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 hover:bg-white/[0.07] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">2.5M+</h3>
            <p className="text-gray-400 text-sm">Active developers building next-generation applications daily.</p>
          </div>
          
          {/* Card 3 */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 hover:bg-white/[0.07] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6">
              <Box className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">500+</h3>
            <p className="text-gray-400 text-sm">Pre-built components and templates to accelerate your workflow.</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
