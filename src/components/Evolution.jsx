import React from 'react'
import { Activity, Award, TrendingUp, Sparkles } from 'lucide-react'

export default function Evolution() {
  const milestones = [
    {
      year: '2024',
      title: 'Haptic Feedback Robotics & Industry 5.0 Stacks',
      desc: 'Pioneered touch-sensitive industrial cobots capable of high-precision assembly alongside humans without safety fences.',
      metrics: '500+ Deployments Worldwide'
    },
    {
      year: '2022',
      title: 'Zero-Latency Edge Analytics Controller',
      desc: 'Shifted core decision architectures to zero-latency on-device processing systems, eliminating cloud dependence.',
      metrics: 'Sub-Millimeter Real-Time Correction'
    },
    {
      year: '2020',
      title: 'Foundational Smart Automation Engine',
      desc: 'Initial release of sovereign cognitive automation stacks for automotive and heavy manufacturing clients.',
      metrics: 'Founding Year & Patent Filings'
    }
  ]

  return (
    <section id="evolution" className="py-24 relative bg-[#070b14] cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>PIONEERING MILESTONES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Evolution of <span className="gradient-text">DJ Group</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Over a decade of breakthroughs redefining machine perception and mechanical automation.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="mt-16 max-w-4xl mx-auto space-y-8 relative">
          
          <div className="absolute left-8 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-500 via-sky-500 to-transparent -translate-x-1/2 hidden sm:block" />

          {milestones.map((m, idx) => (
            <div key={idx} className="relative flex flex-col sm:flex-row items-center gap-8 group">
              
              {/* Year Bubble */}
              <div className="sm:w-1/2 flex sm:justify-end">
                <div className="px-5 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-lg shadow-lg group-hover:border-cyan-400 transition-colors">
                  {m.year}
                </div>
              </div>

              {/* Content Card */}
              <div className="sm:w-1/2 p-6 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all">
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {m.desc}
                </p>
                <div className="mt-3 text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-lg inline-block">
                  {m.metrics}
                </div>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  )
}
