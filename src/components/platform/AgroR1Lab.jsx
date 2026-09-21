import React, { useState } from 'react'
import { 
  Activity, Cpu, Radio, ShieldAlert, CheckCircle2, Zap, Clock, 
  MapPin, Eye, AlertTriangle, Layers, Sliders, Play, RotateCcw, FileText, Check, X
} from 'lucide-react'

export default function AgroR1Lab({ workspaceId, initialTab = 'overview' }) {
  const [activeTab, setActiveTab] = useState(initialTab || 'overview')
  const [estopActive, setEstopActive] = useState(false)
  const [approvedTasks, setApprovedTasks] = useState({})

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'live-status', label: 'Live Status' },
    { id: 'mission-monitor', label: 'Mission Monitor' },
    { id: 'ros2-nodes', label: 'ROS 2 Nodes' },
    { id: 'ros2-topics', label: 'ROS 2 Topics' },
    { id: 'sensor-monitoring', label: 'Sensor Monitoring' },
    { id: 'ai-vision', label: 'AI Vision' },
    { id: 'decision-timeline', label: 'Decision Timeline' },
    { id: 'human-approval', label: 'Human Approval' },
    { id: 'robot-events', label: 'Robot Events' },
    { id: 'ask-about-robot', label: 'Ask About Robot' }
  ]

  const specs = [
    { label: 'Drive system:', value: '4WD Skid-Steer Electric Drive' },
    { label: 'AI Processor:', value: 'NVIDIA Jetson AGX Orin (275 TOPS, 64GB)' },
    { label: 'LiDAR sensor:', value: 'Ouster OS1 3D LiDAR (64 Channels)' },
    { label: 'Cameras:', value: 'Dual Intel RealSense D435i depth cameras' },
    { label: 'Payload:', value: '60L Chemical Spray Tank (solenoid valves)' },
    { label: 'Standard runtime:', value: '8 Hours continuous operations' }
  ]

  const handleApproveTask = (id, approved) => {
    setApprovedTasks(prev => ({ ...prev, [id]: approved ? 'APPROVED' : 'REJECTED' }))
  }

  return (
    <div className="space-y-6 font-sans text-slate-100">
      
      {/* 1. TOP HEADER & TITLE BOX (Matching Screenshot 1:1) */}
      <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
            AGRO-R1 Intelligence Lab
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans">
            Real-time agricultural rover operations cockpit, sensor feeds, node health diagnostics, and explainable decision records.
          </p>
        </div>

        {/* Header Badges */}
        <div className="flex items-center gap-3 font-mono">
          <span className="px-3.5 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-xs font-bold flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            ROBOT: AGRO-R1
          </span>
          <button
            onClick={() => setEstopActive(!estopActive)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              estopActive
                ? 'bg-rose-600 text-white border border-rose-400 animate-pulse'
                : 'bg-amber-950/80 hover:bg-amber-900/80 text-yellow-400 border border-yellow-700/80'
            }`}
          >
            {estopActive ? '✓ E-STOP RESET' : 'BLOCK / E-STOP'}
          </button>
        </div>
      </div>

      {/* 2. SUB-TAB SELECTOR BAR (Matching Screenshot 1:1 - 11 Sub-tabs) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 font-mono text-xs no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#facc15] text-black shadow-lg shadow-yellow-500/20 border border-yellow-400'
                : 'bg-[#080d1a] text-slate-300 border border-slate-800 hover:text-white hover:bg-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. TAB CONTENTS */}

      {/* --- TAB 1: OVERVIEW (Matching Screenshot 1:1) --- */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono">
          
          {/* Left Box: AGRO-R1 SPECIFICATIONS */}
          <div className="p-6 rounded-2xl bg-[#080e18] border border-slate-800/90 space-y-5">
            <h2 className="text-sm font-extrabold text-slate-200 tracking-wider uppercase border-b border-slate-800/80 pb-3">
              AGRO-R1 SPECIFICATIONS
            </h2>

            <div className="space-y-4 text-xs">
              {specs.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-800/40 pb-2.5">
                  <span className="text-slate-400 font-medium">{item.label}</span>
                  <span className="text-white font-bold text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Box: PHYSICAL PROFILE MAPPING */}
          <div className="p-6 rounded-2xl bg-[#080e18] border border-slate-800/90 space-y-4">
            <h2 className="text-sm font-extrabold text-slate-200 tracking-wider uppercase border-b border-slate-800/80 pb-3 font-mono">
              PHYSICAL PROFILE MAPPING
            </h2>

            {/* Media Container with Image */}
            <div className="w-full h-[320px] rounded-xl overflow-hidden border border-slate-800 relative bg-slate-950">
              <img 
                src="/assets/microelectronics_processor-Rygh1gBd.png" 
                alt="Physical Hardware Profile" 
                className="w-full h-full object-cover opacity-90 hover:scale-105 transition-all duration-500" 
              />
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-cyan-500/40 text-cyan-400 text-xs font-mono font-bold">
                NVIDIA JETSON AGX ORIN HARDWARE DIAGNOSTICS: OK
              </div>
            </div>
          </div>

        </div>
      )}

      {/* --- TAB 2: LIVE STATUS --- */}
      {activeTab === 'live-status' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-5 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-1">
            <div className="text-slate-400 font-bold uppercase text-[10px]">Battery Charge</div>
            <div className="text-3xl font-extrabold text-emerald-400">88%</div>
            <div className="text-slate-400">Balancing Cell Voltage</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-1">
            <div className="text-slate-400 font-bold uppercase text-[10px]">Rover Ground Speed</div>
            <div className="text-3xl font-extrabold text-cyan-400">1.4 m/s</div>
            <div className="text-emerald-400">Nominal Spray Velocity</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-1">
            <div className="text-slate-400 font-bold uppercase text-[10px]">Motor Current Draw</div>
            <div className="text-3xl font-extrabold text-[#facc15]">12.4 A</div>
            <div className="text-slate-400">4WD Skid Drive</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-1">
            <div className="text-slate-400 font-bold uppercase text-[10px]">GPS RTK Fix</div>
            <div className="text-3xl font-extrabold text-emerald-400">±1.2 cm</div>
            <div className="text-emerald-400">Sub-Centimeter Precision</div>
          </div>
        </div>
      )}

      {/* --- TAB 3: MISSION MONITOR --- */}
      {activeTab === 'mission-monitor' && (
        <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-5 font-mono text-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <span>Active Agro Mission #892 — Vineyard Sector 4 Spraying</span>
            </h2>
            <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold">
              68% COMPLETED
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 w-[68%]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-slate-400 text-[10px]">Waypoints Reached</div>
              <div className="text-lg font-bold text-white">14 / 20 Waypoints</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-slate-400 text-[10px]">Area Covered</div>
              <div className="text-lg font-bold text-emerald-400">4.2 Hectares</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-slate-400 text-[10px]">Spray Dispensed</div>
              <div className="text-lg font-bold text-[#facc15]">28.4 Liters</div>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 4: ROS 2 NODES --- */}
      {activeTab === 'ros2-nodes' && (
        <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4 font-mono text-xs">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <span>AGRO-R1 Active ROS 2 Node Health Matrix</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase">
                  <th className="py-2 px-3">Node Handle</th>
                  <th className="py-2 px-3">Executor Domain</th>
                  <th className="py-2 px-3">Rate (Hz)</th>
                  <th className="py-2 px-3">CPU Usage</th>
                  <th className="py-2 px-3">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-slate-300">
                <tr className="hover:bg-slate-900/50">
                  <td className="py-2.5 px-3 font-bold text-cyan-400">/agro_r1/nav2_controller</td>
                  <td className="py-2.5 px-3">Navigation Stack</td>
                  <td className="py-2.5 px-3">50 Hz</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">4.2%</td>
                  <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">RUNNING</span></td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="py-2.5 px-3 font-bold text-cyan-400">/agro_r1/lidar_slam_node</td>
                  <td className="py-2.5 px-3">Ouster OS1 SLAM</td>
                  <td className="py-2.5 px-3">20 Hz</td>
                  <td className="py-2.5 px-3 text-cyan-400 font-bold">12.8%</td>
                  <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">RUNNING</span></td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="py-2.5 px-3 font-bold text-cyan-400">/agro_r1/realsense_yolo_node</td>
                  <td className="py-2.5 px-3">YOLOv11 Vision</td>
                  <td className="py-2.5 px-3">30 Hz</td>
                  <td className="py-2.5 px-3 text-[#facc15] font-bold">18.5%</td>
                  <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">RUNNING</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- TAB 5: ROS 2 TOPICS --- */}
      {activeTab === 'ros2-topics' && (
        <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4 font-mono text-xs">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Radio className="w-5 h-5 text-cyan-400" />
            <span>Active Telemetry Topics Stream</span>
          </h2>
          <div className="space-y-2">
            {[
              { topic: '/agro_r1/joint_states', type: 'sensor_msgs/msg/JointState', bw: '14.2 KB/s' },
              { topic: '/agro_r1/cmd_vel', type: 'geometry_msgs/msg/Twist', bw: '2.1 KB/s' },
              { topic: '/agro_r1/scan', type: 'sensor_msgs/msg/LaserScan', bw: '128.0 KB/s' }
            ].map((t, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="font-bold text-cyan-400">{t.topic}</span>
                <span className="text-slate-400">{t.type}</span>
                <span className="text-emerald-400 font-bold">{t.bw}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 6: SENSOR MONITORING --- */}
      {activeTab === 'sensor-monitoring' && (
        <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4 font-mono text-xs">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#facc15]" />
            <span>Multi-Sensor Waveform Monitoring</span>
          </h2>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
            LiDAR Point Cloud Density: <span className="text-cyan-400 font-bold">655,360 points/sec (Stable)</span>
          </div>
        </div>
      )}

      {/* --- TAB 7: AI VISION --- */}
      {activeTab === 'ai-vision' && (
        <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4 font-mono text-xs">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-pink-400" />
            <span>Agricultural Crop & Weed AI Camera Stream</span>
          </h2>
          <div className="w-full h-[300px] rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative">
            <img src="/assets/agricultural_robot-CsfUqPxz.png" alt="Agro Rover" className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* --- TAB 8: DECISION TIMELINE --- */}
      {activeTab === 'decision-timeline' && (
        <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4 font-mono text-xs">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#facc15]" />
            <span>Explainable AI Decision Audit Records</span>
          </h2>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-cyan-400 font-bold">19:42:10 — OBSTACLE_AVOIDANCE</div>
              <p className="text-slate-300 font-sans">Rerouted 0.4m around irrigation pipe detected via RealSense depth sensor.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-emerald-400 font-bold">19:40:02 — SOLENOID_TRIGGER</div>
              <p className="text-slate-300 font-sans">Activated 1.2L spray dosage over Sector 4B following weed confidence alert (96.4%).</p>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 9: HUMAN APPROVAL --- */}
      {activeTab === 'human-approval' && (
        <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4 font-mono text-xs">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <span>Human-in-the-Loop Operations Approval Queue</span>
          </h2>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="font-bold text-white">Spray High-Concentration Fungicide in Sector 4C</div>
              <div className="text-slate-400 text-[11px]">Requires Operator Confirmation</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleApproveTask(1, true)}
                className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black font-bold flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Approve</span>
              </button>
              <button
                onClick={() => handleApproveTask(1, false)}
                className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reject</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 10: ROBOT EVENTS --- */}
      {activeTab === 'robot-events' && (
        <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4 font-mono text-xs">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <span>System Diagnostic Event Log</span>
          </h2>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
            [INFO] 19:35:00 — AGRO-R1 Nav2 controller initialized with sub-centimeter RTK GPS fix.
          </div>
        </div>
      )}

      {/* --- TAB 11: ASK ABOUT ROBOT --- */}
      {activeTab === 'ask-about-robot' && (
        <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 text-center space-y-4 font-mono text-xs">
          <h2 className="text-base font-bold text-white">Ask AI Copilot About AGRO-R1</h2>
          <p className="text-slate-400 font-sans max-w-md mx-auto">
            Use the Robotics AI Copilot to ask questions about telemetry, sensor calibration, or Nav2 costmap parameters.
          </p>
        </div>
      )}

    </div>
  )
}
