import React, { useState } from 'react'
import { 
  Bot, ChevronLeft, ChevronDown, ChevronRight, Activity, Cpu, Eye, 
  Layers, ShieldAlert, CheckCircle2, Sliders, Database, BarChart3, 
  Zap, Radio, FileText, MessageSquare, Terminal, RefreshCw, LayoutDashboard,
  Compass, Map, Wrench, BookOpen, Globe, Folder, Settings as SettingsIcon, Home, Microscope
} from 'lucide-react'

import PlatformWorkspace from './PlatformWorkspace'
import PlatformDashboard from './platform/PlatformDashboard'
import QualityInspection from './platform/QualityInspection'
import RpaDashboard from './platform/RpaDashboard'
import ProcessMining from './platform/ProcessMining'
import DigitalTwin from './platform/DigitalTwin'
import EdgeAI from './platform/EdgeAI'
import ComputerVision from './platform/ComputerVision'
import AICopilot from './platform/AICopilot'
import RoboticsAssistantChat from './platform/RoboticsAssistantChat'
import AgroR1Lab from './platform/AgroR1Lab'
import RoboticsKnowledgeTools from './platform/RoboticsKnowledgeTools'
import PAI_IR_Platform from './pai_ir/PAI_IR_Platform'
import CriticRagDashboard from './critic_rag/CriticRagDashboard'
import AIMediaStudio from './platform/AIMediaStudio'
import AIFactoryStoryteller from './platform/AIFactoryStoryteller'
import AIRobotCommandCenter from './platform/AIRobotCommandCenter'


