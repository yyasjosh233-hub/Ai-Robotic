import React, { useState } from 'react';
import { BookOpen, FileText, ChevronRight } from 'lucide-react';

export default function DocumentationPage() {
  const [selectedDoc, setSelectedDoc] = useState('README');

  const docs = [
    { id: 'README', title: 'System Overview & README', content: '# PHYSICAL AI INDUSTRIAL ROBOT (PAI-IR)\n\nPAI-IR is a production-quality, modular robotics platform implementing the end-to-end physical AI paradigm: Perception → Human Understanding → Reasoning → Planning → Navigation → Manipulation → Inspection → Decision → Action → Feedback.' },
    { id: 'ARCHITECTURE', title: 'System Architecture Guide', content: '# Architecture Overview\n\nThe platform combines ROS 2, FastAPI async backend, OpenCV computer vision inspection, MediaPipe/YOLO human pose & gesture tracking, Nav2 human-aware navigation, 6-DOF arm kinematics, and a Three.js 3D industrial control dashboard.' },
    { id: 'ROS2_SETUP', title: 'ROS 2 Humble / Jazzy Integration', content: '# ROS 2 Setup\n\nPackages included:\n- pai_bringup\n- pai_navigation\n- pai_perception\n- pai_hri\n- pai_manipulation\n- pai_inspection\n- pai_planner\n- pai_safety\n- pai_simulation' },
    { id: 'SAFETY', title: 'Safety Layer Architecture', content: '# Safety Architecture\n\nEvery AI action passes through the independent Safety Guard. Safety controls override AI reasoning deterministically.' }
  ];

  const current = docs.find(d => d.id === selectedDoc) || docs[0];

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl flex items-center space-x-4">
        <BookOpen className="w-8 h-8 text-cyan-400" />
        <div>
          <h1 className="text-xl font-black text-slate-100 tracking-wider uppercase">IN-APP SYSTEM DOCUMENTATION BROWSER</h1>
          <p className="text-xs text-slate-400">Architecture Guides, ROS 2 Setup, Safety Specs, API Documentation, & Hardware Guides</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Document Navigation Tabs */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">DOCUMENTATION INDEX</span>
          {docs.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setSelectedDoc(doc.id)}
              className={`w-full text-left p-3 rounded-lg text-xs font-semibold flex items-center justify-between transition-all ${
                selectedDoc === doc.id
                  ? 'bg-cyan-950 border border-cyan-500 text-cyan-300'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:bg-slate-900'
              }`}
            >
              <span>{doc.title}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ))}
        </div>

        {/* Documentation Content Viewer */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-2 font-mono">{current.title}</h2>
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
            {current.content}
          </div>
        </div>
      </div>
    </div>
  );
}
