import React, { useState, useEffect } from 'react'
import { 
  Brain, Eye, Zap, Layers, Activity, Radio, Cpu, Shield, RefreshCw, 
  Sparkles, Play, CheckCircle2, AlertTriangle, Users, Box, Move, 
  Compass, Share2, Database, Sliders, Server, ArrowRight, CornerDownRight,
  Gauge, Terminal, Lock, RotateCw, Hand, Maximize2, Camera, Crosshair,
  Volume2, MessageSquare, Target, Settings, ChevronRight
} from 'lucide-react'

export default function PhysicalAIRoboticsStudio() {
  const [activeTech, setActiveTech] = useState('vla')
  const [loading, setLoading] = useState(false)
  const [telemetry, setTelemetry] = useState(null)

  // Interactive Robot Controller State
  const [selectedRobotId, setSelectedRobotId] = useState('R08')
  const [jointAngles, setJointAngles] = useState({
    shoulder_pan: 0,
    shoulder_pitch: -30,
    elbow: 45,
    wrist_roll: -45,
    wrist_pitch: 15,
    finger_span_mm: 65,
    head_pan: 0,
    head_tilt: -15,
    torso_pitch: 5
  })
  
  // Interactive Tactile Matrix State (4x4)
  const [tactileMatrix, setTactileMatrix] = useState([
    [1.8, 2.4, 2.1, 1.0],
    [3.2, 4.5, 4.0, 2.2],
    [2.9, 3.8, 3.5, 1.9],
    [1.0, 1.8, 1.4, 0.7]
  ])
  const [tactileForce, setTactileForce] = useState(18.5)
  const [slipSimulated, setSlipSimulated] = useState(false)

  // Interactive HRI Gesture & Voice State
  const [selectedGesture, setSelectedGesture] = useState('POINT')
  const [hriCommandText, setHriCommandText] = useState('Assemble gear component at station A03')
  const [hriResponse, setHriResponse] = useState(null)

  // VLA State
  const [vlaPrompt, setVlaPrompt] = useState('Pick the red component and place it on the assembly station')
  const [vlaOutput, setVlaOutput] = useState(null)

  // World Model State
  const [worldModelData, setWorldModelData] = useState(null)

  // 4D Spatial State
  const [spatialData, setSpatialData] = useState(null)

  // Cross Robot Learning State
  const [broadcastLog, setBroadcastLog] = useState(null)

  // Synthetic Data State
  const [selectedScenario, setSelectedScenario] = useState('Normal Operation')
  const [syntheticBatch, setSyntheticBatch] = useState(null)

  // Edge AI State
  const [edgeOffline, setEdgeOffline] = useState(false)

  // Active Perception State
  const [apConfidence, setApConfidence] = useState(0.62)
  const [apResult, setApResult] = useState(null)

  // Multi-Agent State
  const [negotiateLog, setNegotiateLog] = useState(null)

  // Robot Embodiments Image Catalog
  const robotCatalog = [
    { id: 'R08', name: 'R08 Humanoid Assembler', role: 'Precision Gear Insertion', image: '/assets/robocorp_r08_installation.jpg', division: 'Production' },
    { id: 'R06', name: 'R06 General Assembly Arm', role: 'Engine Block Assembly', image: '/assets/robocorp_r06_assembly.jpg', division: 'Production' },
    { id: 'R07', name: 'R07 Laser Arc Welder', role: 'High-Temp Frame Welding', image: '/assets/robocorp_r07_welding.jpg', division: 'Production' },
    { id: 'R09', name: 'R09 CNC Machining Robot', role: 'Spindle Tool Milling', image: '/assets/robocorp_r09_machining.jpg', division: 'Production' },
    { id: 'R10', name: 'R10 Packaging Robot', role: 'Box Palletizing', image: '/assets/robocorp_r10_packaging.jpg', division: 'Production' },
    { id: 'R12', name: 'R12 High-Speed Scanner', role: 'Optical CV @ 1000 FPS', image: '/assets/dashboard_quality_vision.jpg', division: 'Quality' },
    { id: 'R19', name: 'R19 Safety Officer', role: 'Human Proximity Guard', image: '/assets/robocorp_r19_safety.jpg', division: 'Safety' },
    { id: 'R23', name: 'R23 Tugger AMR', role: 'Autonomous Component Delivery', image: '/assets/robocorp_r23_warehouse.jpg', division: 'Logistics' },
    { id: 'PAI_V2', name: 'PAI-IR v2.0 Humanoid', role: 'Full-Body Frontier AI', image: '/assets/pai_robot_v2.jpg', division: 'Frontier AI' },
    { id: 'TWIN', name: '3D Digital Twin Factory', role: 'Closed Loop Real-Sim Sync', image: '/assets/film_scene_digital_twin.jpg', division: 'Digital Twin' }
  ]

  // Fetch Summary
  const fetchAllData = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8000/api/v2/physical-ai/12-tech-stack')
      if (res.ok) {
        const data = await res.json()
        setTelemetry(data)
      }
    } catch (e) {
      console.warn("Backend offline, running interactive client simulation")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  // Interactive Taxel Click Handler
  const handleTaxelClick = (r, c) => {
    const updated = [...tactileMatrix.map(row => [...row])]
    updated[r][c] = parseFloat((updated[r][c] + 1.5).toFixed(1))
    if (updated[r][c] > 12.0) updated[r][c] = 0.5
    setTactileMatrix(updated)
    
    // Recalculate Total Force
    const total = updated.reduce((acc, row) => acc + row.reduce((sum, val) => sum + val, 0), 0)
    setTactileForce(parseFloat(total.toFixed(1)))
  }

  // HRI Interactive Trigger
  const handleTriggerHRI = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8000/api/hri/gesture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gesture_name: selectedGesture, command: hriCommandText })
      })
      if (res.ok) {
        const data = await res.json()
        setHriResponse(data)
      }
    } catch (e) {
      if (selectedGesture === 'WAVE') {
        setHriResponse({
          status: "SUCCESS",
          detected_gesture: "WAVE",
          robot_response: `Gesture 'WAVE' detected 👋! Robot R08 is waving back to human operator! Executing arm wave trajectory (Wrist Roll: ±35° @ 2.0 Hz, Shoulder Pitch: +20°).`,
          wave_trajectory: {
            joint_oscillation_hz: 2.0,
            wrist_roll_amplitude_deg: 35.0,
            shoulder_pitch_deg: 20.0,
            wave_status: "WAVING_BACK_ACTIVE",
            greeting_dialogue: "Hello Operator! Robot R08 online and standing by."
          },
          pointing_ray_3d: [2.45, 1.10, 0.85]
        })
      } else if (selectedGesture === 'STOP') {
        setHriResponse({
          status: "SUCCESS",
          detected_gesture: "STOP",
          robot_response: `Gesture 'STOP' detected ✋! Triggering Emergency Safe Stop interlock. Decelerating motors @ 1.5 m/s².`,
          wave_trajectory: { wave_status: "STOP_INTERLOCK_ACTIVE" },
          pointing_ray_3d: [2.45, 1.10, 0.85]
        })
      } else if (selectedGesture === 'GRASP') {
        setHriResponse({
          status: "SUCCESS",
          detected_gesture: "GRASP",
          robot_response: `Gesture 'GRASP' detected ✊! Closing 5-finger end-effector to 45.0mm span with 18.5N tactile force feedback.`,
          wave_trajectory: { wave_status: "TACTILE_GRASP_ACTIVE" },
          pointing_ray_3d: [2.45, 1.10, 0.85]
        })
      } else if (selectedGesture === 'THUMBS_UP') {
        setHriResponse({
          status: "SUCCESS",
          detected_gesture: "THUMBS_UP",
          robot_response: `Gesture 'THUMBS_UP' detected 👍! Operator task confirmation acknowledged. Mission status marked as COMPLETED.`,
          wave_trajectory: { wave_status: "CONFIRMATION_ACKNOWLEDGED" },
          pointing_ray_3d: [2.45, 1.10, 0.85]
        })
      } else {
        setHriResponse({
          status: "SUCCESS",
          detected_gesture: "POINT",
          robot_response: `Gesture 'POINT' detected 👈! Pointing Ray Solver calculated 3D target coordinates [2.45, 1.10, 0.85] matching precision component B-14.`,
          wave_trajectory: { wave_status: "POINTING_RAY_ACTIVE" },
          pointing_ray_3d: [2.45, 1.10, 0.85]
        })
      }
    } finally {
      setLoading(false)
    }
  }


  // 1. VLA Handler
  const handleRunVla = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8000/api/v2/vla/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: vlaPrompt })
      })
      if (res.ok) {
        const data = await res.json()
        setVlaOutput(data)
      }
    } catch (e) {
      setVlaOutput({
        vla_model: "ROBOCORP-VLA-2026-v4",
        input_language: vlaPrompt,
        visual_context: { primary_target: "red_component", destination: "assembly_station", confidence: 0.97 },
        robot_action_primitives: [
          { step: 1, primitive: "PERCEIVE_SCENE", details: "Segmented 'red_component' at [2.45, 1.10, 0.85] with 97% visual confidence" },
          { step: 2, primitive: "APPROACH_POSE", target_xyz: [2.45, 1.10, 1.05], wrist_angle_deg: -45.0 },
          { step: 3, primitive: "ALIGN_GRIPPER", finger_span_mm: 65.0, tactile_threshold_N: 12.5 },
          { step: 4, primitive: "TACTILE_GRASP", grip_force_N: 18.0, slip_detection: "ACTIVE" },
          { step: 5, primitive: "LIFT_AND_TRAVERSE", intermediate_xyz: [3.20, 0.15, 1.20] },
          { step: 6, primitive: "PLACE_TARGET", target_xyz: [4.10, -0.80, 0.90] }
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  // 2. World Model Handler
  const handleRunWorldModel100 = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8000/api/v2/world-model/100-rollouts')
      if (res.ok) {
        const data = await res.json()
        setWorldModelData(data)
      }
    } catch (e) {
      const rollouts = Array.from({ length: 5 }, (_, i) => ({
        action_id: `ACTION_${(i+1).toString().padStart(3, '0')}`,
        safety_score: (0.99 - i*0.02).toFixed(4),
        collision_risk: (0.002 + i*0.01).toFixed(4),
        energy_j: (38.5 + i*4.2).toFixed(1),
        exec_time_s: (3.1 + i*0.4).toFixed(1),
        outcome_prediction: "SAFE_EXECUTION"
      }))
      setWorldModelData({
        total_simulated_actions: 100,
        top_5_safe_actions: rollouts,
        chosen_action: { action_id: "ACTION_001", safety_score: 0.992, collision_risk: 0.002, energy_j: 38.5 }
      })
    } finally {
      setLoading(false)
    }
  }

  // 3. Tactile Slip Handler
  const handleTriggerSlip = () => {
    setSlipSimulated(!slipSimulated)
    if (!slipSimulated) {
      setTactileForce(26.5)
    } else {
      setTactileForce(18.5)
    }
  }

  // 5. Cross Robot Broadcast
  const handleBroadcastSkill = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8000/api/v2/cross-robot-learning/broadcast', { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        setBroadcastLog(data)
      }
    } catch (e) {
      setBroadcastLog({
        status: "SKILL_BROADCAST_SUCCESSFUL",
        new_skill_artifact: { skill_id: "SKILL_GEAR_INSERTION_R08", source_robot: "R08", task_name: "Compliant Precision Gear Insertion" },
        shared_knowledge_network: {
          cross_embodiment_adaptations: [
            { target_robot: "R06 (Assembly Arm)", status: "DEPLOYED" },
            { target_robot: "R09 (Machining Arm)", status: "DEPLOYED" },
            { target_robot: "R10 (Packaging Arm)", status: "DEPLOYED" }
          ]
        }
      })
    } finally {
      setLoading(false)
    }
  }

  // 7. Synthetic Data Generator
  const handleGenerateSynthetic = async (category) => {
    setSelectedScenario(category)
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:8000/api/v2/synthetic-data/generate-categories?category=${encodeURIComponent(category)}`, { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        setSyntheticBatch(data)
      }
    } catch (e) {
      setSyntheticBatch({
        status: "SYNTHETIC_BATCH_GENERATED",
        batch_count: 8,
        total_synthetic_dataset_size: 124508,
        sample_preview: [
          { sample_id: "SYNTH_0012451", scenario_category: category, modalities: ["RGB", "DEPTH", "TACTILE"] }
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  // 9. Active Perception Viewpoint Shift
  const handleRunActivePerception = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8000/api/v2/active-perception/viewpoint-shift', { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        setApResult(data)
        setApConfidence(0.97)
      }
    } catch (e) {
      setApConfidence(0.97)
      setApResult({
        initial_confidence: 0.62,
        final_confidence: 0.97,
        information_gain_bits: 0.644,
        viewpoint_adjustment: { pan_delta_deg: 45.0, tilt_delta_deg: 20.0 },
        active_sequence: [
          { phase: "Robot sees component", confidence: 0.62, detail: "Initial confidence 62% (below 85% threshold)" },
          { phase: "Robot decision", confidence: 0.62, detail: "I need another view before I act." },
          { phase: "Camera shift", confidence: 0.62, detail: "Orbited camera +45° pan, +20° tilt" },
          { phase: "New viewpoint", confidence: 0.97, detail: "New perception confidence reached 97.0%" }
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  // 10. Multi Agent Negotiate
  const handleNegotiateTask = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8000/api/v2/multi-agent-brain/negotiate', { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        setNegotiateLog(data)
      }
    } catch (e) {
      setNegotiateLog({
        requesting_robot: "R08",
        needed_resource: "Gear Component C-14",
        assigned_collaborator: "R23 (Logistics AMR)",
        negotiation_log: [
          { step: 1, actor: "R08", event: "Emitted request: 'Need Gear Component C-14 at Assembly Station A03'" },
          { step: 2, actor: "AI COMPANY BRAIN", event: "Evaluating Logistics Division (R20-R23)" },
          { step: 3, actor: "AI COMPANY BRAIN", event: "Selected R23 (Precision Tugger AMR, distance: 12.4m)" },
          { step: 4, actor: "R23", event: "Accepted dispatch: Delivering C-14 to Assembly Station A03" }
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  const techStack = [
    { id: 'vla', label: '1. Vision-Language-Action (VLA)', icon: '🧠👁️🦾', tag: 'VLA Model' },
    { id: 'world_model', label: '2. Predictive World Models', icon: '🌎🤖', tag: '100 Action Rollouts' },
    { id: 'tactile', label: '3. Tactile AI & Robot Touch', icon: '🤏', tag: 'Force & Touch' },
    { id: 'spatial_4d', label: '4. 4D Spatial Intelligence', icon: '🗺️', tag: 'X,Y,Z + TIME' },
    { id: 'cross_robot', label: '5. Cross-Robot Learning', icon: '🤖↔️🤖', tag: 'Shared Knowledge' },
    { id: 'sim_to_real', label: '6. Real-to-Sim-to-Real', icon: '🔄', tag: 'Closed Loop' },
    { id: 'synthetic_data', label: '7. Synthetic Data Generator', icon: '🎥🤖', tag: '8 Failure Modes' },
    { id: 'edge_ai', label: '8. On-Device / Edge AI', icon: '⚡', tag: '<5ms Latency' },
    { id: 'active_perception', label: '9. Active Perception Engine', icon: '👁️🤖', tag: '62% -> 97% Shift' },
    { id: 'multi_agent', label: '10. Multi-Agent Company Brain', icon: '🤖🤖🤖', tag: '25-Robot Fleet' },
    { id: 'memory', label: '11. Dual-Layer Robot Memory', icon: '🧠', tag: 'Short & Long Term' },
    { id: 'whole_body', label: '12. Whole-Body Control', icon: '🦿', tag: '32-DOF Humanoid' }
  ]

  const activeRobotObj = robotCatalog.find(r => r.id === selectedRobotId) || robotCatalog[0]

  return (
    <div className="space-y-8 text-slate-100 font-sans p-1 max-w-7xl mx-auto">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-purple-950 border border-cyan-700/60 p-6 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/20">
              <Zap className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-0.5 rounded-full bg-cyan-900/80 text-cyan-300 font-mono text-[11px] font-bold uppercase tracking-wider border border-cyan-600">
                  ROBOCORP 25 • PHYSICAL AI 2026
                </span>
                <span className="px-3 py-0.5 rounded-full bg-purple-900/80 text-purple-300 font-mono text-[11px] font-bold uppercase tracking-wider border border-purple-600">
                  ROBOT INTERACTION & IMAGES
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-white tracking-wide uppercase mt-1">
                2026 Physical AI 12-Tech Studio & Robot Interaction Hub
              </h1>
              <p className="text-xs text-slate-300 font-mono">
                Interactive Robot Controllers • Real Embodiment Images • Tactile Touch Matrix • VLA Prompting • Multi-Agent Handoffs
              </p>
            </div>
          </div>

          <button
            onClick={fetchAllData}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-xl shadow-cyan-950 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync System Telemetry</span>
          </button>
        </div>

        {/* Master Architecture Pipeline Diagram */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>ROBOCORP 25 UNIFIED PHYSICAL AI ARCHITECTURE PIPELINE</span>
          </div>
          
          <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800/90 font-mono text-[11px] overflow-x-auto">
            <div className="flex items-center justify-between min-w-[900px] text-center gap-2">
              <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 flex-1">
                <div className="font-bold text-xs text-white">ROBOCORP AI BRAIN</div>
                <div className="text-[9px] text-cyan-400">Master Intelligence</div>
              </div>
              <span className="text-slate-500">&rarr;</span>
              <div className="p-2.5 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-300 flex-1">
                <div className="font-bold text-xs text-white">VLA + WORLD MODEL</div>
                <div className="text-[9px] text-purple-400">100 Rollouts & Memory</div>
              </div>
              <span className="text-slate-500">&rarr;</span>
              <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 flex-1">
                <div className="font-bold text-xs text-white">MULTI-AGENT BRAIN</div>
                <div className="text-[9px] text-amber-400">25 Robot Negotiator</div>
              </div>
              <span className="text-slate-500">&rarr;</span>
              <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex-1">
                <div className="font-bold text-xs text-white">5 DIVISIONS</div>
                <div className="text-[9px] text-emerald-400">Prod / QA / Logistics / Safety</div>
              </div>
              <span className="text-slate-500">&rarr;</span>
              <div className="p-2.5 rounded-xl bg-blue-950/80 border border-blue-500/40 text-blue-300 flex-1">
                <div className="font-bold text-xs text-white">EDGE AI & TOUCH</div>
                <div className="text-[9px] text-blue-400">&lt;5ms + Tactile Wrench</div>
              </div>
              <span className="text-slate-500">&circlearrowright;</span>
              <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 flex-1">
                <div className="font-bold text-xs text-white">WORLD MODEL UPDATE</div>
                <div className="text-[9px] text-cyan-400">Real-Sim Feedback ↺</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 📸 SECTION 1: INTERACTIVE ROBOT EMBODIMENTS IMAGE GALLERY */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <div>
            <h2 className="text-base font-extrabold text-white flex items-center gap-2 uppercase tracking-wide">
              <Camera className="w-5 h-5 text-cyan-400" />
              <span>ROBOCORP 25 Robot Embodiments Image Catalog & Active Telemetry HUD</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Click any robot embodiment below to inspect visual stream, HUD annotations, and active kinematic status.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-3 py-1 rounded-lg border border-cyan-800 font-bold">
            10 REAL EMBODIMENT STREAMS
          </span>
        </div>

        {/* Robot Cards Selector Horizontal Scroll */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {robotCatalog.map((bot) => (
            <button
              key={bot.id}
              onClick={() => setSelectedRobotId(bot.id)}
              className={`p-2 rounded-2xl border text-left transition-all overflow-hidden relative group ${
                selectedRobotId === bot.id
                  ? 'bg-cyan-950/90 border-cyan-400 shadow-lg shadow-cyan-950 ring-1 ring-cyan-400'
                  : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="h-24 w-full rounded-xl overflow-hidden relative mb-2 bg-slate-900">
                <img src={bot.image} alt={bot.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-1.5 left-1.5 bg-slate-950/80 text-cyan-300 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold">
                  {bot.id}
                </div>
              </div>
              <div className="text-[11px] font-bold text-white truncate">{bot.name}</div>
              <div className="text-[9px] font-mono text-slate-400 truncate">{bot.role}</div>
            </button>
          ))}
        </div>

        {/* Active Robot Main Visual Stream HUD Inspector */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="relative h-72 rounded-xl overflow-hidden border border-cyan-500/40 group">
            <img src={activeRobotObj.image} alt={activeRobotObj.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
            
            {/* Live Bounding HUD Overlay */}
            <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur border border-cyan-500/50 px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-300 font-bold">
              LIVE CAMERA FEED &bull; {activeRobotObj.id} ({activeRobotObj.division})
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-slate-400 text-[10px] block">TASK ROLE</span>
                <span className="text-white font-bold">{activeRobotObj.role}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">VISUAL PERCEIVER</span>
                <span className="text-emerald-400 font-bold">120 FPS STEREO</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">STATUS</span>
                <span className="text-cyan-400 font-bold">ONLINE</span>
              </div>
            </div>
          </div>

          {/* Robot Active Kinematics & Joint Pose Quick Monitor */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                {activeRobotObj.name} &bull; Kinematic Joint Telemetry
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900">
                ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px]">Shoulder Pitch</span>
                <div className="text-cyan-300 font-bold text-sm">{jointAngles.shoulder_pitch}°</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px]">Elbow Joint</span>
                <div className="text-cyan-300 font-bold text-sm">{jointAngles.elbow}°</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px]">Wrist Alignment Angle</span>
                <div className="text-amber-400 font-bold text-sm">{jointAngles.wrist_roll}°</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px]">Finger Opening Span</span>
                <div className="text-purple-400 font-bold text-sm">{jointAngles.finger_span_mm} mm</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🤖 SECTION 2: INTERACTIVE ROBOT CONTROL & TOUCH PLAYGROUND */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-extrabold text-white flex items-center gap-2 uppercase tracking-wide">
              <Sliders className="w-5 h-5 text-amber-400" />
              <span>Interactive Robot Controller & Tactile Touch Playground</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Move joint sliders to jog the robot arm, click taxels on the tactile matrix to simulate pressure points!
            </p>
          </div>
          <span className="text-xs font-mono text-amber-400 bg-amber-950 px-3 py-1 rounded-lg border border-amber-800 font-bold">
            INTERACTIVE CONTROL ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Joint Jogging Controls */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase block">
              Robot Joint Jogging & Pose Adjuster ({selectedRobotId})
            </span>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Shoulder Pitch Joint:</span>
                  <span className="text-cyan-400 font-bold">{jointAngles.shoulder_pitch}°</span>
                </div>
                <input
                  type="range"
                  min="-90"
                  max="90"
                  value={jointAngles.shoulder_pitch}
                  onChange={(e) => setJointAngles({ ...jointAngles, shoulder_pitch: parseInt(e.target.value) })}
                  className="w-full accent-cyan-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Elbow Joint Bend:</span>
                  <span className="text-cyan-400 font-bold">{jointAngles.elbow}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="120"
                  value={jointAngles.elbow}
                  onChange={(e) => setJointAngles({ ...jointAngles, elbow: parseInt(e.target.value) })}
                  className="w-full accent-cyan-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Wrist Roll Alignment Angle:</span>
                  <span className="text-amber-400 font-bold">{jointAngles.wrist_roll}°</span>
                </div>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={jointAngles.wrist_roll}
                  onChange={(e) => setJointAngles({ ...jointAngles, wrist_roll: parseInt(e.target.value) })}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Gripper Finger Opening Span:</span>
                  <span className="text-purple-400 font-bold">{jointAngles.finger_span_mm} mm</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={jointAngles.finger_span_mm}
                  onChange={(e) => setJointAngles({ ...jointAngles, finger_span_mm: parseInt(e.target.value) })}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Right: Clickable Tactile Matrix */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                Clickable Fingertip Tactile Matrix (4x4)
              </span>
              <span className="text-[10px] font-mono text-slate-400">Click cells to add pressure!</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center font-mono">
              {tactileMatrix.map((row, r) =>
                row.map((val, c) => (
                  <button
                    key={`taxel-${r}-${c}`}
                    onClick={() => handleTaxelClick(r, c)}
                    className="p-3 rounded-xl border bg-amber-950/60 border-amber-800/80 text-amber-300 hover:bg-amber-500/30 hover:border-amber-400 transition-all cursor-pointer font-bold text-xs"
                  >
                    <div>{val.toFixed(1)}</div>
                    <div className="text-[8px] text-amber-400/80">kPa</div>
                  </button>
                ))
              )}
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono">
              <div>
                <span className="text-slate-400 text-[10px] block">Calculated Total Force</span>
                <span className="text-amber-400 font-bold text-base">{tactileForce.toFixed(1)} N</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Contact State</span>
                <span className="text-emerald-400 font-bold">CONTACT_ESTABLISHED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 💬 SECTION 3: INTERACTIVE HUMAN-ROBOT VOICE & GESTURE WORKBENCH */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-extrabold text-white flex items-center gap-2 uppercase tracking-wide">
              <Hand className="w-5 h-5 text-purple-400" />
              <span>Human-Robot Interaction (HRI) Voice & Gesture Workbench</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Select human gesture, type voice input command, and simulate real-time pointing ray calculation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase block">
              Human Operator Input Console
            </span>

            <div className="space-y-2">
              <label className="text-[11px] font-mono text-slate-400 block">Select Human Gesture:</label>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {['POINT', 'WAVE', 'STOP', 'GRASP', 'THUMBS_UP'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGesture(g)}
                    className={`px-3 py-1.5 rounded-lg border transition-all ${
                      selectedGesture === g
                        ? 'bg-purple-950 border-purple-400 text-purple-200 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-mono text-slate-400 block">Voice Input Text:</label>
              <input
                type="text"
                value={hriCommandText}
                onChange={(e) => setHriCommandText(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-cyan-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              onClick={handleTriggerHRI}
              className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Execute Human-Robot Interaction</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                Robot Response & Gesture Trajectory Visualizer
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-bold">
                GESTURE: {selectedGesture}
              </span>
            </div>

            {hriResponse ? (
              <div className="space-y-4">
                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">ROBOT RESPONSE</span>
                  <div className="text-cyan-300 font-bold text-xs leading-relaxed">{hriResponse.robot_response}</div>
                </div>

                {/* Explicit Waving Robot Visualizer Card for WAVE Gesture */}
                {selectedGesture === 'WAVE' && (
                  <div className="bg-gradient-to-br from-purple-950/80 via-slate-900 to-cyan-950/80 p-4 rounded-2xl border border-purple-500/50 space-y-3 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl animate-bounce">👋</span>
                        <span className="font-bold text-white text-xs uppercase">ROBOT R08 WAVING BACK TO HUMAN</span>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 text-[10px] rounded border border-emerald-800 font-bold animate-pulse">
                        WAVING_BACK_ACTIVE
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-[11px]">
                      <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Joint Oscillation</span>
                        <span className="text-cyan-300 font-bold">Wrist Roll: &plusmn;35.0&deg;</span>
                      </div>
                      <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Wave Frequency</span>
                        <span className="text-purple-300 font-bold">2.0 Hz</span>
                      </div>
                    </div>

                    {/* Oscillating Wave Graphic Bars Animation */}
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-purple-800/60 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">Arm Wave Trajectory:</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-1.5 h-6 bg-cyan-400 rounded-full animate-pulse" />
                        <div className="w-1.5 h-4 bg-purple-400 rounded-full animate-ping" />
                        <div className="w-1.5 h-7 bg-cyan-400 rounded-full animate-pulse" />
                        <div className="w-1.5 h-3 bg-purple-400 rounded-full animate-bounce" />
                        <div className="w-1.5 h-6 bg-cyan-400 rounded-full animate-pulse" />
                      </div>
                    </div>

                    <div className="text-[11px] text-emerald-300 italic font-mono bg-emerald-950/50 p-2 rounded-lg border border-emerald-900/60">
                      "Hello Operator! Robot R08 online and standing by for orders 👋"
                    </div>
                  </div>
                )}

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Pointing Ray Coordinates:</span>
                  <span className="text-emerald-400 font-bold">[2.45, 1.10, 0.85]</span>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-900 rounded-xl text-slate-500 italic">
                Click "Execute Human-Robot Interaction" above to test gesture & voice response.
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 12-TECHNOLOGY SELECTOR GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {techStack.map((tech) => (
          <button
            key={tech.id}
            onClick={() => setActiveTech(tech.id)}
            className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between h-28 relative overflow-hidden group ${
              activeTech === tech.id
                ? 'bg-gradient-to-br from-cyan-950/90 to-slate-900 border-cyan-400 text-white shadow-lg ring-1 ring-cyan-400'
                : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-xl">{tech.icon}</span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800">
                {tech.tag}
              </span>
            </div>
            <div>
              <div className="text-xs font-bold leading-tight group-hover:text-cyan-300">
                {tech.label}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* MAIN DYNAMIC CONTENT AREA FOR SELECTED TECHNOLOGY */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl min-h-[480px]">
        
        {/* 1. VISION-LANGUAGE-ACTION (VLA) */}
        {activeTech === 'vla' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2 text-cyan-400">
                  <Brain className="w-6 h-6" />
                  <h3 className="text-lg font-bold text-white uppercase">1. Vision-Language-Action (VLA) Robots 🧠👁️🦾</h3>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Natural Language Prompt &rarr; VLA Foundation Engine &rarr; Task Planner &rarr; Direct Motor Action Primitives
                </p>
              </div>
              <span className="px-3 py-1 bg-cyan-950 text-cyan-400 text-xs font-mono font-bold rounded-lg border border-cyan-800">
                ROBOCORP-VLA-2026-v4
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-xs font-mono text-cyan-400 font-bold block uppercase tracking-wider">
                  Operator Natural Language Command:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={vlaPrompt}
                    onChange={(e) => setVlaPrompt(e.target.value)}
                    className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-cyan-200 focus:outline-none focus:border-cyan-500"
                    placeholder="e.g. Pick the red component and place it on the assembly station"
                  />
                  <button
                    onClick={handleRunVla}
                    className="px-5 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center space-x-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>Process VLA</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-slate-400 block">Try Pre-set Natural Language Prompts:</span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <button
                      onClick={() => setVlaPrompt('Pick the red component and place it on the assembly station')}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300"
                    >
                      "Pick the red component and place it on the assembly station"
                    </button>
                    <button
                      onClick={() => setVlaPrompt('Inspect surface gear teeth on Station 3 for micro-cracks')}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300"
                    >
                      "Inspect surface gear teeth on Station 3 for micro-cracks"
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 relative overflow-hidden h-52 flex items-center justify-center group">
                  <img src="/assets/robocorp_r08_installation.jpg" alt="VLA Camera Feed" className="w-full h-full object-cover rounded-xl opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute top-12 left-24 border-2 border-red-500 bg-red-500/10 px-2 py-1 rounded text-[10px] font-mono text-red-300 font-bold">
                    [VLA Segmented: red_component (97.0%)]
                  </div>
                  <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur border border-cyan-500/40 px-3 py-1 rounded-lg text-[10px] font-mono text-cyan-300 font-bold">
                    RGB-D STEREO FEED &bull; 120 FPS &bull; ONBOARD VLA PERCEIVER
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono font-bold text-purple-400 uppercase">
                    VLA Output & Action Primitives Sequence
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    CONFIDENCE: 96.5%
                  </span>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto font-mono text-xs pr-1">
                  {(vlaOutput?.robot_action_primitives || [
                    { step: 1, primitive: "PERCEIVE_SCENE", details: "Segmented 'red_component' at [2.45, 1.10, 0.85] with 97% visual confidence" },
                    { step: 2, primitive: "APPROACH_POSE", target_xyz: [2.45, 1.10, 1.05], wrist_angle_deg: -45.0 },
                    { step: 3, primitive: "ALIGN_GRIPPER", finger_span_mm: 65.0, tactile_threshold_N: 12.5 },
                    { step: 4, primitive: "TACTILE_GRASP", grip_force_N: 18.0, slip_detection: "ACTIVE" },
                    { step: 5, primitive: "LIFT_AND_TRAVERSE", intermediate_xyz: [3.20, 0.15, 1.20] },
                    { step: 6, primitive: "PLACE_TARGET", target_xyz: [4.10, -0.80, 0.90] }
                  ]).map((act) => (
                    <div key={act.step} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-start justify-between">
                      <div>
                        <span className="text-cyan-400 font-bold mr-2">STEP 0{act.step}.</span>
                        <span className="text-white font-bold">{act.primitive}</span>
                        <p className="text-[11px] text-slate-400 mt-1">{act.details || `Target: ${act.target_xyz || 'Coordinates set'}`}</p>
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-900">
                        READY
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. PREDICTIVE WORLD MODEL */}
        {activeTech === 'world_model' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2 text-purple-400">
                  <Sparkles className="w-6 h-6" />
                  <h3 className="text-lg font-bold text-white uppercase">2. Predictive World Models 🌎🤖</h3>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Current Factory State &rarr; World Model &rarr; Simulate 100 Possible Actions &rarr; Evaluate Outcomes &rarr; Choose Safe Action
                </p>
              </div>

              <button
                onClick={handleRunWorldModel100}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg transition-all"
              >
                <Play className="w-4 h-4" />
                <span>Simulate 100 Possible Actions</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Simulated Candidates</span>
                <div className="text-2xl font-black text-purple-400 font-mono mt-1">100 Parallel Actions</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Chosen Action Safety Score</span>
                <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                  {((worldModelData?.chosen_action?.safety_score || 0.992) * 100).toFixed(1)}%
                </div>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Collision Risk</span>
                <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
                  {((worldModelData?.chosen_action?.collision_risk || 0.002) * 100).toFixed(2)}%
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase block">
                Top Safest Action Rollouts (Evaluated from 100 Candidates)
              </span>

              <div className="overflow-x-auto font-mono text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                      <th className="py-2.5 px-3">ACTION ID</th>
                      <th className="py-2.5 px-3">SAFETY SCORE</th>
                      <th className="py-2.5 px-3">COLLISION RISK</th>
                      <th className="py-2.5 px-3">ENERGY COST</th>
                      <th className="py-2.5 px-3">EXEC TIME</th>
                      <th className="py-2.5 px-3">OUTCOME STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(worldModelData?.top_5_safe_actions || [
                      { action_id: "ACTION_001", safety_score: 0.992, collision_risk: 0.002, energy_j: 38.5, exec_time_s: 3.1, outcome_prediction: "SAFE_EXECUTION" },
                      { action_id: "ACTION_024", safety_score: 0.985, collision_risk: 0.004, energy_j: 41.2, exec_time_s: 3.4, outcome_prediction: "SAFE_EXECUTION" },
                      { action_id: "ACTION_078", safety_score: 0.971, collision_risk: 0.009, energy_j: 44.0, exec_time_s: 3.8, outcome_prediction: "SAFE_EXECUTION" },
                      { action_id: "ACTION_012", safety_score: 0.965, collision_risk: 0.015, energy_j: 46.8, exec_time_s: 4.1, outcome_prediction: "SAFE_EXECUTION" },
                    ]).map((act, idx) => (
                      <tr key={act.action_id} className={`border-b border-slate-900 ${idx === 0 ? 'bg-cyan-950/40 font-bold' : ''}`}>
                        <td className="py-3 px-3 text-cyan-300 flex items-center gap-1.5">
                          {idx === 0 && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                          <span>{act.action_id} {idx === 0 ? '(CHOSEN)' : ''}</span>
                        </td>
                        <td className="py-3 px-3 text-emerald-400">{(act.safety_score * 100).toFixed(1)}%</td>
                        <td className="py-3 px-3 text-cyan-400">{(act.collision_risk * 100).toFixed(2)}%</td>
                        <td className="py-3 px-3 text-slate-300">{act.energy_j} J</td>
                        <td className="py-3 px-3 text-slate-300">{act.exec_time_s} s</td>
                        <td className="py-3 px-3 text-emerald-400">{act.outcome_prediction}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. TACTILE AI */}
        {activeTech === 'tactile' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2 text-amber-400">
                  <Radio className="w-6 h-6" />
                  <h3 className="text-lg font-bold text-white uppercase">3. Tactile AI & Robot Touch 🤏</h3>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Camera &rarr; Find Component &rarr; Grip &rarr; Tactile Sensor &rarr; Detect Contact &rarr; Detect Slip &rarr; Adjust Force &rarr; Insert
                </p>
              </div>

              <button
                onClick={handleTriggerSlip}
                className={`px-5 py-2.5 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg transition-all ${
                  slipSimulated ? 'bg-red-600 hover:bg-red-500' : 'bg-amber-600 hover:bg-amber-500'
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                <span>{slipSimulated ? 'Reset Micro-Slip' : 'Simulate Oil Micro-Slip'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase block">
                  Clickable Fingertip Matrix (kPa)
                </span>
                
                <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-[9px]">
                  {tactileMatrix.map((row, r) =>
                    row.map((val, c) => (
                      <button
                        key={`taxel-main-${r}-${c}`}
                        onClick={() => handleTaxelClick(r, c)}
                        className="bg-amber-950/80 text-amber-300 py-2 rounded border border-amber-900/50 hover:bg-amber-500/40"
                      >
                        {val.toFixed(1)}
                      </button>
                    ))
                  )}
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase block">
                  6-DOF Force-Torque Wrench Sensor
                </span>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px]">Fx Normal</span>
                    <div className="text-cyan-400 font-bold text-sm">0.42 N</div>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px]">Fy Shear</span>
                    <div className="text-cyan-400 font-bold text-sm">0.85 N</div>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px]">Fz Grip Force</span>
                    <div className="text-amber-400 font-bold text-sm">{tactileForce.toFixed(1)} N</div>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px]">Tz Torque</span>
                    <div className="text-purple-400 font-bold text-sm">0.08 Nm</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase block mb-2">
                    Dynamic Slip Detection & Closed Loop
                  </span>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Slip Status:</span>
                      <span className={`font-bold ${slipSimulated ? 'text-red-400' : 'text-emerald-400'}`}>
                        {slipSimulated ? 'SLIP DETECTED (1.8 mm/s)' : 'STABLE (0.0 mm/s)'}
                      </span>
                    </div>

                    <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Grip Force Setting:</span>
                      <span className="text-amber-400 font-bold">{tactileForce.toFixed(1)} N</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] font-mono text-slate-400 block mb-1">MANUAL FORCE ADJUSTMENT (N)</span>
                  <input
                    type="range"
                    min="2"
                    max="50"
                    value={tactileForce}
                    onChange={(e) => setTactileForce(parseFloat(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. 4D SPATIAL INTELLIGENCE */}
        {activeTech === 'spatial_4d' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2 text-emerald-400">
                  <Move className="w-6 h-6" />
                  <h3 className="text-lg font-bold text-white uppercase">4. 4D Spatial Intelligence 🗺️</h3>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  3D = X + Y + Z &bull; 4D = X + Y + Z + TIME (Dynamic obstacle & worker trajectory prediction)
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-400 text-xs font-mono font-bold rounded-lg border border-emerald-800">
                10s SPATIOTEMPORAL HORIZON
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase block">
                  Tracked Spatiotemporal Entities (X, Y, Z, Time)
                </span>

                <div className="space-y-3 text-xs font-mono">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex justify-between font-bold text-white mb-1">
                      <span>👷 WORKER_JOHN (Human)</span>
                      <span className="text-cyan-400">t=0s: [3.20, 1.45, 0.0]</span>
                    </div>
                    <div className="text-[11px] text-slate-400">Velocity: Vx: -0.45 m/s, Vy: 0.12 m/s</div>
                    <div className="text-[11px] text-purple-400 mt-1">Future t+3s projection: [1.85, 1.81, 0.0]</div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex justify-between font-bold text-amber-400 mb-1">
                      <span>🤖 AMR_LOGISTICS_23 (AMR)</span>
                      <span className="text-cyan-400">t=0s: [5.10, -0.90, 0.0]</span>
                    </div>
                    <div className="text-[11px] text-slate-400">Velocity: Vx: -0.80 m/s</div>
                    <div className="text-[11px] text-purple-400 mt-1">Future t+3s projection: [2.70, -0.90, 0.0]</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-purple-400 uppercase block mb-3">
                    Predictive Collision Cone Analysis
                  </span>

                  <div className="p-4 bg-purple-950/40 border border-purple-800 rounded-xl space-y-2 text-xs font-mono">
                    <div className="text-purple-300 font-bold">Approach Assessment at t = 3.0s:</div>
                    <div className="text-slate-300">Distance R08 to WORKER_JOHN: <strong className="text-emerald-400">1.82 m</strong></div>
                    <div className="text-slate-300">Collision Risk Score: <strong className="text-cyan-400">0.014 (LOW)</strong></div>
                    <div className="text-slate-400 text-[11px] border-t border-purple-800/80 pt-2 mt-2">
                      Auto-scaling velocity by 100% (Safety clearance &gt; 1.5m maintained)
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400 italic">
                  Note: 4D intelligence updates dynamic safety bounding cones every 10ms.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. CROSS-ROBOT LEARNING */}
        {activeTech === 'cross_robot' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2 text-cyan-400">
                  <Share2 className="w-6 h-6" />
                  <h3 className="text-lg font-bold text-white uppercase">5. Cross-Robot Learning 🤖↔️🤖</h3>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  R08 learns gear insertion &rarr; Shared Robot Knowledge Network &rarr; Instant deployment to R06, R09, R10
                </p>
              </div>

              <button
                onClick={handleBroadcastSkill}
                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>Broadcast R08 Skill to Fleet</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase block">
                  Shared Robot Knowledge Network Vault
                </span>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex justify-between font-bold text-white">
                      <span>SKILL_GEAR_INSERTION_R08</span>
                      <span className="text-emerald-400">99.4% SUCCESS</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">Source: R08 (Humanoid Assembler) &bull; 1,420 Trials</div>
                    <div className="text-[11px] text-cyan-300 mt-1">Transferred To: R06 (Assembly), R09 (Machining), R10 (Packaging)</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase block">
                  Cross-Embodiment Kinematic Adaptations
                </span>

                <div className="space-y-2 text-xs font-mono">
                  {(broadcastLog?.shared_knowledge_network?.cross_embodiment_adaptations || [
                    { target_robot: "R06 (Assembly Arm)", status: "DEPLOYED", detail: "Mapped 32-DOF humanoid -> 6-DOF industrial arm" },
                    { target_robot: "R09 (Machining Arm)", status: "DEPLOYED", detail: "Adjusted compliance matrix for CNC fixture" },
                    { target_robot: "R10 (Packaging Arm)", status: "DEPLOYED", detail: "Scaled velocity for soft suction end-effector" }
                  ]).map((adapt, idx) => (
                    <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-white">{adapt.target_robot}</div>
                        <div className="text-[10px] text-slate-400">{adapt.detail || 'Adapted kinematics'}</div>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 text-[10px] rounded border border-emerald-800 font-bold">
                        {adapt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. REAL-TO-SIM-TO-REAL */}
        {activeTech === 'sim_to_real' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2 text-purple-400">
                  <RotateCw className="w-6 h-6" />
                  <h3 className="text-lg font-bold text-white uppercase">6. Real-to-Sim-to-Real Closed Loop 🔄</h3>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  REAL FACTORY &rarr; Sensor Data &rarr; DIGITAL TWIN &rarr; AI Training &rarr; Sim Test &rarr; Safety Validation &rarr; REAL ROBOT ↺
                </p>
              </div>
              <span className="px-3 py-1 bg-purple-950 text-purple-400 text-xs font-mono font-bold rounded-lg border border-purple-800">
                REALITY GAP: 0.018m
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
              {[
                { step: 1, name: "1. REAL FACTORY", detail: "Capture 10,000 sensor streams", status: "COMPLETED" },
                { step: 2, name: "2. Sensor Data", detail: "Ingest 1.2 GB telemetry", status: "COMPLETED" },
                { step: 3, name: "3. DIGITAL TWIN", detail: "Sync 25 robot pose models", status: "ACTIVE" },
                { step: 4, name: "4. AI Training", detail: "50k domain randomized runs", status: "ACTIVE" },
                { step: 5, name: "5. Sim Testing", detail: "1,000 stress scenarios", status: "PASSED" },
                { step: 6, name: "6. Safety Check", detail: "Zero safety limit breaches", status: "PASSED" },
                { step: 7, name: "7. REAL ROBOT", detail: "Deploy updated weights to R08", status: "DEPLOYED" },
                { step: 8, name: "8. New Data ↺", detail: "Telemetry feedback loop", status: "LOOPING" },
              ].map((st) => (
                <div key={st.step} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                  <div className="text-cyan-400 font-bold">{st.name}</div>
                  <div className="text-[11px] text-slate-400">{st.detail}</div>
                  <span className="inline-block mt-2 text-[9px] px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded border border-emerald-900 font-bold">
                    {st.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. SYNTHETIC ROBOT DATA GENERATOR */}
        {activeTech === 'synthetic_data' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2 text-cyan-400">
                  <Database className="w-6 h-6" />
                  <h3 className="text-lg font-bold text-white uppercase">7. Synthetic Robot Data Generator 🎥🤖</h3>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Generate millions of simulated failure scenarios for robust AI training
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase block">
                Select Failure Scenario Category to Generate:
              </span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
                {[
                  "Normal Operation",
                  "Robot Failure (Joint Stall)",
                  "Component Misalignment",
                  "Human Entering Workspace",
                  "Conveyor Failure (Jam)",
                  "Sensor Failure (Noise)",
                  "Object Falling (Grip Slip)",
                  "Collision-Risk Situation"
                ].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleGenerateSynthetic(cat)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedScenario === cat
                        ? 'bg-cyan-950 border-cyan-400 text-cyan-200 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {syntheticBatch && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs space-y-2">
                <div className="text-emerald-400 font-bold">Generated Synthetic Batch for '{selectedScenario}':</div>
                <div className="text-slate-300">Total Dataset Size: 124,508 Synthetic Samples</div>
                <div className="text-slate-400 text-[11px]">Storage: Local Synthetic Database (Zero External Upload)</div>
              </div>
            )}
          </div>
        )}

        {/* 8. ON-DEVICE / EDGE AI */}
        {activeTech === 'edge_ai' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2 text-amber-400">
                  <Cpu className="w-6 h-6" />
                  <h3 className="text-lg font-bold text-white uppercase">8. On-Device / Edge AI Compute ⚡</h3>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Camera &rarr; Edge AI Computer (NVIDIA Jetson AGX Orin) &rarr; Vision &rarr; Decision &rarr; Robot (&lt;5ms Latency)
                </p>
              </div>

              <button
                onClick={() => setEdgeOffline(!edgeOffline)}
                className={`px-4 py-2 text-xs font-mono font-bold rounded-xl border transition-all ${
                  edgeOffline ? 'bg-red-950 text-red-400 border-red-800' : 'bg-emerald-950 text-emerald-400 border-emerald-800'
                }`}
              >
                {edgeOffline ? 'Offline Fallback Active' : 'Cloud Online • Edge Primary'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block uppercase">Pipeline Latency</span>
                <div className="text-2xl font-black text-cyan-400 mt-1">3.8 ms</div>
                <span className="text-[10px] text-emerald-400">Sub-5ms Real-Time</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block uppercase">Camera Inference FPS</span>
                <div className="text-2xl font-black text-emerald-400 mt-1">120 FPS</div>
                <span className="text-[10px] text-slate-400">TensorRT FP16</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block uppercase">GPU Thermal Temp</span>
                <div className="text-2xl font-black text-amber-400 mt-1">48.2 °C</div>
                <span className="text-[10px] text-slate-400">NVIDIA Orin 64GB</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block uppercase">Onboard Memory</span>
                <div className="text-2xl font-black text-purple-400 mt-1">4.2 / 64 GB</div>
                <span className="text-[10px] text-slate-400">RAM Utilized</span>
              </div>
            </div>
          </div>
        )}

        {/* 9. ACTIVE PERCEPTION */}
        {activeTech === 'active_perception' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2 text-cyan-400">
                  <Eye className="w-6 h-6" />
                  <h3 className="text-lg font-bold text-white uppercase">9. Active Perception Engine 👁️🤖</h3>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Robot sees component &rarr; Confidence = 62% &rarr; Robot moves camera &rarr; New viewpoint &rarr; Confidence = 97% &rarr; Action
                </p>
              </div>

              <button
                onClick={handleRunActivePerception}
                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg transition-all"
              >
                <RotateCw className="w-4 h-4" />
                <span>Shift Camera Viewpoint</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase block">
                  Perception Confidence Gauge
                </span>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between font-mono text-sm">
                    <span className="text-slate-400">Visual Confidence:</span>
                    <span className={`font-bold ${apConfidence > 0.85 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {(apConfidence * 100).toFixed(1)}%
                    </span>
                  </div>

                  <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className={`h-full transition-all duration-700 ${apConfidence > 0.85 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                      style={{ width: `${apConfidence * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase block">
                  Active Camera Shift Sequence
                </span>

                {(apResult?.active_sequence || [
                  { phase: "Robot sees component", confidence: 0.62, detail: "Initial confidence 62% (below 85% safety threshold)" },
                  { phase: "Robot decision", confidence: 0.62, detail: "I need another view before I act." },
                  { phase: "Robot moves camera", confidence: 0.62, detail: "Orbited camera wrist +45° pan, +20° tilt" },
                  { phase: "New viewpoint", confidence: 0.97, detail: "New perception confidence reached 97.0%" }
                ]).map((seq, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="text-cyan-400 font-bold mr-2">{seq.phase}:</span>
                      <span className="text-slate-300">{seq.detail}</span>
                    </div>
                    <span className="text-emerald-400 font-bold">{(seq.confidence * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 10. MULTI-AGENT ROBOT COMPANY BRAIN */}
        {activeTech === 'multi_agent' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2 text-purple-400">
                  <Users className="w-6 h-6" />
                  <h3 className="text-lg font-bold text-white uppercase">10. Multi-Agent Robot Company Brain 🤖🤖🤖</h3>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  AI COMPANY BRAIN &rarr; Production (R06-R10), Quality (R11-R13), Logistics (R20-R23), Maintenance (R14-R16), Safety (R19)
                </p>
              </div>

              <button
                onClick={handleNegotiateTask}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg transition-all"
              >
                <Users className="w-4 h-4" />
                <span>Simulate Task Negotiation (R08 &rarr; R23)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs font-mono">
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                <div className="font-bold text-cyan-400 mb-1">Production (R06-R10)</div>
                <div className="text-slate-400 text-[11px]">R08: Precision Assembly</div>
                <span className="inline-block mt-2 text-[9px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded">5 ACTIVE</span>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                <div className="font-bold text-purple-400 mb-1">Quality (R11-R13)</div>
                <div className="text-slate-400 text-[11px]">R12: Optical Scan @ 1000 FPS</div>
                <span className="inline-block mt-2 text-[9px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded">3 ACTIVE</span>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                <div className="font-bold text-amber-400 mb-1">Logistics (R20-R23)</div>
                <div className="text-slate-400 text-[11px]">R23: Parts Delivery</div>
                <span className="inline-block mt-2 text-[9px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded">4 ACTIVE</span>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                <div className="font-bold text-blue-400 mb-1">Maintenance (R14-R16)</div>
                <div className="text-slate-400 text-[11px]">R14: Diagnostic Scan</div>
                <span className="inline-block mt-2 text-[9px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded">3 ACTIVE</span>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                <div className="font-bold text-red-400 mb-1">Safety (R19)</div>
                <div className="text-slate-400 text-[11px]">R19: Proximity Guard</div>
                <span className="inline-block mt-2 text-[9px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded">1 GUARDING</span>
              </div>
            </div>

            {negotiateLog && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs space-y-2">
                <div className="text-purple-300 font-bold">Inter-Robot Resource Negotiation Log:</div>
                {negotiateLog.negotiation_log?.map((log, i) => (
                  <div key={i} className="text-slate-300">
                    <span className="text-cyan-400 font-bold">[{log.actor}]</span> {log.event}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 11. DUAL-LAYER ROBOT MEMORY */}
        {activeTech === 'memory' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2 text-cyan-400">
                  <Brain className="w-6 h-6" />
                  <h3 className="text-lg font-bold text-white uppercase">11. Dual-Layer Robot Memory 🧠</h3>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Short-Term Volatile Working Memory + Persistent Long-Term Episodic Memory (Lessons Learned & Preferences)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase block">
                  Short-Term Working Memory (R08)
                </span>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1 text-slate-300">
                  <div>Current Task: Precision Component Insertion</div>
                  <div>Current Location: Assembly Station A03</div>
                  <div>Active Pose: X: 2.40, Y: 1.10, Z: 0.85</div>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase block">
                  Long-Term Episodic Memory & Lessons Learned
                </span>
                <div className="p-3 bg-purple-950/40 border border-purple-800 rounded-xl text-purple-200">
                  <div className="font-bold text-amber-300 mb-1">⚠️ Recalled Past Warning:</div>
                  "Inserting component C-14 at a -15.4° angle previously caused housing misalignment. Always enforce -45.0° wrist alignment."
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 12. WHOLE-BODY HUMAN CONTROL */}
        {activeTech === 'whole_body' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2 text-emerald-400">
                  <Activity className="w-6 h-6" />
                  <h3 className="text-lg font-bold text-white uppercase">12. Whole-Body Humanoid Control 🦿</h3>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Coordinated Control across Head + Torso + Dual 7-DOF Arms + Hands + 6-DOF Legs + ZMP Balance Controller
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-400 text-xs font-mono font-bold rounded-lg border border-emerald-800">
                32-DOF HUMANOID ARTICULATION
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="text-cyan-400 font-bold mb-1">Head Subsystem</div>
                <div className="text-slate-400">Pan: {jointAngles.head_pan}°, Tilt: {jointAngles.head_tilt}°</div>
                <div className="text-slate-300 mt-1">Target Tracking Active</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="text-purple-400 font-bold mb-1">Torso Subsystem</div>
                <div className="text-slate-400">Pitch: {jointAngles.torso_pitch}° Lean, Yaw: -12.5°</div>
                <div className="text-slate-300 mt-1">CoM Stabilized</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="text-emerald-400 font-bold mb-1">Dual 7-DOF Arms</div>
                <div className="text-slate-400">Left: Counterbalance</div>
                <div className="text-slate-300 mt-1">Right: Target Reaching ({jointAngles.elbow}° Elbow)</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="text-amber-400 font-bold mb-1">Tactile Hands</div>
                <div className="text-slate-400">5-Finger Tactile Span</div>
                <div className="text-slate-300 mt-1">{jointAngles.finger_span_mm}mm Finger Opening</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="text-blue-400 font-bold mb-1">Dual 6-DOF Bipedal Legs</div>
                <div className="text-slate-400">Double Support Stance</div>
                <div className="text-slate-300 mt-1">Compliant Foot Pad</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="text-cyan-400 font-bold mb-1">ZMP Balance Controller</div>
                <div className="text-slate-400">ZMP Margin: 0.08m</div>
                <div className="text-emerald-400 mt-1 font-bold">DYNAMICALLY STABLE</div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  )
}
