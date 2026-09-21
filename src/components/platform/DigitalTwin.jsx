import React, { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Activity, AlertTriangle, ShieldCheck, RefreshCw, Zap, Cpu, Gauge, Thermometer, Radio } from 'lucide-react'

export default function DigitalTwin({ workspaceId }) {
  const mountRef = useRef(null)
  const [speedMultiplier, setSpeedMultiplier] = useState(1)
  const [faultSimulated, setFaultSimulated] = useState(false)

  // References for animation state
  const speedRef = useRef(speedMultiplier)
  const faultRef = useRef(faultSimulated)

  useEffect(() => {
    speedRef.current = speedMultiplier
  }, [speedMultiplier])

  useEffect(() => {
    faultRef.current = faultSimulated
  }, [faultSimulated])

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight || 460

    // 1. Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x04120c)
    scene.fog = new THREE.FogExp2(0x04120c, 0.035)

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 7.5, 13.5)
    camera.lookAt(0, 1.2, 0)

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0x10b981, 1.5)
    dirLight.position.set(5, 12, 8)
    scene.add(dirLight)

    const pointLight = new THREE.PointLight(0xfacc15, 1.2, 15)
    pointLight.position.set(0, 4, -2)
    scene.add(pointLight)

    // 5. Grid Helper (Green perspective floor matching screenshot 1:1)
    const grid = new THREE.GridHelper(36, 36, 0x10b981, 0x064e3b)
    grid.position.y = 0
    scene.add(grid)

    // 6. Conveyor Belt
    const conveyorGroup = new THREE.Group()
    
    // Conveyor track body
    const beltGeo = new THREE.BoxGeometry(13, 0.3, 2.2)
    const beltMat = new THREE.MeshStandardMaterial({ color: 0x0f241c, roughness: 0.8 })
    const beltMesh = new THREE.Mesh(beltGeo, beltMat)
    beltMesh.position.set(0, 0.15, 0)
    conveyorGroup.add(beltMesh)

    // Side rails
    const railGeo = new THREE.BoxGeometry(13.2, 0.15, 0.1)
    const railMat = new THREE.MeshStandardMaterial({ color: 0x064e3b })
    const rail1 = new THREE.Mesh(railGeo, railMat)
    rail1.position.set(0, 0.35, 1.15)
    const rail2 = new THREE.Mesh(railGeo, railMat)
    rail2.position.set(0, 0.35, -1.15)
    conveyorGroup.add(rail1)
    conveyorGroup.add(rail2)

    scene.add(conveyorGroup)

    // 7. Robot Twin Base & Shaft (Yellow shaft with dark green base matching screenshot 1:1)
    const robotGroup = new THREE.Group()
    robotGroup.position.set(0, 0, -2.2)

    // Dark green base
    const baseGeo = new THREE.CylinderGeometry(1.3, 1.5, 0.6, 32)
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x065f46, roughness: 0.4 })
    const baseMesh = new THREE.Mesh(baseGeo, baseMat)
    baseMesh.position.y = 0.3
    robotGroup.add(baseMesh)

    // Yellow vertical cylinder shaft
    const shaftGeo = new THREE.CylinderGeometry(0.35, 0.35, 3.2, 32)
    const shaftMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3, metalness: 0.2 })
    const shaftMesh = new THREE.Mesh(shaftGeo, shaftMat)
    shaftMesh.position.y = 2.2
    robotGroup.add(shaftMesh)

    // Robot arm head
    const headGeo = new THREE.SphereGeometry(0.5, 32, 32)
    const headMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.3 })
    const headMesh = new THREE.Mesh(headGeo, headMat)
    headMesh.position.set(0, 3.8, 0)
    robotGroup.add(headMesh)

    scene.add(robotGroup)

    // 8. Conveyor Cargo Boxes (Cyan Cubes matching screenshot 1:1)
    const boxGeo = new THREE.BoxGeometry(0.85, 0.85, 0.85)
    const boxMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.3, metalness: 0.1 })
    
    const boxes = []
    const boxCount = 4
    const startX = -5
    const spacing = 3.2

    for (let i = 0; i < boxCount; i++) {
      const box = new THREE.Mesh(boxGeo, boxMat.clone())
      box.position.set(startX + i * spacing, 0.72, 0)
      scene.add(box)
      boxes.push(box)
    }

    // 9. Interactive Mouse Drag Orbit Logic
    let isDragging = false
    let previousMousePosition = { x: 0, y: 0 }
    let rotationAngleX = 0
    let rotationAngleY = 0

    const onMouseDown = (e) => {
      isDragging = true
      previousMousePosition = { x: e.clientX, y: e.clientY }
    }

    const onMouseMove = (e) => {
      if (!isDragging) return
      const deltaX = e.clientX - previousMousePosition.x
      const deltaY = e.clientY - previousMousePosition.y

      rotationAngleX += deltaX * 0.005
      rotationAngleY = Math.max(-0.2, Math.min(0.8, rotationAngleY + deltaY * 0.005))

      camera.position.x = 13.5 * Math.sin(rotationAngleX) * Math.cos(rotationAngleY)
      camera.position.z = 13.5 * Math.cos(rotationAngleX) * Math.cos(rotationAngleY)
      camera.position.y = 7.5 + 13.5 * Math.sin(rotationAngleY)
      camera.lookAt(0, 1.2, 0)

      previousMousePosition = { x: e.clientX, y: e.clientY }
    }

    const onMouseUp = () => { isDragging = false }

    container.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    // 10. Resize Handler
    const handleResize = () => {
      if (!container) return
      const newW = container.clientWidth
      const newH = container.clientHeight || 460
      camera.aspect = newW / newH
      camera.updateProjectionMatrix()
      renderer.setSize(newW, newH)
    }
    window.addEventListener('resize', handleResize)

    // 11. Animation Loop
    let animId
    let clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)

      const delta = clock.getDelta()
      const speed = speedRef.current
      const isFault = faultRef.current

      // Move boxes along conveyor belt
      boxes.forEach((box) => {
        box.position.x += delta * 1.8 * speed
        if (box.position.x > 6.5) {
          box.position.x = -6.5
        }

        // Color box red if fault occurs near inspection zone
        if (isFault && box.position.x > -1.5 && box.position.x < 1.5) {
          box.material.color.setHex(0xef4444)
        } else {
          box.material.color.setHex(0x38bdf8)
        }
      })

      // Fault animation: shaft flashes red if fault active
      if (isFault) {
        shaftMesh.material.color.setHex((Math.floor(Date.now() / 250) % 2 === 0) ? 0xef4444 : 0xfacc15)
        baseMesh.material.color.setHex(0x991b1b)
      } else {
        shaftMesh.material.color.setHex(0xfacc15)
        baseMesh.material.color.setHex(0x065f46)
      }

      // Gentle robot arm head movement
      headMesh.position.y = 3.8 + Math.sin(Date.now() * 0.003 * speed) * 0.15

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animId)
      container.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('resize', handleResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div className="space-y-6 font-sans text-slate-100">
      
      {/* 1. TOP HEADER & TITLE BOX (Matching Screenshot 1:1) */}
      <div className="p-6 rounded-2xl bg-[#061e16] border border-[#0d3326] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-extrabold text-emerald-400 tracking-wide flex items-center gap-2">
            <span>🌐</span>
            <span>Real-Time 3D Digital Twin Platform</span>
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/60 font-sans">
            Three.js WebGL 3D Factory Floor, Live Robot Twin, Conveyor Dynamics & Predictive Maintenance Simulation.
          </p>
        </div>

        {/* Header Right Action Buttons */}
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 text-xs font-mono font-semibold whitespace-nowrap">
            WebGL 3D Active
          </span>
          <button
            onClick={() => setFaultSimulated(!faultSimulated)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer shadow-md ${
              faultSimulated
                ? 'bg-rose-500 hover:bg-rose-400 text-white border border-rose-400 shadow-rose-950/50'
                : 'bg-amber-950/80 hover:bg-amber-900/80 text-yellow-400 border border-yellow-700/80 shadow-amber-950/50'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>{faultSimulated ? '✓ Reset Fault Simulation' : '⚠️ Trigger Fault Simulation'}</span>
          </button>
        </div>
      </div>

      {/* 2. INTERACTIVE 3D DIGITAL TWIN SCENE BOX (Matching Screenshot 1:1) */}
      <div className="rounded-2xl bg-[#061e16] border border-[#0d3326] p-5 space-y-3">
        <div className="flex items-center justify-between font-mono">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <span>🕹️</span>
            <span>Interactive 3D Digital Twin Scene</span>
          </div>

          {/* Speed Multiplier Controls */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Speed multiplier:</span>
            <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
              {[1, 2, 4].map((mult) => (
                <button
                  key={mult}
                  onClick={() => setSpeedMultiplier(mult)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    speedMultiplier === mult
                      ? 'bg-[#facc15] text-black shadow-sm'
                      : 'text-emerald-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {mult}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Three.js WebGL Render Container */}
        <div className="w-full h-[460px] rounded-xl overflow-hidden border border-emerald-950/80 relative bg-[#04120c]">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Canvas Overlay Status Badge */}
          <div className="absolute top-4 left-4 font-mono text-xs flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-950/90 backdrop-blur-md text-emerald-400 border border-emerald-500/40 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block mr-2 animate-ping" />
              DDS Telemetry Sync: 12ms | WebGL 60 FPS
            </span>
          </div>

          {/* Fault Simulation Warning Overlay */}
          {faultSimulated && (
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-rose-950/90 backdrop-blur-md border border-rose-500/80 text-rose-200 font-mono text-xs flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400 animate-bounce" />
                <span className="font-bold text-rose-300">FAULT SIMULATION ACTIVE: Spindle Bearing Overheat Detected (78.4 °C)</span>
              </div>
              <span className="text-[11px] text-rose-400 font-bold">Auto-E-Stop Trigger Ready</span>
            </div>
          )}
        </div>
      </div>

      {/* 3. TOP 4 METRIC CARDS ROW (Matching Screenshot 2:1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        
        {/* Card 1: Vibration Velocity */}
        <div className="p-5 rounded-2xl bg-[#061e16] border border-[#0d3326] space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Vibration Velocity
          </div>
          <div className={`text-3xl font-extrabold tracking-tight ${faultSimulated ? 'text-rose-500' : 'text-emerald-400'}`}>
            {faultSimulated ? '6.8 mm/s' : '2.4 mm/s'}
          </div>
          <div className={`text-xs font-medium ${faultSimulated ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
            {faultSimulated ? 'EXCEEDED > 4.5 mm/s' : 'Normal Threshold < 4.5 mm/s'}
          </div>
        </div>

        {/* Card 2: Bearing Temperature */}
        <div className="p-5 rounded-2xl bg-[#061e16] border border-[#0d3326] space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Bearing Temperature
          </div>
          <div className={`text-3xl font-extrabold tracking-tight ${faultSimulated ? 'text-rose-500' : 'text-[#facc15]'}`}>
            {faultSimulated ? '78.4 °C' : '42.1 °C'}
          </div>
          <div className={`text-xs font-medium ${faultSimulated ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
            {faultSimulated ? 'OVERHEAT LIMIT > 65 °C' : 'Thermal Limit < 65 °C'}
          </div>
        </div>

        {/* Card 3: Spindle Speed */}
        <div className="p-5 rounded-2xl bg-[#061e16] border border-[#0d3326] space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Spindle Speed
          </div>
          <div className={`text-3xl font-extrabold tracking-tight ${faultSimulated ? 'text-amber-400' : 'text-cyan-400'}`}>
            {faultSimulated ? '1400 RPM' : '3200 RPM'}
          </div>
          <div className="text-xs text-slate-400 font-medium">
            Synchronized DDS Feedback
          </div>
        </div>

        {/* Card 4: Predictive Equipment Health */}
        <div className="p-5 rounded-2xl bg-[#061e16] border border-[#0d3326] space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Predictive Equipment Health
          </div>
          <div className={`text-3xl font-extrabold tracking-tight ${faultSimulated ? 'text-rose-500' : 'text-emerald-400'}`}>
            {faultSimulated ? '64.2%' : '98.2%'}
          </div>
          <div className={`text-xs font-medium ${faultSimulated ? 'text-rose-400 font-bold' : 'text-emerald-400/90'}`}>
            {faultSimulated ? 'Maintenance Required Immediately' : 'Remaining Useful Life: 1,450 hrs'}
          </div>
        </div>

      </div>

    </div>
  )
}
