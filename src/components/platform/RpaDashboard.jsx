import React, { useState } from 'react'
import { 
  Cpu, Zap, Activity, CheckCircle2, Bot, Layers, Play, Pause, 
  FileText, Mail, FileSpreadsheet, Clock, Sliders, HardDrive, RefreshCw
} from 'lucide-react'

export default function RpaDashboard({ workspaceId }) {
  const [activeTab, setActiveTab] = useState('rpa-dashboard')

  const subTabs = [
    { id: 'rpa-dashboard', label: 'RPA Dashboard', icon: '📊' },
    { id: 'workflow-designer', label: 'Workflow Designer', icon: '🎨' },
    { id: 'bot-manager', label: 'Bot Manager', icon: '🤖' },
    { id: 'task-scheduler', label: 'Task Scheduler', icon: '⏰' },
    { id: 'document-processing', label: 'Document Processing', icon: '📄' },
    { id: 'email-automation', label: 'Email Automation', icon: '📧' },
    { id: 'excel-automation', label: 'Excel Automation', icon: '📈' }
  ]

  const executionFeed = [
    { id: 'JOB-901', bot: 'Invoice Processing Bot', workflow: 'ERP Invoice Automation', status: 'RUNNING', duration: '12s', timestamp: '19:04:12' },
    { id: 'JOB-900', bot: 'SCADA Telemetry Sync Bot', workflow: 'PLC Data Ingestion', status: 'COMPLETED', duration: '4.2s', timestamp: '19:03:50' },
    { id: 'JOB-899', bot: 'Inventory Dispatch Bot', workflow: 'Warehouse AMR Dispatch', status: 'COMPLETED', duration: '8.1s', timestamp: '19:02:15' },
    { id: 'JOB-898', bot: 'Quality OCR Audit Bot', workflow: 'Sub-Millimeter Inspection Log', status: 'COMPLETED', duration: '2.5s', timestamp: '19:00:40' }
  ]

  return (
    <div className="space-y-6 font-sans text-slate-100">
      
      {/* 1. TOP HEADER & TITLE BOX matching Screenshot 1:1 */}
      <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#facc15] tracking-wide">
          Industrial Robotic Process Automation Platform
        </h1>
        <p className="text-xs text-slate-400 font-mono">
          Enterprise Workflow Automation, Intelligent OCR & Bot Control
        </p>
      </div>

      {/* 2. SUB-TAB SELECTOR BAR matching Screenshot 1:1 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 font-mono text-xs">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-[#facc15] text-black shadow-lg shadow-amber-500/20'
                : 'bg-[#080d1a] text-slate-300 border border-slate-800 hover:text-white hover:bg-slate-900'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 3. TOP 4 CARDS ROW matching Screenshot 1:1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        
        {/* Card 1: RUNNING BOTS */}
        <div className="p-5 rounded-2xl bg-[#080d1a] border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 text-2xl">
            🤖
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">RUNNING BOTS</div>
            <div className="text-2xl font-bold text-white">2 <span className="text-sm font-normal text-slate-400">/ 2</span></div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>• Active Workers</span>
            </div>
          </div>
        </div>

        {/* Card 2: IDLE BOTS */}
        <div className="p-5 rounded-2xl bg-[#080d1a] border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-950 border border-amber-500/40 flex items-center justify-center text-amber-400 text-2xl">
            ⌛
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">IDLE BOTS</div>
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-[10px] text-[#facc15] font-bold">
              Ready for Dispatch
            </div>
          </div>
        </div>

        {/* Card 3: QUEUE SIZE */}
        <div className="p-5 rounded-2xl bg-[#080d1a] border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-950 border border-blue-500/40 flex items-center justify-center text-blue-400 text-2xl">
            📥
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">QUEUE SIZE</div>
            <div className="text-2xl font-bold text-white">18 <span className="text-xs font-normal text-slate-400">tasks</span></div>
            <div className="text-[10px] text-emerald-400 font-bold">
              Normal Load
            </div>
          </div>
        </div>

        {/* Card 4: SUCCESS RATE */}
        <div className="p-5 rounded-2xl bg-[#080d1a] border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-2xl">
            🎯
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SUCCESS RATE</div>
            <div className="text-2xl font-bold text-white">98.2%</div>
            <div className="text-[10px] text-emerald-400 font-bold">
              Optimal Efficiency
            </div>
          </div>
        </div>

      </div>

      {/* 4. SYSTEM RESOURCE ALLOCATION PROGRESS BARS matching Screenshot 2:1 */}
      <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4 font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-[#facc15] uppercase tracking-wider flex items-center gap-2">
            <span>💻 System Resource Allocation</span>
          </h3>
          <span className="px-2.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-cyan-400">
            LIVE TELEMETRY
          </span>
        </div>

        {/* CPU Utilization Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">CPU Utilization</span>
            <span className="text-cyan-400 font-bold">34.2%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-900">
            <div className="h-full bg-gradient-to-r from-emerald-400 via-amber-300 to-yellow-400 rounded-full w-[34.2%]" />
          </div>
        </div>

        {/* Memory Usage (RAM) Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">Memory Usage (RAM)</span>
            <span className="text-cyan-400 font-bold">4.2 GB / 16 GB</span>
          </div>
          <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-900">
            <div className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full w-[26%]" />
          </div>
        </div>

        {/* Overall Robot Health Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">Overall Robot Health</span>
            <span className="text-emerald-400 font-bold">99.4% Healthy</span>
          </div>
          <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-900">
            <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full w-[99.4%]" />
          </div>
        </div>
      </div>

      {/* 5. RECENT EXECUTION QUEUE & REAL-TIME JOB FEED TABLE matching Screenshot 2:1 */}
      <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4 font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-[#facc15] uppercase tracking-wider flex items-center gap-2">
            <span>📋 Recent Execution Queue & Real-Time Job Feed</span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[#facc15]">
                <th className="pb-3 font-bold">Job ID</th>
                <th className="pb-3 font-bold">Bot Assigned</th>
                <th className="pb-3 font-bold">Workflow Name</th>
                <th className="pb-3 font-bold">Status</th>
                <th className="pb-3 font-bold">Duration</th>
                <th className="pb-3 font-bold text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {executionFeed.map(job => (
                <tr key={job.id} className="hover:bg-slate-900/50">
                  <td className="py-3 font-bold text-[#facc15]">{job.id}</td>
                  <td className="py-3 text-slate-200">{job.bot}</td>
                  <td className="py-3 text-slate-300">{job.workflow}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${job.status === 'RUNNING' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="py-3 text-cyan-300">{job.duration}</td>
                  <td className="py-3 text-right text-slate-400">{job.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
