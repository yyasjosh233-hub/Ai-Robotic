import React, { useState, useEffect } from 'react';
import { Eye, Camera, Box, Layers, Cpu, RefreshCw, Play, ShieldAlert, Sparkles } from 'lucide-react';

export default function ComputerVisionPage() {
  const [activeStreamMode, setActiveStreamMode] = useState('RGB_YOLO'); // 'RGB_YOLO' | 'DEPTH_HEATMAP' | 'STEREO_CLOUD' | 'THERMAL_IR'
  const [scanlineY, setScanlineY] = useState(0);

  // Animated Scanline for Perception Engine
  useEffect(() => {
    const interval = setInterval(() => {
      setScanlineY(prev => (prev >= 240 ? 0 : prev + 4));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const detections = [
    { id: "OBJ-101", class: "industrial_component_red", bbox: "[2.4, 1.1, 0.85]", conf: 0.94, status: "INSPECTING" },
    { id: "OBJ-102", class: "rejection_bin", bbox: "[3.8, -0.5, 0.40]", conf: 0.98, status: "AVAILABLE" },
    { id: "OBJ-103", class: "conveyor_belt", bbox: "[2.0, 1.0, 0.80]", conf: 0.99, status: "STATIONARY" }
  ];

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center space-x-4">
          <Eye className="w-8 h-8 text-purple-400" />
          <div>
            <h1 className="text-xl font-black text-slate-100 tracking-wider uppercase">COMPUTER VISION & 3D PERCEPTION ENGINE</h1>
            <p className="text-xs text-slate-400">Real-Time YOLOv8 Object Detection, Spatial 3D Bounding Boxes, & Stereo Depth Sensing</p>
          </div>
        </div>

        {/* Stream Mode Switcher */}
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          {[
            { id: 'RGB_YOLO', label: 'RGB YOLOv8' },
            { id: 'DEPTH_HEATMAP', label: 'Depth Sensing' },
            { id: 'STEREO_CLOUD', label: 'Stereo Cloud' },
            { id: 'THERMAL_IR', label: 'IR Thermal' }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveStreamMode(mode.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                activeStreamMode === mode.id
                  ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-900/40'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Animated Perception Stream Canvas */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-xl space-y-3 h-80 relative overflow-hidden">
          <div className="flex justify-between items-center text-xs font-mono text-purple-400">
            <span className="font-bold flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
              <span>LIVE SENSOR FEED [{activeStreamMode}]</span>
            </span>
            <span>30 FPS | 1920x1080 | TENSOR RT INT8</span>
          </div>

          <div className="w-full h-64 bg-slate-900 rounded-lg border border-slate-800 relative overflow-hidden flex items-center justify-center">
            {/* Animated Scanline Laser */}
            <div
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80 shadow-lg shadow-cyan-400"
              style={{ top: `${scanlineY}px` }}
            />

            {/* Render Mode Visualizer */}
            {activeStreamMode === 'RGB_YOLO' && (
              <div className="relative w-full h-full p-6 flex flex-col justify-between">
                <div className="border-2 border-purple-500/80 rounded-lg p-3 w-56 h-36 bg-purple-950/20 border-dashed absolute top-12 left-1/4 shadow-lg shadow-purple-900/30">
                  <span className="text-[10px] font-mono font-bold text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                    industrial_component_red [0.94]
                  </span>
                  <div className="mt-2 text-[9px] font-mono text-cyan-300 space-y-0.5">
                    <div>3D BBOX: [2.4, 1.1, 0.85]</div>
                    <div>VOLUME: 0.048 m³</div>
                  </div>
                </div>
              </div>
            )}

            {activeStreamMode === 'DEPTH_HEATMAP' && (
              <div className="w-full h-full bg-gradient-to-tr from-blue-950 via-cyan-900 to-emerald-950 p-6 flex items-center justify-center">
                <div className="text-center font-mono text-cyan-200 space-y-2">
                  <Layers className="w-8 h-8 text-cyan-400 mx-auto animate-bounce" />
                  <span className="text-xs font-bold block">STEREO REALSENSE DEPTH SENSING</span>
                  <span className="text-[10px] text-cyan-400">DEPTH RESOLUTION: 1280x720 @ 60Hz</span>
                </div>
              </div>
            )}

            {activeStreamMode === 'STEREO_CLOUD' && (
              <div className="w-full h-full bg-slate-950 p-6 flex items-center justify-center relative">
                <div className="text-center font-mono text-emerald-400 space-y-2">
                  <Cpu className="w-8 h-8 text-emerald-400 mx-auto animate-pulse" />
                  <span className="text-xs font-bold block">3D POINT CLOUD RAYS (300k POINTS)</span>
                  <span className="text-[10px] text-emerald-300">VOXEL GRID DOWNSAMPLED 0.02m</span>
                </div>
              </div>
            )}

            {activeStreamMode === 'THERMAL_IR' && (
              <div className="w-full h-full bg-gradient-to-r from-purple-950 via-amber-900 to-red-950 p-6 flex items-center justify-center">
                <div className="text-center font-mono text-amber-300 space-y-2">
                  <Sparkles className="w-8 h-8 text-amber-400 mx-auto animate-pulse" />
                  <span className="text-xs font-bold block">INFRARED THERMAL SENSING (FLIR)</span>
                  <span className="text-[10px] text-amber-400">COMPONENT TEMP: 34.2°C (NORMAL)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Spatial 3D Perception Parameters */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2">3D SPATIAL PERCEPTION MATRIX</h2>

          <div className="space-y-3 font-mono text-xs">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between">
              <span className="text-slate-400">CAMERA INTRINSICS MATRIX:</span>
              <strong className="text-purple-400">fx: 615.2, fy: 615.8, cx: 320.0</strong>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between">
              <span className="text-slate-400">EXTRINSICTRANSFORM:</span>
              <strong className="text-cyan-400">CAM_TO_AMR [R|T] SYNCED</strong>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between">
              <span className="text-slate-400">YOLO INFERENCE LATENCY:</span>
              <strong className="text-emerald-400">4.12 ms (TensorRT INT8)</strong>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between">
              <span className="text-slate-400">3D BOUNDING BOX ESTIMATION:</span>
              <strong className="text-amber-400">3D ORIENTED (LWH + ROTATION)</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Detections Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2">SPATIAL 3D BOUNDING BOX DETECTIONS</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950 font-mono">
                <th className="p-3">OBJECT ID</th>
                <th className="p-3">CLASS NAME</th>
                <th className="p-3">3D SPATIAL BOUNDING BOX [X, Y, Z]</th>
                <th className="p-3">CONFIDENCE</th>
                <th className="p-3">PERCEPTION STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
              {detections.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40">
                  <td className="p-3 text-purple-400 font-bold">{row.id}</td>
                  <td className="p-3 font-semibold text-slate-100">{row.class}</td>
                  <td className="p-3 text-cyan-300">{row.bbox}</td>
                  <td className="p-3 text-emerald-400 font-bold">{(row.conf * 100).toFixed(0)}%</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950 text-indigo-400 border border-slate-800">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
