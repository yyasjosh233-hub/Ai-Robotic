import React, { useState } from 'react'
import { Radio, Sparkles, Activity, ShieldCheck, Eye, Cpu, Zap, RefreshCw } from 'lucide-react'
import { explainMyFactoryTelemetry } from '../../services/aiProvider'

export default function AIFactoryStoryteller() {
  const [telemetryReport, setTelemetryReport] = useState(explainMyFactoryTelemetry())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setTelemetryReport(explainMyFactoryTelemetry())
      setIsRefreshing(false)
    }, 600)
  }

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl glass-panel border border-cyan-500/40 bg-gradient-to-r from-slate-950 via-[#091326] to-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-wide">
                AI FACTORY STORYTELLER — "EXPLAIN MY FACTORY"
              </h2>
              <p className="text-xs font-mono text-cyan-300">
                REAL-TIME TELEMETRY REASONING & NATURAL LANGUAGE STORYTELLING
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs font-mono flex items-center gap-2 shadow-lg"
        >
          {isRefreshing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          <span>RE-ANALYZE FACTORY STATE</span>
        </button>
      </div>

      {/* Main Executive Summary Panel */}
      <div className="p-8 rounded-3xl glass-panel border border-cyan-500/30 bg-slate-950 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs">
          <span className="text-cyan-400 font-bold uppercase flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>EXECUTIVE FACTORY OPERATIONAL REPORT</span>
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px]">
            {telemetryReport.statusTag}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-cyan-200 text-sm font-semibold font-mono leading-relaxed shadow-lg">
          "{telemetryReport.summary}"
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-cyan-400 font-bold flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Production & Robotics Activity</span>
            </div>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">{telemetryReport.productionState}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-emerald-400 font-bold flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>AI Computer Vision Quality QA</span>
            </div>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">{telemetryReport.qualityState}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-amber-400 font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Safety & Compliance Overwatch</span>
            </div>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">{telemetryReport.safetyState}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-blue-400 font-bold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>Autonomous Logistics & AMRs</span>
            </div>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">{telemetryReport.logisticsState}</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 font-mono text-xs flex justify-between items-center">
          <span className="text-slate-400">Neural World Model v2.0 Decision Stream:</span>
          <span className="text-cyan-300 font-bold">{telemetryReport.aiDecisions}</span>
        </div>
      </div>

    </div>
  )
}
