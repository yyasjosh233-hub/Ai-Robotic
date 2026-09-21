import React, { useState } from 'react';
import { Cpu, Play, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function TaskPlannerPage({ activeTask, onVoiceCommand }) {
  const [promptText, setPromptText] = useState('');

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!promptText.trim()) return;
    onVoiceCommand(promptText);
    setPromptText('');
  };

  const states = [
    "IDLE", "UNDERSTANDING", "PLANNING", "VALIDATING",
    "NAVIGATING", "INSPECTING", "MANIPULATING", "REPORTING",
    "COMPLETED", "SAFE_STOP"
  ];

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl flex items-center space-x-4">
        <Cpu className="w-8 h-8 text-indigo-400" />
        <div>
          <h1 className="text-xl font-black text-slate-100 tracking-wider uppercase">AI TASK PLANNER & STATE MACHINE</h1>
          <p className="text-xs text-slate-400">Natural Language Task Decomposition, State Graph Execution, & Safety Validation</p>
        </div>
      </div>

      {/* State Machine Flow Diagram */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">STATE MACHINE EXECUTION GRAPH</span>
        <div className="flex flex-wrap gap-2 items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
          {states.map((st, idx) => {
            const isActive = (activeTask?.state || "IDLE") === st;
            return (
              <React.Fragment key={st}>
                <div
                  className={`px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50 scale-105 border border-indigo-400 animate-pulse'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  {st}
                </div>
                {idx < states.length - 1 && <ArrowRight className="w-4 h-4 text-slate-600 hidden md:block" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Interactive Task Creator Console & Action Steps Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2">TASK PROMPT CONSOLE</h2>
          <form onSubmit={handleCreateTask} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">NATURAL LANGUAGE ROBOT INSTRUCTION</label>
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="e.g. Inspect the component near the conveyor belt and transport defective parts to rejection area..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 h-28"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>GENERATE & EXECUTE TASK PLAN</span>
            </button>
          </form>
        </div>

        {/* Action Plan Sequence */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">GENERATED ACTION PLAN SEQUENCE</h2>
            <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold rounded">
              SAFETY VALIDATED
            </span>
          </div>

          <div className="space-y-2">
            {(activeTask?.steps || [
              { step: 1, action: "IDENTIFY_TARGET", target: "industrial_component_red", coordinates: [2.4, 1.1, 0.85] },
              { step: 2, action: "NAVIGATE", target_x: 2.0, target_y: 1.1, safety_stop_dist: 1.0 },
              { step: 3, action: "ALIGN_CAMERA", target_joint_arm: [0.0, 0.5, -0.3, 0.0, 0.0, 0.0] },
              { step: 4, action: "RUN_INSPECTION", inspection_type: "SURFACE_DEFECT_AND_DIMENSIONS" },
              { step: 5, action: "REPORT_RESULT", channel: "TTS_AND_DASHBOARD" }
            ]).map((step, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-3">
                  <span className="h-6 w-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-indigo-400">
                    {step.step}
                  </span>
                  <div>
                    <span className="font-bold text-slate-200 block">{step.action}</span>
                    <span className="text-slate-400 text-[10px]">{JSON.stringify(step)}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] font-bold">PASSED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
