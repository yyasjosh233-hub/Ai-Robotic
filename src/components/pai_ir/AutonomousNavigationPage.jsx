import React, { useState } from 'react';
import { Navigation, ShieldAlert, MapPin, Gauge, Activity, RefreshCcw } from 'lucide-react';

export default function AutonomousNavigationPage({ worldState }) {
  const [safetyBuffer, setSafetyBuffer] = useState(1.5);
  const [targetX, setTargetX] = useState(2.0);
  const [targetY, setTargetY] = useState(1.0);

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl flex items-center space-x-4">
        <Navigation className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-xl font-black text-slate-100 tracking-wider uppercase">AUTONOMOUS NAVIGATION & NAV2 CONTROL</h1>
          <p className="text-xs text-slate-400">SLAM Mapping, Human-Aware Dynamic Obstacle Avoidance, & Trajectory Replanning</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SLAM Map Viewport */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-2xl space-y-4 h-[480px] relative overflow-hidden">
          <div className="flex justify-between items-center z-10 relative">
            <span className="text-xs font-mono font-bold text-blue-400">NAV2 COSTMAP & HUMAN SAFETY ZONE</span>
            <span className="px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold rounded">
              COLLISION RISK: LOW
            </span>
          </div>

          {/* Grid Map Simulation Canvas */}
          <div className="w-full h-[380px] bg-slate-900 rounded-lg border border-slate-800 relative flex items-center justify-center">
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>

            {/* Robot AMR Marker */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-blue-600/40 border-2 border-blue-400 flex items-center justify-center text-white font-bold text-[10px] shadow-lg shadow-blue-500/50">
                AMR
              </div>
              <span className="text-[10px] font-mono text-blue-300 mt-1">X: 2.5m, Y: 1.2m</span>
            </div>

            {/* Human Avatar Marker with Safety Buffer Zone */}
            <div className="absolute top-1/3 right-1/4 flex flex-col items-center">
              {/* Safety Ring */}
              <div
                className="rounded-full border-2 border-red-500/60 bg-red-500/10 flex items-center justify-center animate-pulse"
                style={{ width: `${safetyBuffer * 90}px`, height: `${safetyBuffer * 90}px` }}
              >
                <div className="h-6 w-6 rounded-full bg-purple-600 border border-purple-300 flex items-center justify-center text-[9px] font-bold">
                  H1
                </div>
              </div>
              <span className="text-[10px] font-mono text-purple-300 mt-1">HUMAN (DIST: 2.2m)</span>
            </div>

            {/* Waypoint Target */}
            <div className="absolute bottom-1/4 left-2/3 flex flex-col items-center">
              <MapPin className="w-6 h-6 text-emerald-400 animate-bounce" />
              <span className="text-[10px] font-mono text-emerald-300">GOAL WAYPOINT</span>
            </div>
          </div>
        </div>

        {/* Navigation Control Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-5">
          <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2">HUMAN-AWARE PARAMETERS</h2>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-2">
              <span>HUMAN SAFETY ZONE RADIUS:</span>
              <strong className="text-red-400">{safetyBuffer} meters</strong>
            </div>
            <input
              type="range"
              min="0.8"
              max="3.0"
              step="0.1"
              value={safetyBuffer}
              onChange={(e) => setSafetyBuffer(parseFloat(e.target.value))}
              className="w-full accent-red-500"
            />
          </div>

          <div className="space-y-3 bg-slate-950 p-4 rounded-lg border border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase block">SET GOAL COORDINATES</span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 block">TARGET X (m)</label>
                <input
                  type="number"
                  value={targetX}
                  onChange={(e) => setTargetX(parseFloat(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block">TARGET Y (m)</label>
                <input
                  type="number"
                  value={targetY}
                  onChange={(e) => setTargetY(parseFloat(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200"
                />
              </div>
            </div>
            <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded shadow transition-all">
              SEND NAV2 WAYPOINT GOAL
            </button>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between text-slate-400">
              <span>AMR MAX VELOCITY:</span>
              <strong className="text-slate-200">1.5 m/s</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>HUMAN PROXIMITY SLOWDOWN:</span>
              <strong className="text-amber-400">0.4 m/s</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>PATH REPLANNING:</span>
              <strong className="text-emerald-400">0.2s DYNAMIC</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
