import React from 'react';
import { Activity, Radio, Eye, Compass, Cpu, CheckCircle2 } from 'lucide-react';

export default function SensorFusionPage() {
  const sensors = [
    { name: "3D LiDAR SENSOR", rate: "15 Hz", status: "HEALTHY", variance: "0.002 m²", icon: Radio, color: "text-amber-400" },
    { name: "RGB-D STEREO CAMERA", rate: "30 Hz", status: "HEALTHY", variance: "0.005 m²", icon: Eye, color: "text-purple-400" },
    { name: "6-AXIS IMU SENSOR", rate: "100 Hz", status: "HEALTHY", variance: "0.001 rad²", icon: Compass, color: "text-cyan-400" },
    { name: "WHEEL ODOMETRY", rate: "50 Hz", status: "HEALTHY", variance: "0.008 m²", icon: Activity, color: "text-emerald-400" },
  ];

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl flex items-center space-x-4">
        <Activity className="w-8 h-8 text-cyan-400" />
        <div>
          <h1 className="text-xl font-black text-slate-100 tracking-wider uppercase">MULTI-SENSOR FUSION & EKF HEALTH</h1>
          <p className="text-xs text-slate-400">Extended Kalman Filter (EKF) / UKF State Estimation, Sensor Covariance Matrices, & Odometry Health</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sensors.map((s, idx) => {
          const IconComp = s.icon;
          return (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <IconComp className={`w-5 h-5 ${s.color}`} />
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {s.status}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-200 block uppercase">{s.name}</span>
                <span className="text-[10px] text-slate-400">UPDATE RATE: {s.rate}</span>
              </div>
              <div className="bg-slate-950 p-2 rounded text-[10px] font-mono text-slate-300 flex justify-between">
                <span>ESTIMATED VARIANCE:</span>
                <strong className="text-cyan-400">{s.variance}</strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
