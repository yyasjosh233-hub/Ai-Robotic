import React, { useState, useEffect } from 'react'
import {
  Play, Pause, RotateCcw, ShieldAlert, Cpu, Sparkles, Activity, Eye,
  Wrench, Truck, Database, Network, ChevronRight, Layers, CheckCircle2,
  Users, Maximize2, VolumeX, BarChart2, Radio, Zap, Box, ShoppingCart, Search, Crosshair
} from 'lucide-react'

// 25 Primary Robots Directory with 1-by-1 Role Images & Action Verbs matching master infographic grid
export const robocorp25Roster = [
  { id: '01', title: 'CEO', role: 'Strategic Vision & Leadership', badge: 'LEAD · INNOVATE · SCALE', dept: 'Executive Command', station: 'Executive Command Center', status: 'Active', desc: 'Leads the company. Monitors revenue, safety, energy, and overall performance via holographic glass screens.', image: '/assets/robocorp_shot05_management.jpg' },
  { id: '02', title: 'General Manager', role: 'Operations Coordination', badge: 'COORDINATE · MONITOR · EXECUTE', dept: 'Executive Operations', station: 'Central Operations Hub', status: 'Active', desc: 'Coordinates department managers, monitors factory-wide workflows, and ensures operational alignment.', image: '/assets/film_scene_ceo_command.jpg' },
  { id: '03', title: 'HR Manager', role: 'Employee Management', badge: 'PEOPLE · TRAIN · GROW', dept: 'Human Resources', station: 'Robot Talent Suite', status: 'Active', desc: 'Manages workforce assignments, tracks neural retraining models, performance scoring, and station rotation.', image: '/assets/robocorp_r03_hr.jpg' },
  { id: '04', title: 'Finance Manager', role: 'Budgeting & Cost Control', badge: 'FINANCE · ANALYZE · OPTIMIZE', dept: 'Financial Analytics', station: 'Cost Analytics Terminal', status: 'Active', desc: 'Monitors real-time operational expenditures, unit economics, component valuation, and energy tariffs.', image: '/assets/robocorp_r04_finance.jpg' },
  { id: '05', title: 'Production Manager', role: 'Production Planning', badge: 'PLAN · SCHEDULE · DELIVER', dept: 'Production', station: 'Assembly Deck Terminal', status: 'Active', desc: 'Controls manufacturing schedules, target line velocity (862/1,000 units), and coordinates production articulators.', image: '/assets/robocorp_r05_prod_mgr.jpg' },
  { id: '06', title: 'Assembly Robot', role: 'Component Assembly', badge: 'ASSEMBLE · ALIGN · BUILD', dept: 'Production', station: 'Workcell 01', status: 'Operating', desc: 'Executes sub-millimeter component placement and structural chassis joinery on automated assembly line.', image: '/assets/robocorp_r06_assembly.jpg' },
  { id: '07', title: 'Welding Robot', role: 'Precision Welding', badge: 'WELD · JOIN · STRENGTHEN', dept: 'Production', station: 'Welding Bay 02', status: 'Operating', desc: 'Performs high-speed synchronized laser arc welding with zero heat deformation and orange spark tracking.', image: '/assets/robocorp_r07_welding.jpg' },
  { id: '08', title: 'Component Installation', role: 'Part Installation', badge: 'PICK · PLACE · INSTALL', dept: 'Production', station: 'Workcell 03', status: 'Operating', desc: 'Installs automated wiring harnesses, micro-electronic control modules, and structural fasteners.', image: '/assets/robocorp_r08_installation.jpg' },
  { id: '09', title: 'Machining Robot', role: 'CNC Machining & Shaping', badge: 'CUT · SHAPE · MANUFACTURE', dept: 'Production', station: 'CNC Cell 04', status: 'Operating', desc: 'Executes sub-micron surface deburring, precision milling, and alloy component shaving.', image: '/assets/robocorp_r09_machining.jpg' },
  { id: '10', title: 'Packaging Robot', role: 'Product Packaging', badge: 'PACK · LABEL · PREPARE', dept: 'Production', station: 'Packaging Line 05', status: 'Operating', desc: 'Packages completed assemblies into high-density protective ROBOCORP containers with robotic strapping.', image: '/assets/robocorp_r10_packaging.jpg' },
  { id: '11', title: 'Quality Control Manager', role: 'Quality Monitoring', badge: 'INSPECT · ANALYZE · IMPROVE', dept: 'Quality', station: 'QA Command Suite', status: 'Active', desc: 'Supervises overall product quality standards (Pass Rate 98.7%), automated vision benchmarks, and ISO compliance.', image: '/assets/robocorp_r11_qa_mgr.jpg' },
  { id: '12', title: 'Computer Vision Inspector', role: 'AI Vision Inspection', badge: 'DETECT · CLASSIFY · VALIDATE', dept: 'Quality', station: 'Optical Scan Track A', status: 'Scanning', desc: 'Scans component surfaces at 1,000 FPS for cracks, surface scratches, and defect classification (PASS 99.2%).', image: '/assets/dashboard_quality_vision.jpg' },
  { id: '13', title: 'Dimensional Inspection', role: 'Precision Measurement', badge: 'MEASURE · VERIFY · REPORT', dept: 'Quality', station: 'Laser QA Track B', status: 'Scanning', desc: 'Measures outer diameter (100.02mm), height (49.99mm), and width (30.01mm) with sub-micron lasers.', image: '/assets/robocorp_r13_dimensional.jpg' },
  { id: '14', title: 'Maintenance Manager', role: 'Maintenance Scheduling', badge: 'PLAN · SCHEDULE · ENSURE UPTIME', dept: 'Maintenance', station: 'Diagnostic Core', status: 'Active', desc: 'Monitors machine health profiles, thermal acoustics, and schedules predictive maintenance servicing.', image: '/assets/robocorp_r14_maint_mgr.jpg' },
  { id: '15', title: 'Maintenance Engineer', role: 'Machine Repair & Service', badge: 'DIAGNOSE · REPAIR · RESTORE', dept: 'Maintenance', station: 'Workcell 04 Repair', status: 'Servicing', desc: 'Inspects robotic articulators, replaces worn harmonic drives, and lubricates actuators autonomously.', image: '/assets/robocorp_r15_maint_eng.jpg' },
  { id: '16', title: 'Predictive Maintenance', role: 'Diagnostics & Health Monitoring', badge: 'PREDICT · PREVENT · PROTECT', dept: 'Maintenance', station: 'Conveyor Track 02', status: 'Servicing', desc: 'Analyzes motor vibration telemetry curves and thermal scans (Status: NORMAL) to prevent unscheduled downtime.', image: '/assets/robocorp_r16_predictive.jpg' },
  { id: '17', title: 'AI/Robotics Engineer', role: 'AI Model Development', badge: 'DEVELOP · SIMULATE · DEPLOY', dept: 'Engineering & ROS 2', station: 'Neural Computing Lab', status: 'Active', desc: 'Develops ROS 2 control nodes, neural motion transformers, and adaptive trajectory policies.', image: '/assets/film_scene_digital_twin.jpg' },
  { id: '18', title: 'Computer Vision Engineer', role: 'Vision System Development', badge: 'CALIBRATE · TRAIN · IMPROVE', dept: 'Perception Systems', station: 'Vision Optics Lab', status: 'Active', desc: 'Calibrates camera arrays, updates object tracking models, and tunes optical neural nets.', image: '/assets/dashboard_trajectory_collision.jpg' },
  { id: '19', title: 'Safety Officer', role: 'Hazard Detection & Emergency', badge: 'MONITOR · ALERT · KEEP SAFE', dept: 'Safety & Compliance', station: 'Safety Overwatch Tower', status: 'Alert Ready', desc: 'Monitors worker/robot proximity, activates Emergency Stop protocols, and displays HAZARD DETECTED warnings.', image: '/assets/robocorp_r19_safety.jpg' },
  { id: '20', title: 'Logistics AMR', role: 'Autonomous Material Transport', badge: 'NAVIGATE · TRANSPORT · DELIVER', dept: 'Logistics', station: 'Aisle Transport Track 1', status: 'Navigating', desc: 'Autonomous mobile robot transporting raw materials with 360° LiDAR SLAM pathfinding.', image: '/assets/dashboard_amr_waypoint_planner.jpg' },
  { id: '21', title: 'Material Transport AMR', role: 'Internal Material Flow', badge: 'MOVE · ROUTE · SUPPLY', dept: 'Logistics', station: 'Aisle Transport Track 4', status: 'Navigating', desc: 'Transfers completed sub-assemblies between production lines and warehouse storage.', image: '/assets/dashboard_amr_obstacle_replanning.jpg' },
  { id: '22', title: 'Inventory Manager', role: 'Stock Management', badge: 'TRACK · UPDATE · REORDER', dept: 'Logistics', station: 'RFID Control Desk', status: 'Active', desc: 'Tracks raw material levels (In Stock: 1,248), finished component stock, and warehouse logistics via RFID tags.', image: '/assets/dashboard_amr_occupancy_costmap.jpg' },
  { id: '23', title: 'Warehouse Robot', role: 'Automated Storage & Retrieval', badge: 'STORE · RETRIEVE · ORGANIZE', dept: 'Logistics', station: 'High-Bay Rack System', status: 'Active', desc: 'Stores and retrieves heavy palletized inventory from multi-story automated rack structures.', image: '/assets/robocorp_r23_warehouse.jpg' },
  { id: '24', title: 'R&D / Digital Twin Robot', role: 'Research & Development', badge: 'INNOVATE · SIMULATE · ADVANCE', dept: 'Advanced R&D', station: 'Digital Twin Chamber', status: 'Simulating', desc: 'Interacts with 3D translucent digital twin mirrors to test optimization strategies (+18% throughput).', image: '/assets/film_scene_production_arms.jpg' },
  { id: '25', title: 'Customer Operations Robot', role: 'Order Management', badge: 'RECEIVE · PROCESS · SUPPORT', dept: 'Customer Support', station: 'Orders Terminal', status: 'Active', desc: 'Receives global build requests (Order #A3048), dispatches factory job queues, and tracks delivery completion.', image: '/assets/robocorp_r25_customer.jpg' }
]

