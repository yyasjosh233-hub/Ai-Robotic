import React, { useState, useEffect } from 'react';
import { 
  Zap, Brain, Cpu, Shield, Activity, RefreshCw, Layers, Sparkles, 
  Radio, Eye, AlertTriangle, CheckCircle2, Play, Users, BarChart3, 
  ArrowRight, Server, Box, Move
} from 'lucide-react';

export default function FrontierPhysicalAIPage() {
  const [frontierData, setFrontierData] = useState(null);
  const [tactileData, setTactileData] = useState(null);
  const [realityGap, setRealityGap] = useState(null);
  const [maintenance, setMaintenance] = useState(null);
  const [fleet, setFleet] = useState(null);
  const [skills, setSkills] = useState(null);
  const [predictiveSim, setPredictiveSim] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFrontierState = async () => {
    setLoading(true);
    try {
      const [resStatus, resTac, resGap, resMaint, resFleet, resSkills] = await Promise.all([
        fetch('http://localhost:8000/api/v2/frontier-status').then(r => r.json()),
        fetch('http://localhost:8000/api/v2/tactile').then(r => r.json()),
        fetch('http://localhost:8000/api/v2/reality-gap').then(r => r.json()),
        fetch('http://localhost:8000/api/v2/predictive-maintenance').then(r => r.json()),
        fetch('http://localhost:8000/api/v2/fleet').then(r => r.json()),
        fetch('http://localhost:8000/api/v2/skills').then(r => r.json()),
      ]);

      setFrontierData(resStatus);
      setTactileData(resTac);
      setRealityGap(resGap);
      setMaintenance(resMaint);
      setFleet(resFleet);
      setSkills(resSkills);
    } catch (e) {
      console.warn("Frontier API offline mode");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFrontierState();
    const interval = setInterval(fetchFrontierState, 4000);
    return () => clearInterval(interval);
  }, []);

  const runPredictiveSim = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/v2/predictive-simulation', { method: 'POST' });
      const data = await res.json();
      setPredictiveSim(data);
    } catch (e) {
      console.warn("Error running predictive simulation");
    }
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans p-1">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-purple-950 border border-cyan-800/60 p-6 rounded-2xl shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-cyan-600/20 border border-cyan-500 rounded-xl text-cyan-400">
            <Zap className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded bg-cyan-900/80 text-cyan-300 font-mono text-[10px] font-bold uppercase tracking-widest border border-cyan-700">
                FRONTIER ENGINE v2.0
              </span>
              <span className="px-2.5 py-0.5 rounded bg-purple-900/80 text-purple-300 font-mono text-[10px] font-bold uppercase tracking-widest border border-purple-700">
                CLOSED-LOOP ROBOT LEARNING
              </span>
            </div>
            <h1 className="text-xl font-black tracking-wide text-white uppercase mt-1">
              PAI-IR v2.0 FRONTIER PHYSICAL AI ENGINE
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              World Model 2.0 • Active Perception • Tactile Intelligence • Whole-Body Control • Sim-to-Real
            </p>
          </div>
        </div>

        <button
          onClick={fetchFrontierState}
          className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg shadow-cyan-900/40 transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Telemetry</span>
        </button>
      </div>

      {/* Humanoid Physical AI Robot Image Showcase */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="md:w-1/2 space-y-3">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold uppercase tracking-wider border border-cyan-500/40">
              PAI-IR v2.0 HUMANOID MODEL
            </span>
            <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold uppercase tracking-wider border border-emerald-500/40">
              ACTIVE TELEMETRY
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-wide">
            PAI-IR v2.0 Physical AI Humanoid Robot
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Full-body humanoid robot architecture featuring zero-moment point balance stabilization, 
            multispectral active perception cameras, 45kg payload arm kinematics, and direct CRITIC-RAG clinical evidence verification.
          </p>

          <div className="grid grid-cols-3 gap-3 font-mono text-xs pt-2">
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
              <div className="text-slate-400 text-[10px]">DOF</div>
              <div className="text-cyan-400 font-bold text-sm">32 Joint Articulations</div>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
              <div className="text-slate-400 text-[10px]">Active Vision</div>
              <div className="text-emerald-400 font-bold text-sm">60 FPS Multispectral</div>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
              <div className="text-slate-400 text-[10px]">CRITIC Bridge</div>
              <div className="text-purple-400 font-bold text-sm">Verified Grounded</div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 relative w-full h-[320px] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center group">
          <img 
            src="/assets/pai_robot_v2.jpg" 
            alt="PAI-IR v2.0 Humanoid Robot" 
            className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 px-3 py-1.5 rounded-lg text-[10px] font-mono text-cyan-300 font-bold">
            PAI-IR-V2.0-MED-07 • ONLINE
          </div>
        </div>
      </div>

      {/* Grid of Frontier Physical AI Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


        {/* 1. WORLD MODEL 2.0 & UNCERTAINTY */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-cyan-400">
                <Brain className="w-5 h-5" />
                <h3 className="font-bold text-sm">Robot World Model 2.0</h3>
              </div>
              <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-800">
                ACTIVE
              </span>
            </div>

            <div className="mt-4 space-y-2.5 text-xs font-mono">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between">
                <span className="text-slate-400">Spatial State:</span>
                <span className="text-emerald-400 font-bold">14 Entities Tracked</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between">
                <span className="text-slate-400">Dynamic Velocity:</span>
                <span className="text-purple-400 font-bold">Conveyor @ 0.25 m/s</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between">
                <span className="text-slate-400">Observation Uncertainty:</span>
                <span className="text-amber-400 font-bold">0.06 (Confidence: 0.94)</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono italic">
            Source: RGB-D Camera + Lidar AMCL Fusion
          </div>
        </div>

        {/* 2. PREDICTIVE SIMULATION ROLLOUTS */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-purple-400">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-bold text-sm">Predictive Simulation Engine</h3>
              </div>
              <span className="text-[10px] font-mono bg-purple-950 text-purple-400 px-2 py-0.5 rounded border border-purple-800">
                SIMULATION PREDICTION
              </span>
            </div>

            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Evaluates future trajectories (Future A, B, C) in simulation before action execution.
            </p>

            {predictiveSim && (
              <div className="mt-3 bg-slate-950 p-2.5 rounded-lg border border-purple-900/40 text-xs font-mono space-y-1">
                <div className="text-purple-300 font-bold">{predictiveSim.selected_future}</div>
                <div className="text-slate-400 text-[11px]">{predictiveSim.decision}</div>
              </div>
            )}
          </div>

          <button
            onClick={runPredictiveSim}
            className="mt-4 w-full py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-purple-900/30 flex items-center justify-center space-x-2"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Simulate 3 Future Rollouts</span>
          </button>
        </div>

        {/* 3. TACTILE & FORCE INTELLIGENCE */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-amber-400">
                <Radio className="w-5 h-5" />
                <h3 className="font-bold text-sm">Tactile & Force Intelligence</h3>
              </div>
              <span className="text-[10px] font-mono bg-amber-950 text-amber-400 px-2 py-0.5 rounded border border-amber-800">
                {tactileData?.mode || 'TACTILE SIMULATION MODE'}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[10px] block">NORMAL FORCE</span>
                <span className="text-amber-400 font-bold text-sm">{tactileData?.total_normal_force_N || 18.6} N</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[10px] block">SLIP STATUS</span>
                <span className={`font-bold text-sm ${tactileData?.slip_detected ? 'text-red-400' : 'text-emerald-400'}`}>
                  {tactileData?.grip_stability || 'STABLE'}
                </span>
              </div>
            </div>

            {/* 4x4 Tactile Matrix Visualizer */}
            <div className="mt-3 bg-slate-950 p-2 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 block mb-1">4x4 GRIPPER PRESSURE MATRIX (kPa)</span>
              <div className="grid grid-cols-4 gap-1 text-center font-mono text-[10px]">
                {(tactileData?.tactile_matrix_4x4_kPa || [[1,2,3,4],[2,3,4,2],[1,3,2,1],[0,1,1,0]]).map((row, r) =>
                  row.map((val, c) => (
                    <div key={`${r}-${c}`} className="bg-amber-950/60 text-amber-300 py-1 rounded border border-amber-900/40">
                      {val.toFixed(1)}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 4. WHOLE-BODY CONTROLLER */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-emerald-400">
                <Cpu className="w-5 h-5" />
                <h3 className="font-bold text-sm">Whole-Body Controller</h3>
              </div>
              <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                ONLINE
              </span>
            </div>

            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Kinodynamically coordinates AMR Base, 6-DOF Arm, Wrist, and Gripper simultaneously.
            </p>

            <div className="mt-3 space-y-2 text-xs font-mono">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between">
                <span className="text-slate-400">Base Coordination:</span>
                <span className="text-emerald-400 font-bold">vx: 0.35 m/s, vy: 0.12 m/s</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between">
                <span className="text-slate-400">Arm Joint Limits:</span>
                <span className="text-cyan-400 font-bold">WITHIN BOUNDS (6 DOF)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. SIM-TO-REAL REALITY GAP MONITOR */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-cyan-400">
                <Layers className="w-5 h-5" />
                <h3 className="font-bold text-sm">Reality Gap Monitor</h3>
              </div>
              <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-800">
                SIM-TO-REAL-TO-SIM
              </span>
            </div>

            <div className="mt-4 bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Simulation Prediction:</span>
                <span className="text-slate-200">X: 2.50, Y: 1.20, Z: 0.80</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Real Observation:</span>
                <span className="text-cyan-300">X: 2.47, Y: 1.22, Z: 0.79</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-2 text-emerald-400 font-bold">
                <span>Gap Difference:</span>
                <span>Err: {realityGap?.difference?.euclidean_error_m || 0.0361} m</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6. PREDICTIVE MAINTENANCE */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-blue-400">
                <Activity className="w-5 h-5" />
                <h3 className="font-bold text-sm">Predictive Maintenance</h3>
              </div>
              <span className="text-[10px] font-mono bg-blue-950 text-blue-400 px-2 py-0.5 rounded border border-blue-800">
                {maintenance?.mode || 'Rule-Based Diagnostic Mode'}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[10px] block">HEALTH SCORE</span>
                <span className="text-emerald-400 font-bold text-base">{maintenance?.health_score_pct || 100.0}%</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[10px] block">FAILURE RISK</span>
                <span className="text-cyan-400 font-bold text-base">{maintenance?.failure_risk || 'LOW'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7. MULTI-ROBOT FLEET COORDINATOR */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between col-span-1 md:col-span-2 lg:col-span-3">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-purple-400">
                <Users className="w-5 h-5" />
                <h3 className="font-bold text-sm">Multi-Robot Physical AI Fleet Coordinator</h3>
              </div>
              <span className="text-[10px] font-mono bg-purple-950 text-purple-400 px-3 py-1 rounded-full border border-purple-800">
                SHARED WORLD MODEL SYNC (10Hz)
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between font-bold text-cyan-400 mb-2">
                  <span>🤖 AMR-01 (Humanoid)</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded">ONLINE</span>
                </div>
                <div className="text-slate-300">Task: Quality Inspection</div>
                <div className="text-slate-400 text-[11px] mt-1">Location: Station A</div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between font-bold text-amber-400 mb-2">
                  <span>🤖 AMR-02 (Logistics)</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded">ONLINE</span>
                </div>
                <div className="text-slate-300">Task: Component Transport</div>
                <div className="text-slate-400 text-[11px] mt-1">Location: Conveyor Belt 2</div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between font-bold text-purple-400 mb-2">
                  <span>🦾 ARM-01 (Manipulator)</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded">ONLINE</span>
                </div>
                <div className="text-slate-300">Task: Assembly Pick-Place</div>
                <div className="text-slate-400 text-[11px] mt-1">Location: Workcell 1</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
