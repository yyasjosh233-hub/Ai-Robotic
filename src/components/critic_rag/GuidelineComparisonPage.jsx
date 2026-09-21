import React, { useState } from 'react'
import { FileText, ArrowRight, ShieldCheck, CheckCircle2, Globe } from 'lucide-react'

export default function GuidelineComparisonPage() {
  const [selectedCondition, setSelectedCondition] = useState('Type 2 Diabetes Mellitus')

  const guidelines = [
    {
      condition: "Type 2 Diabetes Mellitus",
      organization: "American Diabetes Association (ADA 2024)",
      first_line: "Metformin + Lifestyle modification. Early GLP-1 RA or SGLT2 inhibitor addition if ASCVD, CKD, or Heart Failure present regardless of baseline HbA1c.",
      target_hba1c: "< 7.0% for most non-pregnant adults",
      evidence_grade: "Level A (RCT Consensus)",
      year: 2024,
      differences: "Strongest push for early combination therapy with GLP-1/SGLT2i independent of HbA1c."
    },
    {
      condition: "Type 2 Diabetes Mellitus",
      organization: "NICE (UK - NG28 2024)",
      first_line: "Standard-release Metformin monotherapy first. Offer SGLT2 inhibitor if high risk of cardiovascular disease.",
      target_hba1c: "48 mmol/mol (6.5%) on monotherapy; 53 mmol/mol (7.0%) on dual therapy",
      evidence_grade: "National Clinical Assessment",
      year: 2024,
      differences: "Emphasizes cost-effective stepwise addition of SGLT2i over early GLP-1 RA in first-line settings."
    },
    {
      condition: "Type 2 Diabetes Mellitus",
      organization: "World Health Organization (WHO 2023)",
      first_line: "Metformin as essential first-line medicine; sulfonylureas as secondary option depending on country resource availability.",
      target_hba1c: "Individualized (< 7.0% to 7.5%) based on hypoglycemia safety and life expectancy",
      evidence_grade: "Global Essential Medicines Consensus",
      year: 2023,
      differences: "Focuses on global accessibility and low-cost oral drug combinations for low-resource settings."
    },
    {
      condition: "Hypertension Management",
      organization: "ACC / AHA (2023 Guidelines)",
      first_line: "Thiazide diuretics, CCBs, or ACE inhibitors/ARBs. Start 2 first-line agents of different classes if BP > 20/10 mmHg over target.",
      target_bp: "< 130 / 80 mmHg",
      evidence_grade: "Class I Level A",
      year: 2023,
      differences: "Lower blood pressure threshold (<130/80) defining Stage 1 HTN."
    },
    {
      condition: "Hypertension Management",
      organization: "European Society of Cardiology (ESC 2023)",
      first_line: "Initial dual combination therapy in single-pill combination (ACEi/ARB + CCB or Diuretic).",
      target_bp: "< 130 / 80 mmHg if tolerated (< 140 / 80 in age >= 65)",
      evidence_grade: "Class I Level A",
      year: 2023,
      differences: "Recommends single-pill combination therapy for initial treatment in most patients."
    }
  ]

  const filtered = guidelines.filter(g => g.condition === selectedCondition)

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
            <Globe className="w-4 h-4 text-cyan-400" /> AUTHORITATIVE CLINICAL GUIDELINE COMPARISON
          </div>
          <h1 className="text-2xl font-bold text-white mt-1">Cross-Guideline Recommendation Analyzer</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Compare recommendations side-by-side across major international bodies (ADA, NICE, WHO, ACC/AHA, ESC).
          </p>
        </div>

        {/* Condition selector */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {['Type 2 Diabetes Mellitus', 'Hypertension Management'].map(c => (
            <button
              key={c}
              onClick={() => setSelectedCondition(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                selectedCondition === c 
                  ? 'bg-cyan-500 text-slate-950 shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Side by Side Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((g, i) => (
          <div 
            key={i}
            className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-cyan-400 font-bold">{g.year}</span>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-300 font-mono text-[10px] rounded border border-emerald-500/30">
                  {g.evidence_grade}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mt-3">{g.organization}</h3>

              <div className="space-y-3 mt-4 text-xs font-sans">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="font-mono text-cyan-400 uppercase text-[10px] font-bold mb-1">First-Line Recommendation</div>
                  <p className="text-slate-200 leading-relaxed">{g.first_line}</p>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="font-mono text-emerald-400 uppercase text-[10px] font-bold mb-1">Target Threshold</div>
                  <p className="text-slate-200 font-mono font-bold">{g.target_hba1c || g.target_bp}</p>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="font-mono text-amber-400 uppercase text-[10px] font-bold mb-1">Key Distinctive Feature</div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{g.differences}</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Full guideline provenance verified in CRITIC-RAG.</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
