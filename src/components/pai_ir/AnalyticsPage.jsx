import React from 'react';
import { BarChart3, TrendingUp, CheckCircle2, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export default function AnalyticsPage() {
  const kpis = [
    { label: "TASKS COMPLETED", val: "142", sub: "98% Success Rate", color: "text-emerald-400" },
    { label: "TOTAL INSPECTIONS", val: "312", sub: "18 Defects Found", color: "text-purple-400" },
    { label: "PASS RATE", val: "94.2%", sub: "+1.8% vs last week", color: "text-cyan-400" },
    { label: "HUMAN INTERACTIONS", val: "89", sub: "100% Safety Compliant", color: "text-amber-400" },
    { label: "TOTAL NAV DISTANCE", val: "1,248.5 m", sub: "Avg 1.2 m/s speed", color: "text-blue-400" },
    { label: "SAFETY STOPS", val: "2", sub: "0 Collisions", color: "text-emerald-400" },
    { label: "AI INFERENCE FPS", val: "30.2 FPS", sub: "TensorRT INT8 optimized", color: "text-indigo-400" },
    { label: "SYSTEM UPTIME", val: "99.94%", sub: "Zero Unplanned Downtime", color: "text-slate-200" }
  ];

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl flex items-center space-x-4">
        <BarChart3 className="w-8 h-8 text-emerald-400" />
        <div>
          <h1 className="text-xl font-black text-slate-100 tracking-wider uppercase">PAI-IR SYSTEM ANALYTICS & OPERATIONAL KPIs</h1>
          <p className="text-xs text-slate-400">Production Metrics, Quality Inspection Pass/Fail Ratios, AI Inference Benchmarks, & Uptime</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((k, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{k.label}</span>
            <span className={`text-2xl font-black my-2 ${k.color}`}>{k.val}</span>
            <span className="text-[10px] text-slate-500 font-mono">{k.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
