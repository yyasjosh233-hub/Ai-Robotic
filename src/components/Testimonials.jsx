import React from 'react'
import { MessageSquare, Star, Quote } from 'lucide-react'

export default function Testimonials() {
  const reviews = [
    {
      quote: "Their bipedal balance controls and joint actuator modules are top-tier. Integrating their designs cut our hardware testing cycles in half.",
      author: "Dr. Alexander Sterling",
      role: "Chief Robotics Architect, Cybernetics",
      image: "/assets/roboticist_alexander-wvuIt9a-.png"
    },
    {
      quote: "The micro-tolerance pick-and-place grippers they fabricated allowed our electronics lines to achieve continuous 24/7 assembly without a single misalignment.",
      author: "Elena Rostova",
      role: "Lead Automation & Precision Assembly Engineer",
      image: "/assets/roboticist_elena-CNUP0F2E.png"
    },
    {
      quote: "Their approach to robotics integration is world-class. The AI-driven calibration alone saved us months of manual tuning.",
      author: "Dr. Sarah Chen",
      role: "Director of Autonomous Systems, Robotics Lab",
      image: "/assets/roboticist_sarah-BRxib0-l.png"
    }
  ]

  return (
    <section id="testimonials" className="py-24 relative bg-[#090e1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>VOICES FROM THE FIELD</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Trusted By <span className="gradient-text">Global Industry Leaders</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-cyan-400/40 group-hover:text-cyan-400 transition-colors" />
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{r.quote}"
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center gap-4">
                <img
                  src={r.image}
                  alt={r.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500/40"
                />
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {r.author}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {r.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
