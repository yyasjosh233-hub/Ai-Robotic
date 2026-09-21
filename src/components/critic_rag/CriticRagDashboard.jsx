import React, { useState } from 'react'
import { 
  Sparkles, Search, ShieldCheck, CheckCircle2, Database, Globe, Calendar, 
  GitCompare, User, Bot, Activity, Bug, ArrowLeft
} from 'lucide-react'

import MedicalQueryPage from './MedicalQueryPage'
import CriticAnalysisPage from './CriticAnalysisPage'
import SourceLibraryPage from './SourceLibraryPage'
import GuidelineComparisonPage from './GuidelineComparisonPage'
import EvidenceTimelinePage from './EvidenceTimelinePage'
import ConflictMapPage from './ConflictMapPage'
import PatientContextPage from './PatientContextPage'
import MedicalRobotPage from './MedicalRobotPage'
import SystemDiagnosticsPage from './SystemDiagnosticsPage'
import RedTeamEvalPage from './RedTeamEvalPage'

export default function CriticRagDashboard({ onBackToSite }) {
  const [activeTab, setActiveTab] = useState('medical-query')

  const navItems = [
    { id: 'medical-query', label: 'Medical Query', icon: Search },
    { id: 'critic-analysis', label: 'Critic Analysis', icon: ShieldCheck },
    { id: 'source-library', label: 'Source Library', icon: Database },
    { id: 'guideline-comparison', label: 'Guideline Comparison', icon: Globe },
    { id: 'evidence-timeline', label: 'Evidence Timeline', icon: Calendar },
    { id: 'conflict-map', label: 'Conflict Map', icon: GitCompare },
    { id: 'patient-context', label: 'Patient Context', icon: User },
    { id: 'medical-robot', label: 'PAI-IR v2.0 Robot', icon: Bot },
    { id: 'diagnostics', label: 'Diagnostics', icon: Activity },
    { id: 'red-team-eval', label: 'Red-Team Evaluation', icon: Bug }
  ]

  const renderActiveView = () => {
    switch (activeTab) {
      case 'medical-query':
        return <MedicalQueryPage onNavigateTab={(tab) => setActiveTab(tab)} />
      case 'critic-analysis':
        return <CriticAnalysisPage />
      case 'source-library':
        return <SourceLibraryPage />
      case 'guideline-comparison':
        return <GuidelineComparisonPage />
      case 'evidence-timeline':
        return <EvidenceTimelinePage />
      case 'conflict-map':
        return <ConflictMapPage />
      case 'patient-context':
        return <PatientContextPage />
      case 'medical-robot':
        return <MedicalRobotPage />
      case 'diagnostics':
        return <SystemDiagnosticsPage />
      case 'red-team-eval':
        return <RedTeamEvalPage />
      default:
        return <MedicalQueryPage onNavigateTab={(tab) => setActiveTab(tab)} />
    }
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Header Navigation Bar */}
      <header className="bg-slate-950/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBackToSite && (
            <button 
              onClick={onBackToSite}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-mono flex items-center gap-1.5 border border-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" /> Main Platform
            </button>
          )}

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-slate-950 font-bold text-sm shadow-md shadow-cyan-500/20">
              ⚡
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-wide font-mono flex items-center gap-2">
                CRITIC-RAG <span className="text-[10px] px-2 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded font-mono font-normal">Medical Evidence Platform</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Verification Badge */}
        <div className="hidden sm:flex items-center gap-3 font-mono text-xs text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" /> VERIFICATION ENGINE ONLINE
          </span>
        </div>
      </header>

      {/* Sub-Navigation Tabs Bar matching user screenshot image */}
      <div className="bg-[#090e1a] border-b border-slate-800/90 px-4 lg:px-8 py-2.5 overflow-x-auto scrollbar-thin">
        <div className="flex items-center gap-2 min-w-max">
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2.5 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/30 font-bold ring-1 ring-cyan-400/40'
                    : 'bg-[#0e1626] text-slate-300 hover:bg-slate-800/90 hover:text-white border border-slate-800/90'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>


      {/* Main Content Workspace */}
      <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
        {renderActiveView()}
      </main>

    </div>
  )
}
