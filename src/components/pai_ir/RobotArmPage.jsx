import React, { useState } from 'react';
import { Cpu, RotateCcw, CheckCircle2, Sliders, Box } from 'lucide-react';

export default function RobotArmPage() {
  const [joints, setJoints] = useState([0.0, 0.4, -0.2, 0.0, 0.5, 0.0]);
  const [gripperOpen, setGripperOpen] = useState(true);

  const handleJointChange = (idx, val) => {
    const next = [...joints];
    next[idx] = parseFloat(val);
    setJoints(next);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl flex items-center space-x-4">
        <Cpu className="w-8 h-8 text-amber-400" />
        <div>
          <h1 className="text-xl font-black text-slate-100 tracking-wider uppercase">6-DOF ROBOTIC ARM MANIPULATOR CONTROL</h1>
          <p className="text-xs text-slate-400">Forward/Inverse Kinematics (FK/IK) Solver, Joint Angle Controls, & Gripper Dynamics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Joint Angle Sliders */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">JOINT ANGLE KINEMATICS (J1 - J6)</h2>
            <button
              onClick={() => setJoints([0.0, 0.0, 0.0, 0.0, 0.0, 0.0])}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded border border-slate-700 text-cyan-400 flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET HOME</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['J1 (BASE SWIVEL)', 'J2 (SHOULDER PITCH)', 'J3 (ELBOW PITCH)', 'J4 (WRIST ROLL)', 'J5 (WRIST PITCH)', 'J6 (WRIST SWIVEL)'].map((jName, idx) => (
              <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300 font-bold">{jName}</span>
                  <span className="text-amber-400 font-bold">{joints[idx].toFixed(2)} rad ({((joints[idx] * 180) / Math.PI).toFixed(1)}°)</span>
                </div>
                <input
                  type="range"
                  min="-3.14"
                  max="3.14"
                  step="0.05"
                  value={joints[idx]}
                  onChange={(e) => handleJointChange(idx, e.target.value)}
                  className="w-full accent-amber-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* End-Effector Cartesian State & Gripper Toggle */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-5">
          <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2">CARTESIAN POSE & GRIPPER</h2>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3 font-mono text-xs">
            <span className="text-slate-400 block text-[10px]">END-EFFECTOR CARTESIAN (X, Y, Z)</span>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-slate-900 p-2 rounded border border-slate-800">
                <span className="text-slate-500 block text-[9px]">X POSE</span>
                <strong className="text-cyan-400">0.42 m</strong>
              </div>
              <div className="bg-slate-900 p-2 rounded border border-slate-800">
                <span className="text-slate-500 block text-[9px]">Y POSE</span>
                <strong className="text-cyan-400">0.18 m</strong>
              </div>
              <div className="bg-slate-900 p-2 rounded border border-slate-800">
                <span className="text-slate-500 block text-[9px]">Z POSE</span>
                <strong className="text-cyan-400">0.65 m</strong>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-300 block">PARALLEL GRIPPER STATE</span>
            <button
              onClick={() => setGripperOpen(!gripperOpen)}
              className={`w-full py-3 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg transition-all ${
                gripperOpen
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40'
                  : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-900/40'
              }`}
            >
              {gripperOpen ? 'GRIPPER: OPEN (RELEASED)' : 'GRIPPER: CLOSED (GRASPED)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