export default function PlatformLayout({ activeSubRoute, onNavigateSubRoute, onBackToSite }) {
  const [activeWorkspace, setActiveWorkspace] = useState('agro_r1')
  
  // Dropdown states
  const [industrialDropdownOpen, setIndustrialDropdownOpen] = useState(true)
  const [robotLabDropdownOpen, setRobotLabDropdownOpen] = useState(true)

  const workspaces = [
    { id: 'agro_r1', name: 'AGRO-R1 Farm Rover' },
    { id: 'arm_6dof', name: '6-DOF Industrial Arm' },
    { id: 'amr_fleet', name: 'Logistics AMR Fleet' }
  ]

  // Industrial AI Platform Sub-items
  const industrialItems = [
    { id: 'ai-media-studio', label: '🎬 AI Media & Publicity Studio', icon: '✨' },
    { id: 'ai-storyteller', label: '📖 AI Factory Storyteller ("Explain")', icon: '🎙️' },
    { id: 'ai-commands', label: '⚡ Natural Language AI Commands', icon: '🎮' },
    { id: 'critic-rag', label: 'CRITIC-RAG Medical Evidence', icon: '⚡' },
    { id: 'pai-ir', label: 'PAI-IR Command Center', icon: '⚡' },

    { id: 'pai-ir-live-robot', label: 'PAI-IR Live Robot 3D', icon: '👁️' },
    { id: 'pai-ir-hri', label: 'Human Interaction (HRI)', icon: '💬' },
    { id: 'pai-ir-ai-brain', label: 'AI Brain & Reasoning', icon: '🧠' },
    { id: 'pai-ir-task-planner', label: 'Task Planner & FSM', icon: '⚙️' },
    { id: 'pai-ir-nav', label: 'Autonomous Nav (Nav2)', icon: '🧭' },
    { id: 'pai-ir-arm', label: 'Robot Arm 6-DOF', icon: '🦾' },
    { id: 'pai-ir-inspection', label: 'CV Quality Inspection', icon: '🔍' },
    { id: 'pai-ir-digital-twin', label: '3D Digital Twin Factory', icon: '🧊' },
    { id: 'pai-ir-simulation', label: 'AI Simulation Center', icon: '🎮' },
    { id: 'pai-ir-safety', label: 'Safety Guard & E-Stop', icon: '🛡️' },
    { id: 'robotics-path-planner', label: 'Robotics Path Planner', icon: '🦾' },
    { id: 'quality-inspection', label: 'Automated Quality Inspection', icon: '🔍' },
    { id: 'rpa', label: 'Robotic Process Automation (RPA)', icon: '⚙️' },
    { id: 'process-mining', label: 'Process Mining & AI Intelligence', icon: '🌐' },
    { id: 'digital-twin', label: '3D Digital Twin Platform', icon: '🧊' },
    { id: 'edge-ai', label: 'Industrial IoT & Edge AI', icon: '📡' },
    { id: 'computer-vision', label: 'Advanced AI Computer Vision', icon: '👁️' },
    { id: 'copilot', label: 'AI Copilot & Multi-Agent AI', icon: '🧠' }
  ]

  // Robot Lab (AGRO-R1) Sub-items matching user screenshot 2
  const robotLabItems = [
    { id: 'robot-overview', label: 'Robot Overview', icon: '📋' },
    { id: 'live-status', label: 'Live Status', icon: '⚡' },
    { id: 'mission-monitor', label: 'Mission Monitor', icon: '🎯' },
    { id: 'ros2-nodes', label: 'ROS 2 Nodes', icon: '🟢' },
    { id: 'ros2-topics', label: 'ROS 2 Topics', icon: '📡' },
    { id: 'sensor-monitoring', label: 'Sensor Monitoring', icon: '📊' },
    { id: 'ai-vision', label: 'AI Vision', icon: '👁️' },
    { id: 'decision-timeline', label: 'Decision Timeline', icon: '⏱️' },
    { id: 'human-approval', label: 'Human Approval', icon: '🤝' },
    { id: 'robot-events', label: 'Robot Events', icon: '🔔' },
    { id: 'ask-about-robot', label: 'Ask About Robot', icon: '💬' }
  ]

  // Knowledge & Tools Sub-items matching user screenshot 1
  const knowledgeTools = [
    { id: 'ros2-knowledge-hub', label: 'ROS 2 Knowledge Hub', icon: '📚' },
    { id: 'ros2-debugger', label: 'ROS 2 Error Debugger', icon: '🔧' },
    { id: 'nvidia-robotics-hub', label: 'NVIDIA Robotics Hub', icon: '🟢' },
    { id: 'nav2-assistant', label: 'Nav2 Assistant', icon: '🧭' },
    { id: 'slam-explorer', label: 'SLAM Explorer', icon: '🗺️' },
    { id: 'urdf-analyzer', label: 'URDF Analyzer', icon: '📐' },
    { id: 'robot-kb', label: 'Robot Knowledge Base', icon: '📁' },
    { id: 'global-robotics', label: 'Global Robotics Companies', icon: '🌐' }
  ]

  // Administration Sub-items matching user screenshot 3
  const adminTools = [
    { id: 'projects-workspace', label: 'Projects Workspace', icon: '⚙️' },
    { id: 'trusted-sources', label: 'Trusted Sources', icon: '📁' },
    { id: 'settings', label: 'Settings', icon: '🛠️' }
  ]

  const renderSubView = () => {
    switch (activeSubRoute) {
      case 'ai-media-studio':
        return <AIMediaStudio />
      case 'ai-storyteller':
        return <AIFactoryStoryteller />
      case 'ai-commands':
        return <AIRobotCommandCenter />
      case 'critic-rag':
        return <CriticRagDashboard onBackToSite={onBackToSite} />
      case 'pai-ir':

      case 'pai-ir-live-robot':
      case 'pai-ir-hri':
      case 'pai-ir-ai-brain':
      case 'pai-ir-task-planner':
      case 'pai-ir-nav':
      case 'pai-ir-arm':
      case 'pai-ir-vision':
      case 'pai-ir-inspection':
      case 'pai-ir-digital-twin':
      case 'pai-ir-simulation':
      case 'pai-ir-sensor-fusion':
      case 'pai-ir-analytics':
      case 'pai-ir-reports':
      case 'pai-ir-safety':
      case 'pai-ir-diagnostics':
      case 'pai-ir-settings':
      case 'pai-ir-docs':
        return <PAI_IR_Platform initialTab={activeSubRoute} />
      case 'robotics-path-planner':
        return <PlatformWorkspace isOpen={true} onClose={() => onNavigateSubRoute('dashboard')} isEmbedded={true} workspaceId={activeWorkspace} />
      case 'quality-inspection':
        return <QualityInspection workspaceId={activeWorkspace} />
      case 'rpa':
        return <RpaDashboard workspaceId={activeWorkspace} />
      case 'process-mining':
        return <ProcessMining workspaceId={activeWorkspace} />
      case 'digital-twin':
        return <DigitalTwin workspaceId={activeWorkspace} />
      case 'edge-ai':
        return <EdgeAI workspaceId={activeWorkspace} />
      case 'computer-vision':
        return <ComputerVision workspaceId={activeWorkspace} />
      case 'copilot':
        return <AICopilot workspaceId={activeWorkspace} defaultTab="copilot" />
      case 'robot-overview':
      case 'live-status':
      case 'mission-monitor':
      case 'ros2-nodes':
      case 'ros2-topics':
      case 'sensor-monitoring':
      case 'ai-vision':
      case 'decision-timeline':
      case 'human-approval':
      case 'robot-events':
        return <AgroR1Lab workspaceId={activeWorkspace} initialTab={activeSubRoute === 'robot-overview' ? 'overview' : activeSubRoute} />
      case 'assistant':
      case 'ask-about-robot':
        return <RoboticsAssistantChat workspaceId={activeWorkspace} initialRoute={activeSubRoute} />
      case 'ros2-knowledge-hub':
      case 'ros2-debugger':
      case 'nvidia-robotics-hub':
      case 'nav2-assistant':
      case 'slam-explorer':
      case 'urdf-analyzer':
      case 'robot-kb':
      case 'global-robotics':
      case 'projects-workspace':
      case 'trusted-sources':
      case 'settings':
        return <RoboticsKnowledgeTools workspaceId={activeWorkspace} activeRoute={activeSubRoute} />
      case 'dashboard':
      default:
        return <PlatformDashboard workspaceId={activeWorkspace} onSelectModule={(mod) => onNavigateSubRoute(mod)} />
    }
  }

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* FULL COMPLETE LEFT SIDEBAR matching all screenshots */}
      <aside className="w-full md:w-72 bg-[#080d1a] border-r border-slate-800/80 flex flex-col shrink-0 h-screen sticky top-0 overflow-y-auto">
        
        {/* Header Branding */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between sticky top-0 bg-[#080d1a] z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-amber-500/40 to-blue-600 p-[1px] shadow-lg shadow-cyan-500/20 flex items-center justify-center overflow-hidden">
              <img src="/assets/logo_perfect.png" alt="DJ Emblem" className="w-full h-full object-cover rounded-[11px]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-white text-sm tracking-wider flex items-center gap-1">
                DJ <span className="text-cyan-400 font-semibold">PLATFORM</span>
              </span>
            </div>
          </div>

          <button
            onClick={onBackToSite}
            title="Back to Main Site"
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-amber-400 hover:text-amber-300 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 fill-amber-400" />
          </button>
        </div>

        {/* ACTIVE WORKSPACE Selector */}
        <div className="p-4 border-b border-slate-800/80 space-y-1.5">
          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
            ACTIVE WORKSPACE
          </label>
          <select
            value={activeWorkspace}
            onChange={(e) => setActiveWorkspace(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
          >
            {workspaces.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sidebar Nav Links Scroll Area */}
        <nav className="flex-1 p-3 space-y-3 text-xs font-mono">
          
          {/* Dashboard */}
          <button
            onClick={() => onNavigateSubRoute('dashboard')}
            className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition-all ${
              activeSubRoute === 'dashboard'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <span className="text-sm">📊</span>
            <span>Dashboard</span>
          </button>

          {/* 1. Industrial AI Platform Dropdown Header */}
          <div className="space-y-1">
            <button
              onClick={() => setIndustrialDropdownOpen(!industrialDropdownOpen)}
              className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between transition-all ${
                industrialItems.some(i => i.id === activeSubRoute)
                  ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold'
                  : 'text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-sm">🏭</span>
                <span>Industrial AI Platform</span>
              </div>
              {industrialDropdownOpen ? <ChevronDown className="w-4 h-4 text-amber-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
            </button>

            {industrialDropdownOpen && (
              <div className="pl-4 space-y-1 pt-1 border-l border-slate-800/80 ml-4">
                {industrialItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigateSubRoute(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-[11px] flex items-center gap-2 transition-all ${
                      activeSubRoute === item.id
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. Robot Lab (AGRO-R1) Dropdown Header matching Screenshot 2 */}
          <div className="space-y-1 pt-2 border-t border-slate-800/60">
            <button
              onClick={() => setRobotLabDropdownOpen(!robotLabDropdownOpen)}
              className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between transition-all ${
                robotLabItems.some(i => i.id === activeSubRoute)
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold'
                  : 'text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-sm">🔬</span>
                <span>Robot Lab ({workspaces.find(w => w.id === activeWorkspace)?.name.split(' ')[0]})</span>
              </div>
              {robotLabDropdownOpen ? <ChevronDown className="w-4 h-4 text-cyan-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
            </button>

            {robotLabDropdownOpen && (
              <div className="pl-4 space-y-1 pt-1 border-l border-slate-800/80 ml-4">
                {robotLabItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigateSubRoute(item.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] flex items-center gap-2 transition-all ${
                      activeSubRoute === item.id
                        ? 'text-amber-400 font-bold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Knowledge & Tools matching Screenshot 1 */}
          <div className="space-y-1 pt-2 border-t border-slate-800/60">
            <div className="px-3 py-1 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              ROBOTICS KNOWLEDGE & TOOLS
            </div>
            {knowledgeTools.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigateSubRoute(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-[11px] flex items-center gap-2.5 transition-all ${
                  activeSubRoute === item.id
                    ? 'bg-cyan-500/10 text-cyan-300 font-bold'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>

          {/* 4. Projects & Administration matching Screenshot 3 */}
          <div className="space-y-1 pt-2 border-t border-slate-800/60">
            {adminTools.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigateSubRoute(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-[11px] flex items-center gap-2.5 transition-all ${
                  activeSubRoute === item.id
                    ? 'bg-cyan-500/10 text-cyan-300 font-bold'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>

        </nav>

        {/* Bottom "View Public Site" Button matching Screenshot 3 */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/90 sticky bottom-0 z-10">
          <button
            onClick={onBackToSite}
            className="w-full py-2.5 rounded-xl bg-[#141c10] hover:bg-[#1a2615] border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <span>🏠</span>
            <span>View Public Site</span>
          </button>
        </div>

      </aside>

      {/* RIGHT MAIN PLATFORM CONTENT BODY */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#060a12] overflow-y-auto">
        
        {/* Top Navbar */}
        <header className="px-6 py-4 bg-[#080d1a] border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold text-white capitalize flex items-center gap-2">
              <span>{activeSubRoute.replace(/-/g, ' ')}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                {workspaces.find(w => w.id === activeWorkspace)?.name}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Plant OEE: <strong className="text-cyan-400">88.4%</strong></span>
            </div>

            <button
              onClick={onBackToSite}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-amber-300 flex items-center gap-2 transition-colors font-bold"
            >
              <span>🏠 View Public Site</span>
            </button>
          </div>
        </header>

        {/* Dynamic Platform View */}
        <div className="flex-1 p-6">
          {renderSubView()}
        </div>

      </main>

    </div>
  )
}
