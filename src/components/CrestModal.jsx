import React from 'react'
import { X, ShieldCheck, Award, Zap, Bot, ArrowRight } from 'lucide-react'

export default function CrestModal({ isOpen, onClose, onNavigate }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl glass-panel-glow border border-cyan-500/50 p-8 shadow-2xl space-y-6 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4 border-b border-slate-800/80 pb-6">
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 via-amber-500/40 to-blue-600 p-[1px] shadow-xl shadow-cyan-500/30 overflow-hidden">
            <img
              src="/assets/logo_perfect.png"
              alt="DJ Group Crest Emblem"
              className="w-full h-full object-cover rounded-[15px]"
            />
          </div>

          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>SOVEREIGN COGNITIVE AUTOMATION</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-wide mt-1">
              DJ GROUP OF INDUSTRY
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Est. 2020 · Architects of Machine Intelligence
            </p>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
          <p className="font-semibold text-cyan-300">
            "Architecting sovereign cognitive automation stacks for global high-output manufacturing sectors."
          </p>
          <p>
            Combining ultra-precise sub-millimeter kinematics, zero-latency edge neural engines, and human-safe collaborative haptic robotics to set the benchmark for Industry 5.0.
          </p>
        </div>

        {/* Directives Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>ISO/TS 15066 Safety Standard</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Sub-Millimeter 0.04mm Precision</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center gap-2">
            <Bot className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>ROS 2 Swarm Integration</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Zero-Gate Cobot Certification</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-wrap justify-between items-center gap-4">
          <button
            onClick={() => {
              onClose()
              onNavigate('about')
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-2"
          >
            <span>Read About Us</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
          </button>

          <button
            onClick={() => {
              onClose()
              onNavigate('industrial-ai')
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <span>Launch Platform Workspace</span>
          </button>
        </div>

      </div>
    </div>
  )
}
