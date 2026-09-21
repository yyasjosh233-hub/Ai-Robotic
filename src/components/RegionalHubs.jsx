import React from 'react'
import { Globe, MapPin } from 'lucide-react'

export default function RegionalHubs() {
  const hubs = [
    { city: 'Bengaluru', title: 'Robotics R&D Innovation Center', image: '/assets/Bengaluru-B1Rr3bFr.png' },
    { city: 'Mumbai', title: 'Heavy Automation & Port Hub', image: '/assets/Mumbai-CQcP7aVp.png' },
    { city: 'Chennai', title: 'Automotive Cobot Assembly Line', image: '/assets/chennai-CULJYi-_.png' },
    { city: 'Pune', title: 'Precision Machining & Tooling', image: '/assets/Pune-Dk3RjmvM.png' },
    { city: 'Hyderabad', title: 'AI & Edge Perception Lab', image: '/assets/hyderabad-Cl8xIliY.png' },
    { city: 'Ahmedabad', title: 'Textile & Chemical Automation', image: '/assets/Ahmebabed-CuxwAcV6.png' },
    { city: 'Coimbatore', title: 'Industrial Actuator Plant', image: '/assets/Coimbatore-CsF0RF7e.png' },
    { city: 'Delhi NCR', title: 'Strategic Operations & Logistics', image: '/assets/delhi-DTjbuI7b.png' }
  ]

  return (
    <section id="hubs" className="py-24 relative bg-[#070b14] cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <Globe className="w-3.5 h-3.5" />
            <span>GLOBAL & REGIONAL PRESENCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Industrial <span className="gradient-text">Hubs & Plants</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Operating high-tech development hubs across key manufacturing corridors.
          </p>
        </div>

        {/* Hubs Cards Grid */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
          {hubs.map((hub, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all group"
            >
              <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                <img
                  src={hub.image}
                  alt={hub.city}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-mono text-cyan-300">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{hub.city}</span>
                </div>
              </div>

              <div className="p-4">
                <h4 className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {hub.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
