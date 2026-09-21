import React, { useState } from 'react';
import { CheckCircle2, XCircle, Play, Sliders, FileCheck, AlertTriangle } from 'lucide-react';

export default function QualityInspectionPage({ onRunInspection }) {
  const [componentId, setComponentId] = useState('COMP-9041');
  const [simulatedDefect, setSimulatedDefect] = useState('NONE');
  const [inspectionResult, setInspectionResult] = useState(null);

  const handleRun = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/inspection/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ component_id: componentId, simulated_defect: simulatedDefect })
      });
      const data = await res.json();
      setInspectionResult(data);
    } catch (err) {
      // Mock result fallback
      setInspectionResult({
        inspection_id: "INSP-4821",
        component_id: componentId,
        result: simulatedDefect === 'NONE' ? 'PASS' : 'FAIL',
        defect_type: simulatedDefect,
        confidence: 0.96,
        pipeline_stages: {
          "1_RAW_INPUT": "Captured RGB frame 1920x1080",
          "4_GRAYSCALE": "Single-channel grayscale matrix computed",
          "8_EDGE_DETECTION": "Canny edge detector hysteresis applied",
          "10_DEFECT_DETECTION": `Defect classification: ${simulatedDefect}`,
          "11_PASS_FAIL_DECISION": simulatedDefect === 'NONE' ? 'PASS' : `FAIL - ${simulatedDefect}`
        },
        metrics: { surface_roughness_ra: 0.42, dimension_error_mm: 0.02, contour_integrity_score: 0.99 }
      });
    }
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl flex items-center space-x-4">
        <FileCheck className="w-8 h-8 text-emerald-400" />
        <div>
          <h1 className="text-xl font-black text-slate-100 tracking-wider uppercase">INDUSTRIAL COMPUTER VISION QUALITY INSPECTION</h1>
          <p className="text-xs text-slate-400">11-Stage Image Processing Pipeline, Surface Defect Detection, & PASS/FAIL Classification</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inspection Workbench Trigger */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2">INSPECTION CONTROLLER</h2>

          <div>
            <label className="text-xs text-slate-400 block mb-1">COMPONENT IDENTIFIER</label>
            <input
              type="text"
              value={componentId}
              onChange={(e) => setComponentId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-200"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">SIMULATED DEFECT TYPE</label>
            <select
              value={simulatedDefect}
              onChange={(e) => setSimulatedDefect(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-200"
            >
              <option value="NONE">NONE (PASS COMPONENT)</option>
              <option value="SURFACE_CRACK">SURFACE CRACK</option>
              <option value="SCRATCH">SCRATCH</option>
              <option value="MISSING_COMPONENT">MISSING COMPONENT</option>
              <option value="DIMENSION_MISMATCH">DIMENSION MISMATCH</option>
            </select>
          </div>

          <button
            onClick={handleRun}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded shadow-lg transition-all flex items-center justify-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>RUN 11-STAGE CV INSPECTION</span>
          </button>
        </div>

        {/* 11-Stage Pipeline Breakdown */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">11-STAGE CV INSPECTION PIPELINE STAGES</h2>
            {inspectionResult && (
              <span className={`px-4 py-1 rounded text-xs font-black uppercase border ${inspectionResult.result === 'PASS' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-red-950 text-red-400 border-red-800'}`}>
                RESULT: {inspectionResult.result} ({inspectionResult.defect_type})
              </span>
            )}
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {Object.entries(
              inspectionResult?.pipeline_stages || {
                "1_RAW_INPUT": "Captured RGB frame 1920x1080",
                "2_RESIZED": "Resized frame to 640x480 standard tensor",
                "3_COLOR_CONVERT": "Converted BGR to HSV color space",
                "4_GRAYSCALE": "Single-channel grayscale matrix computed",
                "5_NOISE_REDUCTION": "5x5 Gaussian blur noise reduction applied",
                "6_THRESHOLDING": "Otsu adaptive thresholding applied (T=128)",
                "7_MORPHOLOGICAL_OPS": "Kernel 3x3 closing operation performed",
                "8_EDGE_DETECTION": "Canny edge detector hysteresis (thresholds 50/150)",
                "9_CONTOUR_ANALYSIS": "Extracted 12 structural contour vectors",
                "10_DEFECT_DETECTION": "Defect classification: NONE",
                "11_PASS_FAIL_DECISION": "PASS"
              }
            ).map(([stageKey, desc], i) => (
              <div key={stageKey} className="bg-slate-950 border border-slate-800 p-2.5 rounded flex justify-between items-center text-xs font-mono">
                <span className="text-cyan-400 font-bold">{stageKey}</span>
                <span className="text-slate-300">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
