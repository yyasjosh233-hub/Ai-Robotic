import React, { useState } from 'react'
import { illustrationsData } from '../data/roboticsData'
import { Layers, ArrowUpRight, X, CheckCircle2 } from 'lucide-react'

export default function Illustrations() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedItem, setSelectedItem] = useState(null)

  const categories = ['All', 'Autonomous Mobile Robots (AMR)', 'Digital Twin & Simulation', 'Kinematics & Pathfinding', 'Quality Inspection', 'Industrial Automation', 'Humanoid Assistants', 'Smart Factory', 'Textile Automation']

  const filtered = activeCategory === 'All'
    ? illustrationsData
    : illustrationsData.filter(item => item.category.toLowerCase().includes(activeCategory.toLowerCase()))

  return (
    <section id="illustrations" className="py-24 relative bg-[#070b14] cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <Layers className="w-3.5 h-3.5" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Technology <span className="gradient-text">Illustration Library</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Exploring industrial automation, artificial intelligence, microelectronics, and cyber-physical engineering illustrations.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-black font-semibold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Illustrations Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all overflow-hidden flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-cyan-300 border border-cyan-500/30">
                  {item.category}
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400">
                  <span>{item.spec}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal View */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl glass-panel border border-cyan-500/40 p-6 shadow-2xl space-y-6 text-slate-100">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">{selectedItem.category}</span>
                <h3 className="text-xl font-bold text-white mt-1">{selectedItem.title}</h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video rounded-xl overflow-hidden bg-slate-950">
              <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedItem.description}
            </p>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Specification: {selectedItem.spec}</span>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-semibold text-xs"
              >
                Close Gallery View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
