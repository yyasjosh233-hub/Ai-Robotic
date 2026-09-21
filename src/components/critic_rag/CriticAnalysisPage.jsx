import React, { useState } from 'react'
import { CheckCircle2, AlertTriangle, HelpCircle, XCircle, ShieldCheck, Eye, Sparkles, Filter } from 'lucide-react'

export default function CriticAnalysisPage() {
  const [filterStatus, setFilterStatus] = useState('ALL')

  const sampleClaims = [
    {
      claim_id: "CLM-001",
      claim_text: "Metformin remains the initial preferred pharmacological agent for the treatment of type 2 diabetes.",
      status: "SUPPORTED",
      supporting_sources: ["SRC-GUIDELINE-ADA-2024", "SRC-GUIDELINE-NICE-2024"],
      contradicting_sources: [],
      confidence_score: 0.96,
      study_design: "Level A (Clinical Guidelines)",
      population_match: "High",
      directness: "Direct"
    },
    {
      claim_id: "CLM-002",
      claim_text: "GLP-1 receptor agonists significantly reduce major adverse cardiovascular events (MACE) by 14% to 20% in high-risk CVD patients.",
      status: "SUPPORTED",
      supporting_sources: ["SRC-REV-NEJM-GLP1-2023"],
      contradicting_sources: [],
      confidence_score: 0.94,
      study_design: "Systematic Review & Meta-Analysis",
      population_match: "High",
      directness: "Direct"
    },
    {
      claim_id: "CLM-003",
      claim_text: "Intensive glycemic control (<6.5%) in adults aged > 75 years significantly reduces microvascular and macrovascular events without added risk.",
      status: "CONFLICTING",
      supporting_sources: [],
      contradicting_sources: ["SRC-TRIAL-DIABETES-MIXED-2022"],
      confidence_score: 0.78,
      study_design: "Randomized Controlled Trial",
      population_match: "Moderate",
      directness: "Direct",
      conflict_notes: "Trial evidence in adults >75 shows 3-fold increase in severe hypoglycemia without macrovascular benefit."
    },
    {
      claim_id: "CLM-004",
      claim_text: "Concurrent administration of high-dose statin therapy with protease inhibitors requires dosage adjustment to mitigate rhabdomyolysis risk.",
      status: "SUPPORTED",
      supporting_sources: ["SRC-GOV-FDA-WARNING-2025"],
      contradicting_sources: [],
      confidence_score: 0.98,
      study_design: "Regulatory Safety Alert",
      population_match: "High",
      directness: "Direct"
    },
    {
      claim_id: "CLM-005",
      claim_text: "Target blood pressure of < 130/80 mmHg is recommended for Stage 1 hypertension with 10-year ASCVD risk >= 10%.",
      status: "SUPPORTED",
      supporting_sources: ["SRC-GUIDELINE-ACC-HTN-2023"],
      contradicting_sources: [],
      confidence_score: 0.95,
      study_design: "Level A Guideline Consensus",
      population_match: "High",
      directness: "Direct"
    }
  ]

  const filteredClaims = filterStatus === 'ALL' ? sampleClaims : sampleClaims.filter(c => c.status === filterStatus)

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
            <ShieldCheck className="w-4 h-4 text-cyan-400" /> CRITIC VERIFICATION ENGINE
          </div>
          <h1 className="text-2xl font-bold text-white mt-1">Claim-Level Verification & Quality Dashboard</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Every proposed clinical claim is independently checked against direct supporting evidence, conflicting trial data, and source validity.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {['ALL', 'SUPPORTED', 'CONFLICTING', 'NOT_SUPPORTED'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                filterStatus === st 
                  ? 'bg-cyan-500 text-slate-950 shadow-md' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Summary KPI Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-cyan-400">5</div>
          <div className="text-xs text-slate-400 uppercase mt-1">Total Claims Verified</div>
        </div>
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-emerald-400">4</div>
          <div className="text-xs text-slate-400 uppercase mt-1">Directly Supported</div>
        </div>
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-amber-400">1</div>
          <div className="text-xs text-slate-400 uppercase mt-1">Conflicting Evidence</div>
        </div>
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-cyan-400">100%</div>
          <div className="text-xs text-slate-400 uppercase mt-1">Citation Integrity</div>
        </div>
      </div>

      {/* Verified Claims List */}
      <div className="space-y-4">
        {filteredClaims.map((claim, idx) => (
          <div 
            key={idx}
            className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 shadow-xl transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-slate-950 text-cyan-400 font-mono font-bold text-xs rounded border border-slate-800">
                  {claim.claim_id}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 ${
                  claim.status === 'SUPPORTED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                  claim.status === 'CONFLICTING' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                  'bg-red-500/20 text-red-300 border border-red-500/40'
                }`}>
                  {claim.status === 'SUPPORTED' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  {claim.status === 'CONFLICTING' && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                  {claim.status}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span>Confidence: <strong className="text-cyan-400">{(claim.confidence_score * 100).toFixed(0)}%</strong></span>
                <span>Directness: <strong className="text-slate-200">{claim.directness}</strong></span>
              </div>
            </div>

            <p className="text-slate-100 text-sm font-medium leading-relaxed font-sans">
              "{claim.claim_text}"
            </p>

            {/* Conflict Note if any */}
            {claim.conflict_notes && (
              <div className="bg-amber-950/30 border border-amber-900/50 rounded-xl p-3 text-xs text-amber-200 font-sans">
                <strong>CRITIC Contradiction Flag:</strong> {claim.conflict_notes}
              </div>
            )}

            {/* Source Tags */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Supporting:</span>
                {claim.supporting_sources.length > 0 ? (
                  claim.supporting_sources.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded text-[11px]">
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-600">None</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-500">Contradicting:</span>
                {claim.contradicting_sources.length > 0 ? (
                  claim.contradicting_sources.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded text-[11px]">
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-600">None</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
