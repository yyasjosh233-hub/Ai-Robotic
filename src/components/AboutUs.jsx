import React from 'react'
import { Award, ShieldCheck, Sparkles, Bot, CheckCircle2 } from 'lucide-react'

export default function AboutUs() {
  const values = [
    { title: 'Excellence', desc: 'Sovereign-grade performance across all units.', icon: <Award className="w-5 h-5 text-cyan-400" /> },
    { title: 'Integrity', desc: 'Unyielding reliability in mission-critical environments.', icon: <ShieldCheck className="w-5 h-5 text-cyan-400" /> },
    { title: 'Innovation', desc: 'Predictive AI at the heart of every motion.', icon: <Sparkles className="w-5 h-5 text-cyan-400" /> }
  ]

  return (
    <section id="about" className="py-24 relative bg-[#070b14] cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <Bot className="w-3.5 h-3.5" />
            <span>OUR CORE ESSENCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Leading the Future of <span className="gradient-text">Manufacturing Technology</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Dj Group of Industry specializes in advanced manufacturing robotics to automate and optimize production processes. With a commitment to innovation and quality, Dj Group delivers sovereign robotic solutions tailored for diverse global industries.
          </p>
        </div>

        {/* Hero Showcase Frame */}
        <div className="mt-14 relative max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden glass-panel border border-cyan-500/30 p-2 shadow-2xl">
            <div className="relative aspect-[16/9] max-h-[380px] bg-slate-950 rounded-xl overflow-hidden">
              <img
                src="/assets/humanoid_robot_line-o8O7YzXE.png"
                alt="DJ Group Robotics Engineering"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">SOVEREIGN HARDWARE-SOFTWARE STACKS</span>
                <h3 className="text-xl font-bold text-white mt-1">Combining Mechanical Mastery With Proprietary AI</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, idx) => (
            <div key={idx} className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 w-fit">
                {v.icon}
              </div>
              <h3 className="text-lg font-bold text-white">{v.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
