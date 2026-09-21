import React, { useState, useEffect, useRef } from 'react'
import { Eye, Camera, Video, AlertTriangle, CheckCircle2, ShieldCheck, Flame, Scan, Sparkles, RefreshCw } from 'lucide-react'

export default function ComputerVision({ workspaceId }) {
  const [activeBackbone, setActiveBackbone] = useState('YOLOv11')
  const [activeTask, setActiveTask] = useState('defect')
  const [webcamActive, setWebcamActive] = useState(false)
  const videoRef = useRef(null)

  const backbones = ['YOLOv11', 'RT-DETR', 'SAM2 (Segment Anything)', 'OpenCV Pipeline', 'EasyOCR']

  const tasks = [
    { id: 'defect', label: 'Defect Detection', icon: '🎯' },
    { id: 'surface', label: 'Surface Inspection', icon: '🔍' },
    { id: 'dimension', label: 'Dimension Measurement', icon: '📐' },
    { id: 'barcode', label: 'Barcode & QR Detection', icon: '🏁' },
    { id: 'assembly', label: 'Assembly Verification', icon: '🧩' },
    { id: 'counting', label: 'Object Counting', icon: '📦' },
    { id: 'ppe', label: 'PPE & Helmet Detection', icon: '🦺' },
    { id: 'fire', label: 'Fire & Smoke Alert', icon: '🔥' },
    { id: 'safety', label: 'Worker Safety Analytics', icon: '👷' }
  ]

  const taskData = {
    defect: {
      title: 'Defect Detection',
      entities: '2 items',
      confidence: '99.2%',
      boxes: [
        { label: 'Gear Surface Crack (99.4%)', top: '25%', left: '25%', width: '160px', height: '110px', color: 'border-rose-500 bg-rose-500/10 text-rose-300' },
        { label: 'Pitting Corrosion Wear (96.2%)', top: '52%', left: '42%', width: '150px', height: '100px', color: 'border-rose-500 bg-rose-500/10 text-rose-300' }
      ]
    },
    surface: {
      title: 'Surface Inspection',
      entities: '2 defects',
      confidence: '97.8%',
      boxes: [
        { label: 'Scratched Anodized Surface (98.7%)', top: '20%', left: '30%', width: '180px', height: '90px', color: 'border-[#facc15] bg-yellow-500/10 text-yellow-300' },
        { label: 'Oil Residue Contamination (94.1%)', top: '55%', left: '50%', width: '160px', height: '110px', color: 'border-amber-500 bg-amber-500/10 text-amber-300' }
      ]
    },
    dimension: {
      title: 'Dimension Measurement',
      entities: '2 tolerances',
      confidence: '99.8%',
      boxes: [
        { label: 'Outer Diameter: 42.02mm (PASS)', top: '30%', left: '20%', width: '220px', height: '120px', color: 'border-emerald-400 bg-emerald-500/10 text-emerald-300' },
        { label: 'Bore Height: 18.50mm (PASS)', top: '45%', left: '55%', width: '190px', height: '100px', color: 'border-emerald-400 bg-emerald-500/10 text-emerald-300' }
      ]
    },
    barcode: {
      title: 'Barcode & QR Detection',
      entities: '2 codes',
      confidence: '100.0%',
      boxes: [
        { label: 'QR Code: BATCH-2026-X89', top: '25%', left: '35%', width: '170px', height: '120px', color: 'border-cyan-400 bg-cyan-500/10 text-cyan-300' },
        { label: 'DataMatrix: LOT-9041-S2', top: '60%', left: '25%', width: '180px', height: '90px', color: 'border-cyan-400 bg-cyan-500/10 text-cyan-300' }
      ]
    },
    assembly: {
      title: 'Assembly Verification',
      entities: '2 components',
      confidence: '98.9%',
      boxes: [
        { label: 'Bolt #1 Torque Seal OK', top: '22%', left: '28%', width: '160px', height: '80px', color: 'border-emerald-400 bg-emerald-500/10 text-emerald-300' },
        { label: 'PCB Capacitor C4 Present', top: '50%', left: '48%', width: '170px', height: '95px', color: 'border-emerald-400 bg-emerald-500/10 text-emerald-300' }
      ]
    },
    counting: {
      title: 'Object Counting',
      entities: '14 units',
      confidence: '99.5%',
      boxes: [
        { label: 'Tray Batch A: 8 Units (OK)', top: '20%', left: '22%', width: '190px', height: '110px', color: 'border-sky-400 bg-sky-500/10 text-sky-300' },
        { label: 'Tray Batch B: 6 Units (OK)', top: '52%', left: '46%', width: '190px', height: '110px', color: 'border-sky-400 bg-sky-500/10 text-sky-300' }
      ]
    },
    ppe: {
      title: 'PPE & Helmet Detection',
      entities: '2 workers',
      confidence: '99.1%',
      boxes: [
        { label: 'Worker #1: Hard Hat & Vest OK', top: '20%', left: '25%', width: '210px', height: '130px', color: 'border-emerald-400 bg-emerald-500/10 text-emerald-300' },
        { label: 'Worker #2: Safety Goggles OK', top: '48%', left: '50%', width: '200px', height: '120px', color: 'border-emerald-400 bg-emerald-500/10 text-emerald-300' }
      ]
    },
    fire: {
      title: 'Fire & Smoke Alert',
      entities: '0 hazards',
      confidence: '99.9%',
      boxes: [
        { label: 'Thermal Zone: 24.2°C (Normal)', top: '35%', left: '32%', width: '220px', height: '140px', color: 'border-emerald-400 bg-emerald-500/10 text-emerald-300' }
      ]
    },
    safety: {
      title: 'Worker Safety Analytics',
      entities: '1 zone',
      confidence: '98.6%',
      boxes: [
        { label: 'Robotic Cell Buffer: 2.4m (Safe)', top: '30%', left: '30%', width: '240px', height: '130px', color: 'border-emerald-400 bg-emerald-500/10 text-emerald-300' }
      ]
    }
  }

  const toggleWebcam = async () => {
    if (webcamActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject
        stream.getTracks().forEach(track => track.stop())
        videoRef.current.srcObject = null
      }
      setWebcamActive(false)
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
        setWebcamActive(true)
      } catch (err) {
        console.warn('Webcam permission denied or unavailable:', err)
        alert('Webcam access unavailable or permission denied. Simulated Industrial Camera Stream #1 remains active.')
      }
    }
  }

  const currentTaskInfo = taskData[activeTask] || taskData.defect

  return (
    <div className="space-y-6 font-sans text-slate-100">
      
      {/* 1. TOP HEADER & TITLE BOX (Matching Screenshot 1:1) */}
      <div className="p-6 rounded-2xl bg-[#1a0a14] border border-[#3d122b] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-extrabold text-pink-400 tracking-wide flex items-center gap-2">
            <span>👁️</span>
            <span>Advanced AI Computer Vision & Safety Analytics</span>
          </h1>
          <p className="text-xs sm:text-sm text-pink-200/60 font-sans">
            YOLOv11, RT-DETR, SAM2, OpenCV & Dual OCR for Defect Detection, PPE Safety, Barcode/QR, and Fire/Smoke Alerts.
          </p>
        </div>

        {/* Top Right Buttons */}
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-lg bg-pink-950/80 border border-pink-700/80 text-pink-300 text-xs font-mono font-bold whitespace-nowrap">
            YOLOv11 Active
          </span>
          <button
            onClick={toggleWebcam}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer shadow-md ${
              webcamActive
                ? 'bg-rose-600 text-white border border-rose-400 shadow-rose-950/50'
                : 'bg-[#facc15] hover:bg-yellow-400 text-black border border-yellow-400 shadow-yellow-500/20'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>{webcamActive ? 'Close Live Webcam' : '📷 Open Live Webcam'}</span>
          </button>
        </div>
      </div>

      {/* 2. AI VISION BACKBONE BAR (Matching Screenshot 1:1) */}
      <div className="p-4 rounded-2xl bg-[#1a0a14] border border-[#3d122b] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="font-bold text-white text-sm">AI Vision Backbone:</span>
          <div className="flex flex-wrap items-center gap-2">
            {backbones.map((bb) => (
              <button
                key={bb}
                onClick={() => setActiveBackbone(bb)}
                className={`px-3 py-1 rounded-lg font-bold transition-all whitespace-nowrap ${
                  activeBackbone === bb
                    ? 'bg-[#facc15] text-black shadow-md shadow-yellow-500/20 border border-yellow-400'
                    : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:text-white hover:bg-slate-800'
                }`}
              >
                {bb}
              </button>
            ))}
          </div>
        </div>

        {/* Optical Sim Status Indicator */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 text-xs font-bold flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Optical Sim 60 FPS
          </span>
        </div>
      </div>

      {/* 3. MAIN CONTENT: 2-COLUMN GRID (Matching Screenshot 1:1) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono">
        
        {/* Left Column: Simulated / Live Industrial Camera Stream */}
        <div className="p-5 rounded-2xl bg-[#1a0a14] border border-[#3d122b] space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <span>📹</span>
              <span>{webcamActive ? 'Live Hardware Webcam Feed' : 'Simulated Industrial Camera Stream #1'}</span>
            </div>
            <span className="text-cyan-400 font-bold">1920×1080 @ 60 FPS</span>
          </div>

          {/* Camera Viewport Container */}
          <div className="w-full h-[430px] rounded-xl overflow-hidden border border-pink-950 relative bg-[#090308] flex items-center justify-center">
            
            {/* Live Webcam Stream Element */}
            {webcamActive ? (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover"
              />
            ) : (
              /* Simulated Grid Stream Viewport */
              <div className="w-full h-full relative bg-[#0d040a] flex items-center justify-center overflow-hidden">
                
                {/* Background Reticle Grid */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(#f472b6 1px, transparent 1px), linear-gradient(to right, #f472b615 1px, transparent 1px), linear-gradient(to bottom, #f472b615 1px, transparent 1px)`,
                    backgroundSize: '30px 30px, 40px 40px, 40px 40px'
                  }}
                />

                {/* Horizontal Pink Scanning Horizon Line */}
                <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-pink-500 to-transparent top-1/2 -translate-y-1/2 shadow-sm shadow-pink-500 animate-pulse" />

                {/* Target Reticle Crosshair */}
                <div className="w-40 h-40 rounded-full border border-cyan-500/40 absolute flex items-center justify-center animate-spin" style={{ animationDuration: '20s' }}>
                  <div className="w-24 h-24 rounded-full border border-pink-500/50" />
                </div>

              </div>
            )}

            {/* Bounding Boxes Overlays (Matching Screenshot 1:1) */}
            {currentTaskInfo.boxes.map((box, idx) => (
              <div
                key={idx}
                className={`absolute border-2 rounded-lg p-2 font-mono text-xs flex flex-col justify-between transition-all shadow-lg ${box.color}`}
                style={{
                  top: box.top,
                  left: box.left,
                  width: box.width,
                  height: box.height
                }}
              >
                <div className="px-2 py-1 rounded bg-rose-950/90 text-rose-200 border border-rose-600/80 font-bold text-[10px] whitespace-nowrap self-start shadow-md">
                  {box.label}
                </div>
                <div className="text-[10px] text-cyan-300 font-bold self-end bg-slate-950/80 px-1.5 py-0.5 rounded border border-slate-800">
                  ROI #{idx + 1}
                </div>
              </div>
            ))}

            {/* Corner Camera HUD Overlay */}
            <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-pink-500/40 text-pink-300 text-[11px] font-bold">
              AI MODEL: {activeBackbone} (0.8ms)
            </div>

          </div>
        </div>

        {/* Right Column: Industrial Vision AI Task Suite */}
        <div className="p-5 rounded-2xl bg-[#1a0a14] border border-[#3d122b] space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>⚡</span>
            <span>Industrial Vision AI Task Suite</span>
          </h2>

          {/* Task Buttons Grid (2 Columns, matching screenshot 1:1) */}
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            {tasks.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTask(t.id)}
                className={`p-3 rounded-xl font-bold flex items-center gap-2 transition-all text-left ${
                  activeTask === t.id
                    ? 'bg-[#facc15] text-black shadow-lg shadow-yellow-500/20 border border-yellow-400'
                    : 'bg-[#12070e] text-slate-300 border border-slate-800/80 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span className="text-sm">{t.icon}</span>
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">{t.label}</span>
              </button>
            ))}
          </div>

          {/* Active Task Summary Card (Matching Screenshot 1:1) */}
          <div className="p-5 rounded-xl bg-[#10050d] border border-pink-900/60 space-y-2 mt-4">
            <h3 className="text-sm font-bold text-pink-400">
              Active Task: {currentTaskInfo.title}
            </h3>
            <div className="text-xs text-emerald-400 font-bold">
              Detected Entities: {currentTaskInfo.entities} <span className="mx-1 text-slate-600">|</span> Confidence Avg: {currentTaskInfo.confidence}
            </div>
            <div className="text-xs text-[#facc15] font-bold pt-1">
              Camera Stream #1 Active - Ready for AI Inference.
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
