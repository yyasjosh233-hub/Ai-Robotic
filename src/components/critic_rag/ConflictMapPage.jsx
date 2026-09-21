import React from 'react'
import { HelpCircle, AlertTriangle, ArrowRight, ShieldAlert, GitCompare, CheckCircle2 } from 'lucide-react'

export default function ConflictMapPage() {
  const conflicts = [
    {
      conflict_id: "CNF-001",
      topic: "Glycemic Control Intensity in Frail Elderly (>75 Years)",
      severity: "HIGH",
      sources_supporting: [
        { id: "SRC-GUIDELINE-ADA-2024", text: "ADA Standards of Care general adult targets (<7.0% HbA1c)." }
      ],
      sources_contradicting: [
        { id: "SRC-TRIAL-DIABETES-MIXED-2022", text: "Lancet RCT showing intensive targets (<6.5%) increase hypoglycemia 3-fold without macrovascular benefit." }
      ],
      clinical_reconciliation: "Targets must be relaxed (7.0%-8.0%) in elderly frail patients to prevent severe hypoglycemic events."
    },
    {
      conflict_id: "CNF-002",
      conflict_topic: "First-Line Drug Selection in Renal Impairment (eGFR < 30)",
      severity: "MODERATE",
      sources_supporting: [
        { id: "SRC-GUIDELINE-ADA-2024", text: "Metformin requires dose reduction below eGFR 45 and discontinuation below eGFR 30 due to lactic acidosis risk." }
      ],
      sources_contradicting: [
        { id: "SRC-GUIDELINE-NICE-2024", text: "NICE recommends SGLT2 inhibitors or insulin monotherapy when eGFR < 30." }
      ],
      clinical_reconciliation: "Both guidelines agree on Metformin discontinuation below eGFR 30; SGLT2i offers renal protection above eGFR 20."
    }
  ]

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
          <GitCompare className="w-4 h-4 text-cyan-400" /> KNOWLEDGE CONFLICT & DISAGREEMENT MAP
        </div>
        <h1 className="text-2xl font-bold text-white mt-1">Clinical Discrepancy & Contradiction Resolver</h1>
        <p className="text-slate-400 text-sm mt-0.5">
          Maps opposing evidence findings, population mismatches, and study design discrepancies rather than selectively picking a single document.
        </p>
      </div>

      {/* Conflict Cards */}
      <div className="space-y-6">
        {conflicts.map((cnf, i) => (
          <div 
            key={i}
            className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 font-mono font-bold text-xs rounded border border-amber-500/40">
                  {cnf.conflict_id}
                </span>
                <h3 className="text-base font-bold text-white">{cnf.topic}</h3>
              </div>
              <span className="px-2.5 py-0.5 bg-red-500/20 text-red-300 font-mono text-[10px] font-bold rounded">
                SEVERITY: {cnf.severity}
              </span>
            </div>

            {/* Split Opposing Sources */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Supporting Position */}
              <div className="bg-slate-950 p-4 rounded-xl border border-emerald-900/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> POSITION A (Standard Guidelines)
                </div>
                {cnf.sources_supporting.map((s, idx) => (
                  <div key={idx} className="text-xs text-slate-300 font-sans leading-relaxed">
                    <strong className="text-cyan-400 font-mono">[{s.id}]</strong> {s.text}
                  </div>
                ))}
              </div>

              {/* Contradicting Position */}
              <div className="bg-slate-950 p-4 rounded-xl border border-amber-900/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-400" /> POSITION B (Trial / Population Caveat)
                </div>
                {cnf.sources_contradicting.map((s, idx) => (
                  <div key={idx} className="text-xs text-slate-300 font-sans leading-relaxed">
                    <strong className="text-amber-400 font-mono">[{s.id}]</strong> {s.text}
                  </div>
                ))}
              </div>

            </div>

            {/* Reconciliation Box */}
            <div className="bg-indigo-950/40 border border-indigo-900/60 p-4 rounded-xl text-xs font-sans text-indigo-200">
              <strong className="font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                CRITIC Reconciliation & Synthesis Recommendation:
              </strong>
              {cnf.clinical_reconciliation}
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}
