import React, { useState, useEffect } from 'react'
import { 
  BarChart3, Play, Pause, Flame, Ruler, Zap, Search, Clock, 
  CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, Layers, 
  Cpu, FileCode, Check, Filter, Sparkles, Sliders, Activity, RotateCcw, Copy
} from 'lucide-react'

export default function ProcessMining({ workspaceId }) {
  const [activeTab, setActiveTab] = useState('discovery')
  
  // Replay tab interactive states
  const [isReplaying, setIsReplaying] = useState(false)
  const [replaySpeed, setReplaySpeed] = useState(1)
  const [replayProgress, setReplayProgress] = useState(35)
  const [activeReplayStep, setActiveReplayStep] = useState(2)

  // Recommendation applied state
  const [appliedRecs, setAppliedRecs] = useState({})

  // Generator tab state
  const [selectedTemplate, setSelectedTemplate] = useState('bypass-quality')
  const [isGenerating, setIsGenerating] = useState(false)
  const [codeCopied, setCodeCopied] = useState(false)
  const [deploySuccess, setDeploySuccess] = useState(false)

  // Replay timer loop
  useEffect(() => {
    let interval = null
    if (isReplaying) {
      interval = setInterval(() => {
        setReplayProgress((prev) => {
          if (prev >= 100) {
            setIsReplaying(false)
            return 100
          }
          const next = prev + 2 * replaySpeed
          setActiveReplayStep(Math.min(4, Math.floor((next / 100) * 5)))
          return next
        })
      }, 300)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isReplaying, replaySpeed])

  const subTabs = [
    { id: 'discovery', label: 'AI Process Discovery', icon: '🔍' },
    { id: 'replay', label: 'Process Replay & Recording', icon: '▶' },
    { id: 'bottlenecks', label: 'Bottlenecks & Heatmap', icon: '🔥' },
    { id: 'conformance', label: 'Conformance Checking', icon: '📐' },
    { id: 'generator', label: 'AI Auto Workflow Generator', icon: '⚡' }
  ]

  const toggleApplyRec = (id) => {
    setAppliedRecs(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleGenerateCode = () => {
    setIsGenerating(true)
    setDeploySuccess(false)
    setTimeout(() => {
      setIsGenerating(false)
    }, 800)
  }

  const handleCopyCode = () => {
    setCodeCopied(true)
    setTimeout(() => setCodeCopied(false), 2000)
  }

  const handleDeploy = () => {
    setDeploySuccess(true)
    setTimeout(() => setDeploySuccess(false), 4000)
  }

  const generatedCodeSnippets = {
    'bypass-quality': `import rclpy
from rclpy.node import Node
from std_msgs.msg import String, Float32
from sensor_msgs.msg import Image

class AutonomousQualityBypassNode(Node):
    def __init__(self):
        super().__init__('ai_quality_bypass_controller')
        self.camera_sub = self.create_subscription(Image, '/camera/inspection/raw', self.inspect_callback, 10)
        self.dispatch_pub = self.create_publisher(String, '/rpa/auto_dispatch/trigger', 10)
        self.get_logger().info("AI Process Mining Core v4.2: Quality Bypass Pipeline Initialized")

    def inspect_callback(self, msg):
        # OpenCV Inference Pipeline matching 100% confidence SLA
        confidence = 0.994
        if confidence >= 0.98:
            out_msg = String()
            out_msg.data = 'BYPASS_MANUAL_QUEUE:PASSED'
            self.dispatch_pub.publish(out_msg)
            self.get_logger().info("Quality passed via OpenCV camera: Eliminating 14.4h queuing delay")

def main(args=None):
    rclpy.init(args=args)
    node = AutonomousQualityBypassNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()`,

    'auto-dispatch': `# Auto Dispatch RPA Workflow Blueprint
version: '4.2'
name: 'Autonomous Manifest Sign-off'
trigger:
  event: 'inventory.validated'
  min_confidence: 1.00
actions:
  - step: 1
    type: 'sign_shipping_manifest'
    bot: 'Week 3 RPA Bot'
  - step: 2
    type: 'notify_amr_fleet'
    destination: 'Dock 4'
    priority: 'HIGH'
  - step: 3
    type: 'log_process_mining_telemetry'
    case_status: 'CLOSED_OPTIMIZED'`,

    'rework-optimizer': `import time
from agro_r1_sdk import ProcessMiningOptimizer

def handle_exception_rework(case_id):
    mining = ProcessMiningOptimizer(endpoint="http://localhost:8080")
    print(f"[{time.strftime('%H:%M:%S')}] Rework Repair initiated for Case {case_id}")
    mining.reroute_to_automated_station(case_id, station_id="ROBOT_CELL_04")
    return {"status": "REROUTED", "saved_time": "12.8 hrs"}`
  }

  return (
    <div className="space-y-6 font-sans text-slate-100">
      
      {/* 1. TOP HEADER & TITLE BOX (Matching Screenshot 1:1) */}
      <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-extrabold text-cyan-400 tracking-wide flex items-center gap-2">
            <span>🌐</span>
            <span>Process Mining & AI Workflow Intelligence</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans">
            Enterprise Celonis-grade AI Process Discovery, Bottleneck Mining, Conformance Checking, and Autonomous Optimization.
          </p>
        </div>
        <div>
          <button className="px-3.5 py-1.5 rounded-xl bg-cyan-950/70 border border-cyan-700/60 text-cyan-400 text-xs font-mono font-semibold hover:bg-cyan-900/50 cursor-pointer shadow-sm transition-all whitespace-nowrap">
            AI Mining Core v4.2
          </button>
        </div>
      </div>

      {/* 2. SUB-TAB SELECTOR BAR (Matching Screenshot 1:1) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 font-mono text-xs no-scrollbar">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-[#facc15] text-black shadow-lg shadow-yellow-500/20 border border-yellow-400'
                : 'bg-[#080d1a] text-slate-300 border border-slate-800 hover:text-white hover:bg-slate-900'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 3. TOP 4 CARDS ROW (Matching Screenshot 1:1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        
        {/* Card 1: Total Processed Cases */}
        <div className="p-5 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Total Processed Cases
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            48,290
          </div>
          <div className="text-xs text-emerald-400 font-medium">
            +12.4% vs last month
          </div>
        </div>

        {/* Card 2: Avg End-to-End Latency */}
        <div className="p-5 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Avg End-to-End Latency
          </div>
          <div className="text-3xl font-extrabold text-cyan-400 tracking-tight">
            4.2 hours
          </div>
          <div className="text-xs text-emerald-400 font-medium">
            -45 mins optimization
          </div>
        </div>

        {/* Card 3: Conformance Score */}
        <div className="p-5 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Conformance Score
          </div>
          <div className="text-3xl font-extrabold text-[#facc15] tracking-tight">
            94.8%
          </div>
          <div className="text-xs text-emerald-400 font-medium">
            High SLA Compliance
          </div>
        </div>

        {/* Card 4: Detected Bottlenecks */}
        <div className="p-5 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Detected Bottlenecks
          </div>
          <div className="text-3xl font-extrabold text-rose-500 tracking-tight">
            2 Active
          </div>
          <div className="text-xs text-rose-400 font-medium">
            Quality & Manual Repair
          </div>
        </div>

      </div>

      {/* 4. TAB CONTENTS */}

      {/* --- TAB 1: AI PROCESS DISCOVERY (Matching Screenshot 1:1) --- */}
      {activeTab === 'discovery' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Column: Mined Process Variants */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-cyan-400 flex items-center gap-2">
              <span>🌲</span>
              <span>Mined Process Variants</span>
            </h2>

            {/* Variant 1 */}
            <div className="p-5 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4 hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between font-mono">
                <span className="text-sm font-bold text-[#facc15]">
                  Standard Order-to-Fulfill (82% Cases)
                </span>
                <span className="text-sm font-bold text-emerald-400">
                  4.2 hrs
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-3 py-1.5 rounded-lg bg-[#0d2238] text-cyan-300 border border-cyan-800/40 font-medium flex items-center gap-1">
                  Order Intake <span className="text-cyan-500">→</span>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#0d2238] text-cyan-300 border border-cyan-800/40 font-medium flex items-center gap-1">
                  Inventory Check <span className="text-cyan-500">→</span>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#0d2238] text-cyan-300 border border-cyan-800/40 font-medium flex items-center gap-1">
                  Automated Pick <span className="text-cyan-500">→</span>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#3a1523] text-rose-300 border border-rose-800/70 font-semibold flex items-center gap-1 shadow-sm">
                  Quality Inspection <span className="text-rose-400">→</span>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#0d2238] text-cyan-300 border border-cyan-800/40 font-medium">
                  Dispatch
                </span>
              </div>
            </div>

            {/* Variant 2 */}
            <div className="p-5 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4 hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between font-mono">
                <span className="text-sm font-bold text-[#facc15]">
                  Exception Rework Variant (14% Cases)
                </span>
                <span className="text-sm font-bold text-emerald-400">
                  18.6 hrs
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-3 py-1.5 rounded-lg bg-[#0d2238] text-cyan-300 border border-cyan-800/40 font-medium flex items-center gap-1">
                  Order Intake <span className="text-cyan-500">→</span>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#0d2238] text-cyan-300 border border-cyan-800/40 font-medium flex items-center gap-1">
                  Inventory Check <span className="text-cyan-500">→</span>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#0d2238] text-cyan-300 border border-cyan-800/40 font-medium flex items-center gap-1">
                  Manual Inspection <span className="text-cyan-500">→</span>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#3a1523] text-rose-300 border border-rose-800/70 font-semibold flex items-center gap-1 shadow-sm">
                  Rework Repair <span className="text-rose-400">→</span>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#0d2238] text-cyan-300 border border-cyan-800/40 font-medium flex items-center gap-1">
                  Re-Test <span className="text-cyan-500">→</span>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#0d2238] text-cyan-300 border border-cyan-800/40 font-medium">
                  Dispatch
                </span>
              </div>
            </div>

            {/* Variant 3 */}
            <div className="p-5 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4 hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between font-mono">
                <span className="text-sm font-bold text-[#facc15]">
                  Expedited Direct Dispatch (4% Cases)
                </span>
                <span className="text-sm font-bold text-emerald-400">
                  1.1 hrs
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-3 py-1.5 rounded-lg bg-[#0d2238] text-cyan-300 border border-cyan-800/40 font-medium flex items-center gap-1">
                  Express Order <span className="text-cyan-500">→</span>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#0d2238] text-cyan-300 border border-cyan-800/40 font-medium flex items-center gap-1">
                  Automated Pick <span className="text-cyan-500">→</span>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#0d2238] text-cyan-300 border border-cyan-800/40 font-medium">
                  Direct Dispatch
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: AI Workflow Recommendations */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-cyan-400 flex items-center gap-2">
              <span>💡</span>
              <span>AI Workflow Recommendations</span>
            </h2>

            {/* Recommendation 1 */}
            <div className="p-5 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-3 hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-bold text-[#facc15]">
                  1. Bypass Manual Quality Delay
                </h3>
                <button
                  onClick={() => toggleApplyRec(1)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    appliedRecs[1]
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  {appliedRecs[1] ? '✓ Applied' : 'Apply Automation'}
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Automate visual inspection with Week 2 OpenCV camera pipeline to eliminate 14.4 hours of rework queuing.
              </p>
            </div>

            {/* Recommendation 2 */}
            <div className="p-5 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-3 hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-bold text-[#facc15]">
                  2. Auto Dispatch Trigger
                </h3>
                <button
                  onClick={() => toggleApplyRec(2)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    appliedRecs[2]
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  {appliedRecs[2] ? '✓ Applied' : 'Apply Automation'}
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Enable Week 3 RPA bot to auto-sign off shipping manifests once inventory validation hits 100% confidence.
              </p>
            </div>

            {/* Extra AI Insights Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c182b] to-[#080d1a] border border-cyan-500/30 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs font-mono">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Autonomous Optimization Potential</span>
              </div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Applying both recommended AI workflows will decrease plant process latency from <span className="text-white font-bold">4.2 hrs</span> to <span className="text-emerald-400 font-bold">1.8 hrs</span> while boosting overall SLA conformance to <span className="text-[#facc15] font-bold">98.9%</span>.
              </p>
            </div>

          </div>

        </div>
      )}

      {/* --- TAB 2: PROCESS REPLAY & RECORDING --- */}
      {activeTab === 'replay' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Play className="w-5 h-5 text-cyan-400 fill-cyan-400" />
                  <span>Plant Case Execution Simulator</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real-time telemetry playback of ROS 2 joint trajectories & order log events.
                </p>
              </div>

              {/* Replay Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsReplaying(!isReplaying)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                    isReplaying
                      ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-md shadow-cyan-500/20'
                  }`}
                >
                  {isReplaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-black" />}
                  <span>{isReplaying ? 'Pause Replay' : 'Start Replay'}</span>
                </button>

                <button
                  onClick={() => { setReplayProgress(0); setActiveReplayStep(0); }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                  title="Reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <select
                  value={replaySpeed}
                  onChange={(e) => setReplaySpeed(Number(e.target.value))}
                  className="bg-slate-900 text-cyan-400 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold"
                >
                  <option value={1}>1x Speed</option>
                  <option value={2}>2x Speed</option>
                  <option value={5}>5x Speed</option>
                </select>
              </div>
            </div>

            {/* Scrub Bar */}
            <div className="space-y-2 font-mono">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Case #CASE-9082 (Order Intake → Dispatch)</span>
                <span className="text-cyan-400 font-bold">{replayProgress}% Complete</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden border border-slate-800 relative">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 via-yellow-400 to-emerald-400 transition-all duration-300"
                  style={{ width: `${replayProgress}%` }}
                />
              </div>
            </div>

            {/* Active Station Flow Nodes */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono pt-2">
              {[
                { name: 'Order Intake', time: '0.2s', status: 'done' },
                { name: 'Inventory Check', time: '1.1s', status: 'done' },
                { name: 'Automated Pick', time: '2.4s', status: activeReplayStep >= 2 ? 'active' : 'pending' },
                { name: 'Quality Inspection', time: '14.4h queuing', status: activeReplayStep >= 3 ? 'active' : 'pending', isBottleneck: true },
                { name: 'Dispatch', time: '0.4s', status: activeReplayStep >= 4 ? 'active' : 'pending' }
              ].map((step, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-xl border text-center space-y-1 transition-all ${
                    idx === activeReplayStep
                      ? 'bg-cyan-950/80 border-cyan-400 ring-1 ring-cyan-400/50 shadow-lg shadow-cyan-950'
                      : step.isBottleneck 
                        ? 'bg-[#2b1019] border-rose-800/80 text-rose-300' 
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Step {idx + 1}</div>
                  <div className={`text-xs font-bold ${idx === activeReplayStep ? 'text-cyan-300' : 'text-slate-200'}`}>{step.name}</div>
                  <div className="text-[10px] text-slate-400">{step.time}</div>
                </div>
              ))}
            </div>

          </div>

          {/* Event Stream Log Table */}
          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4 font-mono text-xs">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Live Process Event Stream</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase">
                    <th className="py-2 px-3">Case ID</th>
                    <th className="py-2 px-3">Timestamp</th>
                    <th className="py-2 px-3">Activity Node</th>
                    <th className="py-2 px-3">Resource / Robot</th>
                    <th className="py-2 px-3">Duration</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-slate-300">
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-2.5 px-3 font-bold text-cyan-400">CASE-9082</td>
                    <td className="py-2.5 px-3 text-slate-400">19:22:04</td>
                    <td className="py-2.5 px-3 font-medium">Quality Inspection</td>
                    <td className="py-2.5 px-3">Station-02 (OpenCV)</td>
                    <td className="py-2.5 px-3 text-rose-400 font-bold">14.4 hrs (Queue)</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800/50 text-[10px] font-bold">DELAYED</span></td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-2.5 px-3 font-bold text-cyan-400">CASE-9081</td>
                    <td className="py-2.5 px-3 text-slate-400">19:21:40</td>
                    <td className="py-2.5 px-3 font-medium">Automated Pick</td>
                    <td className="py-2.5 px-3">6-DOF Arm #01</td>
                    <td className="py-2.5 px-3 text-emerald-400">2.4s</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50 text-[10px] font-bold">OPTIMAL</span></td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-2.5 px-3 font-bold text-cyan-400">CASE-9080</td>
                    <td className="py-2.5 px-3 text-slate-400">19:20:12</td>
                    <td className="py-2.5 px-3 font-medium">Rework Repair</td>
                    <td className="py-2.5 px-3">Technician Manual Bench</td>
                    <td className="py-2.5 px-3 text-rose-400 font-bold">18.6 hrs</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800/50 text-[10px] font-bold">BOTTLENECK</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: BOTTLENECKS & HEATMAP --- */}
      {activeTab === 'bottlenecks' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Heatmap Graph Matrix */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2 font-mono">
                <Flame className="w-5 h-5 text-rose-500" />
                <span>Station Latency & Queue Heatmap</span>
              </h2>

              <div className="space-y-4 font-mono text-xs">
                {[
                  { station: 'Quality Inspection Queue', delay: '14.4 hrs', percent: 92, severity: 'critical' },
                  { station: 'Manual Exception Rework Repair', delay: '18.6 hrs', percent: 88, severity: 'critical' },
                  { station: 'Inventory Validation & Manifest Signoff', delay: '2.1 hrs', percent: 45, severity: 'warning' },
                  { station: 'AMR Dock 4 Queue Line', delay: '0.8 hrs', percent: 22, severity: 'low' },
                  { station: 'Automated 6-DOF Pick & Place', delay: '0.1 hrs', percent: 8, severity: 'low' }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex justify-between font-bold">
                      <span className="text-slate-200">{item.station}</span>
                      <span className={item.severity === 'critical' ? 'text-rose-400' : item.severity === 'warning' ? 'text-yellow-400' : 'text-emerald-400'}>
                        {item.delay}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div 
                        className={`h-full rounded-full ${
                          item.severity === 'critical' ? 'bg-rose-500' : item.severity === 'warning' ? 'bg-yellow-400' : 'bg-emerald-400'
                        }`}
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Root Cause AI Diagnostic Card */}
            <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4 font-mono">
              <h3 className="text-sm font-bold text-[#facc15] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#facc15]" />
                <span>Root Cause Diagnostics</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 space-y-1">
                  <div className="text-rose-300 font-bold">1. Camera Alignment Drift</div>
                  <p className="text-slate-300 text-[11px] font-sans">
                    Week 2 camera lens angle shifted by 1.2°, causing 18% false positives and forcing manual inspection fallback.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 space-y-1">
                  <div className="text-amber-300 font-bold">2. Manifest Signoff Lock</div>
                  <p className="text-slate-300 text-[11px] font-sans">
                    SCADA telemetry sync waits for physical paper manifest signature before releasing AMR fleet.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* --- TAB 4: CONFORMANCE CHECKING --- */}
      {activeTab === 'conformance' && (
        <div className="space-y-6">
          
          {/* Conformance Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono">
            <div className="p-4 rounded-xl bg-[#080d1a] border border-slate-800 text-center space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Fitness Score</div>
              <div className="text-2xl font-bold text-emerald-400">96.2%</div>
            </div>
            <div className="p-4 rounded-xl bg-[#080d1a] border border-slate-800 text-center space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Precision Score</div>
              <div className="text-2xl font-bold text-cyan-400">92.4%</div>
            </div>
            <div className="p-4 rounded-xl bg-[#080d1a] border border-slate-800 text-center space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Generalization</div>
              <div className="text-2xl font-bold text-[#facc15]">95.0%</div>
            </div>
            <div className="p-4 rounded-xl bg-[#080d1a] border border-slate-800 text-center space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Simplicity Score</div>
              <div className="text-2xl font-bold text-emerald-400">98.1%</div>
            </div>
          </div>

          {/* Non-Conforming Cases Log */}
          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4 font-mono text-xs">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Ruler className="w-4 h-4 text-[#facc15]" />
              <span>Reference Model Deviation Audit</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase">
                    <th className="py-2 px-3">Deviation Type</th>
                    <th className="py-2 px-3">Observed Activity Path</th>
                    <th className="py-2 px-3">Expected BPMN Path</th>
                    <th className="py-2 px-3">Affected Cases</th>
                    <th className="py-2 px-3">Severity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-slate-300">
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-2.5 px-3 font-bold text-[#facc15]">Manual Quality Bypass</td>
                    <td className="py-2.5 px-3">Pick → Direct Dispatch</td>
                    <td className="py-2.5 px-3">Pick → Quality → Dispatch</td>
                    <td className="py-2.5 px-3 text-cyan-400 font-bold">1,931 (4%)</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800/50 text-[10px] font-bold">MODERATE</span></td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-2.5 px-3 font-bold text-rose-400">Unregistered Rework Loop</td>
                    <td className="py-2.5 px-3">Rework → Rework → Re-Test</td>
                    <td className="py-2.5 px-3">Rework → Re-Test</td>
                    <td className="py-2.5 px-3 text-cyan-400 font-bold">676 (1.4%)</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800/50 text-[10px] font-bold">HIGH</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* --- TAB 5: AI AUTO WORKFLOW GENERATOR --- */}
      {activeTab === 'generator' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#facc15]" />
                  <span>Autonomous ROS 2 & RPA Code Generator</span>
                </h2>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  Convert discovered process bottlenecks into executable ROS 2 nodes & RPA automations.
                </p>
              </div>

              {/* Template Selector */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="bg-slate-900 text-cyan-400 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold"
                >
                  <option value="bypass-quality">OpenCV Quality Bypass (ROS 2 Python)</option>
                  <option value="auto-dispatch">Auto Dispatch Trigger (RPA YAML)</option>
                  <option value="rework-optimizer">Exception Rework Rerouter (Python)</option>
                </select>

                <button
                  onClick={handleGenerateCode}
                  disabled={isGenerating}
                  className="px-4 py-2 rounded-xl bg-[#facc15] hover:bg-yellow-400 text-black font-bold flex items-center gap-1.5 transition-all shadow-md shadow-yellow-500/20"
                >
                  <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>{isGenerating ? 'Compiling...' : 'Generate Code'}</span>
                </button>
              </div>
            </div>

            {/* Generated Code Output Window */}
            <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
              <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400">
                  <FileCode className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold text-slate-200">
                    {selectedTemplate === 'bypass-quality' ? 'quality_bypass_node.py' : selectedTemplate === 'auto-dispatch' ? 'auto_dispatch.yaml' : 'rework_optimizer.py'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold flex items-center gap-1"
                  >
                    {codeCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{codeCopied ? 'Copied!' : 'Copy Code'}</span>
                  </button>

                  <button
                    onClick={handleDeploy}
                    className="px-2.5 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-black text-[11px] font-bold flex items-center gap-1 shadow-sm"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Deploy to Fleet</span>
                  </button>
                </div>
              </div>

              <pre className="p-4 text-cyan-300 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-[350px]">
                {generatedCodeSnippets[selectedTemplate]}
              </pre>
            </div>

            {/* Deploy Confirmation Banner */}
            {deploySuccess && (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Workflow script compiled & deployed live to AGRO-R1 AMR Fleet!</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400">SLA: 100% active</span>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
