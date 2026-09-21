import React, { useState, useEffect, useRef } from 'react'
import { 
  Eye, CheckCircle2, ShieldAlert, Activity, RefreshCw, FileText, 
  Download, Camera, Upload, Layers, Play, Check, ChevronRight
} from 'lucide-react'

export default function QualityInspection({ workspaceId }) {
  // Conveyor Animation State
  const [inspectedCount, setInspectedCount] = useState(15)
  const [conveyorOffset, setConveyorOffset] = useState(0)
  const [lastStatus, setLastStatus] = useState('PASS')
  const [activeStep, setActiveStep] = useState(15) // Step 1 to 15
  const [sourceMode, setSourceMode] = useState('sample') // 'sample', 'camera', 'upload'
  const [partType, setPartType] = useState('industrial-gear')

  // 15 Pipeline Steps matching screenshot 2:1
  const pipelineSteps = [
    { num: 1, title: 'Read Image', desc: 'Acquire raw 4K optical frame from conveyor camera sensor' },
    { num: 2, title: 'Grayscale', desc: 'Convert RGB frame to single-channel luminance intensity matrix' },
    { num: 3, title: 'Gaussian Blur', desc: 'Apply 5x5 Gaussian kernel smoothing to reduce high-frequency noise' },
    { num: 4, title: 'Threshold', desc: 'Otsu adaptive binarization separating part geometry from background' },
    { num: 5, title: 'Morphology', desc: 'Erosion and dilation operations closing micro-cavities' },
    { num: 6, title: 'Edge Detection', desc: 'Canny operator extracting sub-pixel surface edge boundaries' },
    { num: 7, title: 'Contours', desc: 'Find closed topological vector contours of exterior gear teeth' },
    { num: 8, title: 'Convex Hull', desc: 'Compute minimal convex boundary envelope around part perimeter' },
    { num: 9, title: 'Convexity Defects', desc: 'Analyze depth variances between hull and gear tooth gaps' },
    { num: 10, title: 'Bounding Box', desc: 'Fit minimum area rectangle (320, 240, 245, 245)' },
    { num: 11, title: 'Dimensional Analysis', desc: 'Calculate Outer Diameter (107.8 mm) & Inner Diameter (32.34 mm)' },
    { num: 12, title: 'Surface Flaw Inspection', desc: 'Scan for micro-pitting, scratches, and burr anomalies' },
    { num: 13, title: 'Feature Extraction', desc: 'Compute Hu Moments & HOG descriptor vectors for classification' },
    { num: 14, title: 'Neural Classifier', desc: 'ResNet-18 edge inference model evaluating part integrity' },
    { num: 15, title: 'Final PASS / FAIL', desc: 'Emit final industrial quality disposition and control signal' }
  ]

  // Conveyor Animation Loop
  useEffect(() => {
    const timer = setInterval(() => {
      setConveyorOffset(prev => (prev + 2) % 100)
    }, 40)
    return () => clearInterval(timer)
  }, [])

  const currentStepInfo = pipelineSteps.find(s => s.num === activeStep) || pipelineSteps[14]

  return (
    <div className="space-y-6 font-sans text-slate-100">
      
      {/* 1. TOP HEADER & EXPORT BUTTONS ROW matching Screenshot 1:1 */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[11px] font-mono font-bold mb-2">
            <span>MODULE 2 • WEEK 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#facc15] flex items-center gap-2 tracking-wide">
            <span>👁️ Automated Computer Vision Quality Inspection</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            15-Stage OpenCV Processing Pipeline, Multi-Defect Detection, & High-Speed Optical Conveyor Simulation
          </p>
        </div>

        {/* Top Right Action Export Buttons matching screenshot */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold flex items-center gap-1.5 shadow-lg shadow-red-500/20">
            <FileText className="w-4 h-4" />
            <span>PDF Report</span>
          </button>

          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-500/20">
            <Download className="w-4 h-4" />
            <span>CSV Export</span>
          </button>

          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold flex items-center gap-1.5 shadow-lg shadow-blue-500/20">
            <Download className="w-4 h-4" />
            <span>Excel Export</span>
          </button>
        </div>
      </div>

      {/* 2. HIGH-SPEED OPTICAL CONVEYOR FEED BOX matching Screenshot 1:1 */}
      <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4 font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span>⚙️ HIGH-SPEED OPTICAL CONVEYOR FEED</span>
            </h3>
            <p className="text-[11px] text-slate-400 font-sans mt-0.5">
              Real-time part detection line & automated trigger
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-emerald-950 border border-emerald-500/50 text-emerald-400 font-bold text-xs">
              LAST: {lastStatus}
            </span>
          </div>
        </div>

        {/* Animated Conveyor Belt Stream */}
        <div className="relative h-28 rounded-xl bg-[#0b1224] border border-slate-800 overflow-hidden flex items-center justify-center">
          
          {/* Yellow Conveyor Rail Line */}
          <div className="absolute inset-x-0 top-1/2 h-1 bg-[#facc15] -translate-y-1/2" />

          {/* OPENCV CAM Scanner Head */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
            <div className="px-3 py-1 bg-teal-500 text-black font-extrabold text-[10px] rounded-t-md shadow-lg shadow-teal-500/30">
              OPENCV CAM
            </div>
            <div className="w-6 h-4 bg-slate-700 border-x border-b border-teal-400" />
            <div className="w-0.5 h-8 bg-dashed border-r border-teal-400 opacity-60" />
          </div>

          {/* Moving Gears Array */}
          <div 
            className="flex items-center gap-16 transition-transform duration-75"
            style={{ transform: `translateX(-${conveyorOffset}px)` }}
          >
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-12 h-12 rounded-full border-2 border-cyan-400/80 bg-slate-900 flex items-center justify-center relative shrink-0 shadow-lg shadow-cyan-500/20">
                <div className="w-6 h-0.5 bg-cyan-400 rotate-45" />
                <span className="w-3 h-3 rounded-full bg-slate-950 border border-cyan-400 absolute" />
              </div>
            ))}
          </div>
        </div>

        {/* Conveyor Statistics Bar */}
        <div className="flex justify-between items-center text-xs text-slate-300 pt-1">
          <div>
            Total Inspected Parts: <strong className="text-[#facc15]">{inspectedCount}</strong>
          </div>
          <div>
            Optical Sensor Latency: <strong className="text-emerald-400">1.4 ms</strong>
          </div>
        </div>
      </div>

      {/* 3. SOURCE MODE & DATASET BAR matching Screenshot 2:1 */}
      <div className="p-4 rounded-2xl bg-[#080d1a] border border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSourceMode('sample')}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
              sourceMode === 'sample' 
                ? 'bg-[#facc15] text-black shadow-lg shadow-amber-500/20' 
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span>📁 Sample Dataset</span>
          </button>

          <button
            onClick={() => setSourceMode('camera')}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
              sourceMode === 'camera' 
                ? 'bg-[#facc15] text-black shadow-lg shadow-amber-500/20' 
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Live Camera</span>
          </button>

          <button
            onClick={() => setSourceMode('upload')}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
              sourceMode === 'upload' 
                ? 'bg-[#facc15] text-black shadow-lg shadow-amber-500/20' 
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload File</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={partType}
            onChange={(e) => setPartType(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
          >
            <option value="industrial-gear">Industrial Gear</option>
            <option value="silicon-wafer">Silicon Wafer</option>
            <option value="weld-seam">EV Weld Seam</option>
          </select>

          <span className="px-3 py-1.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-400 font-bold">
            No Defect (Intact Part)
          </span>
        </div>
      </div>

      {/* 4. OPENCV 15-STAGE PIPELINE STEP VIEWER matching Screenshot 2:1 */}
      <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4 font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-[#facc15] uppercase tracking-wider flex items-center gap-2">
            <span>🔬 OPENCV 15-STAGE PIPELINE STEP VIEWER</span>
          </h3>
        </div>

        {/* 15 Horizontal Step Buttons matching screenshot */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
          {pipelineSteps.map((step) => (
            <button
              key={step.num}
              onClick={() => setActiveStep(step.num)}
              className={`px-3 py-1.5 rounded-lg border whitespace-nowrap transition-all ${
                activeStep === step.num
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {step.num}. {step.title}
            </button>
          ))}
        </div>

        {/* Step Visualizer Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-xl border border-slate-800 overflow-hidden bg-slate-950 min-h-[360px]">
          
          {/* Left Matrix Processing View */}
          <div className="lg:col-span-6 bg-[#040711] p-6 flex flex-col justify-between border-r border-slate-800">
            <div className="space-y-2">
              <div className="text-xs font-mono text-cyan-400 font-bold">
                STAGE {activeStep} / 15: {currentStepInfo.title.toUpperCase()}
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {currentStepInfo.desc}
              </p>
            </div>

            {/* Matrix Data Code Block */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 text-[11px] font-mono text-cyan-400 space-y-1 mt-4">
              <div>[OpenCV Kernel]: cv2.Canny(image, 50, 150, apertureSize=3)</div>
              <div>[Contours Found]: 24 closed polygon vectors</div>
              <div>[Confidence Score]: 99.98% PASS</div>
            </div>
          </div>

          {/* Right Gear Contour Vector Canvas matching screenshot 2:1 */}
          <div className="lg:col-span-6 bg-[#031c14] p-6 relative flex flex-col items-center justify-center border-l border-emerald-500/30">
            
            {/* Cyan Gear Contour Box */}
            <div className="relative w-64 h-64 border-2 border-amber-400/80 rounded-lg p-2 flex items-center justify-center">
              
              <div className="absolute top-1 left-2 text-[10px] font-mono text-[#facc15]">
                Centroid: (320, 240) | W: 245px H: 245px
              </div>

              {/* Vector Gear Illustration with PASS Checkmark */}
              <div className="w-48 h-48 rounded-full border-4 border-dashed border-[#00f0ff] flex items-center justify-center relative">
                <div className="w-20 h-20 rounded-full border-2 border-[#00f0ff] flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold text-emerald-400 flex items-center gap-1">
                    PASS <Check className="w-5 h-5 text-emerald-400" />
                  </span>
                  <span className="text-[10px] text-cyan-300 font-mono">Confidence: 99%</span>
                </div>
              </div>

              <div className="absolute bottom-1 left-2 text-[10px] font-mono text-cyan-400">
                OD: 107.8 mm | ID: 32.34 mm
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Stage Status Description Bar matching screenshot */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
          <strong className="text-[#facc15]">{activeStep}. {currentStepInfo.title}:</strong> <span className="text-slate-300">{currentStepInfo.desc}</span>
        </div>

      </div>

    </div>
  )
}
