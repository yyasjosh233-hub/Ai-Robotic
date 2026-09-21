import React, { useState, useEffect } from 'react';
import { Activity, Shield, Cpu, Wifi, BatteryCharging, AlertTriangle, Play, Square, RefreshCw, Zap, CheckCircle2 } from 'lucide-react';

export default function CommandCenter({ robotStatus, onTriggerEstop, onResetEstop, activeTask }) {
  const [telemetry, setTelemetry] = useState({
    battery: 94,
    cpu: 28.5,
    gpu: 42.1,
    latency: 12,
    ros2_status: "HEALTHY",
    safety_state: "NORMAL"
  });

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Top Banner & Emergency Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl backdrop-blur-md">
        <div>
          <div className="flex items-center space-x-3">
            <span className="h-3 w-3 rounded-full bg-emerald-500 animate-ping"></span>
            <h1 className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 uppercase">
              PAI-IR Command Center
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
              SIMULATION MODE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Physical AI Industrial Autonomous Robotics Platform — Human-Interactive Autonomous Control
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button
            onClick={onResetEstop}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-all duration-200"
          >
            <RefreshCw className="w-4 h-4 text-cyan-400" />
            <span>Reset Standby</span>
          </button>
          <button
            onClick={onTriggerEstop}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-black text-sm tracking-wider uppercase shadow-lg shadow-red-900/40 border border-red-500 transition-all duration-200 animate-pulse"
          >
            <AlertTriangle className="w-5 h-5" />
            <span>EMERGENCY STOP</span>
          </button>
        </div>
      </div>

      {/* Hardware Telemetry Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {[
          { label: 'ROBOT STATE', val: robotStatus?.status || 'ONLINE', color: 'text-emerald-400', border: 'border-emerald-800' },
          { label: 'ROS 2 NODE', val: 'HEALTHY', color: 'text-cyan-400', border: 'border-cyan-800' },
          { label: 'AI ENGINE', val: 'ACTIVE', color: 'text-purple-400', border: 'border-purple-800' },
          { label: 'VISION HRI', val: 'ACTIVE', color: 'text-indigo-400', border: 'border-indigo-800' },
          { label: 'NAV2 ENGINE', val: 'READY', color: 'text-blue-400', border: 'border-blue-800' },
          { label: 'MANIPULATOR', val: 'READY', color: 'text-amber-400', border: 'border-amber-800' },
          { label: 'SAFETY GUARD', val: robotStatus?.safety || 'NORMAL', color: robotStatus?.safety === 'EMERGENCY_STOP' ? 'text-red-400' : 'text-emerald-400', border: 'border-slate-800' },
          { label: 'LATENCY', val: '12 ms', color: 'text-slate-300', border: 'border-slate-800' },
        ].map((item, idx) => (
          <div key={idx} className={`bg-slate-900/90 border ${item.border} rounded-lg p-3 shadow-lg flex flex-col justify-between`}>
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{item.label}</span>
            <span className={`text-sm font-black mt-1 ${item.color}`}>{item.val}</span>
          </div>
        ))}
      </div>

      {/* Main Grid: Active Task + Hardware Resource Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Task Card */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">ACTIVE AUTONOMOUS TASK PLAN</h2>
            </div>
            <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold rounded-md">
              STATE: {activeTask?.state || 'IDLE'}
            </span>
          </div>

          <div className="bg-slate-950 rounded-lg p-4 border border-slate-800/80 space-y-3">
            <div className="flex justify-between text-xs text-slate-400">
              <span>TASK ID: <strong className="text-slate-200">{activeTask?.id || 'TASK-IDLE'}</strong></span>
              <span>INTENT: <strong className="text-cyan-400">{activeTask?.intent || 'STANDBY'}</strong></span>
            </div>
            <div className="text-sm font-semibold text-slate-200 bg-slate-900/80 p-3 rounded border border-slate-800">
              "{activeTask?.command || 'System idle. Waiting for human voice or gesture command...'}"
            </div>

            {/* Task Step Timeline */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-400 uppercase">EXECUTION STEPS:</span>
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {(activeTask?.steps || [
                  { step: 1, action: "WAIT_FOR_HUMAN_COMMAND", target: "HRI_INPUT" },
                  { step: 2, action: "VALIDATE_SAFETY_GUARD", target: "SAFETY_LAYER" }
                ]).map((st, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-900 px-3 py-1.5 rounded border border-slate-800 text-xs">
                    <span className="text-slate-400 font-mono">Step {st.step}: <strong className="text-emerald-300">{st.action}</strong></span>
                    <span className="text-slate-500 font-mono">{st.target || st.inspection_type || 'COMPLETED'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Resource Gauges & Jetson Status */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Cpu className="w-5 h-5 text-purple-400" />
            <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">SYSTEM HARDWARE SPECS</h2>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>CPU UTILIZATION</span>
                <span className="font-bold text-purple-400">28.5%</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '28.5%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>NVIDIA CUDA / TENSORRT GPU</span>
                <span className="font-bold text-emerald-400">42.1%</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '42.1%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>RAM MEMORY</span>
                <span className="font-bold text-cyan-400">6.4 GB / 16.0 GB</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2">
                <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span>POWER MODE:</span>
                <span className="font-bold text-emerald-400">MAXN (30W)</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>INFERENCE ENGINE:</span>
                <span className="font-bold text-indigo-400">TensorRT INT8</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>ROS 2 DOMAIN ID:</span>
                <span className="font-bold text-slate-200">42</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
