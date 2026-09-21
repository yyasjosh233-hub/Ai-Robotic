import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, Sliders, Key } from 'lucide-react';

export default function SettingsPage() {
  const [systemMode, setSystemMode] = useState('SIMULATION');
  const [apiKey, setApiKey] = useState('sk-pai-ir-demo-key-2026');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl flex items-center space-x-4">
        <Settings className="w-8 h-8 text-cyan-400" />
        <div>
          <h1 className="text-xl font-black text-slate-100 tracking-wider uppercase">PAI-IR PLATFORM CONFIGURATION & SETTINGS</h1>
          <p className="text-xs text-slate-400">Execution Mode Selection, API Credentials, Camera Calibration, & Sensitivity Controls</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-6 max-w-2xl">
        {saved && (
          <div className="bg-emerald-950 border border-emerald-800 text-emerald-400 p-3 rounded-lg text-xs font-bold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs font-sans">
          <div>
            <label className="text-slate-300 font-bold block mb-1">EXECUTION DEPLOYMENT MODE</label>
            <select
              value={systemMode}
              onChange={(e) => setSystemMode(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-200"
            >
              <option value="SIMULATION">SIMULATION (Full Digital Twin & Mock Sensors)</option>
              <option value="LOCAL_DEV">LOCAL DEV MODE</option>
              <option value="ROS2_HARDWARE">ROS 2 HUMBLE HARDWARE MODE</option>
              <option value="EDGE_AI">NVIDIA JETSON EDGE AI MODE</option>
            </select>
          </div>

          <div>
            <label className="text-slate-300 font-bold block mb-1">AI / VLM API KEY CREDENTIAL</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-200 font-mono"
            />
          </div>

          <button
            type="submit"
            className="py-2.5 px-6 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider rounded shadow-lg transition-all flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>SAVE CONFIGURATION</span>
          </button>
        </form>
      </div>
    </div>
  );
}
