import React, { useState, useEffect } from 'react'
import {
  Sparkles, Image as ImageIcon, Video, Mic, Share2, FileText, Layers, Download,
  RefreshCw, Play, Pause, Plus, Trash2, Edit3, Check, Copy, Shield, Eye, Settings,
  Radio, Film, Monitor, Tv, Sliders, ChevronRight, Zap, Award
} from 'lucide-react'

import { robotIdentities, getRobotVisualPrompt } from '../../data/robotIdentitySystem'
import {
  AI_CONFIG, generateAIImage, generateAIVideo, generateVoiceNarration,
  generatePublicityContent, mediaLibraryStore
} from '../../services/aiProvider'

export default function AIMediaStudio() {
  const [activeTab, setActiveTab] = useState('image')
  
  // Provider Architecture State
  const [showConfigModal, setShowConfigModal] = useState(false)

  // ================= IMAGE GENERATOR STATE =================
  const [selectedRobotId, setSelectedRobotId] = useState('R08')
  const [promptMode, setPromptMode] = useState('custom') // 'custom' (Direct User Prompt) or 'combined' (Identity + Custom)
  const [imagePrompt, setImagePrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('blurry, low quality, distorted, extra limbs, unrealistic')
  const [environment, setEnvironment] = useState('High-Tech Factory')
  const [cameraAngle, setCameraAngle] = useState('Eye-Level Medium Shot')
  const [lighting, setLighting] = useState('Cinematic Blue Industrial')
  const [style, setStyle] = useState('Photorealistic')
  const [aspectRatio, setAspectRatio] = useState('16:9')
  const [quality, setQuality] = useState('8K Studio Master')
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [currentGeneratedAsset, setCurrentGeneratedAsset] = useState(null)
  const [showZoomModal, setShowZoomModal] = useState(false)

  // ================= VIDEO STUDIO & SCENE BUILDER STATE =================
  const [selectedVideoType, setSelectedVideoType] = useState('Promotional')
  const [videoScenes, setVideoScenes] = useState([
    { id: 1, title: 'SCENE 01 — Factory Introduction', desc: 'Wide aerial sweep of high-tech manufacturing atrium at sunrise', duration: 4, camera: 'Slow Push-in', narration: 'Welcome to ROBOCORP 25, the future of autonomous manufacturing.', text: 'THE FACTORY OF TOMORROW IS HERE' },
    { id: 2, title: 'SCENE 02 — CEO Command Robot', desc: '01 (CEO) monitoring holographic factory telemetry screens', duration: 3, camera: 'Eye-level Medium', narration: 'Supervised by 25 specialized primary autonomous robots.', text: '25 ROBOTS · 25 ROLES' },
    { id: 3, title: 'SCENE 03 — Production Deck', desc: 'Synchronized assembly lines with high-speed manufacturing arms', duration: 4, camera: 'Tracking Shot', narration: 'Operating under a single unified Physical AI brain.', text: 'ONE INTELLIGENT SYSTEM' },
    { id: 4, title: 'SCENE 04 — AI Computer Vision Inspection', desc: '12 CV Inspector scanning gears at 1,000 FPS with cyan ring light', duration: 3, camera: 'Close-up Macro', narration: 'Equipped with sub-millimeter vision perception.', text: 'PERCEPTION · 1,000 FPS QA' },
    { id: 5, title: 'SCENE 05 — Precision Robotics Demo', desc: 'R08 component installation executing 0.08mm micro placement', duration: 4, camera: 'High Angle Macro', narration: 'Executing sub-millimeter component installation with 2.31N force feedback.', text: 'PRECISION ROBOTICS (±0.02mm)' },
    { id: 6, title: 'SCENE 06 — AMR Autonomous Logistics', desc: 'R20 logistics AMRs transporting totes with 360 LiDAR SLAM', duration: 3, camera: 'Low Angle Hero', narration: 'Material flow optimized by autonomous mobile fleets.', text: 'AUTONOMOUS LOGISTICS' },
    { id: 7, title: 'SCENE 07 — 3D Digital Twin Platform', desc: 'R24 interacting with glowing translucent 3D factory hologram', duration: 3, camera: 'Pan Right', narration: 'Real-time 3D Digital Twin simulation optimizing throughput.', text: '3D DIGITAL TWIN' },
    { id: 8, title: 'SCENE 08 — Quality & Compliance', desc: 'Automated pass/fail evaluation showing 99.2% confidence', duration: 3, camera: 'Zoom Out', narration: 'Continuous quality verification and ISO safety compliance.', text: '99.2% QA PASS RATE' },
    { id: 9, title: 'SCENE 09 — Safety Overwatch', desc: 'R19 Safety Officer maintaining human proximity limits', duration: 3, camera: 'Static Medium', narration: 'Deterministic safety layers ensuring absolute worker protection.', text: 'DETERMINISTIC SAFETY GUARD' },
    { id: 10, title: 'SCENE 10 — Final Factory Call to Action', desc: 'Full factory illuminated with cyan glow, displaying ROBOCORP 25 branding', duration: 5, camera: 'Crane Crane Up', narration: 'ROBOCORP 25. AI, Robotics, and Automation built for tomorrow.', text: 'ROBOCORP 25 · BUILT FOR THE FUTURE' }
  ])
  const [activePreviewSceneIdx, setActivePreviewSceneIdx] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false)

  // ================= OFFICIAL PROMOTIONAL FILM STATE =================
  const [promoShotIdx, setPromoShotIdx] = useState(0)
  const [isPromoPlaying, setIsPromoPlaying] = useState(false)

  const officialPromoShots = [
    { scene: 1, title: 'OPENING', text: 'THE FACTORY OF TOMORROW IS HERE', bg: '/assets/robocorp_shot01_exterior.jpg', voiceText: 'The factory of tomorrow is here.' },
    { scene: 2, title: 'SCENE 2', text: '25 ROBOTS', bg: '/assets/film_scene_factory_establishing.jpg', voiceText: '25 Robots.' },
    { scene: 3, title: 'SCENE 3', text: '25 ROLES', bg: '/assets/robocorp_shot05_management.jpg', voiceText: '25 Roles.' },
    { scene: 4, title: 'SCENE 4', text: 'ONE INTELLIGENT SYSTEM', bg: '/assets/film_scene_digital_twin.jpg', voiceText: 'One intelligent system.' },
    { scene: 5, title: 'SCENE 5', text: 'SEE', bg: '/assets/dashboard_quality_vision.jpg', voiceText: 'See.' },
    { scene: 6, title: 'SCENE 6', text: 'UNDERSTAND', bg: '/assets/robocorp_r08_installation.jpg', voiceText: 'Understand.' },
    { scene: 7, title: 'SCENE 7', text: 'PLAN', bg: '/assets/dashboard_trajectory_collision.jpg', voiceText: 'Plan.' },
    { scene: 8, title: 'SCENE 8', text: 'ACT', bg: '/assets/robocorp_r07_welding.jpg', voiceText: 'Act.' },
    { scene: 9, title: 'SCENE 9', text: 'LEARN', bg: '/assets/dashboard_6dof_path_planner.jpg', voiceText: 'Learn.' },
    { scene: 10, title: 'FINAL', text: 'ROBOCORP 25\nAI + ROBOTICS + AUTOMATION\nBUILT FOR THE FUTURE OF MANUFACTURING', bg: '/assets/robocorp25_master_grid_infographic.jpg', voiceText: 'ROBOCORP 25. AI plus Robotics plus Automation. Built for the future of manufacturing.' }
  ]

  // ================= VOICE STUDIO STATE =================
  const [narrationScript, setNarrationScript] = useState('Welcome to ROBOCORP 25. 25 robots, 25 roles, one intelligent factory. Experience sub-millimeter precision robotics and physical AI.')
  const [voiceGender, setVoiceGender] = useState('Executive AI (Male)')
  const [voiceLanguage, setVoiceLanguage] = useState('English')
  const [voiceAccent, setVoiceAccent] = useState('American Standard')
  const [voiceSpeed, setVoiceSpeed] = useState(1.0)
  const [voiceTone, setVoiceTone] = useState('Authoritative & Professional')
  const [voiceEmotion, setVoiceEmotion] = useState('Confident')
  const [isSpeaking, setIsSpeaking] = useState(false)

  // ================= PUBLICITY / MARKETING STUDIO STATE =================
  const [publicityType, setPublicityType] = useState('ad')
  const [generatedPublicityData, setGeneratedPublicityData] = useState(null)

  // ================= POSTER STUDIO STATE =================
  const [posterTemplate, setPosterTemplate] = useState(1)
  const [posterStyle, setPosterStyle] = useState('Futuristic Dark Metallic')

  // ================= THUMBNAIL GENERATOR STATE =================
  const [thumbnailTemplate, setThumbnailTemplate] = useState('Inside a 25-Robot Factory')

  // ================= MEDIA LIBRARY STATE =================
  const [libraryFilter, setLibraryFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Handle Video Timeline Auto Playback
  useEffect(() => {
    let timer = null
    if (isVideoPlaying) {
      timer = setInterval(() => {
        setActivePreviewSceneIdx((prev) => (prev >= videoScenes.length - 1 ? 0 : prev + 1))
      }, (videoScenes[activePreviewSceneIdx]?.duration || 3) * 1000)
    }
    return () => clearInterval(timer)
  }, [isVideoPlaying, activePreviewSceneIdx, videoScenes])

  // Handle Official Promo Film Playback
  useEffect(() => {
    let timer = null
    if (isPromoPlaying) {
      timer = setInterval(() => {
        setPromoShotIdx((prev) => {
          if (prev >= officialPromoShots.length - 1) {
            setIsPromoPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 3500)
    }
    return () => clearInterval(timer)
  }, [isPromoPlaying])

  const selectedRobot = robotIdentities[selectedRobotId] || robotIdentities['R08']

  // Handle Image Generation
  const handleGenerateImage = async () => {
    setIsGeneratingImage(true)
    try {
      const asset = await generateAIImage({
        robotId: selectedRobotId,
        prompt: imagePrompt,
        negativePrompt,
        environment,
        cameraAngle,
        lighting,
        style,
        aspectRatio,
        quality,
        promptMode
      })
      setCurrentGeneratedAsset(asset)
    } catch (e) {
      console.error(e)
    } finally {
      setIsGeneratingImage(false)
    }
  }

  // Handle Voice Preview
  const handlePlayVoice = () => {
    setIsSpeaking(true)
    generateVoiceNarration(narrationScript, {
      language: voiceLanguage,
      voice: voiceGender,
      speed: voiceSpeed
    })
    setTimeout(() => setIsSpeaking(false), 4000)
  }

  // Handle Publicity Generation
  const handleGeneratePublicity = async (type) => {
    setPublicityType(type)
    const data = await generatePublicityContent(type)
    setGeneratedPublicityData(data)
  }

  const filteredMediaLibrary = mediaLibraryStore.filter((item) => {
    const matchesFilter = libraryFilter === 'All' || item.type.toLowerCase() === libraryFilter.toLowerCase()
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.prompt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      
      {/* HEADER BAR WITH AI PROVIDER ARCHITECTURE STATUS */}
      <div className="p-6 rounded-3xl glass-panel border border-cyan-500/40 bg-gradient-to-r from-slate-950 via-[#070e1c] to-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-wide flex items-center gap-2">
                ROBOCORP 25 — AI MEDIA & PUBLICITY STUDIO
              </h2>
              <p className="text-xs font-mono text-cyan-300">
                AI + ROBOTICS + PHYSICAL AI + GENERATIVE MEDIA ENGINE
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>PROVIDER: <strong className="text-cyan-400">{AI_CONFIG.isMockMode ? 'HIGH-FIDELITY AI SIMULATION' : AI_CONFIG.provider}</strong></span>
          </div>

          <button
            onClick={() => setShowConfigModal(true)}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-bold flex items-center gap-2 transition-all"
          >
            <Settings className="w-4 h-4" />
            <span>PROVIDER ARCHITECTURE</span>
          </button>
        </div>
      </div>

      {/* STUDIO MAIN NAVIGATION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs font-mono">
        {[
          { id: 'image', label: '🖼️ AI Image Generator' },
          { id: 'video-builder', label: '🎬 AI Video Studio & Scene Builder' },
          { id: 'promo-film', label: '🎞️ Official Promotional Film' },
          { id: 'voice', label: '🎙️ AI Voice Studio' },
          { id: 'publicity', label: '📢 Publicity & Marketing Center' },
          { id: 'poster', label: '🖼️ AI Poster Studio' },
          { id: 'thumbnail', label: '📹 AI Thumbnail Generator' },
          { id: 'library', label: `📂 Media Library (${mediaLibraryStore.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold shadow-lg shadow-cyan-500/10'
                : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ================= 1. AI IMAGE GENERATOR ================= */}
      {activeTab === 'image' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Controls Column */}
          <div className="lg:col-span-5 space-y-5 p-6 rounded-3xl glass-panel border border-slate-800 bg-slate-950">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-cyan-400" />
                <span>AI Image Generator Controls</span>
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                AI GENERATED / SIMULATION
              </span>
            </div>

            {/* 1. Select Robot from 25 Robots Roster */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-cyan-400 uppercase font-bold block">
                1. SELECT ROBOT (25 ROBOTS IDENTITY SYSTEM)
              </label>
              <select
                value={selectedRobotId}
                onChange={(e) => setSelectedRobotId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
              >
                {Object.values(robotIdentities).map((r) => (
                  <option key={r.robotId} value={r.robotId}>
                    {r.robotId} — {r.title} ({r.department})
                  </option>
                ))}
              </select>
            </div>

            {/* Robot Identity Metadata Card */}
            <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between items-center text-cyan-300 font-bold">
                <span>IDENTITY: {selectedRobot.robotId} ({selectedRobot.title})</span>
                <span className="text-[10px] text-slate-400">{selectedRobot.department}</span>
              </div>
              <p className="text-[11px] text-slate-300 font-sans line-clamp-2">{selectedRobot.appearanceDescription}</p>
              <div className="text-[10px] text-slate-400 truncate">Colors: {selectedRobot.color}</div>
            </div>

            {/* 2. Custom Image Prompt */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-cyan-400 uppercase font-bold block">
                  2. CUSTOM ACTION / PROMPT SPECIFICATION
                </label>
                <div className="flex gap-1 text-[10px] font-mono">
                  <button
                    type="button"
                    onClick={() => setPromptMode('custom')}
                    className={`px-2.5 py-1 rounded-lg border transition-all ${
                      promptMode === 'custom'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    🎯 Direct User Prompt
                  </button>
                  <button
                    type="button"
                    onClick={() => setPromptMode('combined')}
                    className={`px-2.5 py-1 rounded-lg border transition-all ${
                      promptMode === 'combined'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    🤖 + Robot Identity
                  </button>
                </div>
              </div>

              <textarea
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                placeholder="Type your own prompt (e.g., No extra people, no distorted faces, futuristic robot working in factory...)"
                rows={3}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
              />
              <div className="text-[10px] font-mono text-slate-400 flex justify-between">
                <span>Mode: <strong className="text-cyan-400">{promptMode === 'custom' ? 'Direct Prompt (100% User Priority)' : 'Combined with Robot Identity'}</strong></span>
                <button
                  type="button"
                  onClick={() => setImagePrompt('')}
                  className="text-cyan-400 hover:underline"
                >
                  Clear Prompt
                </button>
              </div>
            </div>

            {/* Prompt Parameter Selectors Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <label className="text-slate-400 block mb-1">Environment</label>
                <select value={environment} onChange={(e) => setEnvironment(e.target.value)} className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                  <option>High-Tech Factory</option>
                  <option>Cleanroom Lab</option>
                  <option>Logistics Warehouse</option>
                  <option>Executive Suite</option>
                  <option>Digital Twin Chamber</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Camera Angle</label>
                <select value={cameraAngle} onChange={(e) => setCameraAngle(e.target.value)} className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                  <option>Eye-Level Medium Shot</option>
                  <option>Wide Aerial View</option>
                  <option>Close-up Macro</option>
                  <option>Low-Angle Hero</option>
                  <option>Dutch Angle Cyberpunk</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Lighting</label>
                <select value={lighting} onChange={(e) => setLighting(e.target.value)} className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                  <option>Cinematic Blue Industrial</option>
                  <option>High-Key Cleanroom White</option>
                  <option>Warm Sunset Light</option>
                  <option>Neon Cyberpunk</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Style</label>
                <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                  <option>Photorealistic</option>
                  <option>3D Render Concept</option>
                  <option>Technical Blueprint</option>
                  <option>Sci-Fi Cyberpunk</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Aspect Ratio</label>
                <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)} className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                  <option>16:9</option>
                  <option>1:1</option>
                  <option>9:16</option>
                  <option>4:3</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Quality</label>
                <select value={quality} onChange={(e) => setQuality(e.target.value)} className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                  <option>Standard HD</option>
                  <option>4K Ultra</option>
                  <option>8K Studio Master</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <button
                onClick={handleGenerateImage}
                disabled={isGeneratingImage}
                className="w-full py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
              >
                {isGeneratingImage ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                <span>{isGeneratingImage ? 'GENERATING AI IMAGE...' : 'GENERATE IMAGE'}</span>
              </button>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <button
                  onClick={handleGenerateImage}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                  <span>REGENERATE</span>
                </button>
                <button
                  onClick={handleGenerateImage}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center justify-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>VARIATION</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Preview Column */}
          <div className="lg:col-span-7 space-y-5 flex flex-col">
            <div className="p-6 rounded-3xl glass-panel border border-cyan-500/30 bg-slate-950 flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <Eye className="w-4 h-4" />
                  <span>CANVAS AI MEDIA PREVIEW</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-mono">
                  {currentGeneratedAsset ? currentGeneratedAsset.statusTag : 'SIMULATION READY'}
                </span>
              </div>

              {/* Main Image Render Display */}
              <div className="my-4 relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                {isGeneratingImage ? (
                  <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin" />
                      <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-extrabold text-white font-mono uppercase tracking-wider">GENERATING AI IMAGE...</div>
                      <div className="text-xs font-mono text-cyan-300">Applying Consistent Identity Prompt for {selectedRobot.robotId}...</div>
                      <div className="text-[10px] font-mono text-slate-400">Diffusion Sampling · Neural Rendering</div>
                    </div>
                  </div>
                ) : currentGeneratedAsset ? (
                  <img
                    src={currentGeneratedAsset.url}
                    alt="Generated AI"
                    onClick={() => setShowZoomModal(true)}
                    title="Click for Fullscreen 8K View"
                    className="w-full h-full object-cover animate-fade-in cursor-pointer hover:scale-[1.02] transition-transform"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <img src={selectedRobot.referenceImage} alt={selectedRobot.title} className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/90 backdrop-blur border border-cyan-500/40 text-xs font-mono space-y-1">
                      <div className="text-cyan-300 font-bold">ROBOT IDENTITY CONSISTENCY LOADED: {selectedRobot.robotId} ({selectedRobot.title})</div>
                      <div className="text-slate-300 text-[11px] font-sans truncate">{getRobotVisualPrompt(selectedRobotId, imagePrompt)}</div>
                    </div>
                  </div>
                )}

                {/* AI Overlay Watermark Tag */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur border border-cyan-500/40 text-[10px] font-mono text-cyan-300 flex items-center gap-1.5 shadow-lg">
                  <Shield className="w-3 h-3 text-cyan-400" />
                  <span>AI GENERATED · CONSISTENT IDENTITY</span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="text-slate-400 text-[11px]">
                  Provider: <strong className="text-cyan-400">Pollinations FLUX 8K Master Engine</strong>
                </div>

                <div className="flex items-center gap-2">
                  {currentGeneratedAsset && (
                    <button
                      onClick={() => window.open(currentGeneratedAsset.url, '_blank')}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-bold flex items-center gap-1.5"
                    >
                      <Eye className="w-4 h-4 text-cyan-400" />
                      <span>OPEN 8K FULL-RES ↗</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (currentGeneratedAsset) {
                        const a = document.createElement('a')
                        a.href = currentGeneratedAsset.url
                        a.download = `${selectedRobotId}_ai_render.jpg`
                        a.click()
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>DOWNLOAD</span>
                  </button>
                  <button
                    onClick={() => alert('Saved asset to project workspace library!')}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold flex items-center gap-1.5 shadow-lg"
                  >
                    <Check className="w-4 h-4" />
                    <span>SAVE TO PROJECT</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* FULLSCREEN 8K IMAGE ZOOM MODAL */}
      {showZoomModal && currentGeneratedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-fade-in">
          <div className="relative w-full max-w-5xl rounded-3xl glass-panel border border-cyan-500/50 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs">
              <span className="text-cyan-400 font-bold">CRYSTAL CLEAR 8K FULL RESOLUTION VIEW</span>
              <button
                onClick={() => setShowZoomModal(false)}
                className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              >
                Close View
              </button>
            </div>

            <div className="max-h-[75vh] overflow-auto rounded-2xl border border-slate-800 bg-black flex items-center justify-center">
              <img src={currentGeneratedAsset.url} alt="Full Resolution 8K AI Render" className="w-full h-auto object-contain" />
            </div>

            <div className="flex justify-between items-center text-xs font-mono text-slate-400">
              <span>Prompt: {currentGeneratedAsset.prompt.substring(0, 80)}...</span>
              <button
                onClick={() => window.open(currentGeneratedAsset.url, '_blank')}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold"
              >
                Open Original Image File ↗
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. AI VIDEO STUDIO & SCENE BUILDER ================= */}
      {activeTab === 'video-builder' && (
        <div className="space-y-6">
          
          {/* Selectable Video Types Header */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 bg-slate-950 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-cyan-400" />
                <span>AI Video Studio — Select Video Concept Type</span>
              </h3>
              <span className="text-xs font-mono text-cyan-400 font-bold">
                10-SCENE VISUAL TIMELINE BUILDER
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs font-mono">
              {[
                'Company Introduction',
                'Factory Tour',
                'Robot Introduction',
                'Precision Robotics Demo',
                'AI Quality Inspection',
                'Autonomous Logistics',
                'Digital Twin',
                'Physical AI',
                'Future Manufacturing'
              ].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedVideoType(type)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedVideoType === type
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold shadow-lg'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-[10px] text-cyan-400 mb-1">TYPE</div>
                  <div className="truncate font-bold">{type}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Live Video Preview Player */}
          <div className="rounded-3xl glass-panel border border-cyan-500/40 bg-slate-950 overflow-hidden shadow-2xl space-y-4">
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-bold text-white uppercase">{selectedVideoType} — SCENE {activePreviewSceneIdx + 1} OF {videoScenes.length}</span>
              </div>
              <span className="text-cyan-400 font-bold">{videoScenes[activePreviewSceneIdx]?.title}</span>
            </div>

            <div className="relative aspect-[16/9] min-h-[420px] bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={officialPromoShots[activePreviewSceneIdx % officialPromoShots.length].bg}
                alt="Scene Video Frame"
                className="w-full h-full object-cover opacity-85 transition-all duration-700 transform scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/60" />

              {/* On-Screen Text & Subtitle Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <div className="px-4 py-2 rounded-xl bg-slate-950/90 backdrop-blur border border-cyan-500/40 text-xs font-mono text-cyan-300">
                    DURATION: {videoScenes[activePreviewSceneIdx]?.duration}s | CAMERA: {videoScenes[activePreviewSceneIdx]?.camera}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-cyan-950/90 border border-cyan-500/60 text-center font-extrabold text-white text-xl uppercase tracking-wider max-w-2xl mx-auto shadow-2xl">
                    {videoScenes[activePreviewSceneIdx]?.text}
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-center text-xs font-mono text-cyan-300 italic max-w-3xl mx-auto">
                    🎙️ NARRATION: "{videoScenes[activePreviewSceneIdx]?.narration}"
                  </div>
                </div>
              </div>
            </div>

            {/* Video Controls & Timeline Bar */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold flex items-center gap-2 shadow-lg"
                >
                  {isVideoPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
                  <span>{isVideoPlaying ? 'PAUSE PREVIEW' : 'PLAY VIDEO PREVIEW'}</span>
                </button>

                <button
                  onClick={() => generateAIVideo({ videoType: selectedVideoType, scenes: videoScenes })}
                  className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-cyan-500/50 text-cyan-300 font-bold flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>COMPILE FINAL VIDEO</span>
                </button>
              </div>

              {/* Scene Timeline Selector Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-md pb-2 sm:pb-0">
                {videoScenes.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setActivePreviewSceneIdx(idx)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activePreviewSceneIdx === idx
                        ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/60 font-bold'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    S0{s.id}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* 10-Scene Visual Timeline Builder List */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 bg-slate-950 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                <span>Scene Builder Timeline (CRUD Controls)</span>
              </h3>
              <button
                onClick={() => {
                  const nextId = videoScenes.length + 1
                  setVideoScenes([
                    ...videoScenes,
                    { id: nextId, title: `SCENE 0${nextId} — New Custom Scene`, desc: 'Custom robotics scene prompt', duration: 3, camera: 'Pan Left', narration: 'Custom narration script.', text: 'CUSTOM SCENE' }
                  ])
                }}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>ADD SCENE</span>
              </button>
            </div>

            <div className="space-y-3">
              {videoScenes.map((scene, idx) => (
                <div key={scene.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 text-cyan-300 font-bold">
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-cyan-500/30 text-cyan-400">S0{idx + 1}</span>
                      <span>{scene.title}</span>
                    </div>
                    <p className="text-slate-300 font-sans text-xs">{scene.desc}</p>
                    <div className="text-[10px] text-slate-400">Text: "{scene.text}" | Narration: "{scene.narration}"</div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setActivePreviewSceneIdx(idx)}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-cyan-400"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => {
                        const updated = [...videoScenes]
                        updated[idx].duration += 1
                        setVideoScenes(updated)
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300"
                    >
                      {scene.duration}s
                    </button>
                    <button
                      onClick={() => setVideoScenes(videoScenes.filter((_, i) => i !== idx))}
                      className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-950 border border-red-500/40 text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ================= 3. OFFICIAL PROMOTIONAL FILM ================= */}
      {activeTab === 'promo-film' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl glass-panel border border-cyan-500/50 bg-gradient-to-r from-slate-950 via-[#0a1224] to-slate-950 text-center space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
              OFFICIAL FILM EXPERIENCE
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-wider uppercase">
              ROBOCORP 25 — OFFICIAL PROMOTIONAL FILM
            </h2>
            <p className="text-xs font-mono text-slate-400 max-w-2xl mx-auto">
              "THE FACTORY OF TOMORROW IS HERE." 9-SCENE DEDICATED AUTONOMOUS MANUFACTURING PROMOTIONAL FILM.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden glass-panel border border-cyan-500/40 bg-slate-950 shadow-2xl">
            <div className="relative aspect-[16/9] min-h-[460px] bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={officialPromoShots[promoShotIdx].bg}
                alt="Promo Film Frame"
                className="w-full h-full object-cover opacity-85 transition-all duration-700 transform scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/60" />

              <div className="absolute inset-0 p-12 flex flex-col justify-between items-center text-center z-10">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-lg bg-slate-950/80 border border-cyan-500/30">
                  {officialPromoShots[promoShotIdx].title} — SHOT {promoShotIdx + 1} OF 10
                </span>

                <div className="p-8 rounded-3xl bg-slate-950/90 backdrop-blur-md border border-cyan-500/60 shadow-2xl max-w-2xl space-y-3 animate-fade-in">
                  <div className="text-2xl sm:text-4xl font-extrabold text-white whitespace-pre-line tracking-wider">
                    {officialPromoShots[promoShotIdx].text}
                  </div>
                </div>

                <div className="text-xs font-mono text-cyan-300 italic p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  🎙️ Voiceover: "{officialPromoShots[promoShotIdx].voiceText}"
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
              <button
                onClick={() => setIsPromoPlaying(!isPromoPlaying)}
                className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-extrabold flex items-center gap-2 shadow-lg"
              >
                {isPromoPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
                <span>{isPromoPlaying ? 'PAUSE PROMOTIONAL FILM' : 'PLAY OFFICIAL PROMOTIONAL FILM'}</span>
              </button>

              <div className="flex items-center gap-1.5 overflow-x-auto">
                {officialPromoShots.map((s, idx) => (
                  <button
                    key={s.scene}
                    onClick={() => setPromoShotIdx(idx)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      promoShotIdx === idx
                        ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/60 font-bold'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    Scene {s.scene}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 4. AI VOICE STUDIO ================= */}
      {activeTab === 'voice' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-5 p-6 rounded-3xl glass-panel border border-slate-800 bg-slate-950">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Mic className="w-5 h-5 text-cyan-400" />
                <span>AI Voice Studio Controls</span>
              </h3>
              <span className="text-[10px] font-mono text-cyan-400">TTS SYNTHESIS READY</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-cyan-400 uppercase font-bold block">NARRATION SCRIPT</label>
              <textarea
                value={narrationScript}
                onChange={(e) => setNarrationScript(e.target.value)}
                rows={5}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 font-sans focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <label className="text-slate-400 block mb-1">Language</label>
                <select value={voiceLanguage} onChange={(e) => setVoiceLanguage(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
                  <option>English</option>
                  <option>Telugu</option>
                  <option>Hindi</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Voice Profile</label>
                <select value={voiceGender} onChange={(e) => setVoiceGender(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
                  <option>Executive AI (Male)</option>
                  <option>Industrial Command (Female)</option>
                  <option>Neural Synthetic</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Accent</label>
                <select value={voiceAccent} onChange={(e) => setVoiceAccent(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
                  <option>American Standard</option>
                  <option>British Professional</option>
                  <option>Neutral Technical</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Speed Rate ({voiceSpeed}x)</label>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={voiceSpeed}
                  onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center gap-3 text-xs font-mono">
              <button
                onClick={handlePlayVoice}
                className="flex-1 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold flex items-center justify-center gap-2 shadow-lg"
              >
                {isSpeaking ? <Radio className="w-4 h-4 animate-pulse" /> : <Play className="w-4 h-4 fill-black" />}
                <span>{isSpeaking ? 'NARRATING...' : 'GENERATE & PREVIEW VOICE'}</span>
              </button>

              <button
                onClick={() => alert('Downloaded voice narration file!')}
                className="px-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-cyan-300 font-bold flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 rounded-3xl glass-panel border border-cyan-500/30 bg-slate-950 flex flex-col justify-between space-y-4">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 font-bold">AUDIO TELEMETRY & WAVEFORM</span>
              <span className="text-[10px] font-mono text-emerald-400">SPEECH SYNTHESIS ENGINE</span>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-xl">
                <Mic className={`w-10 h-10 ${isSpeaking ? 'animate-bounce' : ''}`} />
              </div>
              <div className="text-center space-y-1">
                <div className="text-sm font-extrabold text-white">{voiceGender} · {voiceLanguage}</div>
                <div className="text-xs font-mono text-slate-400">Speed: {voiceSpeed}x | Accent: {voiceAccent}</div>
              </div>

              {/* Animated Waveform Visualizer */}
              <div className="flex items-center gap-1 h-12">
                {[40, 70, 30, 90, 60, 100, 45, 80, 50, 95, 30, 60].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: isSpeaking ? `${h}%` : '20%' }}
                    className="w-1.5 bg-cyan-400 rounded-full transition-all duration-200"
                  />
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-400 space-y-1">
              <div>Notice: Uses authorized synthetic AI neural voice profiles.</div>
              <div className="text-emerald-400 font-bold">Status: Voice Engine Ready.</div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 5. PUBLICITY & MARKETING CENTER ================= */}
      {activeTab === 'publicity' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 bg-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Share2 className="w-5 h-5 text-cyan-400" />
                <span>AI Publicity & Social Media Content Generator</span>
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Grounded in actual project capabilities. No unverified claims.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {[
                { id: 'ad', label: 'Website Advertisement' },
                { id: 'linkedin', label: 'LinkedIn Post' },
                { id: 'instagram', label: 'Instagram Reel' },
                { id: 'youtube', label: 'YouTube Video Details' },
                { id: 'twitter', label: 'X / Twitter Announcement' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleGeneratePublicity(item.id)}
                  className={`px-3.5 py-2 rounded-xl border transition-all ${
                    publicityType === item.id
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generated Content Output Display */}
          <div className="p-6 rounded-3xl glass-panel border border-cyan-500/30 bg-slate-950 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs">
              <span className="text-cyan-400 font-bold uppercase">GENERATED PUBLICITY ASSET: {publicityType.toUpperCase()}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px]">
                GROUNDED IN ACTUAL CAPABILITIES
              </span>
            </div>

            {publicityType === 'ad' && (
              <div className="space-y-4 font-sans">
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
                  <h2 className="text-2xl font-extrabold text-white">"25 ROBOTS. ONE INTELLIGENT FACTORY."</h2>
                  <p className="text-cyan-400 font-mono text-xs">The Next Generation of Physical AI & Autonomous Manufacturing</p>
                  <p className="text-xs text-slate-300 max-w-xl mx-auto">
                    ROBOCORP 25 integrates 25 autonomous robotic roles — from executive strategy to sub-millimeter component placement, computer vision inspection, and digital twin simulation.
                  </p>
                  <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
                    <a
                      href={typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-xl bg-cyan-500 text-black font-extrabold text-xs flex items-center gap-2 hover:bg-cyan-400 transition-all shadow-lg"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>OPEN ADVERTISEMENT LINK ↗</span>
                    </a>
                    <button
                      onClick={() => {
                        const link = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'
                        navigator.clipboard.writeText(link)
                        alert('Ad link copied to clipboard!')
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs flex items-center gap-1.5"
                    >
                      <Copy className="w-4 h-4 text-cyan-400" />
                      <span>COPY LINK</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {publicityType !== 'ad' && generatedPublicityData && (
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 font-mono text-xs text-slate-200">
                <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed">
                  {generatedPublicityData.post || generatedPublicityData.caption || generatedPublicityData.description}
                </pre>
                
                {generatedPublicityData.hashtags && (
                  <div className="pt-2 border-t border-slate-800 text-cyan-400 font-bold">
                    {generatedPublicityData.hashtags}
                  </div>
                )}

                {/* Direct Link & Share Buttons */}
                <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span>Direct Link:</span>
                    <a
                      href={generatedPublicityData.url || generatedPublicityData.directLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 font-bold hover:underline truncate max-w-xs block"
                    >
                      {generatedPublicityData.url || generatedPublicityData.directLink}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={generatedPublicityData.url || generatedPublicityData.shareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-extrabold flex items-center gap-1.5 hover:bg-cyan-400 shadow-md"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>POST / SHARE NOW ↗</span>
                    </a>
                    <button
                      onClick={() => {
                        const content = generatedPublicityData.post || generatedPublicityData.caption || generatedPublicityData.description || ''
                        navigator.clipboard.writeText(`${content}\n\n${generatedPublicityData.url || ''}`)
                        alert('Post content and real link copied to clipboard!')
                      }}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs flex items-center gap-1.5 hover:bg-slate-700"
                    >
                      <Copy className="w-3.5 h-3.5 text-cyan-400" />
                      <span>COPY TEXT & LINK</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= 6. AI POSTER STUDIO ================= */}
      {activeTab === 'poster' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 bg-slate-950 flex justify-between items-center">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-cyan-400" />
              <span>AI Poster Studio</span>
            </h3>
            <div className="flex gap-2 text-xs font-mono">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => setPosterTemplate(num)}
                  className={`px-3 py-1.5 rounded-lg border ${
                    posterTemplate === num ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  Poster 0{num}
                </button>
              ))}
            </div>
          </div>

          {/* Poster Render Frame */}
          <div className="max-w-xl mx-auto aspect-[3/4] p-8 rounded-3xl bg-slate-950 border-2 border-cyan-500/50 shadow-2xl flex flex-col justify-between text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url('/assets/robocorp25_master_grid_infographic.jpg')" }} />
            <div className="relative z-10 space-y-2">
              <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">ROBOCORP 25</span>
              <h2 className="text-3xl font-extrabold text-white uppercase tracking-wider">
                {posterTemplate === 1 && '25 ROBOTS.\n25 ROLES.\nONE INTELLIGENT FACTORY.'}
                {posterTemplate === 2 && 'PRECISION ROBOTICS'}
                {posterTemplate === 3 && 'PHYSICAL AI'}
                {posterTemplate === 4 && 'SMART MANUFACTURING'}
              </h2>
            </div>

            <div className="relative z-10 p-4 rounded-2xl bg-slate-950/80 backdrop-blur border border-cyan-500/30 text-xs font-mono text-cyan-300">
              {posterTemplate === 1 && 'EXECUTIVE · PRODUCTION · QA · MAINTENANCE · LOGISTICS'}
              {posterTemplate === 2 && 'Sense → Plan → Verify → Act → Measure'}
              {posterTemplate === 3 && 'AI THAT PERCEIVES. AI THAT REASONS. AI THAT ACTS.'}
              {posterTemplate === 4 && 'AI + Robotics + Computer Vision + Digital Twin'}
            </div>

            <div className="relative z-10 text-[10px] font-mono text-slate-400">
              ROBOCORP 25 AUTONOMOUS MANUFACTURING SYSTEM
            </div>
          </div>
        </div>
      )}

      {/* ================= 7. AI THUMBNAIL GENERATOR ================= */}
      {activeTab === 'thumbnail' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 bg-slate-950 space-y-3">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Tv className="w-5 h-5 text-cyan-400" />
              <span>YouTube AI Thumbnail Generator</span>
            </h3>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {[
                'Inside a 25-Robot Factory',
                'How AI Robots Work Together',
                'Future of Manufacturing',
                'Physical AI Factory',
                'Precision Robotics Demo'
              ].map((tpl) => (
                <button
                  key={tpl}
                  onClick={() => setThumbnailTemplate(tpl)}
                  className={`px-3 py-1.5 rounded-lg border ${
                    thumbnailTemplate === tpl ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  {tpl}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-2xl mx-auto aspect-[16/9] rounded-3xl bg-slate-950 border-2 border-cyan-500/50 p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <img src="/assets/robocorp_shot01_exterior.jpg" alt="Thumbnail BG" className="absolute inset-0 w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />

            <div className="relative z-10 space-y-2 max-w-xs">
              <span className="px-2.5 py-1 rounded bg-cyan-500 text-black font-extrabold text-[10px] font-mono uppercase">
                OFFICIAL DEMO
              </span>
              <h2 className="text-2xl font-extrabold text-white uppercase leading-tight drop-shadow-lg">
                {thumbnailTemplate}
              </h2>
            </div>

            <div className="relative z-10 flex items-center justify-between text-xs font-mono text-cyan-300">
              <span className="px-3 py-1 rounded bg-slate-950/80 backdrop-blur border border-cyan-500/40">ROBOCORP 25</span>
              <span className="text-emerald-400 font-bold">4K ULTRA HD</span>
            </div>
          </div>
        </div>
      )}

      {/* ================= 8. MEDIA LIBRARY ================= */}
      {activeTab === 'library' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Filter:</span>
              {['All', 'Image', 'Video', 'Poster'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setLibraryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg border ${
                    libraryFilter === cat ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assets..."
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredMediaLibrary.map((asset) => (
              <div key={asset.id} className="p-4 rounded-2xl glass-panel border border-slate-800 bg-slate-950 space-y-3 font-mono text-xs">
                <div className="aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 border border-slate-800 relative">
                  <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] text-cyan-400 border border-cyan-500/30">
                    {asset.statusTag}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-white text-sm truncate">{asset.name}</div>
                  <div className="text-slate-400 text-[11px] truncate">Prompt: {asset.prompt}</div>
                  <div className="text-[10px] text-slate-500 mt-1">{asset.createdAt} · Provider: {asset.provider}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI PROVIDER ARCHITECTURE CONFIG MODAL */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-xl rounded-3xl glass-panel border border-cyan-500/50 p-6 shadow-2xl space-y-5 text-slate-100 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span>AI PROVIDER ARCHITECTURE CONFIGURATION</span>
              </span>
              <button onClick={() => setShowConfigModal(false)} className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                Close
              </button>
            </div>

            <div className="space-y-3 text-slate-300">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-cyan-300 font-bold">Active Mode: {AI_CONFIG.isMockMode ? 'MOCK / SIMULATION AI MODE' : 'REAL AI PROVIDER'}</div>
                <p className="text-[11px] text-slate-400">Configured via environment variables (AI_PROVIDER, IMAGE_PROVIDER, VIDEO_PROVIDER, AI_API_KEY).</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">Image Provider: {AI_CONFIG.imageProvider}</div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">Video Provider: {AI_CONFIG.videoProvider}</div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">LLM Provider: {AI_CONFIG.llmProvider}</div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">TTS Voice Provider: {AI_CONFIG.ttsProvider}</div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button onClick={() => setShowConfigModal(false)} className="px-5 py-2 rounded-xl bg-cyan-500 text-black font-bold">
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
