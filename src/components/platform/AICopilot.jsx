import React, { useState } from 'react'
import { 
  Bot, Send, Sparkles, FileText, CheckCircle2, RefreshCw, Zap, 
  Cpu, Users, Factory, Glasses, ShieldCheck, Activity, ChevronDown, Copy, Play
} from 'lucide-react'

export default function AICopilot({ workspaceId, defaultTab }) {
  const [activeTab, setActiveTab] = useState('copilot')
  const [selectedModel, setSelectedModel] = useState('Google Gemini')
  
  // Chat state
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello 👋 I am your Industrial AI Copilot. Ask me anything about machine troubleshooting, root cause analysis, code generation, or OEE optimization.'
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const subTabs = [
    { id: 'copilot', label: 'AI Copilot & Voice', icon: '💬' },
    { id: 'swarm', label: 'Multi-Agent AI Swarm', icon: '🏗️' },
    { id: 'oee', label: 'Smart Factory & OEE', icon: '🏭' },
    { id: 'cobots', label: 'Industry 5.0 & Cobots', icon: '🤝' },
    { id: 'ar-vr', label: 'AR / VR Spatial Tour', icon: '🥽' }
  ]

  const models = [
    'Google Gemini',
    'OpenAI GPT-4o',
    'Claude 3.5 Sonnet',
    'Meta Llama 3.1',
    'DeepSeek V3'
  ]

  const triggers = [
    { title: 'Root Cause Analysis', query: 'Execute Root Cause Analysis for AGRO-R1 workcell' },
    { title: 'Generate Python ROS 2 Code', query: 'Generate Python ROS 2 node for joint telemetry stream' },
    { title: 'Generate Executive PDF Report', query: 'Generate Executive PDF Report for active plant operations' },
    { title: 'Predictive Maintenance Diagnosis', query: 'Execute Predictive Maintenance Diagnosis for AGRO-R1 spindle bearing' },
    { title: 'Machine Troubleshooting Guide', query: 'Provide Machine Troubleshooting Guide for 6-DOF robot arm error E-409' },
    { title: 'Explain Analytics Anomalies', query: 'Explain Analytics Anomalies in Week 3 telemetry logs' }
  ]

  const handleSend = (textToSend) => {
    const q = textToSend || input
    if (!q.trim()) return

    const newMsgs = [...messages, { sender: 'user', text: q }]
    setMessages(newMsgs)
    if (!textToSend) setInput('')
    setIsTyping(true)

    setTimeout(() => {
      let botResp = ""
      const qLower = q.toLowerCase()

      if (qLower.includes('root cause')) {
        botResp = `🔍 **Root Cause Analysis Report [via ${selectedModel}]:**\n\n1. **Primary Trigger**: Thermal dissipation in AGRO-R1 Joint 3 servo drive exceeded 65°C threshold.\n2. **Contributing Factor**: Micro-vibration spikes (3.8 mm/s) caused by degraded lubricant on planetary gear teeth.\n3. **Recommended Action**: 1) Re-lubricate Joint 3 gear set with ISO VG 220 grease. 2) Adjust inner loop velocity gain Kp=2.4 and Kd=0.18 in ROS 2 control parameters.`
      } else if (qLower.includes('ros 2') || qLower.includes('code')) {
        botResp = `⚡ **Generated Python ROS 2 Node [via ${selectedModel}]:**\n\`\`\`python\nimport rclpy\nfrom rclpy.node import Node\nfrom sensor_msgs.msg import JointState\n\nclass JointTelemetryMonitor(Node):\n    def __init__(self):\n        super().__init__('telemetry_monitor')\n        self.sub = self.create_subscription(JointState, '/joint_states', self.cb, 10)\n        self.get_logger().info('Copilot ROS 2 Telemetry Monitor Active')\n\n    def cb(self, msg):\n        pass\n\`\`\`\nDeploy to workspace [${workspaceId.toUpperCase()}] ready.`
      } else if (qLower.includes('pdf') || qLower.includes('report')) {
        botResp = `📑 **Executive PDF Audit Report Summary [via ${selectedModel}]:**\n\n- **Overall OEE Score**: 88.4% (World-Class Standard)\n- **Active Robots**: 6-DOF Industrial Arm, AGRO-R1 AMR, Logistics Fleet\n- **Total Completed Tasks**: 48,290 Cases\n- **Defect Rate**: 0.6% (Verified via YOLOv11 & OpenCV)`
      } else if (qLower.includes('predictive') || qLower.includes('maintenance')) {
        botResp = `🛠️ **Predictive Maintenance Diagnosis [via ${selectedModel}]:**\n\n- **Component**: Spindle Bearing #02\n- **Health Index**: 98.2% (RUL: 1,450 hrs)\n- **Vibration Velocity**: 2.4 mm/s (Normal < 4.5 mm/s)\n- **Thermal State**: 42.1 °C (Normal < 65 °C)\n- **Status**: No imminent maintenance required.`
      } else if (qLower.includes('troubleshooting')) {
        botResp = `🔧 **Machine Troubleshooting Guide (Error E-409):**\n\n1. Verify 24V DC auxiliary power feed to Joint 3 encoder.\n2. Clear E-Stop latch on teach pendant.\n3. Restart ROS 2 joint trajectory controller server.`
      } else if (qLower.includes('anomalies')) {
        botResp = `📊 **Analytics Anomalies Explanation:**\n\n- Detected a 14.4h queuing delay at Quality Inspection Station during Week 2 shift.\n- Root Cause: Camera lens drift causing 18% false positive rejections.`
      } else {
        botResp = `🧠 **Industrial AI Copilot (${selectedModel})**: Analysis complete for query "${q}". Workspace [${workspaceId.toUpperCase()}] telemetry is synchronized and operating within SLA parameters.`
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botResp }])
      setIsTyping(false)
    }, 700)
  }

  return (
    <div className="space-y-6 font-sans text-slate-100">
      
      {/* 1. TOP HEADER & TITLE BOX (Matching Screenshot 1:1) */}
      <div className="p-6 rounded-2xl bg-[#080e1e] border border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#38bdf8] tracking-wide flex items-center gap-2">
            <span>🧠</span>
            <span>Industrial AI Copilot, Multi-Agent Swarm & Smart Factory</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans">
            Multi-LLM Copilot (Gemini, OpenAI, Claude, Llama, DeepSeek), 8-Agent Swarm, OEE Smart Factory & Industry 5.0 AR/VR Spatial Tour.
          </p>
        </div>

        {/* Top Right Badge */}
        <div>
          <span className="px-3.5 py-1.5 rounded-xl bg-indigo-950/80 border border-indigo-700/80 text-indigo-300 text-xs font-mono font-bold whitespace-nowrap shadow-sm">
            8 Agents Autonomous
          </span>
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
                : 'bg-[#080e1e] text-slate-300 border border-slate-800 hover:text-white hover:bg-slate-900'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 3. TAB CONTENTS */}

      {/* --- TAB 1: AI COPILOT & VOICE (Matching Screenshot 1:1) --- */}
      {activeTab === 'copilot' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono">
          
          {/* Left Column: Natural Language Industrial Copilot */}
          <div className="p-5 rounded-2xl bg-[#080e1e] border border-slate-800 space-y-4 flex flex-col justify-between min-h-[500px]">
            
            {/* Header with Model Selector */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h2 className="text-base font-bold text-[#38bdf8] flex items-center gap-2">
                <span>💬</span>
                <span>Natural Language Industrial Copilot</span>
              </h2>

              {/* Model Dropdown */}
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="bg-[#050a14] text-cyan-300 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                {models.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            {/* Chat Conversation Window */}
            <div className="flex-1 overflow-y-auto space-y-3 py-2 pr-1 max-h-[380px]">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] p-3.5 rounded-xl leading-relaxed text-xs ${
                    m.sender === 'user' 
                      ? 'bg-[#38bdf8] text-black font-bold shadow-md shadow-sky-500/20' 
                      : 'bg-[#050a14] border border-slate-800 text-slate-200'
                  }`}>
                    <div className="whitespace-pre-wrap">{m.text}</div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-xl bg-[#050a14] border border-slate-800 text-cyan-400 text-xs animate-pulse flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>{selectedModel} is computing AI analysis...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input Row (Matching Screenshot 1:1) */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Copilot about machine faults, code, or OEE..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#050a14] border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={() => handleSend()}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-md transition-all whitespace-nowrap"
              >
                Send
              </button>
            </div>

          </div>

          {/* Right Column: One-Click AI Task Triggers */}
          <div className="p-5 rounded-2xl bg-[#080e1e] border border-slate-800 space-y-4">
            <div>
              <h2 className="text-base font-bold text-indigo-400 flex items-center gap-2">
                <span>⚡</span>
                <span>One-Click AI Task Triggers</span>
              </h2>
              <p className="text-xs text-slate-400 font-sans mt-1">
                Click any button below to instantly execute AI analysis via {selectedModel}:
              </p>
            </div>

            {/* 6 Trigger Buttons (Matching Screenshot 1:1) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {triggers.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(t.query)}
                  className="p-3.5 rounded-xl bg-[#0b162a] hover:bg-[#10203e] text-[#facc15] font-bold border border-yellow-700/50 hover:border-yellow-400 text-xs flex items-center justify-center gap-2 text-center transition-all shadow-sm hover:shadow-yellow-500/10 cursor-pointer"
                >
                  <span className="text-yellow-400">⚡</span>
                  <span>{t.title}</span>
                </button>
              ))}
            </div>

            {/* AI Assistant Quick Summary Note */}
            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/50 space-y-2 mt-4 font-sans text-xs">
              <div className="flex items-center gap-2 text-indigo-300 font-bold font-mono">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Multi-LLM Intelligence Core</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Connects live telemetry streams from ROS 2, SCADA, and OPC UA to LLMs for automated anomaly diagnosis and instant Python ROS 2 code generation.
              </p>
            </div>

          </div>

        </div>
      )}

      {/* --- TAB 2: MULTI-AGENT AI SWARM --- */}
      {activeTab === 'swarm' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="p-6 rounded-2xl bg-[#080e1e] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-400" />
                <span>8-Agent Autonomous Swarm Topology</span>
              </h2>
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                Swarm Sync: 100% Consensus
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Agent-1: Telemetry Sentinel', task: '100Hz ROS 2 Topic Polling', status: 'ACTIVE' },
                { name: 'Agent-2: Quality Vision', task: 'YOLOv11 Defect Inference', status: 'ACTIVE' },
                { name: 'Agent-3: Predictive Health', task: 'Vibration Spectral FFT', status: 'ACTIVE' },
                { name: 'Agent-4: Process Mining', task: 'BPMN Conformance Audit', status: 'ACTIVE' },
                { name: 'Agent-5: RPA Dispatcher', task: 'Manifest Signoff Automation', status: 'ACTIVE' },
                { name: 'Agent-6: ROS 2 Path Planner', task: 'Dynamic Obstacle Avoidance', status: 'ACTIVE' },
                { name: 'Agent-7: Energy & OEE', task: 'Peak Load Balancing', status: 'ACTIVE' },
                { name: 'Agent-8: Safety Supervisor', task: 'Human Proximity Enforcement', status: 'ACTIVE' }
              ].map((agent, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#050a14] border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-400">{agent.name}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-slate-400 text-[11px] font-sans">{agent.task}</div>
                  <div className="text-emerald-400 font-bold text-[10px] uppercase">{agent.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: SMART FACTORY & OEE --- */}
      {activeTab === 'oee' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#080e1e] border border-slate-800 text-center space-y-1">
              <div className="text-[11px] text-slate-400 uppercase font-bold">Overall OEE</div>
              <div className="text-3xl font-extrabold text-[#facc15]">88.4%</div>
              <div className="text-xs text-emerald-400 font-bold">World-Class Standard</div>
            </div>
            <div className="p-5 rounded-2xl bg-[#080e1e] border border-slate-800 text-center space-y-1">
              <div className="text-[11px] text-slate-400 uppercase font-bold">Availability</div>
              <div className="text-3xl font-extrabold text-emerald-400">94.2%</div>
              <div className="text-xs text-slate-400">Scheduled Uptime</div>
            </div>
            <div className="p-5 rounded-2xl bg-[#080e1e] border border-slate-800 text-center space-y-1">
              <div className="text-[11px] text-slate-400 uppercase font-bold">Performance</div>
              <div className="text-3xl font-extrabold text-cyan-400">91.5%</div>
              <div className="text-xs text-slate-400">Speed Ratio</div>
            </div>
            <div className="p-5 rounded-2xl bg-[#080e1e] border border-slate-800 text-center space-y-1">
              <div className="text-[11px] text-slate-400 uppercase font-bold">Quality Rate</div>
              <div className="text-3xl font-extrabold text-emerald-400">99.4%</div>
              <div className="text-xs text-emerald-400 font-bold">0.6% Defect Rate</div>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 4: INDUSTRY 5.0 & COBOTS --- */}
      {activeTab === 'cobots' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="p-6 rounded-2xl bg-[#080e1e] border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Human-Robot Collaboration (Cobot) Safety Matrix</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#050a14] border border-slate-800 space-y-1">
                <div className="text-[11px] text-slate-400 uppercase font-bold">Force-Torque Limit</div>
                <div className="text-xl font-bold text-emerald-400">140 N (Safe)</div>
              </div>
              <div className="p-4 rounded-xl bg-[#050a14] border border-slate-800 space-y-1">
                <div className="text-[11px] text-slate-400 uppercase font-bold">Speed & Separation</div>
                <div className="text-xl font-bold text-cyan-400">2.1 m/s Max</div>
              </div>
              <div className="p-4 rounded-xl bg-[#050a14] border border-slate-800 space-y-1">
                <div className="text-[11px] text-slate-400 uppercase font-bold">Hand-Guided Mode</div>
                <div className="text-xl font-bold text-[#facc15]">READY</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 5: AR / VR SPATIAL TOUR --- */}
      {activeTab === 'ar-vr' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="p-6 rounded-2xl bg-[#080e1e] border border-slate-800 text-center space-y-4">
            <Glasses className="w-12 h-12 text-cyan-400 mx-auto" />
            <h2 className="text-base font-bold text-white">Industry 5.0 WebXR Spatial Digital Twin</h2>
            <p className="text-slate-400 max-w-md mx-auto font-sans text-xs">
              Connect Meta Quest 3, Apple Vision Pro, or WebXR emulator to tour the plant floor in real-time spatial 3D.
            </p>
            <button className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold">
              Launch WebXR Spatial Session
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
