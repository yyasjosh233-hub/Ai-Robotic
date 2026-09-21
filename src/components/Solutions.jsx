import React, { useState } from 'react'
import { servicesData } from '../data/roboticsData'
import { Bot, Cpu, Eye, Layers, ShieldCheck, Zap, ArrowUpRight, CheckCircle2, Search } from 'lucide-react'

export default function Solutions({ onSelectProduct }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['All', 'Industrial Automation', 'Computer Vision', 'Logistics & AMRs', 'Underwater Robots']

  const filtered = servicesData.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory
    const matchesSearch = searchQuery === '' || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section id="solutions" className="py-24 relative bg-[#090e1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <Bot className="w-3.5 h-3.5" />
            <span>ADVANCED AUTOMATION PORTFOLIO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Engineering Precision <span className="gradient-text">For Every Sector</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            From high-precision electronics assembly to autonomous field robotics, explore DJ Group sovereign technology stacks.
          </p>
        </div>

        {/* Real-time Search Input Bar */}
        <div className="mt-8 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search robotics solutions (e.g. cobot, vision, welding, AMR)..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono shadow-xl"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
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

        {/* Products Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-cyan-300 border border-cyan-500/30">
                  {product.badge}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Specs */}
                <div className="pt-2 border-t border-slate-800/80 text-xs text-cyan-400 font-mono">
                  <span>{product.spec}</span>
                </div>

                {/* Card CTA */}
                <button
                  onClick={() => onSelectProduct(product)}
                  className="w-full mt-4 py-2.5 rounded-xl bg-slate-900 hover:bg-cyan-500/20 border border-slate-800 hover:border-cyan-500/40 text-xs font-semibold text-cyan-300 flex items-center justify-center gap-2 transition-all"
                >
                  <span>Technical Specifications</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
