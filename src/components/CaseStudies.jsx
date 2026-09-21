import React from 'react'
import { caseStudies } from '../data/roboticsData'
import { Activity, CheckCircle2, Factory } from 'lucide-react'

export default function CaseStudies() {
  return (
    <section className="py-24 relative bg-[#090e1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <Factory className="w-3.5 h-3.5" />
            <span>CASE STUDIES & VERIFIED RESULTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Present Industry <span className="gradient-text">Workloads</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            See how Dj Group of Industry is actively driving output, safety, and efficiency across India's largest manufacturing plants.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((cs, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="text-xs font-mono text-cyan-400 flex items-center justify-between">
                  <span>{cs.industry}</span>
                  <span className="text-slate-400">{cs.location}</span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {cs.workload}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {cs.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs text-cyan-400">
                <span className="text-[11px] text-slate-400">VERIFIED DEPLOYMENT METRIC</span>
                <span className="font-bold text-cyan-300">{cs.metric}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