export default function Workforce25Film() {
  const [selectedRobot, setSelectedRobot] = useState(robocorp25Roster[0])
  const [currentShot, setCurrentShot] = useState(1)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showInspectorModal, setShowInspectorModal] = useState(false)
  const [filterCategory, setFilterCategory] = useState('All')

  // 15-Shot Storyboard matching prompt sequence
  const shots = [
    { id: 1, title: 'SHOT 01 — FACTORY EXTERIOR', subtitle: 'ROBOCORP 25 · 2040 AUTONOMOUS FACILITY', desc: 'Wide aerial view of ROBOCORP 25 high-tech manufacturing facility at sunrise. Glass atrium, solar arrays, autonomous transport docks, and cyan lighting.', image: '/assets/robocorp_shot01_exterior.jpg', hudText: 'ROBOCORP 25 FACILITY · 100% AUTONOMOUS · YEAR 2040' },
    { id: 2, title: 'SHOT 02 — CAMERA ENTERS FACTORY', subtitle: 'ENTERING CENTRAL PRODUCTION CORRIDOR', desc: 'Camera glides through high-speed automated security airlocks into the central production atrium surrounded by robotic conveyors.', image: '/assets/film_scene_factory_establishing.jpg', hudText: 'SECURITY CLEARANCE VERIFIED · FACILITY ACCESS GRANTED' },
    { id: 3, title: 'SHOT 03 — PRODUCTION FLOOR REVEALED', subtitle: 'MASSIVE AUTOMATED ASSEMBLY INFRASTRUCTURE', desc: 'Pan across the main manufacturing deck revealing hundreds of automated systems operated by the central 25-robot workforce.', image: '/assets/film_scene_factory_establishing.jpg', hudText: 'PRODUCTION DECK: ACTIVE · LINE VELOCITY: 2.4 m/s' },
    { id: 4, title: 'SHOT 04 — CEO COMMAND CENTER', subtitle: '01 — CEO LEADING THE WORKFORCE', desc: '01 (CEO) stands inside executive glass command suite monitoring live holographic screens: Production 94%, Quality 98%, Safety 100%, Energy 87%, Orders 1,248.', image: '/assets/film_scene_ceo_command.jpg', quote: '"Factory operations online. Begin today\'s production cycle."', hudText: '01 (CEO) · EXECUTIVE DIRECTIVE ISSUED' },
    { id: 5, title: 'SHOT 05 — 25-ROBOT ORGANIZATIONAL OVERVIEW', subtitle: 'MANAGEMENT TEAM SYNCHRONIZATION (01–05)', desc: '01 (CEO), 02 (GM), 03 (HR), 04 (Finance), and 05 (Prod Mgr) synchronized around glowing holographic organizational table.', image: '/assets/robocorp_shot05_management.jpg', hudText: 'MANAGEMENT TEAM: 01 (CEO) → 02 (GM) → 03/04/05 DEPT MANAGERS' },
    { id: 6, title: 'SHOT 06 — PRODUCTION ROBOTS WORKING', subtitle: 'ROBOTS 06–10 EXECUTING SYNCHRONIZED MANUFACTURING', desc: '06 Assembly, 07 Welding, 08 Component Installation, 09 Machining, and 10 Packaging robots executing high-speed arc laser welding with orange sparks.', image: '/assets/robocorp_r07_welding.jpg', hudText: 'PRODUCTION CELL (06–10): SYNCHRONIZED ARC WELDING & ASSEMBLY' },
    { id: 7, title: 'SHOT 07 — AI COMPUTER VISION INSPECTION', subtitle: 'ROBOTS 11–13 SCANNING AT 1,000 FPS', desc: '12 CV Inspector & 13 Dimensional Inspection scan component #A2048. Display: PRODUCT #A2048 — PASS — 99.2% CONFIDENCE.', image: '/assets/dashboard_quality_vision.jpg', hudText: 'QUALITY QA (11–13): PRODUCT #A2048 PASS (99.2% CONFIDENCE)' },
    { id: 8, title: 'SHOT 08 — MAINTENANCE ROBOTS', subtitle: 'ROBOTS 14–16 PREDICTIVE SERVICING', desc: '14 Maint Mgr predicts "Maintenance required in 37 minutes". 15 & 16 service harmonic drives autonomously with zero downtime.', image: '/assets/dashboard_6dof_path_planner.jpg', hudText: 'PREDICTIVE MAINTENANCE (14–16): ZERO DOWNTIME SERVICING' },
    { id: 9, title: 'SHOT 09 — AMR LOGISTICS', subtitle: 'ROBOTS 20–21 NAVIGATING WITH LIDAR & A*', desc: '20 Logistics AMR & 21 Transport AMR navigate aisles using 360° LiDAR SLAM. Detecting obstacle, they execute A* re-routing.', image: '/assets/dashboard_amr_obstacle_replanning.jpg', hudText: 'AMR FLEET (20–21): LIDAR SLAM · DYNAMIC OBSTACLE BYPASS' },
    { id: 10, title: 'SHOT 10 — WAREHOUSE OPERATIONS', subtitle: 'ROBOTS 22–23 AUTOMATED HIGH-BAY RACKS', desc: '22 Inventory Mgr tracks RFID stock while 23 Warehouse Robot retrieves palletized inventory with millimeter precision.', image: '/assets/dashboard_amr_waypoint_planner.jpg', hudText: 'AUTOMATED WAREHOUSE (22–23): RFID STOCK TRACKING' },
    { id: 11, title: 'SHOT 11 — SAFETY MONITORING', subtitle: 'ROBOT 19 — SAFETY OFFICER INTERVENTION', desc: '19 Safety Officer detects proximity hazard in restricted cell. Warning: "PROXIMITY HAZARD DETECTED" -> E-Stop -> "SAFETY RESTORED".', image: '/assets/robocorp_r19_safety.jpg', hudText: '19 SAFETY OFFICER: ISO/TS 15066 SAFETY RESTORED' },
    { id: 12, title: 'SHOT 12 — DIGITAL TWIN SIMULATION', subtitle: 'ROBOT 24 — R&D / DIGITAL TWIN EXPERIMENTATION', desc: '24 R&D Robot interacts with 3D digital twin hologram. Output: "OPTIMIZATION: +18% THROUGHPUT" deployed to production floor.', image: '/assets/film_scene_digital_twin.jpg', hudText: '24 R&D DIGITAL TWIN: +18% THROUGHPUT OPTIMIZATION' },
    { id: 13, title: 'SHOT 13 — CUSTOMER ORDER PROCESSING', subtitle: 'ROBOT 25 (CUSTOMER OPS) + 17 & 18 (ENGINEERING)', desc: '25 receives customer build request #8492, dispatching job queues to 17 (AI Eng) and 18 (CV Eng) for ROS 2 neural optimization.', image: '/assets/robocorp_shot05_management.jpg', hudText: '25 CUSTOMER OPS: DISPATCHING BUILD REQUEST #8492' },
    { id: 14, title: 'SHOT 14 — ALL 25 ROBOTS WORKING TOGETHER', subtitle: '25 ROBOTS SYNCHRONIZED ENTERPRISE', desc: 'Overhead camera view showing all 25 primary robots operating across Executive, Production, QA, Maintenance, Logistics, and R&D.', image: '/assets/film_scene_factory_establishing.jpg', hudText: '25 ROBOTS · 25 ROLES · 100% COLLABORATIVE EFFICIENCY' },
    { id: 15, title: 'SHOT 15 — FINAL CINEMATIC FACTORY SHOT', subtitle: 'ROBOCORP 25 — THE FUTURE OF MANUFACTURING IS AUTONOMOUS', desc: 'Camera slowly pulls back revealing facility illuminated at night. Displays: "25 ROBOTS" · "25 ROLES" · "ONE INTELLIGENT MANUFACTURING COMPANY" · "ROBOCORP 25".', image: '/assets/robocorp_shot01_exterior.jpg', quote: '"ROBOCORP 25 — THE FUTURE OF MANUFACTURING IS AUTONOMOUS."', hudText: 'ROBOCORP 25 · AUTONOMOUS MANUFACTURING ENTERPRISE' }
  ]

  // Playback timer loop
  useEffect(() => {
    let interval = null
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentShot((shot) => (shot >= 15 ? 1 : shot + 1))
            return 0
          }
          return prev + 2.5
        })
      }, 150)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const activeShotData = shots.find((s) => s.id === currentShot)

  const filteredRoster = filterCategory === 'All'
    ? robocorp25Roster
    : robocorp25Roster.filter(r => r.dept.toLowerCase().includes(filterCategory.toLowerCase()))

  return (
    <section id="workforce-film" className="py-20 relative bg-[#050811] text-slate-100 cyber-grid overflow-hidden border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Title Banner matching reference header */}
        <div className="text-center max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 via-amber-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>AI | ROBOTICS | AUTOMATION · ROBOCORP 25</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-wider uppercase">
            ROBOCORP 25
          </h2>
          <p className="text-base sm:text-xl font-bold text-cyan-400 tracking-wide font-mono">
            25 ROBOTS. 25 ROLES. ONE INTELLIGENT MANUFACTURING COMPANY.
          </p>
          <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">
            AUTOMATE TODAY · A SMARTER TOMORROW
          </p>
        </div>

        {/* 25 ROBOT 1-BY-1 SELECTOR GRID matching user reference image */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>PICK EACH ROBOT 1-BY-1 (01 TO 25)</span>
              </span>
              <h3 className="text-xl font-extrabold text-white mt-1">25-Robot Role Directory</h3>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 text-xs font-mono">
              {['All', 'Executive', 'Production', 'Quality', 'Maintenance', 'Logistics'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    filterCategory === cat
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 5x5 Robot Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
            {filteredRoster.map((robot) => (
              <div
                key={robot.id}
                onClick={() => {
                  setSelectedRobot(robot)
                  setShowInspectorModal(true)
                }}
                className={`rounded-xl overflow-hidden glass-panel border transition-all duration-300 flex flex-col cursor-pointer group hover:scale-[1.03] ${
                  selectedRobot.id === robot.id
                    ? 'border-cyan-400 shadow-lg shadow-cyan-500/25 ring-1 ring-cyan-400/40'
                    : 'border-slate-800/90 hover:border-cyan-500/40'
                }`}
              >
                {/* Top Badge Overlay matching reference image */}
                <div className="bg-slate-950 px-3 py-1.5 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="font-extrabold text-cyan-400 text-sm">{robot.id}</span>
                  <span className="font-bold text-white text-[11px] truncate max-w-[110px]">{robot.title}</span>
                </div>

                {/* Robot Image Frame */}
                <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                  <img
                    src={robot.image}
                    alt={robot.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-cyan-300">
                    <span className="px-1.5 py-0.5 rounded bg-slate-950/80 backdrop-blur border border-cyan-500/30 truncate max-w-[120px]">
                      {robot.role}
                    </span>
                    <Crosshair className="w-3 h-3 text-cyan-400 shrink-0" />
                  </div>
                </div>

                {/* Subtitle Badge */}
                <div className="p-2.5 bg-[#060a14] border-t border-slate-900 text-center">
                  <span className="text-[10px] text-slate-300 font-mono block truncate">
                    {robot.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 15-Shot Cinematic Video Player */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs">
            <span className="text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-2">
              <Radio className="w-4 h-4" />
              <span>15-SHOT CINEMATIC STORYBOARD PLAYER</span>
            </span>
            <span className="text-slate-400">SHOT {currentShot} OF 15</span>
          </div>

          <div className="relative rounded-3xl overflow-hidden glass-panel border border-cyan-500/40 shadow-2xl bg-slate-950">
            <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-slate-950/90 to-transparent flex items-center justify-between font-mono text-xs border-b border-slate-800/40">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>ROBOCORP 25 · 4K CINEMATIC FEED</span>
                </div>
                <span className="hidden sm:inline text-slate-400">SHOT {currentShot} OF 15</span>
              </div>

              <div className="flex items-center gap-4 text-slate-300">
                <span className="hidden md:inline text-cyan-400">{activeShotData.hudText}</span>
                <div className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[10px] text-slate-400">SILENT CINEMATIC MODE</span>
                </div>
              </div>
            </div>

            <div className="relative aspect-[16/9] min-h-[400px] sm:min-h-[500px] overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={activeShotData.image}
                alt={activeShotData.title}
                className="w-full h-full object-cover opacity-85 transition-all duration-700 transform scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-slate-950/40 to-slate-950/60" />

              <div className="absolute inset-0 p-6 sm:p-12 flex flex-col justify-between z-10">
                <div className="mt-12 flex justify-between items-start">
                  <div className="bg-slate-950/85 backdrop-blur-md p-4 rounded-2xl border border-cyan-500/30 max-w-md space-y-1">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                      {activeShotData.title}
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white">
                      {activeShotData.subtitle}
                    </h3>
                  </div>

                  {currentShot === 15 && (
                    <div className="bg-slate-950/90 backdrop-blur-xl p-6 rounded-2xl border border-cyan-500/50 text-center space-y-2 shadow-2xl animate-fade-in max-w-md">
                      <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">ROBOCORP 25</span>
                      <div className="text-2xl font-extrabold text-white">25 ROBOTS</div>
                      <div className="text-xl font-extrabold text-cyan-300">25 ROLES</div>
                      <div className="text-sm font-semibold text-slate-300">ONE INTELLIGENT MANUFACTURING COMPANY</div>
                      <div className="pt-2 border-t border-slate-800 text-xs text-amber-400 font-bold">THE FUTURE OF MANUFACTURING IS AUTONOMOUS</div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {activeShotData.quote && (
                    <div className="p-3.5 rounded-xl bg-cyan-950/80 border border-cyan-500/50 max-w-xl text-cyan-200 text-xs sm:text-sm font-semibold italic">
                      {activeShotData.quote}
                    </div>
                  )}
                  <div className="p-4 sm:p-6 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800/90 max-w-3xl space-y-2">
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {activeShotData.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 bg-[#070c18] border-t border-slate-800 space-y-4">
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 via-amber-500 to-blue-500 h-full transition-all duration-150"
                  style={{ width: `${((currentShot - 1) * 6.66) + (progress / 15)}%` }}
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2 text-xs"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
                    <span>{isPlaying ? 'Pause Storyboard' : 'Play Storyboard'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentShot(1)
                      setProgress(0)
                    }}
                    className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Restart Shot 01</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
                  {shots.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setCurrentShot(s.id)
                        setProgress(0)
                      }}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono transition-all shrink-0 ${
                        currentShot === s.id
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      Shot {s.id < 10 ? `0${s.id}` : s.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1-BY-1 ROBOT INSPECTOR MODAL */}
      {showInspectorModal && selectedRobot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl glass-panel-glow border border-cyan-500/50 p-6 sm:p-8 shadow-2xl space-y-6 text-slate-100 flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-extrabold text-cyan-400 font-mono">{selectedRobot.id}</span>
                <div>
                  <h3 className="text-xl font-extrabold text-white">{selectedRobot.title}</h3>
                  <span className="text-xs font-mono text-cyan-300">{selectedRobot.role} · {selectedRobot.dept}</span>
                </div>
              </div>
              <button
                onClick={() => setShowInspectorModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono"
              >
                Close
              </button>
            </div>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-950 border border-cyan-500/30 relative">
              <img src={selectedRobot.image} alt={selectedRobot.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur px-3 py-1 rounded-lg border border-cyan-500/40 text-xs font-mono text-cyan-300">
                Badge: {selectedRobot.badge}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
              <p className="text-slate-300 font-sans text-xs leading-relaxed">{selectedRobot.desc}</p>
              <div className="pt-2 border-t border-slate-900 flex justify-between text-slate-400">
                <span>Station: {selectedRobot.station}</span>
                <span className="text-emerald-400 font-bold">Status: {selectedRobot.status}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const currIdx = robocorp25Roster.findIndex(r => r.id === selectedRobot.id)
                    const prevIdx = currIdx > 0 ? currIdx - 1 : robocorp25Roster.length - 1
                    setSelectedRobot(robocorp25Roster[prevIdx])
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono"
                >
                  &larr; Prev Robot
                </button>
                <button
                  onClick={() => {
                    const currIdx = robocorp25Roster.findIndex(r => r.id === selectedRobot.id)
                    const nextIdx = currIdx < robocorp25Roster.length - 1 ? currIdx + 1 : 0
                    setSelectedRobot(robocorp25Roster[nextIdx])
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono"
                >
                  Next Robot &rarr;
                </button>
              </div>

              <button
                onClick={() => setShowInspectorModal(false)}
                className="px-5 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs"
              >
                Close Inspector View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
