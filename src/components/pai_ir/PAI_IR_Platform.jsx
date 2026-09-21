import React, { useState, useEffect } from 'react';
import { 
  Activity, Eye, MessageSquare, Brain, Cpu, Navigation, 
  FileCheck, Layers, Play, Radio, BarChart3, FileText, 
  Shield, Server, Settings, BookOpen, AlertTriangle, RefreshCw, Zap
} from 'lucide-react';

import CommandCenter from './CommandCenter';
import LiveRobotView from './LiveRobotView';
import HumanInteractionCenter from './HumanInteractionCenter';
import AIBrainPage from './AIBrainPage';
import TaskPlannerPage from './TaskPlannerPage';
import AutonomousNavigationPage from './AutonomousNavigationPage';
import RobotArmPage from './RobotArmPage';
import ComputerVisionPage from './ComputerVisionPage';
import QualityInspectionPage from './QualityInspectionPage';
import DigitalTwinPage from './DigitalTwinPage';
import SimulationCenterPage from './SimulationCenterPage';
import SensorFusionPage from './SensorFusionPage';
import AnalyticsPage from './AnalyticsPage';
import ReportsPage from './ReportsPage';
import SafetyCenterPage from './SafetyCenterPage';
import SystemDiagnosticsPage from './SystemDiagnosticsPage';
import SettingsPage from './SettingsPage';
import DocumentationPage from './DocumentationPage';

// PAI-IR v2.0 Frontier Physical AI View
import FrontierPhysicalAIPage from './FrontierPhysicalAIPage';

