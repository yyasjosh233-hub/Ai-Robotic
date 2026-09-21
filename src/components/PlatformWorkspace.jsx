import React, { useState, useEffect, useRef } from 'react'
import { 
  Cpu, Sliders, RotateCcw, Activity, ShieldAlert, CheckCircle2, Play, Pause, 
  Layers, X, Info, AlertTriangle, Radio, Gamepad2, MapPin, Compass, Copy, Check
} from 'lucide-react'
import * as THREE from 'three'

export default function PlatformWorkspace({ isOpen, onClose, isEmbedded = false, workspaceId = 'agro_r1' }) {
  // Joint Angles in Degrees
  const [joints, setJoints] = useState({
    j1: 0,
    j2: 25,
    j3: -45,
    j4: 0,
    j5: 40,
    j6: 0
  })

  const [gripperOpen, setGripperOpen] = useState(true)
  const [emergencyStop, setEmergencyStop] = useState(false)

  // Top Metrics
  const [yoshikawaIndex, setYoshikawaIndex] = useState(0.1122)
  const [endEffector, setEndEffector] = useState({ x: '0.8463', y: '0', z: '-0.503' })
  const [orient, setOrient] = useState({ roll: '-180°', pitch: '20°', yaw: '0°' })
  const [nodeState, setNodeState] = useState('READY')
  const [fps, setFps] = useState(29)

  // Cartesian IK Inputs matching screenshot
  const [cartesianInputs, setCartesianInputs] = useState({
    x: '0.55',
    y: '0.15',
    z: '0.45',
    roll: '0',
    pitch: '90',
    yaw: '0'
  })

  // Trajectory Playback & Speed Controls matching screenshot
  const [isExecutingTrajectory, setIsExecutingTrajectory] = useState(false)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [maxFrames, setMaxFrames] = useState(120)
  const [playbackSpeed, setPlaybackSpeed] = useState('1x') // 0.5x, 1x, 2x
  const [copiedJson, setCopiedJson] = useState(false)

  const trajectoryTimerRef = useRef(null)
  const canvasRef = useRef(null)

  // ROS 2 Telemetry JSON string matching screenshot
  const jsonTelemetry = `{
  "node": "/industrial_path_planner_node",
  "executor": "SingleThreadedExecutor",
  "topics": [
    {
      "name": "/joint_states",
      "type": "sensor_msgs/msg/JointState",
      "hz": 50
    },
    {
      "name": "/tf",
      "type": "tf2_msgs/msg/TFMessage",
      "hz": 100
    }
  ]
}`

  // Re-calculate metrics based on joints
  useEffect(() => {
    const radJ2 = (joints.j2 * Math.PI) / 180
    const radJ3 = (joints.j3 * Math.PI) / 180
    const index = Math.abs(Math.sin(radJ2) * Math.cos(radJ3))
    const formatted = parseFloat((index * 0.25 + 0.08).toFixed(4))
    setYoshikawaIndex(formatted)

    const xVal = (0.75 + Math.cos(radJ2) * 0.2).toFixed(4)
    const zVal = (-0.4 - Math.sin(radJ3) * 0.2).toFixed(3)
    setEndEffector(prev => ({ ...prev, x: xVal, z: zVal }))
  }, [joints])

  // Motion trajectory loop
  useEffect(() => {
    if (isExecutingTrajectory && !emergencyStop) {
      const intervalMs = playbackSpeed === '0.5x' ? 100 : playbackSpeed === '2x' ? 25 : 50

      trajectoryTimerRef.current = setInterval(() => {
        setCurrentFrame(prev => {
          const next = (prev + 1) % (maxFrames + 1)
          const t = (next / maxFrames) * Math.PI * 2
          
          setJoints({
            j1: Math.round(Math.sin(t) * 35),
            j2: Math.round(25 + Math.cos(t * 2) * 20),
            j3: Math.round(-45 + Math.sin(t * 1.5) * 25),
            j4: Math.round(Math.cos(t) * 25),
            j5: Math.round(40 + Math.sin(t * 2) * 20),
            j6: Math.round(Math.sin(t * 3) * 50)
          })

          if (next === maxFrames) {
            setIsExecutingTrajectory(false)
          }
          return next
        })
      }, intervalMs)
    } else {
      clearInterval(trajectoryTimerRef.current)
    }

    return () => clearInterval(trajectoryTimerRef.current)
  }, [isExecutingTrajectory, emergencyStop, playbackSpeed, maxFrames])

  // Three.js Scene Setup matching Screenshot
  useEffect(() => {
    if (!canvasRef.current) return

    const width = canvasRef.current.clientWidth
    const height = canvasRef.current.clientHeight

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x040711)

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(2.8, 2.2, 3.2)
    camera.lookAt(0, 0.5, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef.current })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Grid Floor
    const gridHelper = new THREE.GridHelper(6, 24, 0x00f0ff, 0x0f172a)
    scene.add(gridHelper)

    // Wireframe Hemisphere Dome Reach Envelope
    const domeGeo = new THREE.SphereGeometry(1.6, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2)
    const domeMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.25 })
    const domeMesh = new THREE.Mesh(domeGeo, domeMat)
    scene.add(domeMesh)

    // Yellow Circular Trajectory Ring
    const ringGeo = new THREE.RingGeometry(1.2, 1.23, 64)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xfacc15, side: THREE.DoubleSide })
    const ringMesh = new THREE.Mesh(ringGeo, ringMat)
    ringMesh.rotation.x = Math.PI / 2
    ringMesh.position.y = 0.01
    scene.add(ringMesh)

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0x00f0ff, 1.5)
    dirLight.position.set(5, 8, 5)
    scene.add(dirLight)

    // Robot Arm Group
    const baseGroup = new THREE.Group()
    scene.add(baseGroup)

    const baseGeo = new THREE.CylinderGeometry(0.28, 0.35, 0.2, 32)
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.2 })
    const baseMesh = new THREE.Mesh(baseGeo, baseMat)
    baseMesh.position.y = 0.1
    baseGroup.add(baseMesh)

    // Link 1
    const link1Group = new THREE.Group()
    link1Group.position.y = 0.2
    baseGroup.add(link1Group)

    const l1Geo = new THREE.BoxGeometry(0.2, 0.45, 0.2)
    const cyanMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.6, roughness: 0.3 })
    const l1Mesh = new THREE.Mesh(l1Geo, cyanMat)
    l1Mesh.position.y = 0.225
    link1Group.add(l1Mesh)

    // Link 2
    const link2Group = new THREE.Group()
    link2Group.position.y = 0.45
    link1Group.add(link2Group)

    const l2Geo = new THREE.BoxGeometry(0.14, 0.65, 0.14)
    const l2Mesh = new THREE.Mesh(l2Geo, cyanMat)
    l2Mesh.position.y = 0.325
    link2Group.add(l2Mesh)

    // Link 3
    const link3Group = new THREE.Group()
    link3Group.position.y = 0.65
    link2Group.add(link3Group)

    const l3Geo = new THREE.BoxGeometry(0.12, 0.45, 0.12)
    const l3Mesh = new THREE.Mesh(l3Geo, baseMat)
    l3Mesh.position.y = 0.225
    link3Group.add(l3Mesh)

    // End Effector Gripper
    const gripperGeo = new THREE.SphereGeometry(0.08, 16, 16)
    const gripMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true })
    const gripperMesh = new THREE.Mesh(gripperGeo, gripMat)
    gripperMesh.position.y = 0.45
    link3Group.add(gripperMesh)

    let animationFrameId
    const animate = () => {
      link1Group.rotation.y = (joints.j1 * Math.PI) / 180
      link2Group.rotation.z = (joints.j2 * Math.PI) / 180
      link3Group.rotation.z = (joints.j3 * Math.PI) / 180
      gripperMesh.rotation.y += 0.02

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      renderer.dispose()
    }
  }, [joints])

  const handleSliderChange = (jointKey, val) => {
    setIsExecutingTrajectory(false)
    setJoints(prev => ({ ...prev, [jointKey]: parseFloat(val) }))
  }

  const handleResetHome = () => {
    setIsExecutingTrajectory(false)
    setCurrentFrame(0)
    setJoints({ j1: 0, j2: 25, j3: -45, j4: 0, j5: 40, j6: 0 })
  }

  const handleSolveDlsIK = () => {
    setIsExecutingTrajectory(false)
    setJoints({
      j1: Math.round((parseFloat(cartesianInputs.x) - 0.5) * 60),
      j2: Math.round(parseFloat(cartesianInputs.pitch) - 65),
      j3: Math.round(parseFloat(cartesianInputs.z) * -80),
      j4: Math.round(parseFloat(cartesianInputs.yaw)),
      j5: Math.round(parseFloat(cartesianInputs.y) * 100),
      j6: Math.round(parseFloat(cartesianInputs.roll))
    })
  }

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonTelemetry)
    setCopiedJson(true)
    setTimeout(() => setCopiedJson(false), 2000)
  }

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. TOP HEADER AREA */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#facc15] flex items-center gap-2 tracking-wide">
            <span>🦾 6-DOF Industrial Robot Path Planner</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Three.js 3D Simulation, Forward & Inverse Kinematics, Jacobian Matrix & Quintic Motion Planning
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-full bg-[#1c1917] border border-amber-500/40 text-[#facc15] text-xs font-mono font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>• FLOOR_COLLISION</span>
          </div>

          <button
            onClick={() => setEmergencyStop(!emergencyStop)}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all ${
              emergencyStop 
                ? 'bg-red-600 text-white animate-pulse border border-red-400' 
                : 'bg-gradient-to-r from-red-600 to-rose-700 text-white hover:from-red-500 hover:to-rose-600 shadow-red-600/30'
            }`}
          >
            <span>🚨 EMERGENCY STOP</span>
          </button>
        </div>
      </div>

      {/* 2. TOP 5 METRIC CARDS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 font-mono">
        <div className="p-4 rounded-2xl bg-[#080d1a] border border-cyan-500/40 space-y-1.5 text-center">
          <div className="flex items-center justify-between text-slate-400 text-xs"><span>📈</span></div>
          <div className="text-2xl font-bold text-[#00f0ff]">{yoshikawaIndex}</div>
          <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">MANIPULABILITY (W)</div>
          <div className="text-[9px] text-slate-500">Yoshikawa Index</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#080d1a] border border-cyan-400/40 space-y-1.5 text-center">
          <div className="flex items-center justify-between text-slate-400 text-xs"><span>📍</span></div>
          <div className="text-2xl font-bold text-[#38bdf8]">{endEffector.x} <span className="text-sm font-normal">m</span></div>
          <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">END-EFFECTOR X</div>
          <div className="text-[9px] text-slate-400">Y: {endEffector.y}m | Z: {endEffector.z}m</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#080d1a] border border-purple-500/40 space-y-1.5 text-center">
          <div className="flex items-center justify-between text-slate-400 text-xs"><span>📐</span></div>
          <div className="text-xl font-bold text-[#c084fc]">{orient.roll} / {orient.pitch}</div>
          <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">ORIENT ROLL/PITCH</div>
          <div className="text-[9px] text-slate-400">Yaw: {orient.yaw}</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#080d1a] border border-amber-500/40 space-y-1.5 text-center">
          <div className="flex items-center justify-between text-slate-400 text-xs"><span>⚡</span></div>
          <div className="text-2xl font-bold text-[#facc15]">{nodeState}</div>
          <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">ROS 2 NODE STATE</div>
          <div className="text-[9px] text-slate-400">/joint_states 50Hz</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#080d1a] border border-emerald-500/40 space-y-1.5 text-center">
          <div className="flex items-center justify-between text-slate-400 text-xs"><span>🎮</span></div>
          <div className="text-2xl font-bold text-[#34d399]">{fps}</div>
          <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">3D CANVAS FPS</div>
          <div className="text-[9px] text-slate-400">WebGL Frame Rate</div>
        </div>
      </div>

      {/* 3. UPPER 3D CANVAS & JOINT CONTROLS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 3D Canvas Box */}
        <div className="lg:col-span-8 rounded-2xl bg-[#080d1a] border border-slate-800 p-2 relative overflow-hidden flex flex-col min-h-[420px]">
          <canvas ref={canvasRef} className="w-full h-full min-h-[400px] rounded-xl" />

          {/* Top Badge Overlay */}
          <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-lg bg-slate-950/90 border border-amber-500/30 font-mono text-xs text-[#facc15] flex items-center gap-2 shadow-xl">
            <span>🏭 SMART FACTORY WORKCELL 3D | FPS: 29</span>
          </div>
        </div>

        {/* Right Joint Controls Box */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-6 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-[#facc15] uppercase tracking-wider flex items-center gap-2">
              <span>⚙️ JOINT CONTROLS (J1 - J6)</span>
            </h3>

            <button
              onClick={() => setGripperOpen(!gripperOpen)}
              className="px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 font-bold text-[11px] hover:bg-emerald-900/80"
            >
              Tool Gripper: {gripperOpen ? 'OPEN' : 'CLOSED'}
            </button>
          </div>

          <div className="space-y-4">
            {Object.keys(joints).map((jKey, idx) => (
              <div key={jKey} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Joint {idx + 1}</span>
                  <span className="text-[#facc15] font-bold">{joints[jKey]}°</span>
                </div>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={joints[jKey]}
                  onChange={(e) => handleSliderChange(jKey, e.target.value)}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#facc15]"
                />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. MIDDLE CONTROL BAR matching Screenshot 2:1 */}
      <div className="p-4 rounded-2xl bg-[#080d1a] border border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setMaxFrames(120)
              setCurrentFrame(0)
              setIsExecutingTrajectory(true)
            }}
            className="px-5 py-2.5 rounded-xl bg-[#facc15] text-black font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:bg-amber-300 transition-all"
          >
            <span>🎯 Plan Quintic Trajectory</span>
          </button>

          <button
            onClick={() => setIsExecutingTrajectory(!isExecutingTrajectory)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs flex items-center gap-2"
          >
            {isExecutingTrajectory ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isExecutingTrajectory ? 'Pause' : 'Play'}</span>
          </button>

          <button
            onClick={handleResetHome}
            className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold hover:text-white flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4 text-cyan-400" />
            <span>Home Pose</span>
          </button>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-300">
          <div>
            Frame: <strong className="text-white">{currentFrame} / {maxFrames}</strong>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 mr-1">Speed:</span>
            {['0.5x', '1x', '2x'].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                  playbackSpeed === spd
                    ? 'bg-[#facc15] text-black'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {spd}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. LOWER ROW: VELOCITY CHART & CARTESIAN IK / TELEMETRY JSON matching Screenshot 2:1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Lower Box: Velocity & Acceleration Chart Profile */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-6 font-mono flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <h3 className="text-sm font-bold text-[#facc15] uppercase tracking-wider flex items-center gap-2">
              <span>📊 JOINT TRAJECTORY ACCELERATION & VELOCITY PROFILES</span>
            </h3>
          </div>

          {/* Graph Placeholder Grid */}
          <div className="h-56 rounded-xl bg-slate-950/80 border border-slate-800/80 p-4 relative flex flex-col justify-between">
            <div className="w-full border-b border-dashed border-slate-800" />
            <div className="w-full border-b border-dashed border-slate-800" />
            <div className="w-full border-b border-dashed border-slate-800" />

            {/* Simulated Animated Graph Curves */}
            <svg className="absolute inset-0 w-full h-full p-4 overflow-visible pointer-events-none">
              <path
                d="M 0 140 Q 100 20, 200 120 T 400 60 T 600 130"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
              />
              <path
                d="M 0 120 Q 120 180, 240 40 T 480 140 T 600 80"
                fill="none"
                stroke="#0284c7"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-4 h-0.5 bg-emerald-500" />
              <span>J1 Velocity (deg/s)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-0.5 bg-sky-500" />
              <span>J2 Velocity (deg/s)</span>
            </div>
          </div>
        </div>

        {/* Right Lower Column: Cartesian IK Controller & ROS 2 Telemetry JSON */}
        <div className="lg:col-span-5 space-y-6 font-mono">
          
          {/* Cartesian IK Pose Controller Box matching screenshot */}
          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h3 className="text-xs font-bold text-[#facc15] uppercase tracking-wider flex items-center gap-2">
                <span>🎯 CARTESIAN IK POSE CONTROLLER</span>
              </h3>
            </div>

            {/* 6 Grid Inputs X, Y, Z, ROLL, PITCH, YAW matching screenshot */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 text-[10px]">X</label>
                <input
                  type="text"
                  value={cartesianInputs.x}
                  onChange={(e) => setCartesianInputs({ ...cartesianInputs, x: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-bold focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[10px]">Y</label>
                <input
                  type="text"
                  value={cartesianInputs.y}
                  onChange={(e) => setCartesianInputs({ ...cartesianInputs, y: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-bold focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[10px]">Z</label>
                <input
                  type="text"
                  value={cartesianInputs.z}
                  onChange={(e) => setCartesianInputs({ ...cartesianInputs, z: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-bold focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[10px]">ROLL</label>
                <input
                  type="text"
                  value={cartesianInputs.roll}
                  onChange={(e) => setCartesianInputs({ ...cartesianInputs, roll: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-bold focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[10px]">PITCH</label>
                <input
                  type="text"
                  value={cartesianInputs.pitch}
                  onChange={(e) => setCartesianInputs({ ...cartesianInputs, pitch: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-bold focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[10px]">YAW</label>
                <input
                  type="text"
                  value={cartesianInputs.yaw}
                  onChange={(e) => setCartesianInputs({ ...cartesianInputs, yaw: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-bold focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Solve IK Button */}
            <button
              onClick={handleSolveDlsIK}
              className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs transition-all shadow-lg shadow-cyan-400/20"
            >
              Solve Inverse Kinematics (DLS)
            </button>
          </div>

          {/* ROS 2 Telemetry & TF Topics JSON Code Box matching screenshot */}
          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h3 className="text-xs font-bold text-[#facc15] uppercase tracking-wider flex items-center gap-2">
                <span>ROS 2 TELEMETRY & TF TOPICS</span>
              </h3>

              <button
                onClick={handleCopyJson}
                className="px-3 py-1 rounded-lg bg-slate-900 border border-amber-500/40 text-amber-300 font-bold text-[11px] flex items-center gap-1.5 hover:bg-slate-800"
              >
                {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedJson ? 'Copied!' : 'Copy JSON'}</span>
              </button>
            </div>

            {/* JSON Code Viewer */}
            <div className="p-4 rounded-xl bg-[#040711] border border-slate-900 overflow-x-auto text-[11px] text-cyan-300 font-mono leading-relaxed max-h-52">
              <pre>{jsonTelemetry}</pre>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
