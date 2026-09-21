import React from 'react';
import { Brain, Cpu, Database, Eye, Navigation, Shield, Layers, FileText, CheckCircle2 } from 'lucide-react';

export default function AIBrainPage() {
  const subsystems = [
    { name: "VISION ENGINE", provider: "YOLOv8 + MediaPipe", status: "ACTIVE", confidence: 96, icon: Eye, color: "text-purple-400", border: "border-purple-800" },
    { name: "LANGUAGE & INTENT", provider: "IntentEngine slot parser", status: "ACTIVE", confidence: 98, icon: Brain, color: "text-cyan-400", border: "border-cyan-800" },
    { name: "WORLD MODEL", provider: "Dynamic Spatial State", status: "SYNCED", confidence: 99, icon: Layers, color: "text-emerald-400", border: "border-emerald-800" },
    { name: "TASK PLANNER", provider: "Finite State Machine", status: "READY", confidence: 95, icon: Cpu, color: "text-indigo-400", border: "border-indigo-800" },
    { name: "NAVIGATION ENGINE", provider: "Nav2 Human-Aware", status: "READY", confidence: 94, icon: Navigation, color: "text-blue-400", border: "border-blue-800" },
    { name: "MANIPULATION", provider: "6-DOF Kinematics Solver", status: "READY", confidence: 92, icon: Cpu, color: "text-amber-400", border: "border-amber-800" },
    { name: "ROBOT MEMORY", provider: "SQLite Audit Logger", status: "ONLINE", confidence: 100, icon: Database, color: "text-slate-300", border: "border-slate-800" },
    { name: "SAFETY GUARD", provider: "Deterministic Proximity", status: "ACTIVE", confidence: 100, icon: Shield, color: "text-emerald-400", border: "border-emerald-800" },
  ];

  const auditDecisions = [
    { id: "DEC-8091", command: "Inspect that component", intent: "INSPECT", target: "industrial_component_red", rationale: "Matched operator pointing ray vector intersection", confidence: 0.96, validation: "PASSED", time: "10:14:08" },
    { id: "DEC-8090", command: "Follow me", intent: "FOLLOW_ME", target: "PERSON_01", rationale: "Locked ByteTrack human ID and calculated 1.8m safe trail", confidence: 0.95, validation: "PASSED", time: "10:10:45" },
    { id: "DEC-8089", command: "Emergency stop", intent: "EMERGENCY", target: "SYSTEM", rationale: "Immediate hardware safety override requested", confidence: 0.99, validation: "PASSED", time: "09:55:12" }
  ];

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl flex items-center space-x-4">
        <Brain className="w-8 h-8 text-purple-400" />
        <div>
          <h1 className="text-xl font-black text-slate-100 tracking-wider uppercase">AI BRAIN & REASONING CENTER</h1>
          <p className="text-xs text-slate-400">Multimodal VLM/LLM Reasoning, Intent Classification, & Auditable Action Graph</p>
        </div>
      </div>

      {/* Subsystems Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {subsystems.map((sub, idx) => {
          const IconComp = sub.icon;
          return (
            <div key={idx} className={`bg-slate-900 border ${sub.border} rounded-xl p-4 shadow-xl space-y-3`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <IconComp className={`w-5 h-5 ${sub.color}`} />
                  <span className="text-xs font-bold text-slate-200 tracking-wide uppercase">{sub.name}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950 text-emerald-400 border border-slate-800">
                  {sub.status}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">{sub.provider}</div>
              <div>
                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                  <span>CONFIDENCE</span>
                  <span className="font-bold text-slate-200">{sub.confidence}%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1.5">
                  <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${sub.confidence}%` }}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Auditable Decision Records */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
          <FileText className="w-5 h-5 text-cyan-400" />
          <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">AUDITABLE AI DECISION LOG</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950 font-mono">
                <th className="p-3">DECISION ID</th>
                <th className="p-3">HUMAN COMMAND</th>
                <th className="p-3">DETECTED INTENT</th>
                <th className="p-3">TARGET</th>
                <th className="p-3">STRUCTURED RATIONALE</th>
                <th className="p-3">CONFIDENCE</th>
                <th className="p-3">SAFETY CHECK</th>
                <th className="p-3">TIMESTAMP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
              {auditDecisions.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40">
                  <td className="p-3 text-cyan-400 font-bold">{row.id}</td>
                  <td className="p-3 font-semibold text-slate-100">"{row.command}"</td>
                  <td className="p-3 text-purple-300 font-bold">{row.intent}</td>
                  <td className="p-3 text-amber-300">{row.target}</td>
                  <td className="p-3 text-slate-300">{row.rationale}</td>
                  <td className="p-3 text-emerald-400 font-bold">{(row.confidence * 100).toFixed(0)}%</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {row.validation}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
