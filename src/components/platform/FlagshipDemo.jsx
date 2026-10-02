import React, { useState, useEffect } from 'react'
import { Play, CheckCircle2, RefreshCw, Sparkles, Shield, AlertTriangle, Cpu, Box, FileText, Video, Eye, Hand, Activity, Terminal } from 'lucide-react'
import { robotIdentities } from '../../data/robotIdentitySystem'

export default function FlagshipDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [autoPlay, setAutoPlay] = useState(false)
  const [executionLog, setExecutionLog] = useState([])
  const [completed, setCompleted] = useState(false)

  const steps = [
    {
      step: 1,
      robotId: 'R25',
      name: 'R25 Customer Service & Order Intake',
      action: 'Receives customer order #ORD-2026-9942 for 100x Precision Quantum Actuators',
      detail: 'HTTP API v2 Order Endpoint triggered with encrypted payload.',
      status: '[SIMULATION]',
      image: robotIdentities['R25']?.referenceImage || '/assets/robocorp_shot05_management.jpg'
    },
    {
      step: 2,
      robotId: 'AI_BRAIN',
      name: 'ROBOCORP AI Brain (Foundation Model)',
      action: 'Parses natural language order & translates into structured task primitives',
      detail: 'Intent: Manufacturing | Object: Quantum_Actuator_x100 | Target Line: Assembly Station A3',
      status: '[AI MODEL CONNECTED]',
      image: '/assets/film_scene_ceo_command.jpg'
    },
    {
      step: 3,
      robotId: 'R05',
      name: 'R05 Production Manager Robot',
      action: 'Creates optimized line production schedule and allocates robot tasks',
      detail: 'Calculated parallel bottleneck-free Gantt schedule across R06-R10, R20-R23.',
      status: '[SIMULATION]',
      image: robotIdentities['R05']?.referenceImage || '/assets/robocorp_r05_prod_mgr.jpg'
    },
    {
      step: 4,
      robotId: 'R22',
      name: 'R22 Heavy Inventory Handler',
      action: 'Verifies raw material stock in automated storage rack A-12',
      detail: 'LIDAR + RFID scan confirms 120x raw alloy housings and micro-bearings available.',
      status: '[SIMULATION]',
      image: robotIdentities['R22']?.referenceImage || '/assets/robocorp_r22_forklift.jpg'
    },
    {
      step: 5,
      robotId: 'R23',
      name: 'R23 Warehouse Tugger AMR',
      action: 'Retrieves component bins from high-density rack and loads onto AMR tray',
      detail: 'Nav2 stack trajectory planned at 1.8 m/s with Zero-Collision clearance.',
      status: '[SIMULATION]',
      image: robotIdentities['R23']?.referenceImage || '/assets/robocorp_r23_warehouse.jpg'
    },
    {
      step: 6,
      robotId: 'R20',
      name: 'R20 Heavy Material Handler AMR',
      action: 'Transports raw components to Precision Assembly Station A3',
      detail: 'Autonomous AMR fleet coordination with dynamic obstacle avoidance.',
      status: '[SIMULATION]',
      image: robotIdentities['R20']?.referenceImage || '/assets/robocorp_r20_amr.jpg'
    },
    {
      step: 7,
      robotId: 'R08',
      name: 'R08 Humanoid Precision Assembler',
      action: 'Performs micro-gear installation & precision component alignment',
      detail: '6-DOF joint trajectory + 32-DOF whole body stance stabilization (ZMP = 0.08m).',
      status: '[RESEARCH PROTOTYPE]',
      image: robotIdentities['R08']?.referenceImage || '/assets/robocorp_r08_installation.jpg'
    },
    {
      step: 8,
      robotId: 'R08',
      name: 'Tactile Sensing & Force Feedback System',
      action: 'Verifies 2.31 N contact force & detects zero slip during insertion',
      detail: 'Closed-loop 4x4 piezoresistive taxel matrix feedback (18.5 kPa array response).',
      status: '[SIMULATION]',
      image: '/assets/tactile_sensor_demo.jpg'
    },
    {
      step: 9,
      robotId: 'R12',
      name: 'R12 High-Speed Vision Inspector',
      action: 'Performs AI computer vision defect inspection @ 1000 FPS',
      detail: 'Active Perception orbit boosted visual confidence from 61% -> 97.4%.',
      status: '[AI MODEL CONNECTED]',
      image: robotIdentities['R12']?.referenceImage || '/assets/dashboard_quality_vision.jpg'
    },
    {
      step: 10,
      robotId: 'R13',
      name: 'R13 Precision Metrology Robot',
      action: 'Performs 3D laser sub-millimeter dimensional verification',
      detail: 'Measured component tolerance delta: +0.02mm (Pass limit: <0.05mm).',
      status: '[SIMULATION]',
      image: robotIdentities['R13']?.referenceImage || '/assets/robocorp_r13_metrology.jpg'
    },
    {
      step: 11,
      robotId: 'R19',
      name: 'R19 Safety Officer Robot',
      action: 'Validates safety fence, human proximity boundary, and torque limits',
      detail: 'Deterministic ISO 10218 safety guard engine returned 100% CLEAR.',
      status: '[HARDWARE READY]',
      image: robotIdentities['R19']?.referenceImage || '/assets/robocorp_r19_safety.jpg'
    },
    {
      step: 12,
      robotId: 'R24',
      name: 'R24 Digital Twin Specialist',
      action: 'Runs 4D digital twin real-to-sim validation and efficiency loop',
      detail: 'Synchronized X,Y,Z,TIME simulation with real-world sensor streams.',
      status: '[SIMULATION]',
      image: robotIdentities['R24']?.referenceImage || '/assets/film_scene_digital_twin.jpg'
    },
    {
      step: 13,
      robotId: 'R10',
      name: 'R10 Packaging & Palletizing Robot',
      action: 'Packages completed actuators into protective shock-proof containers',
      detail: 'Vacuum suction cup end-effector packed 100 units into master crate.',
      status: '[SIMULATION]',
      image: robotIdentities['R10']?.referenceImage || '/assets/robocorp_r10_packaging.jpg'
    },
    {
      step: 14,
      robotId: 'R25',
      name: 'R25 Customer Service & Order Intake',
      action: 'Reports completion to client portal with dispatch tracking link',
      detail: 'Order state updated to SHIPPED_READY with cryptographic proof tag.',
      status: '[SIMULATION]',
      image: robotIdentities['R25']?.referenceImage || '/assets/robocorp_shot05_management.jpg'
    },
    {
      step: 15,
      robotId: 'AI_MEDIA',
      name: 'ROBOCORP AI Intelligence Hub',
      action: 'Generates comprehensive automated production & OEE telemetry report',
      detail: 'Total execution time: 42.8s | Plant OEE: 98.4% | Energy: 142.0 kJ | Defect Rate: 0.00%',
      status: '[MOCK AI]',
      image: '/assets/film_scene_ceo_command.jpg'
    },
    {
      step: 16,
      robotId: 'AI_MEDIA',
      name: 'AI Media & Publicity Studio',
      action: 'Generates 4K promotional demonstration video of the finished product process',
      detail: 'Synthesized cinematic factory tour video & LinkedIn publicity release.',
      status: '[MOCK AI]',
      image: '/assets/film_scene_publicity.jpg'
    }
  ]

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      const next = currentStep + 1
      setCurrentStep(next)
      setExecutionLog(prev => [...prev, steps[next]])
    } else {
      setCompleted(true)
      setIsRunning(false)
    }
  }

  const handleStartDemo = () => {
    setCurrentStep(0)
    setExecutionLog([steps[0]])
    setCompleted(false)
    setIsRunning(true)
    setAutoPlay(true)
  }

  useEffect(() => {
    let timer
    if (autoPlay && isRunning && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        handleNextStep()
      }, 2200)
    } else if (currentStep === steps.length - 1 && autoPlay) {
      setCompleted(true)
      setIsRunning(false)
      setAutoPlay(false)
    }
    return () => clearTimeout(timer)
  }, [autoPlay, isRunning, currentStep])

  const cur = steps[currentStep]

  return (
    <div className="space-y-8 text-slate-100 font-sans p-1 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-emerald-950 border border-cyan-500/40 p-6 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-0.5 rounded-full bg-cyan-900/80 text-cyan-300 font-mono text-[11px] font-bold uppercase tracking-wider border border-cyan-600">
                FLAGSHIP DEMONSTRATION
              </span>
              <span className="px-3 py-0.5 rounded-full bg-amber-900/80 text-amber-300 font-mono text-[11px] font-bold uppercase tracking-wider border border-amber-600">
                16-STEP END-TO-END WORKFLOW
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-wide uppercase mt-2">
              "AI MANUFACTURES A PRODUCT"
            </h1>
            <p className="text-xs text-slate-300 font-mono mt-1">
              Watch ROBOCORP 25 execute a full autonomous manufacturing order from intake to assembly, quality check, packaging & publicity.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!isRunning && !completed && (
              <button
                onClick={handleStartDemo}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-extrabold text-xs uppercase tracking-wider hover:opacity-90 shadow-lg flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>START FLAGSHIP DEMO</span>
              </button>
            )}

            {isRunning && (
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                className="px-5 py-3 rounded-2xl bg-slate-800 border border-slate-700 text-cyan-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${autoPlay ? 'animate-spin' : ''}`} />
                <span>{autoPlay ? 'PAUSE AUTOMATION' : 'RESUME AUTOMATION'}</span>
              </button>
            )}

            <button
              onClick={handleStartDemo}
              className="px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold text-xs"
            >
              RESET DEMO
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar (1-16 Steps) */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-3">
        <div className="flex justify-between items-center text-xs font-mono text-slate-300">
          <span>WORKFLOW PROGRESS: <strong className="text-cyan-400">STEP {currentStep + 1} OF 16</strong></span>
          <span className="text-emerald-400 font-bold">{Math.round(((currentStep + 1) / 16) * 100)}% COMPLETED</span>
        </div>
        <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800 flex">
          <div
            className="bg-gradient-to-r from-cyan-500 via-emerald-500 to-blue-500 h-full transition-all duration-500 rounded-full"
            style={{ width: `${((currentStep + 1) / 16) * 100}%` }}
          />
        </div>
        
        {/* Step Indicators */}
        <div className="grid grid-cols-8 sm:grid-cols-16 gap-1 pt-1">
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => { setCurrentStep(idx); setExecutionLog(steps.slice(0, idx + 1)) }}
              className={`h-7 rounded text-[10px] font-mono font-bold transition-all flex items-center justify-center ${
                idx === currentStep
                  ? 'bg-cyan-500 text-black border border-white scale-110 shadow-lg'
                  : idx < currentStep
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-slate-950 text-slate-600 border border-slate-800'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Execution View & Interactive Step Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Current Active Robot Visual & Details */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40">
                {cur.robotId}
              </span>
              <h2 className="text-lg font-bold text-white">{cur.name}</h2>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-slate-950 text-slate-400 font-mono text-[10px] border border-slate-800">
              {cur.status}
            </span>
          </div>

          {/* Robot Visual Image Frame */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-950 border border-slate-800 group shadow-2xl">
            <img
              src={cur.image}
              alt={cur.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 space-y-1">
              <div className="text-xs font-mono text-cyan-400 font-bold">CURRENT TASK STEP {cur.step}:</div>
              <div className="text-sm font-bold text-white">{cur.action}</div>
              <div className="text-xs font-mono text-slate-300">{cur.detail}</div>
            </div>
          </div>

          {/* Interactive Step Control */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => { if (currentStep > 0) setCurrentStep(currentStep - 1) }}
              disabled={currentStep === 0}
              className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 disabled:opacity-40"
            >
              &larr; Previous Step
            </button>

            <button
              onClick={handleNextStep}
              disabled={currentStep === steps.length - 1}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 disabled:opacity-40"
            >
              Next Step &rarr;
            </button>
          </div>
        </div>

        {/* Right Side: Live Execution Sequence Log */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4 flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>LIVE MANUFACTURING TRAJECTORY</span>
            </h3>
            <span className="text-[10px] font-mono text-cyan-400 animate-pulse">● EXECUTING</span>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto max-h-[460px] pr-2 font-mono text-xs">
            {executionLog.map((log, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border transition-all ${
                  idx === currentStep
                    ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-200'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-[11px] mb-1">
                  <span className="text-cyan-400">#{log.step} [{log.robotId}]</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">{log.status}</span>
                </div>
                <div className="text-white font-semibold text-[11px] mb-0.5">{log.action}</div>
                <div className="text-[10px] text-slate-400">{log.detail}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* FINAL SCREEN (When completed or viewed at end) */}
      {(completed || currentStep === steps.length - 1) && (
        <div className="bg-gradient-to-b from-slate-900 via-[#0a1224] to-black border-2 border-cyan-400 p-8 rounded-3xl text-center space-y-6 shadow-2xl animate-fade-in relative overflow-hidden">
          <div className="absolute inset-0 bg-cyan-500/5 pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-400">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>FLAGSHIP DEMONSTRATION COMPLETE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            ROBOCORP 25
          </h1>

          <div className="max-w-3xl mx-auto py-4 px-6 bg-slate-950/80 border border-slate-800 rounded-2xl">
            <div className="text-cyan-400 font-mono text-sm sm:text-base font-bold tracking-widest uppercase">
              PERCEPTION &rarr; REASONING &rarr; PLANNING &rarr; ACTION &rarr; FEEDBACK &rarr; LEARNING
            </div>
            <div className="text-slate-300 font-bold text-xs sm:text-sm mt-2">
              AI + ROBOTICS + PHYSICAL AI + DIGITAL TWIN
            </div>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto">
            All 25 robots, World Model, VLA engine, Tactile feedback, Edge AI compute, 4D Spatial Twin, and Safety Guards collaborated seamlessly without human intervention.
          </p>

          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={handleStartDemo}
              className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold text-xs uppercase"
            >
              REPLAY DEMONSTRATION
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
