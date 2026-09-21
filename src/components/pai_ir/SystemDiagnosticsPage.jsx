import React from 'react';
import { Cpu, Server, Network, Zap, CheckCircle2 } from 'lucide-react';

export default function SystemDiagnosticsPage() {
  const nodes = [
    { name: "/pai_bringup_node", type: "LifecycleNode", status: "ACTIVE", hz: "100 Hz" },
    { name: "/pai_perception_yolo", type: "Subscriber/Publisher", status: "ACTIVE", hz: "30 Hz" },
    { name: "/pai_hri_gesture_node", type: "ActionServer", status: "ACTIVE", hz: "30 Hz" },
    { name: "/pai_nav2_human_aware", type: "ActionServer", status: "ACTIVE", hz: "20 Hz" },
    { name: "/pai_arm_kinematics_node", type: "ServiceServer", status: "ACTIVE", hz: "50 Hz" },
    { name: "/pai_safety_guard_node", type: "LifecycleNode", status: "ACTIVE", hz: "100 Hz" }
  ];

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl flex items-center space-x-4">
        <Server className="w-8 h-8 text-indigo-400" />
        <div>
          <h1 className="text-xl font-black text-slate-100 tracking-wider uppercase">SYSTEM DIAGNOSTICS & ROS 2 TOPOLOGY</h1>
          <p className="text-xs text-slate-400">ROS 2 Node Graph, Lifecycle State Management, NPU/GPU Power Modes, & Latency</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2">ACTIVE ROS 2 NODE GRAPH TOPOLOGY</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nodes.map((n, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-lg space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-cyan-400">{n.name}</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                  {n.status}
                </span>
              </div>
              <div className="text-[10px] text-slate-400">TYPE: {n.type}</div>
              <div className="text-[10px] text-slate-400">PUBLISH RATE: {n.hz}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
