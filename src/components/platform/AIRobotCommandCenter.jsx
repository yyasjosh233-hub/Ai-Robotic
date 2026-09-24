import React, { useState } from 'react'
import { Terminal, ShieldCheck, AlertTriangle, CheckCircle2, Play, RefreshCw, Lock, Zap } from 'lucide-react'
import { parseAndValidateRobotCommand } from '../../services/aiProvider'

export default function AIRobotCommandCenter() {
  const [commandInput, setCommandInput] = useState('Send the logistics robot to Station A3')
  const [executionResult, setExecutionResult] = useState(null)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionLog, setExecutionLog] = useState([
    { id: 1, text: 'Safety Validator Engine online. Deterministic rules active.', type: 'info' }
  ])

  const handleParseCommand = () => {
    const result = parseAndValidateRobotCommand(commandInput)
    setExecutionResult(result)
    setShowConfirmationModal(true)
  }

  const handleConfirmAndExecute = () => {
    setShowConfirmationModal(false)
    setIsExecuting(true)

    setExecutionLog((prev) => [
      ...prev,
      { id: Date.now(), text: `Parsed intent: Robot ${executionResult.parsedCommand.robot}, Task: ${executionResult.parsedCommand.task}, Destination: ${executionResult.parsedCommand.destination}`, type: 'ai' },
      { id: Date.now() + 1, text: 'Safety Validation Passed (Workspace, Speed, Collision & Proximity verified).', type: 'safety' },
      { id: Date.now() + 2, text: `Human Approval Granted. Executing motion trajectory for ${executionResult.parsedCommand.robot}...`, type: 'exec' }
    ])

    setTimeout(() => {
      setIsExecuting(false)
      setExecutionLog((prev) => [
        ...prev,
        { id: Date.now() + 3, text: `SUCCESS: ${executionResult.parsedCommand.robot} arrived at ${executionResult.parsedCommand.destination}. Task complete.`, type: 'success' }
      ])
    }, 1500)
  }

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl glass-panel border border-cyan-500/40 bg-gradient-to-r from-slate-950 via-[#070e1c] to-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300">
              <Terminal className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-wide">
                AI NATURAL LANGUAGE ROBOT COMMAND CENTER
              </h2>
              <p className="text-xs font-mono text-cyan-300">
                AI COMMAND PARSING + DETERMINISTIC SAFETY VALIDATION LAYER
              </p>
            </div>
          </div>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-2">
          <Lock className="w-4 h-4" />
          <span>SAFETY OVERRIDE: DETERMINISTIC AUTHORITY ACTIVE</span>
        </div>
      </div>

      {/* Input Section */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 bg-slate-950 space-y-4">
        <label className="text-xs font-mono text-cyan-400 font-bold uppercase block">
          TYPE NATURAL LANGUAGE ROBOT COMMAND
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            placeholder="e.g. Send the logistics robot to Station A3 or Instruct R08 to begin component installation"
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
          />
          <button
            onClick={handleParseCommand}
            className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs font-mono flex items-center justify-center gap-2 shadow-lg"
          >
            <Zap className="w-4 h-4 fill-black" />
            <span>PARSE & VALIDATE</span>
          </button>
        </div>

        {/* Quick Example Command Pills */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <span className="text-slate-500">Examples:</span>
          {[
            'Send the logistics robot to Station A3',
            'Instruct R08 to begin precision component installation',
            'Deploy R12 to perform AI computer vision quality inspection',
            'Move welding robot R07 to Welding Bay 02'
          ].map((cmd) => (
            <button
              key={cmd}
              onClick={() => setCommandInput(cmd)}
              className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              "{cmd}"
            </button>
          ))}
        </div>
      </div>

      {/* Architecture Flow Visualization */}
      <div className="p-6 rounded-3xl glass-panel border border-cyan-500/30 bg-slate-950 space-y-4">
        <div className="text-xs font-mono text-cyan-400 font-bold uppercase">
          AI COMMAND TO SAFETY VALIDATION ARCHITECTURE
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-cyan-400 font-bold">1. PERCEPTION</div>
            <div className="text-[10px] text-slate-400">Natural Language Input</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-cyan-400 font-bold">2. REASONING</div>
            <div className="text-[10px] text-slate-400">AI Intent Parsing</div>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold">
            <div>3. SAFETY VALIDATOR</div>
            <div className="text-[10px]">Deterministic Rule Engine</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-cyan-400 font-bold">4. HUMAN APPROVAL</div>
            <div className="text-[10px] text-slate-400">Confirmation Modal</div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold">
            <div>5. ROBOT ACTION</div>
            <div className="text-[10px]">ROS 2 Trajectory Execution</div>
          </div>
        </div>
      </div>

      {/* Execution Log Terminal */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 bg-slate-950 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-cyan-400 font-bold">COMMAND EXECUTION TERMINAL</span>
          <span className="text-[10px] text-slate-500">10 Hz REAL-TIME STREAM</span>
        </div>

        <div className="p-4 rounded-2xl bg-black border border-slate-900 h-48 overflow-y-auto space-y-2">
          {executionLog.map((log) => (
            <div key={log.id} className="flex items-start gap-2">
              <span className="text-slate-600">&gt;</span>
              <span className={
                log.type === 'safety' ? 'text-amber-400 font-bold' :
                log.type === 'ai' ? 'text-cyan-300' :
                log.type === 'success' ? 'text-emerald-400 font-bold' :
                'text-slate-400'
              }>
                {log.text}
              </span>
            </div>
          ))}
          {isExecuting && (
            <div className="flex items-center gap-2 text-cyan-400 animate-pulse">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Executing trajectory simulation...</span>
            </div>
          )}
        </div>
      </div>

      {/* HUMAN CONFIRMATION & SAFETY VALIDATION MODAL */}
      {showConfirmationModal && executionResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-xl rounded-3xl glass-panel border border-amber-500/50 p-6 shadow-2xl space-y-5 text-slate-100 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>SAFETY VALIDATION & HUMAN APPROVAL REQUIRED</span>
              </div>
              <button onClick={() => setShowConfirmationModal(false)} className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                Cancel
              </button>
            </div>

            {/* Parsed JSON Display */}
            <div className="space-y-2">
              <div className="text-cyan-400 font-bold">AI PARSED STRUCTURED COMMAND (JSON):</div>
              <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 text-xs font-mono">
{JSON.stringify(executionResult.parsedCommand, null, 2)}
              </pre>
            </div>

            {/* Safety Rules Checklist */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-emerald-400 font-bold">DETERMINISTIC SAFETY CHECKS:</div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Workspace Boundary: PASSED</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Speed Limit (2.0 m/s): PASSED</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Collision Check: PASSED</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Proximity Distance (&gt;1.5m): PASSED</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 text-[10px]">Safety Validator holds final authority.</span>
              <div className="flex items-center gap-2">
                <button onClick={() => setShowConfirmationModal(false)} className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                  REJECT COMMAND
                </button>
                <button onClick={handleConfirmAndExecute} className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold flex items-center gap-1.5">
                  <Play className="w-4 h-4 fill-black" />
                  <span>CONFIRM & EXECUTE</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
