import React, { useState, useEffect } from 'react'
import { 
  Brain, Zap, Activity, Cpu, Shield, RefreshCw, Radio, Sparkles, 
  Play, CheckCircle2, AlertTriangle, Users, Box, Move, Sliders, 
  Terminal, Lock, RotateCw, Hand, Maximize2, Camera, Compass, 
  FileText, ArrowRight, Heart, HeartPulse, Award, BookOpen, Layers, Target, Eye
} from 'lucide-react'

export default function NeuralinkBCIStudio() {
  const [loading, setLoading] = useState(false)
  const [telemetry, setTelemetry] = useState(null)
  
  // Thought Input State
  const [thoughtCommand, setThoughtCommand] = useState('Imagine Moving Arm Right')
  const [decodedOutput, setDecodedOutput] = useState(null)

  // Active Subject Tab
  const [subjectTab, setSubjectTab] = useState('noland')

  // Selected Brain Region State for Visualizer
  const [selectedBrainRegion, setSelectedBrainRegion] = useState('M1')

  // Surgical Simulation State
  const [surgicalSim, setSurgicalSim] = useState(null)

  // Brain Regions Manifest
  const brainRegionsData = [
    {
      id: "M1",
      name: "Primary Motor Cortex (M1)",
      brodmann: "BA 4 (Precentral Gyrus)",
      color: "from-purple-500 to-indigo-600",
      textColor: "text-purple-400",
      borderColor: "border-purple-500",
      bgColor: "bg-purple-950/80",
      threads: 32,
      channels: 512,
      depth: "2.0 mm",
      function: "Executes voluntary motor movements (Hand, Arm, Leg, Jaw articulation)",
      how_it_works: "Neuralink electrode threads detect action potential spikes (20kHz sampling) from pyramidal motor neurons. Spiking frequency correlates directly with intended movement direction and velocity.",
      robot_translation: "Decodes 3D end-effector reach velocity (Vx, Vy, Vz), wrist roll angle, and joint trajectories for R08 & R06."
    },
    {
      id: "S1",
      name: "Primary Somatosensory Cortex (S1)",
      brodmann: "BA 1, 2, 3 (Postcentral Gyrus)",
      color: "from-cyan-500 to-blue-600",
      textColor: "text-cyan-400",
      borderColor: "border-cyan-500",
      bgColor: "bg-cyan-950/80",
      threads: 32,
      channels: 512,
      depth: "1.8 mm",
      function: "Processes tactile touch, pressure, texture, temperature, and proprioceptive body sense",
      how_it_works: "Receives real-time tactile telemetry from robot fingertips. Micro-stimulation current pulses stimulate S1 neurons to feed synthetic touch sensation directly back to the human brain.",
      robot_translation: "Translates robot 6-DOF force/torque and 4x4 fingertip pressure feedback into realistic human touch perception."
    },
    {
      id: "PMA",
      name: "Premotor Cortex & SMA",
      brodmann: "BA 6 (Anterior to M1)",
      color: "from-emerald-500 to-teal-600",
      textColor: "text-emerald-400",
      borderColor: "border-emerald-500",
      bgColor: "bg-emerald-950/80",
      threads: 0,
      channels: 0,
      depth: "N/A (Pre-firing area)",
      function: "Prepares, plans, and sequences complex motor action series before physical execution",
      how_it_works: "Fires action potential waves 120ms before M1 motor execution. ML decoders use PMA activity for early trajectory anticipation and intent filtering.",
      robot_translation: "Provides early action trigger detection to pre-position robot arm trajectories before full motor firing."
    },
    {
      id: "PFC",
      name: "Prefrontal Cortex (PFC)",
      brodmann: "BA 9, 10, 11, 46 (Frontal Lobe)",
      color: "from-amber-500 to-orange-600",
      textColor: "text-amber-400",
      borderColor: "border-amber-500",
      bgColor: "bg-amber-950/80",
      threads: 0,
      channels: 0,
      depth: "N/A (Executive Center)",
      function: "High-level goal setting, executive decision making, working memory, cognitive focus",
      how_it_works: "Encodes high-level user cognitive intent (e.g., 'Assemble Component A03' or 'Dispatch Tugger AMR').",
      robot_translation: "Translates high-level cognitive goal intent into ROBOCORP 25 Multi-Agent Company Brain task requests."
    },
    {
      id: "PPC",
      name: "Posterior Parietal Cortex (PPC)",
      brodmann: "BA 5, 7 (Parietal Lobe)",
      color: "from-pink-500 to-rose-600",
      textColor: "text-pink-400",
      borderColor: "border-pink-500",
      bgColor: "bg-pink-950/80",
      threads: 0,
      channels: 0,
      depth: "N/A (Spatial Center)",
      function: "Spatial coordinate transformation (Transforms visual target location into body-centered motor coordinates)",
      how_it_works: "Computes eye-hand spatial vectors to determine target object positions in 3D physical space.",
      robot_translation: "Feeds 3D target coordinates directly to the ROBOCORP Pointing Ray Solver ([2.45, 1.10, 0.85])."
    },
    {
      id: "V1",
      name: "Primary Visual Cortex (V1)",
      brodmann: "BA 17 (Occipital Lobe)",
      color: "from-blue-500 to-indigo-600",
      textColor: "text-blue-400",
      borderColor: "border-blue-500",
      bgColor: "bg-blue-950/80",
      threads: 0,
      channels: 0,
      depth: "N/A (Visual Center)",
      function: "Processes visual features, orientation, spatial boundaries, and optic flow",
      how_it_works: "Visual target tracking feedback used for closing the visual-motor loop during neural control.",
      robot_translation: "Synchronizes human visual gaze with robot camera feeds for Active Perception viewpoint selection."
    }
  ]

  const activeRegion = brainRegionsData.find(r => r.id === selectedBrainRegion) || brainRegionsData[0]

  // Fetch Telemetry
  const fetchBciStatus = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8000/api/v2/bci/neuralink/status')
      if (res.ok) {
        const data = await res.json()
        setTelemetry(data)
      }
    } catch (e) {
      console.warn("Backend offline, running interactive BCI client simulation")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBciStatus()
  }, [])

  // Decode Neural Intent Handler
  const handleDecodeThought = async (command) => {
    const cmd = command || thoughtCommand
    setThoughtCommand(cmd)
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8000/api/v2/bci/neuralink/decode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thought_command: cmd })
      })
      if (res.ok) {
        const data = await res.json()
        setDecodedOutput(data)
      }
    } catch (e) {
      if (cmd.includes('WAVE') || cmd.includes('Wave') || cmd.includes('hello')) {
        setDecodedOutput({
          input_neural_intent: cmd,
          decoding_results: {
            cortex_region: "Primary Motor Cortex (M1) Brodmann Area 4",
            intent_type: "MOTOR_CORTEX_GREETING_WAVE",
            decoded_vector: { wrist_oscillation_hz: 2.0, amplitude_deg: 35.0 },
            decoding_latency_ms: 5.4,
            ml_decoder_confidence: 0.988,
            target_robot: "R08 (Humanoid Assembler)",
            robot_action: "Robot R08 waving back to human operator 👋 via direct neural telepathy"
          }
        })
      } else if (cmd.includes('Grasp') || cmd.includes('pick')) {
        setDecodedOutput({
          input_neural_intent: cmd,
          decoding_results: {
            cortex_region: "Somatosensory (S1) & Motor Cortex (M1)",
            intent_type: "MOTOR_CORTEX_HAND_GRASP",
            decoded_vector: { finger_closure_mm: 45.0, target_force_n: 18.5 },
            decoding_latency_ms: 6.1,
            ml_decoder_confidence: 0.992,
            target_robot: "R08 (Humanoid Assembler)",
            robot_action: "Closing 5-finger end-effector to 45mm span with 18.5N tactile force feedback"
          }
        })
      } else {
        setDecodedOutput({
          input_neural_intent: cmd,
          decoding_results: {
            cortex_region: "Primary Motor Cortex (M1) Brodmann Area 4",
            intent_type: "MOTOR_CORTEX_ARM_REACH",
            decoded_vector: { vx: 0.35, vy: -0.20, vz: 0.10, roll_deg: 15.0 },
            decoding_latency_ms: 4.8,
            ml_decoder_confidence: 0.994,
            target_robot: "R08 (Humanoid Assembler)",
            robot_action: "Moving right arm to coordinate [2.80, 0.90, 0.95] via neural intent"
          }
        })
      }
    } finally {
      setLoading(false)
    }
  }

  // Surgical Sim Handler
  const handleRunSurgicalSim = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8000/api/v2/bci/neuralink/surgical-implant', { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        setSurgicalSim(data)
      }
    } catch (e) {
      setSurgicalSim({
        mode: "SURGICAL_ROBOT_SIMULATION_ACTIVE",
        surgical_robot_specs: {
          insertion_rate: "6 threads / minute (192 electrodes/min)",
          thread_thickness: "4 to 6 µm (Thinner than human hair)",
          insertion_depth_accuracy_um: "±5 µm (Micron Precision)",
          blood_vessel_hemorrhage_avoidance: "99.98% Success Rate"
        },
        surgical_steps: [
          { step: 1, phase: "Cortical Surface Mapping", status: "COMPLETED", detail: "High-speed optical imaging mapped pial vessel network" },
          { step: 2, phase: "Blood Vessel Avoidance", status: "ACTIVE", detail: "Micron-level computer vision flagged 142 capillary pathways" },
          { step: 3, phase: "Heartbeat Motion Stabilization", status: "ACTIVE", detail: "Needle inserter synchronized with patient cardiac cycle (72 BPM)" },
          { step: 4, phase: "Thread Insertion", status: "INSERTING", detail: "Inserted 64 threads (1,024 electrodes) @ 6 threads/min (Depth: 2.0 mm)" },
          { step: 5, phase: "Skull Flush Encapsulation", status: "READY", detail: "Link N1 chip seated flush in 23mm craniotomy pocket with biocompatible seal" }
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 text-slate-100 font-sans p-1 max-w-7xl mx-auto">
      
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-cyan-950 border border-purple-700/60 p-6 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 shadow-lg shadow-purple-500/20">
              <Brain className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-0.5 rounded-full bg-purple-900/80 text-purple-300 font-mono text-[11px] font-bold uppercase tracking-wider border border-purple-600">
                  NEURALINK LINK N1 • BCI / BMI
                </span>
                <span className="px-3 py-0.5 rounded-full bg-cyan-900/80 text-cyan-300 font-mono text-[11px] font-bold uppercase tracking-wider border border-cyan-600">
                  MIND OVER MACHINE (2025)
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-white tracking-wide uppercase mt-1">
                Mind Over Machine: Elon Musk's Neuralink Brain Chip
              </h1>
              <p className="text-xs text-slate-300 font-mono">
                Kadali Devi Sindhuja et al. (2025) &bull; Int. Journal of Science, Eng. & Tech (ISSN: 2348-4098) &bull; AITRC Vita
              </p>
            </div>
          </div>

          <button
            onClick={fetchBciStatus}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-xl shadow-purple-950 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync Neural Telemetry</span>
          </button>
        </div>

        {/* Paper Citation Header Summary */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block">CHIP ARCHITECTURE</span>
            <span className="text-purple-300 font-bold">Coin-Sized Link (23x8 mm)</span>
          </div>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block">ELECTRODE THREADS</span>
            <span className="text-cyan-300 font-bold">1,024 Channels (4-6 µm thick)</span>
          </div>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block">SURGICAL ROBOT</span>
            <span className="text-emerald-300 font-bold">6 Threads/min (192 elect/min)</span>
          </div>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block">WIRELESS TELEMETRY</span>
            <span className="text-amber-300 font-bold">Bluetooth LE Inductive Charge</span>
          </div>
        </div>
      </div>

      {/* 🧠 SECTION 1: INTERACTIVE BRAIN ANATOMICAL MAP & REGIONS VISUALIZER */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-extrabold text-white flex items-center gap-2 uppercase tracking-wide">
              <Brain className="w-5 h-5 text-purple-400" />
              <span>Interactive Brain Anatomical Regions Map & Neuralink Implant Placement</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Click any brain region below to inspect cortical Brodmann area, thread density, anatomical function, and how it controls robots.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-3 py-1 rounded-lg border border-cyan-800 font-bold">
            6 CORTICAL REGIONS TRACKED
          </span>
        </div>

        {/* Cortical Region Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-xs font-mono">
          {brainRegionsData.map((reg) => (
            <button
              key={reg.id}
              onClick={() => setSelectedBrainRegion(reg.id)}
              className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                selectedBrainRegion === reg.id
                  ? `${reg.bgColor} ${reg.borderColor} text-white ring-1 ring-cyan-400 shadow-lg`
                  : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`font-bold ${reg.textColor}`}>{reg.id}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-300">
                  {reg.threads > 0 ? `${reg.threads} Th` : 'Ref'}
                </span>
              </div>
              <div className="text-[11px] font-bold text-white truncate">{reg.name.split(' ')[0]}</div>
              <div className="text-[9px] text-slate-400 truncate">{reg.brodmann.split(' ')[0]}</div>
            </button>
          ))}
        </div>

        {/* Interactive Brain Map Canvas & Inspector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left: Stylized Visual Brain Map Diagram */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center min-h-[320px]">
            {/* Background Neural Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/40 via-transparent to-cyan-950/40" />
            
            {/* SVG Brain Map Contour */}
            <div className="relative z-10 w-full max-w-md h-64 flex flex-col items-center justify-center">
              
              {/* Brain Hemisphere Contour Box */}
              <div className="relative w-72 h-48 rounded-[60px] border-2 border-slate-700 bg-slate-900/80 p-4 shadow-2xl flex flex-col justify-between">
                
                {/* Link N1 Chip Implant Head Marker */}
                <div className="absolute -top-4 left-24 bg-gradient-to-r from-purple-500 to-cyan-500 text-slate-950 px-3 py-1 rounded-full text-[10px] font-mono font-black shadow-lg flex items-center gap-1.5 border border-white/40 animate-pulse">
                  <Zap className="w-3 h-3 fill-slate-950" />
                  <span>LINK N1 CHIP (23mm)</span>
                </div>

                {/* Electrode Threads Penetration Rays */}
                <div className="absolute top-3 left-28 w-0.5 h-14 bg-gradient-to-b from-cyan-400 to-purple-500 animate-pulse" />
                <div className="absolute top-3 left-32 w-0.5 h-16 bg-gradient-to-b from-purple-400 to-emerald-400 animate-pulse" />
                <div className="absolute top-3 left-36 w-0.5 h-12 bg-gradient-to-b from-cyan-400 to-amber-400 animate-pulse" />

                {/* Anatomical Regions Nodes */}
                <div className="flex justify-between items-center text-[10px] font-mono font-bold pt-6">
                  <button
                    onClick={() => setSelectedBrainRegion('PFC')}
                    className={`px-2 py-1 rounded border transition-all ${selectedBrainRegion === 'PFC' ? 'bg-amber-500 text-slate-950 border-amber-300 font-black scale-110' : 'bg-slate-950 text-amber-400 border-amber-900'}`}
                  >
                    PFC (Frontal)
                  </button>

                  <button
                    onClick={() => setSelectedBrainRegion('M1')}
                    className={`px-2.5 py-1.5 rounded border transition-all ${selectedBrainRegion === 'M1' ? 'bg-purple-500 text-white border-purple-300 font-black scale-110 shadow-lg' : 'bg-purple-950 text-purple-300 border-purple-800'}`}
                  >
                    M1 (Motor) 🧠
                  </button>

                  <button
                    onClick={() => setSelectedBrainRegion('S1')}
                    className={`px-2.5 py-1.5 rounded border transition-all ${selectedBrainRegion === 'S1' ? 'bg-cyan-500 text-slate-950 border-cyan-300 font-black scale-110 shadow-lg' : 'bg-cyan-950 text-cyan-300 border-cyan-800'}`}
                  >
                    S1 (Touch) 🤏
                  </button>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono font-bold pb-2">
                  <button
                    onClick={() => setSelectedBrainRegion('PMA')}
                    className={`px-2 py-1 rounded border transition-all ${selectedBrainRegion === 'PMA' ? 'bg-emerald-500 text-slate-950 border-emerald-300 font-black scale-110' : 'bg-slate-950 text-emerald-400 border-emerald-900'}`}
                  >
                    PMA (Planning)
                  </button>

                  <button
                    onClick={() => setSelectedBrainRegion('PPC')}
                    className={`px-2 py-1 rounded border transition-all ${selectedBrainRegion === 'PPC' ? 'bg-pink-500 text-white border-pink-300 font-black scale-110' : 'bg-slate-950 text-pink-400 border-pink-900'}`}
                  >
                    PPC (Spatial 3D)
                  </button>

                  <button
                    onClick={() => setSelectedBrainRegion('V1')}
                    className={`px-2 py-1 rounded border transition-all ${selectedBrainRegion === 'V1' ? 'bg-blue-500 text-white border-blue-300 font-black scale-110' : 'bg-slate-950 text-blue-400 border-blue-900'}`}
                  >
                    V1 (Visual)
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-2 text-[10px] font-mono text-slate-400 text-center">
              Click cortical nodes above to inspect thread depths & robot execution translations.
            </div>
          </div>

          {/* Right: Selected Brain Region Inspector Panel */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div>
                <span className={`text-sm font-bold block ${activeRegion.textColor}`}>
                  {activeRegion.name}
                </span>
                <span className="text-[10px] text-slate-400">{activeRegion.brodmann}</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded border ${activeRegion.borderColor} ${activeRegion.textColor} font-bold`}>
                {activeRegion.threads > 0 ? `${activeRegion.threads} THREADS (${activeRegion.channels} CH)` : 'TARGET REGION'}
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Anatomical Function</span>
                <p className="text-slate-200 text-[11px] leading-relaxed">{activeRegion.function}</p>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Neuralink Chip Mechanism</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">{activeRegion.how_it_works}</p>
              </div>

              <div className="p-3 bg-purple-950/40 rounded-xl border border-purple-800 space-y-1">
                <span className="text-purple-300 text-[10px] uppercase font-bold block">ROBOCORP 25 Robot Execution Translation</span>
                <p className="text-cyan-300 text-[11px] font-bold leading-relaxed">{activeRegion.robot_translation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Signal Flow Propagation Pipeline */}
        <div className="pt-3 border-t border-slate-800">
          <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block mb-2">
            Real-Time Brain-to-Robot Signal Flow Pipeline
          </span>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-[10px] font-mono text-center">
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-purple-400 font-bold">{activeRegion.id} Cortex</div>
              <div className="text-[9px] text-slate-400">Action Potentials</div>
            </div>
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-cyan-400 font-bold">1,024 Threads</div>
              <div className="text-[9px] text-slate-400">4-6 µm Electrodes</div>
            </div>
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-emerald-400 font-bold">Link N1 AFE</div>
              <div className="text-[9px] text-slate-400">20 kHz Digitizer</div>
            </div>
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-amber-400 font-bold">BLE Stream</div>
              <div className="text-[9px] text-slate-400">2.4 GHz Wireless</div>
            </div>
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-purple-400 font-bold">ML Decoder</div>
              <div className="text-[9px] text-slate-400">4.8 ms Latency</div>
            </div>
            <div className="p-2 bg-cyan-950 rounded-xl border border-cyan-700">
              <div className="text-white font-bold">Robot Action</div>
              <div className="text-[9px] text-cyan-300">R08 / R23 Motor</div>
            </div>
          </div>
        </div>
      </div>

      {/* 🧠 SECTION 2: HARDWARE & 1,024-CHANNEL SPIKE RASTER */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-extrabold text-white flex items-center gap-2 uppercase tracking-wide">
              <Cpu className="w-5 h-5 text-purple-400" />
              <span>Neuralink Link N1 Chip & 1,024-Channel Cortical Spike Raster</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Custom Analog Front-End (AFE) & DSP digitizing Primary Motor Cortex (M1) action potentials in real-time.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-3 py-1 rounded-lg border border-emerald-800 font-bold">
            1024 CHANNELS ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase block">
              Link N1 Implant Hardware Specs
            </span>

            <div className="space-y-2 text-xs font-mono">
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Implant Size:</span>
                <span className="text-white font-bold">23 mm &times; 8 mm</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Threads Count:</span>
                <span className="text-cyan-300 font-bold">64 Threads (1024 electrodes)</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Thread Thickness:</span>
                <span className="text-emerald-300 font-bold">4 to 6 &mu;m (Flexible)</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">AFE/DSP Sample Rate:</span>
                <span className="text-purple-300 font-bold">20,000 Hz</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Battery Life:</span>
                <span className="text-amber-300 font-bold">18.5 Hours (Inductive)</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 md:col-span-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                1,024-Channel Cortical Action Potential Raster Grid
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">Sampling: 20 kHz &bull; SNR: 24.2 dB</span>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <div className="grid grid-cols-16 gap-1 h-36 overflow-hidden">
                {Array.from({ length: 128 }).map((_, i) => {
                  const isActive = i % 3 === 0 || i % 7 === 0
                  return (
                    <div
                      key={i}
                      className={`h-3 rounded-[2px] transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-t from-cyan-500 to-purple-400 animate-pulse'
                          : 'bg-slate-950 border border-slate-800'
                      }`}
                    />
                  )
                })}
              </div>
              <div className="flex justify-between items-center mt-2 font-mono text-[10px] text-slate-400">
                <span>Motor Cortex (M1) Hand Area</span>
                <span className="text-purple-300">Somatosensory (S1) Feedback</span>
                <span>Wireless BLE Stream: 2.4 GHz</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🧠 SECTION 3: MIND OVER MACHINE DIRECT NEURAL ROBOT CONTROL */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-extrabold text-white flex items-center gap-2 uppercase tracking-wide">
              <Zap className="w-5 h-5 text-cyan-400" />
              <span>Mind Over Machine: Direct Neural Robot Control Console</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Decode thought intentions directly into 3D motor commands for ROBOCORP 25 robots without physical input.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-3 py-1 rounded-lg border border-cyan-800 font-bold">
            NEURAL DECODER LATENCY: 4.8ms
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase block">
              Human Operator Thought Intent Selector
            </span>

            <div className="space-y-2">
              <label className="text-[11px] font-mono text-slate-400 block">Select Thought Intention:</label>
              <div className="grid grid-cols-1 gap-2 text-xs font-mono">
                {[
                  'Imagine Moving Arm Right to Station A03',
                  'Imagine Grasping Component C-14 with 18.5N Force',
                  'Imagine Waving Robot Hand 👋',
                  'Imagine Navigating Tugger AMR R23 to Supply Bay',
                  'Imagine Designing 3D CAD Object via Neural Cursor'
                ].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => handleDecodeThought(cmd)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      thoughtCommand === cmd
                        ? 'bg-cyan-950 border-cyan-400 text-cyan-200 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    "{cmd}"
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-mono text-slate-400 block">Custom Thought Intention Text:</label>
              <input
                type="text"
                value={thoughtCommand}
                onChange={(e) => setThoughtCommand(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-cyan-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              onClick={() => handleDecodeThought(thoughtCommand)}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Decode Cortical Intent & Execute Robot Action</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase block">
              Decoded Cortical Intent & Robot Execution Output
            </span>

            {decodedOutput ? (
              <div className="space-y-3">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Cortical Region Source</span>
                  <div className="text-purple-300 font-bold mt-0.5">{decodedOutput.decoding_results?.cortex_region}</div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Target Robot & Executed Action</span>
                  <div className="text-cyan-300 font-bold mt-0.5">{decodedOutput.decoding_results?.robot_action}</div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Decoder Latency</span>
                    <span className="text-emerald-400 font-bold">{decodedOutput.decoding_results?.decoding_latency_ms} ms</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">ML Confidence</span>
                    <span className="text-cyan-400 font-bold">{((decodedOutput.decoding_results?.ml_decoder_confidence || 0.99) * 100).toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-900 rounded-xl text-slate-500 italic">
                Select a thought intention on the left to test direct brain-to-robot control.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🤖 SECTION 4: PRECISION SURGICAL ROBOT SIMULATOR */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-extrabold text-white flex items-center gap-2 uppercase tracking-wide">
              <Activity className="w-5 h-5 text-emerald-400" />
              <span>High-Precision Neuralink Robotic Surgical System</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Micron-level robotic thread insertion (4-6 µm) with optical blood vessel avoidance and cardiac heartbeat motion stabilization.
            </p>
          </div>

          <button
            onClick={handleRunSurgicalSim}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg transition-all"
          >
            <Play className="w-4 h-4" />
            <span>Simulate Surgical Thread Insertion</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Insertion Rate</span>
            <div className="text-xl font-black text-emerald-400 mt-1">6 Threads / min</div>
            <span className="text-[10px] text-slate-400">192 Electrodes / min</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Thread Thickness</span>
            <div className="text-xl font-black text-cyan-400 mt-1">4 to 6 &mu;m</div>
            <span className="text-[10px] text-slate-400">Ultra-thin Biocompatible</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Micron Precision</span>
            <div className="text-xl font-black text-purple-400 mt-1">&plusmn;5 &mu;m Accuracy</div>
            <span className="text-[10px] text-slate-400">Heartbeat Compensated</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Vessel Avoidance</span>
            <div className="text-xl font-black text-amber-400 mt-1">99.98% Success</div>
            <span className="text-[10px] text-slate-400">Zero Hemorrhage Risk</span>
          </div>
        </div>

        {surgicalSim && (
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase block">Surgical Insertion Steps:</span>
            {surgicalSim.surgical_steps?.map((st) => (
              <div key={st.step} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-cyan-400 font-bold mr-2">STEP 0{st.step}. {st.phase}:</span>
                  <span className="text-slate-300">{st.detail}</span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 text-[10px] rounded border border-emerald-900 font-bold">
                  {st.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 📊 SECTION 5: CLINICAL & PRECLINICAL SUBJECT BENCHMARKS */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-extrabold text-white flex items-center gap-2 uppercase tracking-wide">
              <Users className="w-5 h-5 text-amber-400" />
              <span>Subject Trial Benchmarks: Preclinical Animals & Human Trialists</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Empirical evidence from Pager (Monkey Pong), Gertrude (Pig Snout), Noland Arbaugh, Alex, and Brad Smith.
            </p>
          </div>

          <div className="flex gap-2 text-xs font-mono">
            <button
              onClick={() => setSubjectTab('noland')}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                subjectTab === 'noland' ? 'bg-amber-950 border-amber-400 text-amber-300 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              Noland Arbaugh (#1)
            </button>
            <button
              onClick={() => setSubjectTab('alex')}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                subjectTab === 'alex' ? 'bg-amber-950 border-amber-400 text-amber-300 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              Alex (#2 CAD)
            </button>
            <button
              onClick={() => setSubjectTab('brad')}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                subjectTab === 'brad' ? 'bg-amber-950 border-amber-400 text-amber-300 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              Brad Smith (#3 ALS)
            </button>
            <button
              onClick={() => setSubjectTab('animals')}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                subjectTab === 'animals' ? 'bg-amber-950 border-amber-400 text-amber-300 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              Monkey & Pig Trials
            </button>
          </div>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 font-mono text-xs space-y-3">
          {subjectTab === 'noland' && (
            <div className="space-y-2">
              <div className="flex justify-between font-bold text-amber-300 text-sm">
                <span>Noland Arbaugh (First Human N1 Implant — Jan 2024)</span>
                <span>C5-C6 Quadriplegia</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                29-year-old quadriplegic from Arizona paralyzed from shoulders down in 2016. Post-implantation, demonstrated 
                ability to control a computer cursor using thoughts alone, playing Civilization VI, chess, composing messages, and controlling robots.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-emerald-400">
                <strong>Software Breakthrough:</strong> Software optimizations successfully compensated for initial thread retraction, restoring full bandwidth cursor performance.
              </div>
            </div>
          )}

          {subjectTab === 'alex' && (
            <div className="space-y-2">
              <div className="flex justify-between font-bold text-amber-300 text-sm">
                <span>"Alex" (Second Human N1 Implant — Aug 2024)</span>
                <span>Spinal Cord Injury</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Utilized the implant to play first-person shooter games and design complex 3D objects in CAD software. 
                Targeted surgical placement reduced brain motion gap, achieving zero thread retraction.
              </p>
            </div>
          )}

          {subjectTab === 'brad' && (
            <div className="space-y-2">
              <div className="flex justify-between font-bold text-amber-300 text-sm">
                <span>Brad Smith (Third Human N1 Implant — May 2025)</span>
                <span>Nonverbal ALS</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Nonverbal individual with Amyotrophic Lateral Sclerosis (ALS). Controlled a computer cursor by imagining jaw clenching 
                and tongue movement. Coupled with synthetic AI that reconstructed his voice from pre-ALS recordings to edit and narrate videos by thought!
              </p>
            </div>
          )}

          {subjectTab === 'animals' && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-cyan-300">Pager (Macaque Monkey - 2021):</div>
                <p className="text-slate-300">Played Mind Pong purely via brain signals after joystick was unplugged. Proved high-bandwidth wireless telepathy.</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-cyan-300">Gertrude (Pig - 2020):</div>
                <p className="text-slate-300">Live real-time spike visualization from snout somatosensory cortex during environmental contact.</p>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
