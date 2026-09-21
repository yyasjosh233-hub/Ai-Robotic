import React, { useState } from 'react'
import { ShieldCheck, TrendingUp, Headphones, ArrowRight, X, CheckCircle2 } from 'lucide-react'

export default function Architecture() {
  const [modalType, setModalType] = useState(null)

  const featureCards = [
    {
      id: 'roi',
      icon: <TrendingUp className="w-8 h-8 text-cyan-400" />,
      title: 'Guaranteed ROI',
      desc: 'Our clients experience an average of 35% increase in production efficiency within the first 6 months of implementation.',
      modalTitle: 'Guaranteed ROI Details',
      details: [
        { label: 'Rapid Amortization:', text: 'Full capital expense recovery achieved in 8-14 months.' },
        { label: 'Reduced Material Waste:', text: 'Sub-millimeter QA precision eliminates scrap metal & defect reruns.' },
        { label: 'Predictable Output:', text: '24/7 continuous operation without thermal drift or velocity degradation.' },
        { label: 'Data-Driven Insights:', text: 'Real-time OEE telemetry streaming via edge ROS 2 nodes.' }
      ]
    },
    {
      id: 'support',
      icon: <Headphones className="w-8 h-8 text-cyan-400" />,
      title: '24/7 Rapid Support',
      desc: 'Downtime costs money. Our dedicated expert support team is available around the clock to ensure your operations never stop.',
      modalTitle: '24/7 Rapid Support Details',
      details: [
        { label: 'Dedicated Account Managers:', text: 'Direct access to senior robotics field architects.' },
        { label: 'Remote Diagnostics:', text: 'Zero-latency telemetry inspection via secure encrypted VPN.' },
        { label: 'Global Technician Network:', text: 'On-site emergency dispatch within 4 hours.' },
        { label: 'Preventative Maintenance:', text: 'AI predictive models alerting joint wear before failure.' }
      ]
    },
    {
      id: 'safety',
      icon: <ShieldCheck className="w-8 h-8 text-cyan-400" />,
      title: 'Uncompromised Safety',
      desc: 'Built to the highest international safety standards. Our cobots and industrial units prioritize human safety above all else.',
      modalTitle: 'Uncompromised Safety Details',
      details: [
        { label: 'ISO/TS 15066 Compliance:', text: 'Full certification for force and power-limited cobot operation.' },
        { label: 'Advanced Collision Avoidance:', text: 'Human pose tracking & active optical safety curtains.' },
        { label: 'Force Limiting:', text: 'Instant sub-5ms joint power cut upon unexpected tactile resistance.' },
        { label: 'Cybersecurity Protocols:', text: 'Air-gapped firmware signature verification.' }
      ]
    }
  ]

  const activeCard = featureCards.find(c => c.id === modalType)

  return (
    <section className="py-24 relative bg-[#080c18] cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <span>THE ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Where Intelligence <span className="gradient-text">Meets Precision</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Our Neural-Motion framework enables robots to anticipate environmental shifts and obstacles in real-time. By processing millions of data points at the edge, Dj Group systems deliver performance that defines the future of work.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureCards.map((card) => (
            <div
              key={card.id}
              className="p-8 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 w-fit group-hover:border-cyan-500/40 transition-colors">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <button
                onClick={() => setModalType(card.id)}
                className="mt-6 pt-4 border-t border-slate-800/80 text-cyan-400 hover:text-cyan-300 font-mono text-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Read Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Feature Details Modal */}
      {activeCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-2xl glass-panel-glow border border-cyan-500/40 p-6 shadow-2xl space-y-6 text-slate-100">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>{activeCard.icon}</span>
                <span>{activeCard.modalTitle}</span>
              </h3>
              <button
                onClick={() => setModalType(null)}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {activeCard.details.map((d, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="text-cyan-400 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{d.label}</span>
                  </div>
                  <p className="text-slate-300 text-[11px] pl-6 font-sans">
                    {d.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="px-5 py-2 rounded-xl bg-cyan-500 text-black font-semibold text-xs"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
