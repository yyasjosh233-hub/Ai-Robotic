import React from 'react'
import { Calendar, AlertCircle, CheckCircle, Clock, ShieldAlert } from 'lucide-react'

export default function EvidenceTimelinePage() {
  const timelineEvents = [
    {
      year: 2021,
      type: "CLINICAL_TRIAL",
      title: "Initial Monotherapy Glycemic Control Trials",
      summary: "First randomized trials demonstrating glycemic control with standard metformin monotherapy.",
      status: "HISTORICAL_BASELINE"
    },
    {
      year: 2022,
      type: "CLINICAL_TRIAL",
      title: "Elderly Population Glycemic Target Evaluation",
      summary: "Lancet publication revealing 3-fold hypoglycemia increase with intensive control (<6.5%) in adults >75.",
      status: "SAFETY_LIMITATION_ADDED"
    },
    {
      year: 2023,
      type: "SYSTEMATIC_REVIEW",
      title: "NEJM Meta-Analysis on GLP-1 RA Cardiovascular Benefits",
      summary: "Meta-analysis confirming 14-20% MACE risk reduction across multi-center international trials.",
      status: "HIGH_GRADE_EVIDENCE"
    },
    {
      year: 2024,
      type: "CLINICAL_GUIDELINE",
      title: "Updated ADA Standards of Care (2024)",
      summary: "ADA update recommending early GLP-1 RA or SGLT2i for ASCVD/CKD independent of baseline HbA1c.",
      status: "CURRENT_GOLD_STANDARD"
    },
    {
      year: 2025,
      type: "GOVERNMENT_SAFETY",
      title: "FDA Regulatory Alert on Drug Interactions",
      summary: "FDA communication highlighting dosage adjustments for concurrent statin and macrolide therapy.",
      status: "REGULATORY_ADVISORY"
    }
  ]

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
          <Calendar className="w-4 h-4 text-cyan-400" /> LONGITUDINAL MEDICAL EVIDENCE TIMELINE
        </div>
        <h1 className="text-2xl font-bold text-white mt-1">Publication & Guideline Evolution Tracker</h1>
        <p className="text-slate-400 text-sm mt-0.5">
          Visualizes chronological development of clinical trial findings, systematic reviews, and updated guidelines to identify outdated medical evidence.
        </p>
      </div>

      {/* Timeline Stream */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative">
        <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-cyan-500 via-indigo-500 to-emerald-500 hidden sm:block" />

        <div className="space-y-6 sm:ml-12">
          {timelineEvents.map((evt, idx) => (
            <div 
              key={idx}
              className="bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-5 shadow-lg relative transition-all"
            >
              {/* Timeline marker node */}
              <div className="absolute -left-16 top-6 w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 font-mono text-xs font-bold hidden sm:flex">
                {evt.year.toString().slice(2)}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs rounded">
                    {evt.year}
                  </span>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    {evt.type}
                  </span>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  evt.status === 'CURRENT_GOLD_STANDARD' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                  evt.status === 'SAFETY_LIMITATION_ADDED' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                  'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                }`}>
                  {evt.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mt-3">{evt.title}</h3>
              <p className="text-slate-300 text-sm mt-1 leading-relaxed font-sans">{evt.summary}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