export default function PAI_IR_Platform({ initialTab = 'frontier_ai' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [robotStatus, setRobotStatus] = useState({
    status: 'ONLINE',
    safety: 'NORMAL',
    battery_pct: 94
  });
  const [activeTask, setActiveTask] = useState(null);
  const [hriHistory, setHriHistory] = useState([]);
  const [worldState, setWorldState] = useState(null);

  useEffect(() => {
    if (initialTab) {
      const routeMap = {
        'pai-ir': 'command_center',
        'pai-ir-frontier': 'frontier_ai',
        'pai-ir-hri': 'hri_center',
        'pai-ir-live-robot': 'live_robot',
        'pai-ir-ai-brain': 'ai_brain',
        'pai-ir-task-planner': 'task_planner',
        'pai-ir-nav': 'navigation',
        'pai-ir-arm': 'robot_arm',
        'pai-ir-vision': 'computer_vision',
        'pai-ir-inspection': 'quality_inspection',
        'pai-ir-digital-twin': 'digital_twin',
        'pai-ir-simulation': 'simulation',
        'pai-ir-sensor-fusion': 'sensor_fusion',
        'pai-ir-analytics': 'analytics',
        'pai-ir-reports': 'reports',
        'pai-ir-safety': 'safety_center',
        'pai-ir-diagnostics': 'diagnostics',
        'pai-ir-settings': 'settings',
        'pai-ir-docs': 'documentation'
      };
      setActiveTab(routeMap[initialTab] || initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/robot/status');
        const data = await res.json();
        setRobotStatus(data);
      } catch (err) {
        setRobotStatus({ status: 'ONLINE (SIM)', safety: 'NORMAL', battery_pct: 94 });
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let ws;
    try {
      ws = new WebSocket('ws://localhost:8000/ws/telemetry');
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.world_state) setWorldState(data.world_state);
        if (data.task_state) setActiveTask(data.task_state);
        if (data.safety_e_stop) {
          setRobotStatus(prev => ({ ...prev, safety: data.safety_e_stop ? 'EMERGENCY_STOP' : 'NORMAL' }));
        }
      };
    } catch (e) {
      console.warn("WebSocket fallback mode");
    }
    return () => {
      if (ws) ws.close();
    };
  }, []);

  const handleVoiceCommand = async (text) => {
    try {
      const res = await fetch('http://localhost:8000/api/hri/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: text })
      });
      const data = await res.json();
      if (data.task) setActiveTask(data.task);
      if (data.dialogue) setHriHistory(data.dialogue);
    } catch (err) {
      setHriHistory(prev => [
        ...prev,
        { sender: 'HUMAN', text, timestamp: new Date().toLocaleTimeString() },
        { sender: 'ROBOT', text: `Command received: "${text}". Simulation task plan generated.`, timestamp: new Date().toLocaleTimeString() }
      ]);
    }
  };

  const handleEstop = async () => {
    try {
      await fetch('http://localhost:8000/api/safety/estop', { method: 'POST' });
    } catch (e) {
      setRobotStatus(prev => ({ ...prev, safety: 'EMERGENCY_STOP' }));
    }
  };

  const handleResetEstop = async () => {
    try {
      await fetch('http://localhost:8000/api/safety/reset', { method: 'POST' });
    } catch (e) {
      setRobotStatus(prev => ({ ...prev, safety: 'NORMAL' }));
    }
  };

  const navItems = [
    { id: 'frontier_ai', label: 'Frontier Physical AI v2.0', icon: Zap },
    { id: 'command_center', label: 'Command Center', icon: Activity },
    { id: 'live_robot', label: 'Live Robot 3D', icon: Eye },
    { id: 'hri_center', label: 'Human Interaction', icon: MessageSquare },
    { id: 'ai_brain', label: 'AI Brain', icon: Brain },
    { id: 'task_planner', label: 'Task Planner', icon: Cpu },
    { id: 'navigation', label: 'Autonomous Nav', icon: Navigation },
    { id: 'robot_arm', label: 'Robot Arm 6-DOF', icon: Cpu },
    { id: 'computer_vision', label: 'Computer Vision', icon: Eye },
    { id: 'quality_inspection', label: 'Quality Inspection', icon: FileCheck },
    { id: 'digital_twin', label: 'Digital Twin 3D', icon: Layers },
    { id: 'simulation', label: 'Simulation Center', icon: Play },
    { id: 'sensor_fusion', label: 'Sensor Fusion', icon: Radio },
    { id: 'analytics', label: 'Analytics & KPIs', icon: BarChart3 },
    { id: 'reports', label: 'Inspection Reports', icon: FileText },
    { id: 'safety_center', label: 'Safety Center', icon: Shield },
    { id: 'diagnostics', label: 'System Diagnostics', icon: Server },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'documentation', label: 'Documentation', icon: BookOpen },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 space-y-4 font-sans rounded-xl border border-slate-800 p-4 shadow-2xl">
      {/* Top Header Control Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-white text-xs shadow-lg shadow-cyan-500/30">
            PAI
          </div>
          <div>
            <h1 className="text-sm font-black tracking-wider text-slate-100 uppercase">PHYSICAL AI INDUSTRIAL ROBOT (PAI-IR v2.0)</h1>
            <p className="text-[10px] text-slate-400 font-mono">Frontier Physical AI Robotics Platform</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-emerald-400 font-bold">
            ROBOT: {robotStatus.status || 'ONLINE'}
          </span>
          <span className={`px-2.5 py-1 rounded font-bold border ${robotStatus.safety === 'EMERGENCY_STOP' ? 'bg-red-950 text-red-400 border-red-800' : 'bg-slate-950 text-emerald-400 border-slate-800'}`}>
            SAFETY: {robotStatus.safety || 'NORMAL'}
          </span>
          <button
            onClick={handleEstop}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-black rounded uppercase text-[11px] transition-all shadow-lg shadow-red-900/40"
          >
            E-STOP
          </button>
        </div>
      </div>

      {/* Top Module Navigation Pills Carousel matching screenshot image */}
      <div className="bg-[#090e1a] border border-slate-800/90 p-2.5 rounded-xl flex items-center gap-2 overflow-x-auto scrollbar-thin shadow-inner">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-2.5 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/30 font-bold ring-1 ring-cyan-400/40'
                  : 'bg-[#0e1626] text-slate-300 hover:bg-slate-800/90 hover:text-white border border-slate-800/90'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>


      {/* Dynamic Main Module Viewport */}
      <div className="bg-slate-950 rounded-xl">
        {activeTab === 'frontier_ai' && <FrontierPhysicalAIPage />}
        {activeTab === 'command_center' && (
          <CommandCenter
            robotStatus={robotStatus}
            onTriggerEstop={handleEstop}
            onResetEstop={handleResetEstop}
            activeTask={activeTask}
          />
        )}
        {activeTab === 'live_robot' && <LiveRobotView worldState={worldState} />}
        {activeTab === 'hri_center' && (
          <HumanInteractionCenter onVoiceCommand={handleVoiceCommand} hriHistory={hriHistory} />
        )}
        {activeTab === 'ai_brain' && <AIBrainPage />}
        {activeTab === 'task_planner' && (
          <TaskPlannerPage activeTask={activeTask} onVoiceCommand={handleVoiceCommand} />
        )}
        {activeTab === 'navigation' && <AutonomousNavigationPage worldState={worldState} />}
        {activeTab === 'robot_arm' && <RobotArmPage />}
        {activeTab === 'computer_vision' && <ComputerVisionPage />}
        {activeTab === 'quality_inspection' && <QualityInspectionPage />}
        {activeTab === 'digital_twin' && <DigitalTwinPage worldState={worldState} />}
        {activeTab === 'simulation' && <SimulationCenterPage />}
        {activeTab === 'sensor_fusion' && <SensorFusionPage />}
        {activeTab === 'analytics' && <AnalyticsPage />}
        {activeTab === 'reports' && <ReportsPage />}
        {activeTab === 'safety_center' && (
          <SafetyCenterPage
            robotStatus={robotStatus}
            onTriggerEstop={handleEstop}
            onResetEstop={handleResetEstop}
          />
        )}
        {activeTab === 'diagnostics' && <SystemDiagnosticsPage />}
        {activeTab === 'settings' && <SettingsPage />}
        {activeTab === 'documentation' && <DocumentationPage />}
      </div>
    </div>
  );
}
