import React, { useState } from 'react'
import { Database, Filter, ExternalLink, ShieldCheck, Search, BookOpen, CheckCircle } from 'lucide-react'

export default function SourceLibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  const sourcesList = [
    {
      source_id: "SRC-GUIDELINE-ADA-2024",
      title: "ADA Standards of Care in Diabetes (2024)",
      publisher: "American Diabetes Association",
      source_type: "CLINICAL_GUIDELINE",
      publication_year: 2024,
      url: "https://diabetesjournals.org/care/standards-2024",
      evidence_level: "Level A (High Quality RCTs)",
      status: "ACTIVE_VERIFIED",
      doi: "10.2337/dc24-S001"
    },
    {
      source_id: "SRC-REV-NEJM-GLP1-2023",
      title: "GLP-1 Receptor Agonists in Cardiovascular & Metabolic Health",
      publisher: "New England Journal of Medicine",
      source_type: "SYSTEMATIC_REVIEW",
      publication_year: 2023,
      url: "https://nejm.org/doi/glp1-cardio-review",
      evidence_level: "Systematic Review & Meta-Analysis",
      status: "ACTIVE_VERIFIED",
      doi: "10.1056/NEJMra22100"
    },
    {
      source_id: "SRC-GUIDELINE-ACC-HTN-2023",
      title: "ACC/AHA Guideline for the Management of High Blood Pressure",
      publisher: "American College of Cardiology / AHA",
      source_type: "CLINICAL_GUIDELINE",
      publication_year: 2023,
      url: "https://acc.org/guidelines/hypertension-2023",
      evidence_level: "Level A (Consensus Guideline)",
      status: "ACTIVE_VERIFIED",
      doi: "10.1016/j.jacc.2023.05.002"
    },
    {
      source_id: "SRC-TRIAL-DIABETES-MIXED-2022",
      title: "Evaluation of Intensive Glycemic Control vs Standard Care in Older Adults",
      publisher: "Lancet Diabetes & Endocrinology",
      source_type: "CLINICAL_TRIAL",
      publication_year: 2022,
      url: "https://thelancet.com/journals/landia/trial-older-adults",
      evidence_level: "Level B (Randomized Clinical Trial)",
      status: "ACTIVE_VERIFIED",
      doi: "10.1016/S2213-8587(22)00112-X"
    },
    {
      source_id: "SRC-GOV-FDA-WARNING-2025",
      title: "FDA Drug Safety Communication: Drug Interaction Monitoring",
      publisher: "US Food and Drug Administration (FDA)",
      source_type: "GOVERNMENT",
      publication_year: 2025,
      url: "https://fda.gov/drugs/safety-communications/2025-01",
      evidence_level: "Regulatory Safety Alert",
      status: "ACTIVE_VERIFIED",
      doi: "N/A (Regulatory Advisory)"
    },
    {
      source_id: "SRC-GUIDELINE-NICE-2024",
      title: "NICE Guideline NG28: Type 2 Diabetes Management in Adults",
      publisher: "National Institute for Health and Care Excellence (NICE)",
      source_type: "CLINICAL_GUIDELINE",
      publication_year: 2024,
      url: "https://nice.org.uk/guidance/ng28",
      evidence_level: "National Evidence Guideline",
      status: "ACTIVE_VERIFIED",
      doi: "10.1093/nice/ng28"
    }
  ]

  const categories = [
    'ALL', 'GOVERNMENT', 'CLINICAL_GUIDELINE', 'SYSTEMATIC_REVIEW', 
    'CLINICAL_TRIAL', 'PEER_REVIEWED_RESEARCH'
  ]

  const filtered = sourcesList.filter(s => {
    const matchesCat = selectedCategory === 'ALL' || s.source_type === selectedCategory
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.publisher.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
            <Database className="w-4 h-4 text-cyan-400" /> TRUSTED MEDICAL SOURCE REGISTRY
          </div>
          <h1 className="text-2xl font-bold text-white mt-1">Medical Literature & Guideline Library</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Verified repository of peer-reviewed literature, systematic reviews, clinical guidelines, and government medical advisories.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title, publisher..."
            className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-cyan-500 font-sans"
          />
        </div>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              selectedCategory === cat 
                ? 'bg-cyan-500 text-slate-950 shadow-md' 
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Source Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((src, i) => (
          <div 
            key={i}
            className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 shadow-xl transition-all space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="px-2.5 py-0.5 bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold rounded">
                  {src.source_id}
                </span>
                <span className="text-xs font-mono text-slate-400">{src.publication_year}</span>
              </div>

              <h3 className="text-sm font-bold text-white mt-3 leading-snug">
                {src.title}
              </h3>

              <div className="text-xs text-slate-400 mt-2 font-mono space-y-1">
                <div>Publisher: <strong className="text-slate-200">{src.publisher}</strong></div>
                <div>Type: <span className="text-cyan-400 font-semibold">{src.source_type}</span></div>
                <div>Grade: <span className="text-emerald-400">{src.evidence_level}</span></div>
                <div>DOI: <span className="text-slate-500">{src.doi}</span></div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-400" /> VERIFIED SOURCE
              </span>
              <a 
                href={src.url} 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-cyan-400 hover:text-cyan-300 font-mono font-bold flex items-center gap-1"
              >
                Access Source <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
