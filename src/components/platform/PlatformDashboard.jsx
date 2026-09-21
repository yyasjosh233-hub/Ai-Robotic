import React from 'react'
import { Activity, Cpu, Eye, ShieldAlert, CheckCircle2, ArrowUpRight, BarChart3, Database, Zap } from 'lucide-react'

export default function PlatformDashboard({ workspaceId, onSelectModule }) {
  const metrics = [
    { title: 'Plant OEE Score', value: '88.4%', detail: 'World-Class Efficiency Standard', color: 'text-cyan-400' },
    { title: 'Active Fleet Count', value: '42 Units', detail: 'AGRO-R1, 6-DOF Cobots, AMRs', color: 'text-sky-400' },
    { title: 'Completed Jobs', value: '434 Tasks', detail: 'Zero Unscheduled Downtime', color: 'text-blue-400' },
    { title: 'Defect Rate (OpenCV)', value: '0.6%', detail: 'Sub-Millimeter Inspection QA', color: 'text-emerald-400' },
  ]

  const modules = [
    { id: 'robotics-path-planner', title: 'Robotics Path Planner', desc: 'Interactive 3D 6-DOF Kinematics, DLS Inverse Kinematics, 120-waypoint trajectory playback.', icon: '🦾' },
    { id: 'quality-inspection', title: 'Automated Quality Inspection', desc: 'Real-time OpenCV defect logging and surface tracking.', icon: '🔍' },
    { id: 'rpa', title: 'Robotic Process Automation (RPA)', desc: 'SCADA PLC triggers and automated industrial task queues.', icon: '⚙️' },
    { id: 'process-mining', title: 'Process Mining & AI Intelligence', desc: 'Process flow charts, bottleneck heatmaps, and OEE optimization.', icon: '🌐' },
    { id: 'digital-twin', title: '3D Digital Twin Platform', desc: 'Real-time physical simulation mirror streaming joint torques.', icon: '🧊' },
    { id: 'edge-ai', title: 'Industrial IoT & Edge AI', desc: 'Sensor node management and 12ms zero-latency edge compute.', icon: '📡' },
    { id: 'computer-vision', title: 'Advanced AI Computer Vision', desc: '120 FPS multi-camera spatial tracking for micro-electronics.', icon: '👁️' },
    { id: 'copilot', title: 'AI Copilot & Multi-Agent AI', desc: 'Root Cause Analysis reports, predictive maintenance, and voice copilot.', icon: '🧠' },
  ]

  return (
    <div className="space-y-8 font-sans">
      
      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">{m.title}</span>
            <div className={`text-3xl font-extrabold font-mono ${m.color}`}>{m.value}</div>
            <p className="text-[11px] text-slate-400">{m.detail}</p>
          </div>
        ))}
      </div>

      {/* Modules Selector Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-widest font-bold">
          INDUSTRIAL AI PLATFORM MODULES
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((mod) => (
            <div
              key={mod.id}
              onClick={() => onSelectModule(mod.id)}
              className="p-5 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-2">
                <div className="text-3xl">{mod.icon}</div>
                <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {mod.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {mod.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs font-mono text-cyan-400 flex items-center justify-between">
                <span>Launch Module</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
