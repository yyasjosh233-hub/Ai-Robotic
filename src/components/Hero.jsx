import React, { useState } from 'react'
import { Cpu, Bot, Zap, ShieldCheck, Activity, ArrowRight, Sparkles, Sliders, CheckCircle2 } from 'lucide-react'

export default function Hero({ onOpenPlatform, onExplore }) {
  // Neural Core Monitor State
  const [latencySpeed, setLatencySpeed] = useState(12)
  const [payloadRate, setPayloadRate] = useState(45.2)
  const [subsystems, setSubsystems] = useState({
    aiEngine: true,
    pneumatics: true,
    collisionSafety: true
  })

  const toggleSubsystem = (key) => {
    setSubsystems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const counters = [
    { num: '540+', label: 'Active Deployments' },
    { num: `${latencySpeed}ms`, label: 'Response Latency' },
    { num: '42%', label: 'Efficiency Gain' },
    { num: '24/7', label: 'Expert Support' }
  ]

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden cyber-grid">
      
      {/* Dynamic Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tag */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono backdrop-blur-md shadow-lg shadow-cyan-500/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
            <span>PIONEERING AUTONOMY · ARCHITECTS OF MACHINE INTELLIGENCE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Architects of Machine Intelligence <br />
            <span className="gradient-text">Robotics That Think & Adapt</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Empowering global manufacturing with intelligent automation ecosystems that merge AI-cognitive brilliance with mechanical perfection.
          </p>

          {/* CTA Group */}
          <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => onOpenPlatform('ai-media-studio')}
              className="px-8 py-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/25 flex items-center gap-3 group transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-5 h-5 text-cyan-200 animate-spin-slow" />
              <span>EXPLORE AI MEDIA STUDIO</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onOpenPlatform('official-promo-film')}
              className="px-8 py-4 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/40 backdrop-blur-md flex items-center gap-2 transition-all duration-200"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>WATCH AI PROMOTIONAL FILM</span>
            </button>
          </div>
        </div>

        {/* Hero Visual Card & Neural Core Telemetry HUD */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden glass-panel border border-cyan-500/30 p-2 shadow-2xl">
            <div className="relative rounded-xl overflow-hidden aspect-[16/9] max-h-[460px] bg-slate-950 flex items-center justify-center">
              
              <img
                src="/assets/orange_robotic_arms_factory-BnlkxGTJ.png"
                alt="DJ Group Precision Robotic System"
                className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent opacity-85" />
              
              {/* Neural Core HUD Top Left */}
              <div className="absolute top-4 left-4 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 text-xs font-mono space-y-1.5 shadow-xl">
                <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-slate-800 pb-1">
                  <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span>NEURAL CORE · SYS_ACTIVE_v4.20</span>
                </div>

                <div className="flex items-center justify-between gap-4 text-[11px]">
                  <span className="text-slate-400">Core Latency Speed:</span>
                  <span className="text-cyan-300 font-bold">{latencySpeed}ms</span>
                </div>

                <div className="flex items-center justify-between gap-4 text-[11px]">
                  <span className="text-slate-400">Active Payload Rate:</span>
                  <span className="text-cyan-300 font-bold">{payloadRate} kg/s</span>
                </div>
              </div>

              {/* Subsystem Toggles Bottom Right Overlay */}
              <div className="absolute bottom-4 right-4 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-[11px] font-mono space-y-1.5 hidden sm:block">
                <div className="text-slate-400 font-bold mb-1">Subsystem Controls:</div>
                
                <div 
                  onClick={() => toggleSubsystem('aiEngine')}
                  className="flex items-center justify-between gap-3 cursor-pointer hover:text-cyan-300"
                >
                  <span className="text-slate-300">Cognitive Pathing AI Engine</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] ${subsystems.aiEngine ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'bg-slate-800 text-slate-500'}`}>
                    {subsystems.aiEngine ? 'ENABLED' : 'DISABLED'}
                  </span>
                </div>

                <div 
                  onClick={() => toggleSubsystem('pneumatics')}
                  className="flex items-center justify-between gap-3 cursor-pointer hover:text-cyan-300"
                >
                  <span className="text-slate-300">Pneumatic Micro-Stabilizers</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] ${subsystems.pneumatics ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'bg-slate-800 text-slate-500'}`}>
                    {subsystems.pneumatics ? 'ENABLED' : 'DISABLED'}
                  </span>
                </div>

                <div 
                  onClick={() => toggleSubsystem('collisionSafety')}
                  className="flex items-center justify-between gap-3 cursor-pointer hover:text-cyan-300"
                >
                  <span className="text-slate-300">Self-Evasive Proximity Grid</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] ${subsystems.collisionSafety ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'bg-slate-800 text-slate-500'}`}>
                    {subsystems.collisionSafety ? 'ENABLED' : 'DISABLED'}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Counter Stats Grid */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {counters.map((c, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-panel border border-slate-800/80 hover:border-cyan-500/40 transition-all text-center group"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-white group-hover:text-cyan-400 transition-colors font-mono">
                {c.num}
              </div>
              <div className="text-xs font-semibold text-slate-300 mt-2">
                {c.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
