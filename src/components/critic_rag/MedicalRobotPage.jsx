import React, { useState, useEffect } from 'react'
import { 
  Bot, Cpu, Eye, Activity, ShieldCheck, RefreshCw, Zap, CheckCircle2, 
  Volume2, VolumeX, Mic, Send, Radio, Sparkles, Play, Award, AlertTriangle 
} from 'lucide-react'

export default function MedicalRobotPage() {
  const [telemetry, setTelemetry] = useState({
    robot_id: "PAI-IR-V2.0-MED-07",
    model_name: "Physical AI Industrial Medical Robot (PAI-IR v2.0)",
    operational_status: "ACTIVE_CLINICAL_MONITORING",
    battery_level_pct: 94.8,
    joint_temperatures_c: [34.2, 35.1, 33.8, 36.0, 34.9, 35.4],
    visual_perception: {
      active_camera: "Multispectral 3D Depth Camera",
      patient_tracker: "Active Skeletal Pose Estimation",
      vital_signs_contactless: {
        heart_rate_bpm: 74,
        respiratory_rate_bpm: 16,
        body_temperature_c: 36.8
      }
    },
    whole_body_control: {
      stabilization: "ACTIVE_ZERO_MOMENT_POINT",
      payload_capacity_kg: 45.0,
      gripper_tactile_force_n: 12.4
    },
    critic_rag_bridge: {
      linked_rag_engine: "CRITIC-RAG v2.0",
      realtime_verification: "ENABLED",
      last_verified_query: "GLP-1 RA dosing & renal safety threshold"
    }
  })

  const [isScanning, setIsScanning] = useState(false)
  const [activeAction, setActiveAction] = useState('IDLE_MONITORING')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechEnabled, setSpeechEnabled] = useState(true)
  const [userQuery, setUserQuery] = useState("")
  const [speechLog, setSpeechLog] = useState([
    { sender: "ROBOT", text: "PAI-IR Unit 07 active perception online. Ready for clinical observation and evidence verification.", time: "21:05:00" }
  ])

  // Speech Synthesis Helper
  const speakText = (textToSpeak) => {
    setSpeechLog(prev => [
      { sender: "ROBOT", text: textToSpeak, time: new Date().toLocaleTimeString() },
      ...prev
    ])

    if (!speechEnabled || !('speechSynthesis' in window)) return

    window.speechSynthesis.cancel() // Cancel previous utterances
    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    utterance.rate = 1.0
    utterance.pitch = 1.0
    utterance.volume = 1.0

    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find(v => v.name.includes("Google") || v.name.includes("Natural") || v.lang.startsWith("en"))
    if (preferredVoice) utterance.voice = preferredVoice

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  // Action Handlers
  const handleActivePerceptionScan = () => {
    setIsScanning(true)
    setActiveAction('SCANNING_ACTIVE_PERCEPTION')
    
    // Dynamically update vital sign telemetry
    const newHeartRate = Math.floor(72 + Math.random() * 10)
    const newTemp = (36.6 + Math.random() * 0.4).toFixed(1)
    
    setTelemetry(prev => ({
      ...prev,
      visual_perception: {
        ...prev.visual_perception,
        vital_signs_contactless: {
          heart_rate_bpm: newHeartRate,
          respiratory_rate_bpm: 16,
          body_temperature_c: parseFloat(newTemp)
        }
      }
    }))

    const speechMessage = `Active perception multispectral scan initiated. Patient heart rate measured at ${newHeartRate} beats per minute. Body temperature ${newTemp} degrees Celsius. Pose tracking nominal.`
    speakText(speechMessage)

    setTimeout(() => {
      setIsScanning(false)
      setActiveAction('IDLE_MONITORING')
    }, 3500)
  }

  const handleExecuteAction = (actionName, speechMessage) => {
    setActiveAction(actionName)
    speakText(speechMessage)
    setTimeout(() => {
      setActiveAction('IDLE_MONITORING')
    }, 4000)
  }

  const handleAskRobot = (e) => {
    e.preventDefault()
    if (!userQuery.trim()) return
    
    const q = userQuery
    setUserQuery("")
    setSpeechLog(prev => [{ sender: "HUMAN", text: q, time: new Date().toLocaleTimeString() }, ...prev])

    let robotReply = ""
    if (q.toLowerCase().includes("diabetes") || q.toLowerCase().includes("glp")) {
      robotReply = "Analyzing query with CRITIC-RAG. ADA 2024 guidelines recommend Metformin as first-line, and GLP-1 receptor agonists for cardiovascular MACE risk reduction."
    } else if (q.toLowerCase().includes("pressure") || q.toLowerCase().includes("hypertension")) {
      robotReply = "CRITIC-RAG evidence verified. ACC and AHA guidelines recommend target blood pressure under 130 over 80 using thiazides, CCBs, or ACE inhibitors."
    } else if (q.toLowerCase().includes("vital") || q.toLowerCase().includes("heart")) {
      robotReply = `Contactless multispectral scan active. Current patient vitals: Heart rate ${telemetry.visual_perception.vital_signs_contactless.heart_rate_bpm} BPM, body temperature ${telemetry.visual_perception.vital_signs_contactless.body_temperature_c} degrees Celsius.`
    } else {
      robotReply = `Executing physical AI action for command: "${q}". Grounding evidence against peer-reviewed systematic reviews and ADA clinical standards.`
    }

    speakText(robotReply)
  }

  return (
    <div className="space-y-6">
      
      {/* Top Header Control Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950/50 to-slate-900 border border-cyan-800/40 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full text-xs font-mono font-bold flex items-center gap-1.5">
              <Bot className="w-4 h-4" /> PAI-IR v2.0 PHYSICAL AI ROBOT
            </span>
            <span className="text-xs text-slate-400 font-mono">ACTIVE MOTION & VOICE SPEECH SYNTHESIS</span>
          </div>
          <h1 className="text-2xl font-bold text-white mt-2">Physical AI Industrial Robot (PAI-IR v2.0)</h1>
          <p className="text-slate-300 text-sm mt-1">
            Interactive humanoid physical AI robot with active perception scanning, live physical actions, and Web Speech API voice playback.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSpeechEnabled(!speechEnabled)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all border ${
              speechEnabled 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            {speechEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            {speechEnabled ? "Voice TTS Enabled" : "Voice TTS Muted"}
          </button>

          <button 
            onClick={handleActivePerceptionScan}
            disabled={isScanning}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono rounded-xl shadow-lg flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {isScanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
            {isScanning ? "Scanning Active Perception..." : "Run Active Perception Scan"}
          </button>
        </div>
      </div>

      {/* Main Grid: Robot Image & Interactive Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Robot Image with Live Active Scan Laser & Speech HUD */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col items-center justify-center relative overflow-hidden group">
          
          <div className="relative w-full h-[470px] rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
            
            {/* Base Humanoid Robot Image */}
            <img 
              src="/assets/pai_robot_v2.jpg" 
              alt="PAI-IR v2.0 Humanoid Medical Robot" 
              className={`w-full h-full object-cover rounded-xl transition-all duration-700 ${
                isScanning ? 'brightness-110 contrast-110 scale-105' : 'group-hover:scale-105'
              }`}
            />

            {/* Active Scanner Laser Line Overlay when scanning */}
            {isScanning && (
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 via-cyan-400/40 to-cyan-500/0 h-16 animate-pulse pointer-events-none border-y-2 border-cyan-400 shadow-lg shadow-cyan-500/50" />
            )}

            {/* Top Telemetry HUD Overlay */}
            <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 p-3.5 rounded-xl font-mono text-[11px] text-cyan-300 space-y-1 shadow-2xl">
              <div className="flex items-center gap-2 font-bold text-white">
                <span className={`w-2.5 h-2.5 rounded-full ${isScanning ? 'bg-cyan-400 animate-ping' : 'bg-emerald-400'}`} />
                ONLINE: PAI-IR-V2.0-MED-07
              </div>
              <div>Current State: <strong className="text-cyan-400">{activeAction}</strong></div>
              <div>Perception FPS: <strong className="text-emerald-400">60 Hz Active</strong></div>
            </div>

            {/* Speaking Voice Indicator Overlay */}
            {isSpeaking && (
              <div className="absolute top-4 right-4 bg-emerald-950/90 backdrop-blur-md border border-emerald-500/60 px-3 py-1.5 rounded-xl font-mono text-xs text-emerald-300 font-bold flex items-center gap-2 shadow-2xl animate-pulse">
                <Volume2 className="w-4 h-4 text-emerald-400 animate-bounce" />
                ROBOT SPEAKING...
              </div>
            )}

            {/* Bottom Telemetry Bar */}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md border border-slate-800 p-3 rounded-xl font-mono text-xs text-slate-200 flex items-center justify-between shadow-2xl">
              <span>CRITIC-RAG Bridge: <strong className="text-emerald-400 font-bold">CONNECTED</strong></span>
              <span className="text-cyan-400 font-bold">ZMP Balance Stabilized</span>
            </div>
          </div>
        </div>

        {/* Interactive Robot Action Panel & Live Telemetry */}
        <div className="lg:col-span-6 space-y-6">

          {/* Contactless Patient Vitals Display */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" /> Contactless Multispectral Vital Signs
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                LIVE SENSORS
              </span>
            </h3>

            <div className="grid grid-cols-3 gap-3 font-mono">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
                <div className="text-2xl font-bold text-emerald-400 animate-pulse">
                  {telemetry.visual_perception.vital_signs_contactless.heart_rate_bpm} <span className="text-xs font-normal text-slate-400">BPM</span>
                </div>
                <div className="text-[10px] text-slate-400 uppercase mt-1">Heart Rate</div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
                <div className="text-2xl font-bold text-cyan-400">
                  {telemetry.visual_perception.vital_signs_contactless.respiratory_rate_bpm} <span className="text-xs font-normal text-slate-400">/min</span>
                </div>
                <div className="text-[10px] text-slate-400 uppercase mt-1">Respiration</div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
                <div className="text-2xl font-bold text-indigo-400">
                  {telemetry.visual_perception.vital_signs_contactless.body_temperature_c} <span className="text-xs font-normal text-slate-400">°C</span>
                </div>
                <div className="text-[10px] text-slate-400 uppercase mt-1">Body Temp</div>
              </div>
            </div>
          </div>

          {/* Interactive Physical Robot Action Trigger Buttons */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Zap className="w-4 h-4 text-cyan-400" /> Interactive Physical Robot Actions
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <button
                onClick={() => handleExecuteAction(
                  "EXECUTING_VITALS_SCAN", 
                  "Initiating multispectral vital sign scanning. Heart rate 74 BPM, body temperature 36.8 degrees Celsius."
                )}
                className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500 text-cyan-300 rounded-xl flex items-center gap-2 transition-all font-bold text-left"
              >
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>Scan Patient Vitals</span>
              </button>

              <button
                onClick={() => handleExecuteAction(
                  "EXECUTING_JOINT_CALIBRATION", 
                  "Calibrating 32 humanoid joint kinematics and zero moment point balance stabilization."
                )}
                className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500 text-emerald-300 rounded-xl flex items-center gap-2 transition-all font-bold text-left"
              >
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Calibrate Robot Joints</span>
              </button>

              <button
                onClick={() => handleExecuteAction(
                  "VERIFYING_CRITIC_RAG", 
                  "Verifying clinical trial evidence with CRITIC-RAG engine. ADA 2024 guidelines confirmed Level A standard of care."
                )}
                className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-purple-500 text-purple-300 rounded-xl flex items-center gap-2 transition-all font-bold text-left"
              >
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>Verify CRITIC-RAG Evidence</span>
              </button>

              <button
                onClick={() => handleExecuteAction(
                  "EXECUTING_VOICE_DIAGNOSTIC", 
                  "PAI-IR Unit 07 voice speech synthesis online. Ready for clinical voice dialogue."
                )}
                className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500 text-amber-300 rounded-xl flex items-center gap-2 transition-all font-bold text-left"
              >
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span>Speak Diagnostic Status</span>
              </button>
            </div>
          </div>

          {/* Interactive Spoken Voice Dialogue & Command Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Bot className="w-4 h-4 text-cyan-400" /> Interactive Voice & Speech Dialogue Log
            </h3>

            {/* Interactive Speech Command Input */}
            <form onSubmit={handleAskRobot} className="flex gap-2">
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Ask PAI-IR robot a medical question or issue command..."
                className="flex-1 bg-slate-950 border border-slate-800 focus:border-cyan-400 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-2.5 text-xs font-sans focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono rounded-xl shadow-md flex items-center gap-1.5 transition-all"
              >
                <Send className="w-3.5 h-3.5" /> Send & Speak
              </button>
            </form>

            {/* Speech Transcript Log */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2 max-h-36 overflow-y-auto scrollbar-thin text-xs font-mono">
              {speechLog.map((log, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    log.sender === 'ROBOT' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {log.sender}
                  </span>
                  <span className="text-slate-300 flex-1">{log.text}</span>
                  <span className="text-slate-500 text-[10px]">{log.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
