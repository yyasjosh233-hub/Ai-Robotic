import React from 'react';
import { Shield, AlertTriangle, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';

export default function SafetyCenterPage({ robotStatus, onTriggerEstop, onResetEstop }) {
  const events = [
    { id: 1, type: "PROXIMITY_SLOWDOWN", severity: "WARN", desc: "Human approached within 1.4m safety buffer. Speed throttled to 0.4 m/s.", time: "10:12:15" },
    { id: 2, type: "E_STOP_TRIGGERED", severity: "CRITICAL", desc: "Hardware Emergency Stop depressed by operator.", time: "09:55:12" },
    { id: 3, type: "BOUNDS_CHECK", severity: "NORMAL", desc: "Workspace safety envelope verified.", time: "08:30:00" }
  ];

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center space-x-4">
          <Shield className="w-8 h-8 text-emerald-400" />
          <div>
            <h1 className="text-xl font-black text-slate-100 tracking-wider uppercase">INDEPENDENT SAFETY GUARD & E-STOP CONTROL</h1>
            <p className="text-xs text-slate-400">Deterministic Safety Validation Layer, Proximity Audit Logs, & Emergency Controls</p>
          </div>
        </div>

        <div className="flex space-x-3 mt-4 md:mt-0">
          <button
            onClick={onResetEstop}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition-all"
          >
            <RefreshCw className="w-4 h-4 text-cyan-400" />
            <span>RESET STANDBY</span>
          </button>
          <button
            onClick={onTriggerEstop}
            className="flex items-center space-x-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-lg shadow-lg shadow-red-900/50 border border-red-500 animate-pulse"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>TRIGGER E-STOP</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Safety Rules */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2">ENFORCED SAFETY CONSTRAINTS</h2>
          <div className="space-y-3 font-mono text-xs">
            <div className="bg-slate-950 p-3 rounded border border-slate-800 flex justify-between">
              <span className="text-slate-400">MIN HUMAN PROXIMITY:</span>
              <strong className="text-emerald-400">0.8 meters</strong>
            </div>
            <div className="bg-slate-950 p-3 rounded border border-slate-800 flex justify-between">
              <span className="text-slate-400">MAX AMR SPEED:</span>
              <strong className="text-cyan-400">1.2 m/s</strong>
            </div>
            <div className="bg-slate-950 p-3 rounded border border-slate-800 flex justify-between">
              <span className="text-slate-400">WORKSPACE BOUNDS X:</span>
              <strong className="text-purple-400">[-15m, +15m]</strong>
            </div>
            <div className="bg-slate-950 p-3 rounded border border-slate-800 flex justify-between">
              <span className="text-slate-400">WORKSPACE BOUNDS Y:</span>
              <strong className="text-purple-400">[-15m, +15m]</strong>
            </div>
            <div className="bg-slate-950 p-3 rounded border border-slate-800 flex justify-between">
              <span className="text-slate-400">AI OVERRIDE:</span>
              <strong className="text-emerald-400">SAFETY GUARD HAS 100% PRIORITY</strong>
            </div>
          </div>
        </div>

        {/* Safety Event Audit Log */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2">PROXIMITY & SAFETY AUDIT LOG</h2>
          <div className="space-y-2">
            {events.map((ev) => (
              <div key={ev.id} className="bg-slate-950 border border-slate-800 p-3 rounded-lg flex items-start justify-between text-xs font-mono">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className={`w-4 h-4 mt-0.5 ${ev.severity === 'CRITICAL' ? 'text-red-400' : 'text-amber-400'}`} />
                  <div>
                    <span className="font-bold text-slate-200 block">{ev.type}</span>
                    <span className="text-slate-400">{ev.desc}</span>
                  </div>
                </div>
                <span className="text-slate-500">{ev.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
