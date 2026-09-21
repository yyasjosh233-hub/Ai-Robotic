import React, { useState } from 'react'
import { Radio, Activity, Zap, Play, RotateCcw, Cloud, AlertOctagon, CheckCircle2, ShieldAlert } from 'lucide-react'

export default function EdgeAI({ workspaceId }) {
  const [activeProtocol, setActiveProtocol] = useState('ALL')
  const [deviceStates, setDeviceStates] = useState({
    'DEV-101': { status: 'ONLINE', cycleRunning: false, calibrating: false, otaUpdating: false, estop: false },
    'DEV-102': { status: 'ONLINE', cycleRunning: false, calibrating: false, otaUpdating: false, estop: false },
    'DEV-103': { status: 'ONLINE', cycleRunning: false, calibrating: false, otaUpdating: false, estop: false },
    'DEV-104': { status: 'ONLINE', cycleRunning: false, calibrating: false, otaUpdating: false, estop: false },
    'DEV-105': { status: 'ONLINE', cycleRunning: false, calibrating: false, otaUpdating: false, estop: false },
  })

  const protocols = [
    { id: 'ALL', label: 'All Protocols' },
    { id: 'MQTT', label: 'MQTT' },
    { id: 'OPC UA', label: 'OPC UA' },
    { id: 'Modbus TCP', label: 'Modbus TCP' },
    { id: 'Siemens S7-Comm', label: 'Siemens S7-Comm' },
    { id: 'EtherNet/IP', label: 'EtherNet/IP' }
  ]

  const devices = [
    {
      id: 'DEV-101',
      name: 'Siemens S7-1500 PLC',
      ip: '192.168.1.50',
      protocol: 'OPC UA',
      firmware: 'v2.9.4',
      edgeModel: 'Active',
      latency: '1.2ms'
    },
    {
      id: 'DEV-102',
      name: 'Allen Bradley ControlLogix',
      ip: '192.168.1.51',
      protocol: 'EtherNet/IP',
      firmware: 'v33.011',
      edgeModel: 'Active',
      latency: '1.8ms'
    },
    {
      id: 'DEV-103',
      name: 'KUKA KR C4 Controller',
      ip: '192.168.1.80',
      protocol: 'Modbus TCP',
      firmware: 'v8.6',
      edgeModel: 'Active',
      latency: '2.1ms'
    },
    {
      id: 'DEV-104',
      name: 'NVIDIA Jetson Orin Edge Node',
      ip: '192.168.1.120',
      protocol: 'MQTT',
      firmware: 'JetPack 6.0',
      edgeModel: 'Active (YOLOv11)',
      latency: '0.4ms'
    },
    {
      id: 'DEV-105',
      name: 'ESP32 Smart Sensor Array',
      ip: '192.168.1.200',
      protocol: 'MQTT',
      firmware: 'v1.4.0',
      edgeModel: 'MicroTVM',
      latency: '5.2ms'
    }
  ]

  const handleStartCycle = (devId) => {
    setDeviceStates(prev => ({
      ...prev,
      [devId]: { ...prev[devId], cycleRunning: !prev[devId].cycleRunning, estop: false }
    }))
  }

  const handleRecalibrate = (devId) => {
    setDeviceStates(prev => ({ ...prev, [devId]: { ...prev[devId], calibrating: true } }))
    setTimeout(() => {
      setDeviceStates(prev => ({ ...prev, [devId]: { ...prev[devId], calibrating: false } }))
    }, 1500)
  }

  const handleOtaUpdate = (devId) => {
    setDeviceStates(prev => ({ ...prev, [devId]: { ...prev[devId], otaUpdating: true } }))
    setTimeout(() => {
      setDeviceStates(prev => ({ ...prev, [devId]: { ...prev[devId], otaUpdating: false } }))
    }, 2000)
  }

  const handleEstop = (devId) => {
    setDeviceStates(prev => ({
      ...prev,
      [devId]: { ...prev[devId], estop: !prev[devId].estop, cycleRunning: false }
    }))
  }

  const filteredDevices = activeProtocol === 'ALL' 
    ? devices 
    : devices.filter(d => d.protocol === activeProtocol)

  return (
    <div className="space-y-6 font-sans text-slate-100">
      
      {/* 1. TOP HEADER & TITLE BOX (Matching Screenshot 1:1) */}
      <div className="p-6 rounded-2xl bg-[#161208] border border-[#3d2f12] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#facc15] tracking-wide flex items-center gap-2">
            <span>📡</span>
            <span>Industrial IoT (IIoT) Management & Edge AI</span>
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/60 font-sans">
            Multi-Protocol Industrial Connectivity (MQTT, OPC UA, Modbus TCP) for Siemens, AB, ABB, KUKA, Fanuc, UR, ESP32, RPi & Jetson.
          </p>
        </div>

        {/* Top Right Active Gateways Badge */}
        <div>
          <span className="px-3.5 py-1.5 rounded-lg bg-amber-950/70 border border-yellow-700/60 text-[#facc15] text-xs font-mono font-bold whitespace-nowrap shadow-sm">
            5 Gateways Active
          </span>
        </div>
      </div>

      {/* 2. ACTIVE PROTOCOL GATEWAY BAR (Matching Screenshot 1:1) */}
      <div className="p-4 rounded-2xl bg-[#161208] border border-[#3d2f12] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="font-bold text-white text-sm">Active Protocol Gateway:</span>
          <div className="flex flex-wrap items-center gap-2">
            {protocols.map((proto) => (
              <button
                key={proto.id}
                onClick={() => setActiveProtocol(proto.id)}
                className={`px-3 py-1 rounded-lg font-bold transition-all whitespace-nowrap ${
                  activeProtocol === proto.id
                    ? 'bg-[#facc15] text-black shadow-md shadow-yellow-500/20 border border-yellow-400'
                    : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:text-white hover:bg-slate-800'
                }`}
              >
                {proto.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gateway Sync Status */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 text-xs font-bold flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Gateway Sync 100Hz
          </span>
        </div>
      </div>

      {/* 3. DEVICE CARDS GRID (Matching Screenshots 1 & 2 1:1) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 font-mono">
        {filteredDevices.map((dev) => {
          const state = deviceStates[dev.id] || {}

          return (
            <div 
              key={dev.id}
              className={`p-5 rounded-2xl bg-[#161208] border transition-all space-y-4 ${
                state.estop
                  ? 'border-rose-600 shadow-lg shadow-rose-950/40'
                  : 'border-[#3d2f12] hover:border-amber-700/60'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white">{dev.name}</h2>
                  <div className="text-xs font-bold text-[#facc15] mt-0.5">
                    <span>{dev.id}</span>
                    <span className="mx-1 text-slate-600">|</span>
                    <span>{dev.ip}</span>
                  </div>
                </div>

                {/* Online / Estop Status Badge */}
                <div>
                  {state.estop ? (
                    <span className="px-3 py-1 rounded-full bg-rose-950 text-rose-400 border border-rose-800 text-xs font-bold animate-pulse">
                      E-STOPPED
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-[#092b1a] text-emerald-400 border border-emerald-800/80 text-xs font-bold">
                      ONLINE
                    </span>
                  )}
                </div>
              </div>

              {/* Information Container */}
              <div className="p-3.5 rounded-xl bg-[#0b151a] border border-slate-800/80 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-slate-400">Protocol: </span>
                    <span className="text-[#facc15] font-bold">{dev.protocol}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Firmware: </span>
                    <span className="text-slate-200 font-bold">{dev.firmware}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-slate-400">Edge AI Model: </span>
                    <span className="text-emerald-400 font-bold">{dev.edgeModel}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Latency: </span>
                    <span className="text-slate-200 font-bold">{dev.latency}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row (Matching screenshot 1:1) */}
              <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
                {/* Start Cycle Button */}
                <button
                  onClick={() => handleStartCycle(dev.id)}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                    state.cycleRunning
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-600 shadow-sm'
                      : 'bg-amber-950/60 hover:bg-amber-900/80 text-[#facc15] border border-yellow-700/60'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{state.cycleRunning ? 'Running...' : 'Start Cycle'}</span>
                </button>

                {/* Recalibrate Button */}
                <button
                  onClick={() => handleRecalibrate(dev.id)}
                  disabled={state.calibrating}
                  className="px-3 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 text-[#facc15] border border-yellow-700/60 font-bold flex items-center gap-1.5 transition-all"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${state.calibrating ? 'animate-spin text-yellow-300' : ''}`} />
                  <span>{state.calibrating ? 'Calibrating...' : 'Recalibrate'}</span>
                </button>

                {/* OTA Update Button */}
                <button
                  onClick={() => handleOtaUpdate(dev.id)}
                  disabled={state.otaUpdating}
                  className="px-3 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 text-[#facc15] border border-yellow-700/60 font-bold flex items-center gap-1.5 transition-all"
                >
                  <Cloud className={`w-3.5 h-3.5 ${state.otaUpdating ? 'animate-bounce text-yellow-300' : ''}`} />
                  <span>{state.otaUpdating ? 'Updating...' : 'OTA Update'}</span>
                </button>

                {/* E-Stop Button */}
                <button
                  onClick={() => handleEstop(dev.id)}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                    state.estop
                      ? 'bg-rose-600 text-white border border-rose-400 animate-pulse'
                      : 'bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800/80'
                  }`}
                >
                  <AlertOctagon className="w-3.5 h-3.5" />
                  <span>{state.estop ? 'Reset E-Stop' : 'E-Stop'}</span>
                </button>
              </div>

            </div>
          )
        })}
      </div>

    </div>
  )
}
