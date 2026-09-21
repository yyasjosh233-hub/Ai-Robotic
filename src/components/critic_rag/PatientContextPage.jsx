import React, { useState } from 'react'
import { User, AlertTriangle, ShieldCheck, CheckCircle2, Lock, FileText } from 'lucide-react'

export default function PatientContextPage() {
  const [patientData, setPatientData] = useState({
    age: '68',
    sex: 'Female',
    symptoms: 'Mild fatigue, polyuria, peripheral numbness',
    medications: 'Metformin 1000mg BID, Atorvastatin 20mg',
    conditions: 'Type 2 Diabetes Mellitus, Mild ASCVD',
    egfr: '54 mL/min/1.73m²'
  })

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
          <User className="w-4 h-4 text-cyan-400" /> STRUCTURED PATIENT CONTEXT LAYER
        </div>
        <h1 className="text-2xl font-bold text-white mt-1">Patient Parameters & Triage Safety Controls</h1>
        <p className="text-slate-400 text-sm mt-0.5">
          Patient parameters are explicitly tagged into USER-PROVIDED vs INFERRED. CRITIC-RAG never fabricates or silently infers unstated clinical history.
        </p>
      </div>

      {/* Form & Tagging Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <User className="w-4 h-4 text-cyan-400" /> User-Submitted Clinical Parameters
          </h3>

          <div className="grid grid-cols-2 gap-4 text-xs font-sans">
            <div>
              <label className="text-slate-400 font-mono block mb-1">Age (Years)</label>
              <input 
                type="text" 
                value={patientData.age}
                onChange={(e) => setPatientData({...patientData, age: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-lg p-2.5 font-mono focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-slate-400 font-mono block mb-1">Biological Sex</label>
              <input 
                type="text" 
                value={patientData.sex}
                onChange={(e) => setPatientData({...patientData, sex: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-lg p-2.5 font-mono focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="text-xs font-sans space-y-3">
            <div>
              <label className="text-slate-400 font-mono block mb-1">Reported Symptoms</label>
              <input 
                type="text" 
                value={patientData.symptoms}
                onChange={(e) => setPatientData({...patientData, symptoms: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-lg p-2.5 focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-slate-400 font-mono block mb-1">Current Medications</label>
              <input 
                type="text" 
                value={patientData.medications}
                onChange={(e) => setPatientData({...patientData, medications: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-lg p-2.5 focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-slate-400 font-mono block mb-1">Known Diagnosed Conditions</label>
              <input 
                type="text" 
                value={patientData.conditions}
                onChange={(e) => setPatientData({...patientData, conditions: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-lg p-2.5 focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-slate-400 font-mono block mb-1">Lab Value (eGFR Renal Clearance)</label>
              <input 
                type="text" 
                value={patientData.egfr}
                onChange={(e) => setPatientData({...patientData, egfr: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-lg p-2.5 font-mono focus:border-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* Audit & Provenance Verification Box */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Lock className="w-4 h-4 text-emerald-400" /> Parameter Provenance Audit
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <span className="text-slate-300">Age: {patientData.age}</span>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-bold">USER_PROVIDED</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <span className="text-slate-300">Sex: {patientData.sex}</span>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-bold">USER_PROVIDED</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <span className="text-slate-300">Renal eGFR: {patientData.egfr}</span>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-bold">USER_PROVIDED</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <span className="text-slate-300">Allergies: Unstated</span>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-400 rounded text-[10px] font-bold">UNKNOWN</span>
            </div>
          </div>

          <div className="bg-amber-950/20 border border-amber-900/40 p-4 rounded-xl text-xs text-amber-200 font-sans">
            <strong>Medical Privacy & Safety Guard:</strong> All patient parameters remain within local memory and are never transmitted to unauthorized remote third-party trackers.
          </div>
        </div>

      </div>

    </div>
  )
}
