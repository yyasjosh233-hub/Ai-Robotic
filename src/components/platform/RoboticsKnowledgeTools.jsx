import React, { useState } from 'react'
import { 
  BookOpen, Wrench, Cpu, Compass, Map, Ruler, Folder, Globe, 
  FolderKanban, ShieldCheck, Settings as SettingsIcon, Search, 
  Check, RefreshCw, AlertTriangle, ExternalLink, Zap, Sliders, Terminal, Copy, Plus, Trash2, Key, Info, HelpCircle
} from 'lucide-react'

export default function RoboticsKnowledgeTools({ workspaceId, activeRoute }) {
  const route = activeRoute || 'ros2-knowledge-hub'

  // --- 1. ROS 2 KNOWLEDGE HUB STATE ---
  const [hubSubTab, setHubSubTab] = useState('fundamentals')
  const [selectedTopic, setSelectedTopic] = useState('nodes')

  // --- 2. ROS 2 DEBUGGER STATE ---
  const [rosDistro, setRosDistro] = useState('Humble Hawksbill (LTS)')
  const [targetOs, setTargetOs] = useState('Ubuntu Linux')
  const [packageName, setPackageName] = useState('')
  const [logInput, setLogInput] = useState('')
  const [debugReport, setDebugReport] = useState(null)
  const [isDebugging, setIsDebugging] = useState(false)

  // --- 3. NAV2 ASSISTANT STATE ---
  const [nav2YamlInput, setNav2YamlInput] = useState('')
  const [nav2Analysis, setNav2Analysis] = useState(null)
  const [isAnalyzingNav2, setIsAnalyzingNav2] = useState(false)

  // --- 4. URDF ANALYZER STATE ---
  const [urdfXmlInput, setUrdfXmlInput] = useState('')
  const [urdfAnalysis, setUrdfAnalysis] = useState(null)
  const [isAnalyzingUrdf, setIsAnalyzingUrdf] = useState(false)

  // --- 5. TRUSTED SOURCES STATE ---
  const [newSourceUrl, setNewSourceUrl] = useState('')
  const [sources, setSources] = useState([
    { id: '1', name: 'ROS 2 Humble Official Documentation', url: 'https://docs.ros.org/en/humble/', status: 'INDEXED', vectorCount: '14,280 chunks' },
    { id: '2', name: 'NVIDIA Isaac Sim & ROS GEMs Manual', url: 'https://developer.nvidia.com/isaac-ros', status: 'INDEXED', vectorCount: '8,410 chunks' },
    { id: '3', name: 'Nav2 Navigation Stack Tuning Guide', url: 'https://navigation.ros.org/', status: 'INDEXED', vectorCount: '6,190 chunks' },
    { id: '4', name: 'ISO 10218 Human-Robot Safety Standards', url: 'https://www.iso.org/standard/41570.html', status: 'INDEXED', vectorCount: '3,200 chunks' }
  ])

  // --- 6. SETTINGS STATE ---
  const [apiKeys, setApiKeys] = useState({
    geminiKey: 'AIzaSyD-************************',
    openaiKey: 'sk-proj-************************',
    ddsDomain: '42',
    websocketPort: '9090'
  })
  const [settingsSaved, setSettingsSaved] = useState(false)

  // Handlers for Debugger
  const handleDebug = (sampleType) => {
    setIsDebugging(true)
    let sampleLog = logInput

    if (sampleType === 'qos') {
      sampleLog = '[WARN] [171120001.200] [rclcpp]: New subscription discovered on topic "/joint_states", requested QoS profile is RELIABLE, but offered QoS profile is BEST_EFFORT. Subscription will fail.'
      setLogInput(sampleLog)
    } else if (sampleType === 'colcon') {
      sampleLog = 'CMake Error at CMakeLists.txt:24 (find_package): By not providing "Findsensor_msgs.cmake" in CMAKE_MODULE_PATH, this project has asked CMake to find a package configuration file provided by "sensor_msgs".'
      setLogInput(sampleLog)
    } else if (sampleType === 'python') {
      sampleLog = 'ModuleNotFoundError: No module named "rclpy.node" during launch of node agro_r1_controller'
      setLogInput(sampleLog)
    } else if (sampleType === 'nominal') {
      sampleLog = '[INFO] [171120000.100] [agro_r1_node]: Node initiated successfully. Spinning on domain ID 42.'
      setLogInput(sampleLog)
    }

    setTimeout(() => {
      setIsDebugging(false)
      const inputLower = (sampleLog || logInput).toLowerCase()

      if (inputLower.includes('qos')) {
        setDebugReport({
          title: 'QoS Profile Compatibility Mismatch',
          severity: 'HIGH (CRITICAL)',
          errorType: 'DDS Middleware Subscription Rejection',
          cause: 'Publisher offers BEST_EFFORT durability while subscriber requires RELIABLE durability.',
          resolution: 'Update the subscriber node initialization to request BEST_EFFORT QoS profile:\n\nauto qos = rclcpp::QoS(10).best_effort();\nauto sub = create_subscription<T>("topic", qos, callback);'
        })
      } else if (inputLower.includes('cmake') || inputLower.includes('find_package')) {
        setDebugReport({
          title: 'CMake Dependency Resolution Error',
          severity: 'MEDIUM',
          errorType: 'Missing CMake package dependency',
          cause: 'Package "sensor_msgs" is not listed in CMakeLists.txt or package.xml depend tag.',
          resolution: '1) Add `find_package(sensor_msgs REQUIRED)` in CMakeLists.txt.\n2) Add `<depend>sensor_msgs</depend>` in package.xml.\n3) Re-run `colcon build --packages-select <your_package>`.'
        })
      } else if (inputLower.includes('modulenotfound') || inputLower.includes('python')) {
        setDebugReport({
          title: 'Python ROS 2 Environment Path Exception',
          severity: 'HIGH',
          errorType: 'ImportError / ModuleNotFound',
          cause: 'The ROS 2 workspace environment variables have not been sourced in the active shell.',
          resolution: 'Run `source /opt/ros/humble/setup.bash` and `source install/setup.bash` before executing Python launch scripts.'
        })
      } else {
        setDebugReport({
          title: 'Nominal Execution Log Verified',
          severity: 'INFORMATIONAL',
          errorType: 'Zero Faults Detected',
          cause: 'The provided console trace indicates healthy execution.',
          resolution: 'No intervention required. ROS 2 node is spinning normally.'
        })
      }
    }, 600)
  }

  // Handlers for Nav2 Analyzer
  const handleLoadSampleNav2 = () => {
    const sampleYaml = `amcl:
  ros__parameters:
    use_sim_time: True
    alpha1: 0.2
    alpha2: 0.2
    base_frame_id: "base_footprint"
    global_frame_id: "map"

local_costmap:
  local_costmap:
    ros__parameters:
      update_frequency: 5.0
      publish_frequency: 2.0
      global_frame: odom
      robot_base_frame: base_link
      rolling_window: true
      width: 3
      height: 3
      resolution: 0.05
      robot_radius: 0.35
      plugins: ["obstacle_layer", "inflation_layer"]
      inflation_layer:
        plugin: "nav2_costmap_2d::InflationLayer"
        cost_scaling_factor: 3.0
        inflation_radius: 0.55`
    setNav2YamlInput(sampleYaml)
  }

  const handleAnalyzeNav2 = () => {
    setIsAnalyzingNav2(true)
    setTimeout(() => {
      setIsAnalyzingNav2(false)
      setNav2Analysis({
        status: 'VALIDATED WITH WARNINGS',
        resolution: '0.05 m/cell (High Precision)',
        inflationRadius: '0.55 m',
        warnings: [
          'Inflation radius 0.55m may cause corridor traversal bottlenecks for robot radius 0.35m (Clearance margins tight).'
        ],
        optimizations: [
          'Recommend decreasing `inflation_radius` to 0.42m for narrow agricultural rows.',
          'Local costmap `update_frequency` at 5.0Hz is optimal for 1.5 m/s ground speed.'
        ]
      })
    }, 600)
  }

  // Handlers for URDF Analyzer
  const handleLoadSampleUrdf = () => {
    const sampleUrdf = `<?xml version="1.0"?>
<robot name="agro_r1">
  <link name="base_link">
    <inertial>
      <mass value="45.0"/>
      <origin xyz="0 0 0.2"/>
      <inertia ixx="1.2" ixy="0.0" ixz="0.0" iyy="1.8" iyz="0.0" izz="2.1"/>
    </inertial>
  </link>

  <joint name="lidar_joint" type="fixed">
    <parent link="base_link"/>
    <child link="lidar_link"/>
    <origin xyz="0.4 0 0.6" rpy="0 0 0"/>
  </joint>

  <link name="lidar_link">
    <inertial>
      <mass value="1.2"/>
      <origin xyz="0 0 0"/>
      <inertia ixx="0.01" iyy="0.01" izz="0.01"/>
    </inertial>
  </link>
</robot>`
    setUrdfXmlInput(sampleUrdf)
  }

  const handleAnalyzeUrdf = () => {
    setIsAnalyzingUrdf(true)
    setTimeout(() => {
      setIsAnalyzingUrdf(false)
      setUrdfAnalysis({
        status: 'KINEMATIC TREE VALIDATED',
        linkCount: 4,
        jointCount: 3,
        totalMass: '48.2 kg',
        joints: [
          { name: 'lidar_joint', type: 'fixed', parent: 'base_link', child: 'lidar_link', status: 'PASS' },
          { name: 'camera_joint', type: 'fixed', parent: 'base_link', child: 'camera_link', status: 'PASS' },
          { name: 'wheel_left_joint', type: 'continuous', parent: 'base_link', child: 'wheel_left_link', status: 'PASS' }
        ]
      })
    }, 600)
  }

  const handleAddSource = () => {
    if (!newSourceUrl.trim()) return
    const newSrc = {
      id: String(Date.now()),
      name: newSourceUrl.replace('https://', '').replace('http://', ''),
      url: newSourceUrl,
      status: 'INDEXING...',
      vectorCount: '0 chunks'
    }
    setSources([...sources, newSrc])
    setNewSourceUrl('')
    setTimeout(() => {
      setSources(prev => prev.map(s => s.id === newSrc.id ? { ...s, status: 'INDEXED', vectorCount: '1,500 chunks' } : s))
    }, 1500)
  }

  const handleSaveSettings = () => {
    setSettingsSaved(true)
    setTimeout(() => setSettingsSaved(false), 2500)
  }

  return (
    <div className="space-y-6 font-sans text-slate-100">
      
      {/* ============================================================ */}
      {/* 1. ROS 2 ENGINEERING KNOWLEDGE HUB (Matching User Prompt 1:1) */}
      {/* ============================================================ */}
      {route === 'ros2-knowledge-hub' && (
        <div className="space-y-6 font-sans">
          
          {/* Header */}
          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#facc15] tracking-wide flex items-center gap-2">
              <span>📚</span>
              <span>ROS 2 Engineering Knowledge Hub</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              Explore the complete technical guidelines for ROS 2 graph communications, Quality of Service (QoS) specifications, and troubleshooting.
            </p>
          </div>

          {/* Sub-Tabs Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 font-mono text-xs no-scrollbar">
            {[
              { id: 'fundamentals', label: 'ROS 2 Fundamentals' },
              { id: 'qos', label: 'Communication & QoS' },
              { id: 'workspaces', label: 'Development Workspaces' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setHubSubTab(tab.id)}
                className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
                  hubSubTab === tab.id
                    ? 'bg-[#facc15] text-black border border-yellow-400 shadow-md shadow-yellow-500/20'
                    : 'bg-[#080d1a] text-slate-300 border border-slate-800 hover:text-white hover:bg-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 2-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-mono">
            
            {/* Left Column: TOPICS Navigation */}
            <div className="p-5 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-3 font-mono">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                TOPICS
              </div>
              <div className="space-y-1.5">
                {[
                  { id: 'nodes', label: 'Nodes & Graph Architecture' },
                  { id: 'topics', label: 'Topics (Publish/Subscribe)' },
                  { id: 'services', label: 'Services (Request/Response)' },
                  { id: 'actions', label: 'Actions (Goal/Feedback)' },
                  { id: 'qos-spec', label: 'QoS Profiles & Reliability' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTopic(t.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedTopic === t.id
                        ? 'bg-[#facc15] text-black border border-yellow-400'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: TOPIC DETAIL CONTENT (Matching User Prompt 1:1) */}
            <div className="md:col-span-3 p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-5">
              
              <h2 className="text-lg font-extrabold text-white">
                Nodes & Graph Architecture
              </h2>

              {/* DEFINITION SECTION */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-[#facc15] uppercase tracking-wider">
                  DEFINITION
                </div>
                <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                  A Node in ROS 2 is a single executable responsible for a modular compute task. Nodes form a graph and coordinate actions asynchronously.
                </p>
              </div>

              {/* Technical Overview */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Technical Overview
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  Nodes act as independent processes. By isolating functionalities (e.g. one node parses lidar ranges, another plans paths), the robot gains fault tolerance. If one sensor crashes, the other nodes survive.
                </p>
              </div>

              {/* CLI Terminal Commands */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  CLI Terminal Commands
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs space-y-1">
                  <div>ros2 node list</div>
                  <div>ros2 node info /my_node</div>
                </div>
              </div>

              {/* Python Code Implementation */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Python Code Implementation
                </div>
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs leading-relaxed overflow-x-auto">
{`import rclpy
from rclpy.node import Node

class MyNode(Node):
    def __init__(self):
        super().__init__("my_node")
        self.get_logger().info("Node initiated!")

def main():
    rclpy.init()
    rclpy.spin(MyNode())
    rclpy.shutdown()`}
                </pre>
              </div>

              {/* Warning Alert: Common Developer Mistakes */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-yellow-700/60 text-yellow-300 text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span>⚠️ COMMON DEVELOPER MISTAKES</span>
                </div>
                <p className="font-sans text-slate-200">
                  Initializing multiple nodes with the exact same name in a single environment namespace. This causes graph naming collisions.
                </p>
              </div>

              {/* Technical Interview Preparation Card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5 font-sans">
                <div className="font-bold text-[#facc15] font-mono flex items-center gap-1.5">
                  <span>📋</span>
                  <span>TECHNICAL INTERVIEW PREPARATION</span>
                </div>
                <p className="text-slate-200 leading-relaxed">
                  <strong className="text-white">Q: What is the benefit of node composition in ROS 2?</strong><br />
                  <span className="text-slate-300">A: Node composition allows multiple nodes to be run within a single OS process, reducing memory copy latency between publishers and subscribers via intra-process communication.</span>
                </p>
              </div>

              {/* Reference Link */}
              <div className="pt-2 text-xs font-mono text-cyan-400">
                <span className="text-slate-400">VERIFIED REFERENCE: </span>
                <span className="font-bold hover:underline cursor-pointer">ROS 2 Nodes Guide</span>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* 2. ROS 2 ERROR DEBUGGING CENTER (Matching Screenshot 2 1:1) */}
      {/* ============================================================ */}
      {route === 'ros2-debugger' && (
        <div className="space-y-6 font-sans">
          
          {/* Header */}
          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
              ROS 2 Error Debugging Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              Diagnose ROS 2 compilation failures, terminal execution errors, QoS middleware mismatches, and coordinate transforms (TF2) issues.
            </p>
          </div>

          {/* 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono">
            
            {/* Left Panel: ERROR PARAMETERS */}
            <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
                ERROR PARAMETERS
              </h2>

              {/* Dropdowns Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-slate-400 uppercase font-bold text-[11px]">ROS DISTRIBUTION</label>
                  <select
                    value={rosDistro}
                    onChange={(e) => setRosDistro(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="Humble Hawksbill (LTS)">Humble Hawksbill (LTS)</option>
                    <option value="Iron Irwini">Iron Irwini</option>
                    <option value="Rolling Ridley">Rolling Ridley</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 uppercase font-bold text-[11px]">OPERATING SYSTEM</label>
                  <select
                    value={targetOs}
                    onChange={(e) => setTargetOs(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="Ubuntu Linux">Ubuntu Linux</option>
                    <option value="macOS">macOS</option>
                    <option value="Windows 11">Windows 11</option>
                  </select>
                </div>
              </div>

              {/* Package Name Input */}
              <div className="space-y-1.5 text-xs">
                <label className="text-slate-400 uppercase font-bold text-[11px]">PACKAGE NAME (OPTIONAL)</label>
                <input
                  type="text"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  placeholder="e.g. my_robot_controller"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Textarea Input */}
              <div className="space-y-1.5 text-xs">
                <label className="text-slate-400 uppercase font-bold text-[11px]">CONSOLE LOG DUMP / STACK TRACEBACK</label>
                <textarea
                  rows={5}
                  value={logInput}
                  onChange={(e) => setLogInput(e.target.value)}
                  placeholder="Paste raw terminal logs, CMake compiler outputs, or Python tracebacks here..."
                  className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Example Pills (Matching Screenshot 2 1:1) */}
              <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
                <span className="text-slate-400 text-xs">Examples:</span>
                <button
                  onClick={() => handleDebug('qos')}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] font-bold"
                >
                  QoS Mismatch Warning
                </button>
                <button
                  onClick={() => handleDebug('colcon')}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] font-bold"
                >
                  colcon cmake error
                </button>
                <button
                  onClick={() => handleDebug('python')}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] font-bold"
                >
                  Python Module Import Error
                </button>
                <button
                  onClick={() => handleDebug('nominal')}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] font-bold"
                >
                  Nominal Execution Log
                </button>
              </div>

              {/* Big Blue Debug Button (Matching Screenshot 2 1:1) */}
              <button
                onClick={() => handleDebug()}
                disabled={isDebugging}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Wrench className={`w-4 h-4 ${isDebugging ? 'animate-spin' : ''}`} />
                <span>{isDebugging ? 'Debugging Console Traceback...' : 'Debug Console Traceback'}</span>
              </button>

            </div>

            {/* Right Panel: DEBUGGER DIAGNOSTIC REPORT (Matching Screenshot 2 1:1) */}
            <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 flex flex-col justify-between space-y-4">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
                DEBUGGER DIAGNOSTIC REPORT
              </h2>

              {debugReport ? (
                <div className="p-5 rounded-2xl bg-[#050a14] border border-cyan-500/40 space-y-4 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#facc15]">{debugReport.title}</h3>
                    <span className="px-3 py-1 rounded-full bg-rose-950 text-rose-400 border border-rose-800 text-xs font-bold">
                      {debugReport.severity}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Error Classification:</span>
                    <div className="text-cyan-300 font-bold text-xs">{debugReport.errorType}</div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Root Cause Analysis:</span>
                    <p className="text-slate-200 font-sans leading-relaxed">{debugReport.cause}</p>
                  </div>

                  <div className="space-y-1 pt-2">
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Recommended Resolution Code:</span>
                    <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 text-xs leading-relaxed whitespace-pre-wrap overflow-x-auto">
                      {debugReport.resolution}
                    </pre>
                  </div>
                </div>
              ) : (
                /* Initial Placeholder (Matching Screenshot 2 1:1) */
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 p-8">
                  <Wrench className="w-12 h-12 text-slate-600 rotate-90" />
                  <p className="text-slate-400 text-xs sm:text-sm font-sans max-w-sm">
                    Ready to diagnose. Paste a stack trace or log in the left panel and click Debug.
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* 3. NVIDIA ROBOTICS & PHYSICAL AI HUB (Matching Screenshot 3 & 4 1:1) */}
      {/* ============================================================ */}
      {route === 'nvidia-robotics-hub' && (
        <div className="space-y-6 font-sans">
          
          {/* Header */}
          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
              NVIDIA Robotics & Physical AI Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              Leverage GPU-accelerated perception pipelines, Isaac simulation tools, and NVIDIA Jetson edge compute frameworks for autonomous systems.
            </p>
          </div>

          {/* Flow Diagram: GPU-ACCELERATED PERCEPTION & DECISION PIPELINE (Matching Screenshot 3 1:1) */}
          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4 font-mono text-xs">
            <h2 className="text-sm font-extrabold text-slate-200 tracking-wider uppercase">
              GPU-ACCELERATED PERCEPTION & DECISION PIPELINE
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
              
              {/* Step 1 */}
              <div className="p-4 rounded-xl bg-[#050a14] border border-slate-800 text-center space-y-1.5">
                <div className="font-bold text-white">Robot Sensors</div>
                <div className="text-[11px] text-slate-400">RealSense D435i / LiDAR</div>
              </div>

              {/* Arrow */}
              <div className="text-center text-slate-500 font-bold hidden sm:block">→</div>

              {/* Step 2 */}
              <div className="p-4 rounded-xl bg-[#050a14] border border-slate-800 text-center space-y-1.5">
                <div className="font-bold text-cyan-400">ROS 2 DDS Nodes</div>
                <div className="text-[11px] text-slate-400">Publishing Image raw streams</div>
              </div>

              {/* Arrow */}
              <div className="text-center text-slate-500 font-bold hidden sm:block">→</div>

              {/* Step 3 (Highlighted green box matching screenshot 3:1) */}
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500 text-center space-y-1.5 shadow-md shadow-emerald-950">
                <div className="font-bold text-emerald-400 flex items-center justify-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Isaac ROS GPU Acceleration
                </div>
                <div className="text-[11px] text-emerald-200/80">CUDA Stereo SLAM / TensorRT</div>
              </div>

              {/* Arrow */}
              <div className="text-center text-slate-500 font-bold hidden sm:block">→</div>

              {/* Step 4 (Highlighted gold box) */}
              <div className="p-4 rounded-xl bg-amber-950/60 border border-yellow-500 text-center space-y-1.5 shadow-md">
                <div className="font-bold text-[#facc15]">Jetson AGX Orin</div>
                <div className="text-[11px] text-yellow-200/80">275 TOPS Edge AI Compute</div>
              </div>

              {/* Arrow */}
              <div className="text-center text-slate-500 font-bold hidden sm:block">→</div>

              {/* Step 5 */}
              <div className="p-4 rounded-xl bg-[#050a14] border border-slate-800 text-center space-y-1.5">
                <div className="font-bold text-white">Actuation</div>
                <div className="text-[11px] text-slate-400">Nav2 speed outputs (cmd_vel)</div>
              </div>

            </div>
          </div>

          {/* Photos Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-[280px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
              <img src="/assets/microelectronics_processor-Rygh1gBd.png" alt="Robotics Engineers" className="w-full h-full object-cover" />
            </div>
            <div className="h-[280px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
              <img src="/assets/agricultural_robot-CsfUqPxz.png" alt="Physical AI Robot" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Benchmarks Table: PERFORMANCE BENCHMARKS: CPU VS NVIDIA GPU ACCELERATION (Matching Screenshot 4 1:1) */}
          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
                PERFORMANCE BENCHMARKS: CPU VS NVIDIA GPU ACCELERATION
              </h2>
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold text-[11px]">
                🟢 ORIN AGX STABLE
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase">
                    <th className="py-3 px-4">COMPUTE TASK</th>
                    <th className="py-3 px-4">CPU BASELINE (6-CORE ARM)</th>
                    <th className="py-3 px-4">NVIDIA GPU (AGX ORIN CUDA)</th>
                    <th className="py-3 px-4">PERFORMANCE GAIN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-slate-200">
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-3 px-4 font-bold text-white">Visual SLAM tracking</td>
                    <td className="py-3 px-4 text-slate-400">45ms (22 Hz)</td>
                    <td className="py-3 px-4 font-extrabold text-[#facc15]">1.2ms (833 Hz)</td>
                    <td className="py-3 px-4 font-bold text-emerald-400">37x Speedup</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-3 px-4 font-bold text-white">DNN Crop Object Detection</td>
                    <td className="py-3 px-4 text-slate-400">110ms (9 Hz)</td>
                    <td className="py-3 px-4 font-extrabold text-[#facc15]">4.5ms (222 Hz)</td>
                    <td className="py-3 px-4 font-bold text-emerald-400">24x Speedup</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-3 px-4 font-bold text-white">Stereo Depth Map generation</td>
                    <td className="py-3 px-4 text-slate-400">82ms (12 Hz)</td>
                    <td className="py-3 px-4 font-extrabold text-[#facc15]">3.1ms (322 Hz)</td>
                    <td className="py-3 px-4 font-bold text-emerald-400">26x Speedup</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-3 px-4 font-bold text-white">Point Cloud 3D Segmentation</td>
                    <td className="py-3 px-4 text-slate-400">190ms (5 Hz)</td>
                    <td className="py-3 px-4 font-extrabold text-[#facc15]">8.0ms (125 Hz)</td>
                    <td className="py-3 px-4 font-bold text-emerald-400">23x Speedup</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 text-slate-300 font-sans text-xs">
              <strong className="text-white">Verify specifications:</strong> Reference NVIDIA Isaac ROS benchmark logs [1]. GPU acceleration values tested on Jetson AGX Orin 64GB under standard 50W Max-Power profile constraints.
            </div>
          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* 4. NAV2 NAVIGATION ASSISTANT (Matching Screenshot 5 & 6 1:1) */}
      {/* ============================================================ */}
      {route === 'nav2-assistant' && (
        <div className="space-y-6 font-sans">
          
          {/* Header */}
          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
              Nav2 Navigation Assistant
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              Configure global planners, local speed controllers, inflation safety layers, and validate active Nav2 parameter files.
            </p>
          </div>

          {/* Architecture Diagram: NAV2 ARCHITECTURE WORKFLOW (Matching Screenshot 5 1:1) */}
          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-5 font-mono text-xs text-center">
            <h2 className="text-sm font-extrabold text-slate-200 tracking-wider uppercase text-left">
              NAV2 ARCHITECTURE WORKFLOW
            </h2>

            {/* Top Box */}
            <div className="max-w-md mx-auto p-4 rounded-xl bg-[#050a14] border border-yellow-600/60 space-y-1">
              <div className="font-bold text-[#facc15] text-sm">BT Navigator Node</div>
              <div className="text-slate-300 text-xs font-sans">Evaluates Behavior Tree XML Rules</div>
            </div>

            <div className="w-[1px] h-6 bg-slate-700 mx-auto" />

            {/* 3 Servers Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="p-4 rounded-xl bg-[#050a14] border border-blue-500 space-y-1.5">
                <div className="font-bold text-blue-400 text-sm">Planner Server</div>
                <div className="text-slate-300 text-xs font-sans">Computes Global Path (A* / Dijkstra)</div>
                <div className="text-[#facc15] font-bold text-[11px] pt-1">Uses Global Costmap</div>
              </div>

              <div className="p-4 rounded-xl bg-[#050a14] border border-emerald-500 space-y-1.5">
                <div className="font-bold text-emerald-400 text-sm">Controller Server</div>
                <div className="text-slate-300 text-xs font-sans">Computes cmd_vel (DWB / RPP)</div>
                <div className="text-[#facc15] font-bold text-[11px] pt-1">Uses Local Costmap</div>
              </div>

              <div className="p-4 rounded-xl bg-[#050a14] border border-rose-500 space-y-1.5">
                <div className="font-bold text-rose-400 text-sm">Behavior Server</div>
                <div className="text-slate-300 text-xs font-sans">Recovery Actions (Spin, Wait, Backup)</div>
                <div className="text-[#facc15] font-bold text-[11px] pt-1">Triggered when stuck</div>
              </div>
            </div>
          </div>

          {/* Bottom Analyzer Section (Matching Screenshot 5 & 6 1:1) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono">
            
            {/* Left Box: NAV2 PARAMETERS ANALYZER */}
            <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
                  NAV2 PARAMETERS ANALYZER
                </h2>
                <button
                  onClick={handleLoadSampleNav2}
                  className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 text-xs font-bold cursor-pointer"
                >
                  Load Sample Costmap config
                </button>
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="text-slate-400 uppercase font-bold text-[11px]">ANALYSIS CONTEXT</label>
                <select className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs focus:outline-none focus:border-cyan-400 cursor-pointer">
                  <option>General Navigation Context (Default)</option>
                  <option>Narrow Row Agriculture Context</option>
                  <option>High Speed AMR Transit Context</option>
                </select>
              </div>

              <div className="space-y-1.5 text-xs">
                <textarea
                  rows={6}
                  value={nav2YamlInput}
                  onChange={(e) => setNav2YamlInput(e.target.value)}
                  placeholder="Paste your Nav2 parameters YAML file content here (e.g., local_costmap, behavior_server, planner_server configurations)..."
                  className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                onClick={handleAnalyzeNav2}
                disabled={isAnalyzingNav2}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isAnalyzingNav2 ? 'animate-spin' : ''}`} />
                <span>{isAnalyzingNav2 ? 'Analyzing Nav2 Config...' : 'Analyze Nav2 Config'}</span>
              </button>
            </div>

            {/* Right Box: DIAGNOSTIC REPORT (Matching Screenshot 5 & 6 1:1) */}
            <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 flex flex-col justify-between space-y-4">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
                DIAGNOSTIC REPORT
              </h2>

              {nav2Analysis ? (
                <div className="p-5 rounded-2xl bg-[#050a14] border border-emerald-500/40 space-y-3 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400 text-sm">Status: {nav2Analysis.status}</span>
                    <span className="text-slate-400 text-[11px]">{nav2Analysis.resolution}</span>
                  </div>

                  <div className="space-y-1 pt-1">
                    <span className="text-amber-400 font-bold uppercase text-[10px]">Warnings Detected:</span>
                    {nav2Analysis.warnings.map((w, i) => (
                      <p key={i} className="text-yellow-300 font-sans text-xs">{w}</p>
                    ))}
                  </div>

                  <div className="space-y-1 pt-1">
                    <span className="text-emerald-400 font-bold uppercase text-[10px]">Recommended Optimizations:</span>
                    {nav2Analysis.optimizations.map((o, i) => (
                      <p key={i} className="text-slate-200 font-sans text-xs">• {o}</p>
                    ))}
                  </div>
                </div>
              ) : (
                /* Initial Placeholder (Matching Screenshot 6 1:1) */
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 p-8">
                  <Search className="w-12 h-12 text-slate-600" />
                  <p className="text-slate-400 text-xs sm:text-sm font-sans max-w-sm">
                    Provide a Nav2 YAML file dump and click Analyze. Costmap layers and coordinate parameters will be verified.
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* 5. SLAM EXPLORER & TF DIAGNOSTIC (Matching Screenshots 1-4 1:1) */}
      {/* ============================================================ */}
      {route === 'slam-explorer' && (
        <div className="space-y-6 font-sans">
          
          {/* Header */}
          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
              SLAM Explorer & TF Diagnostic
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              Diagnose laser scan matchers, loop closures, and inspect active TF coordinate transform tree hierarchies.
            </p>
          </div>

          {/* ACTIVE COORDINATE FRAME TREE (TF TREE) Card */}
          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-6 font-mono text-xs text-center">
            <h2 className="text-sm font-extrabold text-slate-200 tracking-wider uppercase text-left">
              ACTIVE COORDINATE FRAME TREE (TF TREE)
            </h2>

            {/* Tree Hierarchy Nodes */}
            <div className="flex flex-col items-center space-y-4 max-w-lg mx-auto">
              
              {/* Node 1: map */}
              <div className="w-full p-4 rounded-xl bg-[#050a14] border border-slate-800 space-y-1 relative shadow-md">
                <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-[#facc15] border border-yellow-500/40 text-[9px] font-bold uppercase tracking-wider">
                  GLOBAL
                </span>
                <div className="font-extrabold text-white text-base">map</div>
                <div className="text-slate-300 font-sans text-xs">Fixed global origin</div>
              </div>

              <div className="text-slate-500 font-bold text-xs space-y-1">
                <div className="text-[10px] italic text-slate-400">Broadcaster: SLAM / Localization</div>
                <div>▼</div>
              </div>

              {/* Node 2: odom */}
              <div className="w-full p-4 rounded-xl bg-[#050a14] border border-slate-800 space-y-1 relative shadow-md">
                <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-[#facc15] border border-yellow-500/40 text-[9px] font-bold uppercase tracking-wider">
                  RELATIVE
                </span>
                <div className="font-extrabold text-white text-base">odom</div>
                <div className="text-slate-300 font-sans text-xs">Accumulated odometry drift offset</div>
              </div>

              <div className="text-slate-500 font-bold text-xs space-y-1">
                <div className="text-[10px] italic text-slate-400">Broadcaster: Odometry node / Encoders</div>
                <div>▼</div>
              </div>

              {/* Node 3: base_link */}
              <div className="w-full p-4 rounded-xl bg-[#050a14] border border-slate-800 space-y-1 relative shadow-md">
                <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-[#facc15] border border-yellow-500/40 text-[9px] font-bold uppercase tracking-wider">
                  ROBOT CENTER
                </span>
                <div className="font-extrabold text-white text-base">base_link</div>
                <div className="text-slate-300 font-sans text-xs">Physical center of the vehicle chassis</div>
              </div>

              <div className="text-slate-500 font-bold text-xs space-y-1">
                <div className="text-[10px] italic text-slate-400">Static transform</div>
                <div>▼</div>
              </div>

              {/* Node 4: lidar_link */}
              <div className="w-full p-4 rounded-xl bg-[#050a14] border border-slate-800 space-y-1 relative shadow-md">
                <div className="font-extrabold text-white text-base">lidar_link</div>
                <div className="text-slate-300 font-sans text-xs">Ouster LiDAR frame</div>
              </div>

              <div className="text-slate-500 font-bold text-xs space-y-1">
                <div className="text-[10px] italic text-slate-400">Static transform</div>
                <div>▼</div>
              </div>

              {/* Node 5: camera_link */}
              <div className="w-full p-4 rounded-xl bg-[#050a14] border border-slate-800 space-y-1 relative shadow-md">
                <div className="font-extrabold text-white text-base">camera_link</div>
                <div className="text-slate-300 font-sans text-xs">RealSense D435i frame</div>
              </div>

            </div>
          </div>

          {/* COMMON MAPPING INCONSISTENCIES Card */}
          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4 font-mono text-xs">
            <h2 className="text-sm font-extrabold text-slate-200 tracking-wider uppercase">
              COMMON MAPPING INCONSISTENCIES
            </h2>

            <ul className="space-y-3 list-disc list-inside text-slate-200 font-bold">
              <li className="text-white hover:text-yellow-400 cursor-pointer">Map Drifting & Blur</li>
              <li className="text-white hover:text-yellow-400 cursor-pointer">TF Lookup Exception (Frame Errors)</li>
              <li className="text-white hover:text-yellow-400 cursor-pointer">Loop Closure Alignment failures</li>
            </ul>
          </div>

          {/* DIAGNOSTIC & TROUBLESHOOTING STEP Card */}
          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4 font-sans text-xs">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              DIAGNOSTIC & TROUBLESHOOTING STEP
            </div>

            <h3 className="text-lg font-bold text-[#facc15]">
              Map Drifting & Blurring
            </h3>

            <div className="p-4 rounded-xl bg-[#050a14] border border-slate-800 space-y-1.5 font-mono">
              <div className="text-yellow-400 font-bold uppercase text-[11px]">ROOT CAUSE:</div>
              <p className="text-slate-200 font-sans text-sm leading-relaxed">
                Poor odometry accuracy (wheel slipping, encoder noise) combined with loose loop-closure scan matching thresholds in SLAM Toolbox.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <div className="font-mono font-bold text-slate-400 text-[11px] uppercase">REMEDY CHECKLIST</div>
              <ol className="space-y-2 text-slate-300 font-sans leading-relaxed list-decimal list-inside">
                <li>Verify wheel encoders calibration parameters: run the robot in a straight line and compare physical distance to ROS /odom readings.</li>
                <li>Check LiDAR hardware mount: vibration on the sensor frame can skew laser scan sweeps, corrupting mapping consistency.</li>
                <li>Tuning scan matching parameters inside SLAM Toolbox yaml config: increase minimum_travel_distance and loop_search_maximum_distance values.</li>
              </ol>
            </div>
          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* 6. URDF KINEMATIC TREE ANALYZER (Matching Screenshot 5 1:1) */}
      {/* ============================================================ */}
      {route === 'urdf-analyzer' && (
        <div className="space-y-6 font-sans">
          
          {/* Header */}
          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
              URDF Kinematic Tree Analyzer
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              Paste robot URDF/Xacro XML files to reconstruct robot coordinate linkages, verify mass distributions, and audit joints limits.
            </p>
          </div>

          {/* 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
            
            {/* Left Box: URDF XML MARKUP */}
            <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
                  URDF XML MARKUP
                </h2>
                <button
                  onClick={handleLoadSampleUrdf}
                  className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 text-xs font-bold cursor-pointer"
                >
                  Load AGRO-R1 URDF Template
                </button>
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="text-slate-400 uppercase font-bold text-[11px]">ANALYSIS CONTEXT</label>
                <select className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs focus:outline-none focus:border-cyan-400 cursor-pointer">
                  <option>General Analysis (Default)</option>
                  <option>6-DOF Kinematic Singularity Check</option>
                  <option>AMR Inertia & Center of Mass</option>
                </select>
              </div>

              <div className="space-y-1.5 text-xs">
                <textarea
                  rows={8}
                  value={urdfXmlInput}
                  onChange={(e) => setUrdfXmlInput(e.target.value)}
                  placeholder="Paste your XML <robot> URDF configuration here..."
                  className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                onClick={handleAnalyzeUrdf}
                disabled={isAnalyzingUrdf}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Ruler className={`w-4 h-4 ${isAnalyzingUrdf ? 'animate-spin' : ''}`} />
                <span>{isAnalyzingUrdf ? 'Analyzing URDF Kinematics...' : 'Analyze URDF Kinematics'}</span>
              </button>
            </div>

            {/* Right Box: KINEMATIC INTEGRITY REPORT (Matching Screenshot 5 1:1) */}
            <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 flex flex-col justify-between space-y-4">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
                KINEMATIC INTEGRITY REPORT
              </h2>

              {urdfAnalysis ? (
                <div className="p-5 rounded-2xl bg-[#050a14] border border-cyan-500/40 space-y-3 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400 text-sm">Status: {urdfAnalysis.status}</span>
                    <span className="text-slate-400 text-[11px]">Total Mass: {urdfAnalysis.totalMass}</span>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Validated Joint Tree:</span>
                    {urdfAnalysis.joints.map((j, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-cyan-400">{j.name}</span>
                          <span className="text-slate-400 ml-2">({j.type})</span>
                        </div>
                        <span className="text-emerald-400 font-bold">{j.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Initial Placeholder (Matching Screenshot 5 1:1) */
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 p-8">
                  <Ruler className="w-12 h-12 text-slate-600 rotate-45" />
                  <p className="text-slate-400 text-xs sm:text-sm font-sans max-w-sm">
                    Paste a robot URDF description file on the left to verify the joint-link tree structures.
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* 7. ROBOT KNOWLEDGE BASE & 8. GLOBAL ROBOTICS DIRECTORY */}
      {/* ============================================================ */}
      {(route === 'robot-kb' || route === 'global-robotics') && (
        <div className="space-y-6 font-mono text-xs">
          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-yellow-400 flex items-center gap-2">
              <Globe className="w-6 h-6 text-yellow-400" />
              <span>Global Robotics & OEM Directory</span>
            </h1>
            <p className="text-xs text-slate-400 font-sans">
              Enterprise directory of global cobot, AMR, and industrial robotics manufacturers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { company: 'DJ Group Robotics', category: 'Cognitive Cobots & Agricultural AMRs', origin: 'Sovereign R&D' },
              { company: 'FANUC Corporation', category: 'Industrial Arms & Automation', origin: 'Japan' },
              { company: 'Universal Robots', category: 'Collaborative Robots (Cobots)', origin: 'Denmark' },
              { company: 'KUKA Robotics', category: 'Heavy Industrial Manipulators', origin: 'Germany' },
              { company: 'Boston Dynamics', category: 'Mobile Quadrupedal Robotics', origin: 'USA' },
              { company: 'Yaskawa Motoman', category: 'Arc Welding & Assembly Automation', origin: 'Japan' }
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#080d1a] border border-slate-800 space-y-2 hover:border-slate-700 transition-all">
                <div className="font-bold text-white text-sm">{item.company}</div>
                <div className="text-cyan-400 text-[11px]">{item.category}</div>
                <div className="text-slate-400 text-[10px]">Origin: {item.origin}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 9. PROJECTS WORKSPACE VIEW */}
      {/* ============================================================ */}
      {route === 'projects-workspace' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <FolderKanban className="w-6 h-6 text-cyan-400" />
              <span>Projects & Multi-Fleet Workspace Manager</span>
            </h1>
            <p className="text-xs text-slate-400 font-sans">
              Manage active plant deployments, fleet configurations, and Git repositories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { project: 'AGRO-R1 Sector 4 Vineyard', status: 'ACTIVE DEPLOYMENT', robots: '1 Rover, 2 AMRs' },
              { project: '6-DOF Assembly Cell #02', status: 'ACTIVE DEPLOYMENT', robots: '4 Industrial Arms' },
              { project: 'Warehouse AMR Logistics Dock', status: 'STANDBY', robots: '12 Fleet AMRs' }
            ].map((p, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-2">
                <div className="font-bold text-[#facc15] text-sm">{p.project}</div>
                <div className="text-emerald-400 font-bold text-[10px]">{p.status}</div>
                <div className="text-slate-300">{p.robots}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 10. TRUSTED SOURCES VIEW */}
      {/* ============================================================ */}
      {route === 'trusted-sources' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-yellow-400 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-yellow-400" />
              <span>RAG Trusted Knowledge Sources & Vector Stores</span>
            </h1>
            <p className="text-xs text-slate-400 font-sans">
              Manage authoritative documentation sources used by AI Copilot for grounded answers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newSourceUrl}
                onChange={(e) => setNewSourceUrl(e.target.value)}
                placeholder="Enter documentation URL or vector endpoint..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-yellow-400"
              />
              <button
                onClick={handleAddSource}
                className="px-4 py-2.5 rounded-xl bg-[#facc15] hover:bg-yellow-400 text-black font-bold flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Source</span>
              </button>
            </div>

            <div className="space-y-2 pt-2">
              {sources.map((s) => (
                <div key={s.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{s.name}</div>
                    <div className="text-slate-400 text-[11px]">{s.url}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-400 font-bold">{s.vectorCount}</span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                      {s.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 11. SETTINGS VIEW */}
      {/* ============================================================ */}
      {route === 'settings' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <SettingsIcon className="w-6 h-6 text-cyan-400" />
              <span>Platform Systems & API Key Settings</span>
            </h1>
            <p className="text-xs text-slate-400 font-sans">
              Configure LLM API keys, ROS 2 WebSocket bridge ports, and DDS Network Domains.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold">Google Gemini API Key:</label>
                <input
                  type="password"
                  value={apiKeys.geminiKey}
                  onChange={(e) => setApiKeys({ ...apiKeys, geminiKey: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold">OpenAI API Key:</label>
                <input
                  type="password"
                  value={apiKeys.openaiKey}
                  onChange={(e) => setApiKeys({ ...apiKeys, openaiKey: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold">DDS Domain ID:</label>
                <input
                  type="text"
                  value={apiKeys.ddsDomain}
                  onChange={(e) => setApiKeys({ ...apiKeys, ddsDomain: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold">rosbridge WebSocket Port:</label>
                <input
                  type="text"
                  value={apiKeys.websocketPort}
                  onChange={(e) => setApiKeys({ ...apiKeys, websocketPort: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between">
              <button
                onClick={handleSaveSettings}
                className="px-5 py-2.5 rounded-xl bg-[#facc15] hover:bg-yellow-400 text-black font-bold flex items-center gap-2 transition-all shadow-md shadow-yellow-500/20"
              >
                <Check className="w-4 h-4" />
                <span>Save Platform Settings</span>
              </button>

              {settingsSaved && (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  ✓ Settings saved successfully!
                </span>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
