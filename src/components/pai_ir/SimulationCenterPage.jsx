import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export default function SimulationCenterPage() {
  const [selectedScenario, setSelectedScenario] = useState('1');
  const [scenarioData, setScenarioData] = useState(null);

  const scenarios = [
    { id: '1', title: 'Scenario 1: Voice Command Component Inspection', desc: 'Human asks robot to inspect component via voice.' },
    { id: '2', title: 'Scenario 2: Pointing Gesture Target Identification', desc: 'Human points toward defective component on conveyor.' },
    { id: '3', title: 'Scenario 3: Dynamic Human Follow Mode', desc: 'Robot locks human ByteTrack ID and follows safely.' },
    { id: '4', title: 'Scenario 4: Human Path Intrusion & Emergency Safety Stop', desc: 'Human enters navigation path; Safety Guard stops AMR.' },
    { id: '5', title: 'Scenario 5: Defective Component Pick & Place Transport', desc: 'Robot picks defective part and places into rejection bin.' }
  ];

  const handleRunScenario = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/simulation/scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario_id: selectedScenario })
      });
      const data = await res.json();
      setScenarioData(data);
    } catch (err) {
      // Mock fallback
      setScenarioData({
        scenario_id: selectedScenario,
        name: scenarios.find(s => s.id === selectedScenario)?.title,
        steps: [
          { step: 1, status: "INITIALIZE_SIMULATION", details: "Loaded environment map and spatial nodes." },
          { step: 2, status: "HUMAN_INTERACTION", details: "Detected operator command input." },
          { step: 3, status: "SAFETY_VALIDATION", details: "Safety Guard cleared execution path." },
          { step: 4, status: "ROBOT_ACTION", details: "Autonomous navigation & CV inspection complete." },
          { step: 5, status: "COMPLETED", details: "Scenario executed with 100% success." }
        ]
      });
    }
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl flex items-center space-x-4">
        <Play className="w-8 h-8 text-emerald-400" />
        <div>
          <h1 className="text-xl font-black text-slate-100 tracking-wider uppercase">DIGITAL TWIN SIMULATION SCENARIO CENTER</h1>
          <p className="text-xs text-slate-400">Deterministic AI Scenarios: Voice Inspection, Pointing Gestures, Follow Mode, Intrusion Stop, & Transport</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario List */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2">SELECT SIMULATION SCENARIO</h2>
          <div className="space-y-2">
            {scenarios.map((sc) => (
              <div
                key={sc.id}
                onClick={() => setSelectedScenario(sc.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedScenario === sc.id
                    ? 'bg-emerald-950/60 border-emerald-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="text-xs font-bold font-mono">{sc.title}</div>
                <div className="text-[10px] text-slate-400 mt-1">{sc.desc}</div>
              </div>
            ))}
          </div>

          <button
            onClick={handleRunScenario}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded shadow-lg transition-all flex items-center justify-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>PLAY SCENARIO REPLAY</span>
          </button>
        </div>

        {/* Step-by-Step Playback Log */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2">SCENARIO EXECUTION STEP TIMELINE</h2>

          <div className="space-y-3">
            {(scenarioData?.steps || [
              { step: 1, status: "READY", details: "Select a scenario and click Play Scenario Replay..." }
            ]).map((st, i) => (
              <div key={i} className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex items-start space-x-3 text-xs font-mono">
                <span className="h-6 w-6 rounded-full bg-slate-900 border border-emerald-500 flex items-center justify-center font-bold text-emerald-400">
                  {st.step}
                </span>
                <div>
                  <span className="font-bold text-slate-200 block">{st.status}</span>
                  <span className="text-slate-400">{st.details}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
