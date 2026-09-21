import React, { useState } from 'react'
import { Bot, Mail, MapPin, ArrowUp, Send, CheckCircle2 } from 'lucide-react'

export default function Footer({ onOpenCrest, onNavigate }) {
  const [emailInput, setEmailInput] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!emailInput.trim()) return
    setSubscribed(true)
    setEmailInput('')
  }

  return (
    <footer className="bg-[#050810] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info & Crest Click */}
          <div className="space-y-4 md:col-span-1">
            <div 
              onClick={onOpenCrest}
              title="Click to view full crest logo"
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-amber-500/40 to-blue-600 p-[1px] shadow-lg shadow-cyan-500/20 overflow-hidden">
                <img src="/assets/logo_perfect.png" alt="DJ Group Logo" className="w-full h-full object-cover rounded-[11px]" />
              </div>
              <span className="font-extrabold text-white text-base tracking-wider">
                Dj <span className="text-xs text-cyan-400 font-normal">Group of Industry</span>
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              Architecting sovereign cognitive automation stacks for global high-output manufacturing sectors.
            </p>
          </div>

          {/* Directives Navigation */}
          <div className="space-y-3">
            <h3 className="text-white font-bold uppercase tracking-wider text-[11px] font-mono">Directives</h3>
            <ul className="space-y-2 text-xs">
              <li onClick={() => onNavigate('home')} className="hover:text-cyan-400 transition-colors cursor-pointer">Home Base</li>
              <li onClick={() => onNavigate('about')} className="hover:text-cyan-400 transition-colors cursor-pointer">About Us</li>
              <li onClick={() => onNavigate('services')} className="hover:text-cyan-400 transition-colors cursor-pointer">Services Offered</li>
              <li onClick={() => onNavigate('blog')} className="hover:text-cyan-400 transition-colors cursor-pointer">Press & Insights</li>
              <li onClick={() => onNavigate('contact')} className="hover:text-cyan-400 transition-colors cursor-pointer">Contact Channels</li>
            </ul>
          </div>

          {/* Focus Fields */}
          <div className="space-y-3">
            <h3 className="text-white font-bold uppercase tracking-wider text-[11px] font-mono">Focus Fields</h3>
            <ul className="space-y-2 text-xs">
              <li onClick={() => onNavigate('services')} className="hover:text-cyan-400 transition-colors cursor-pointer">Industrial Cobots</li>
              <li onClick={() => onNavigate('services')} className="hover:text-cyan-400 transition-colors cursor-pointer">Computer Vision</li>
              <li onClick={() => onNavigate('services')} className="hover:text-cyan-400 transition-colors cursor-pointer">Machine Learning</li>
              <li onClick={() => onNavigate('services')} className="hover:text-cyan-400 transition-colors cursor-pointer">Warehouse AMRs</li>
              <li onClick={() => onNavigate('services')} className="hover:text-cyan-400 transition-colors cursor-pointer">Digital Twins</li>
            </ul>
          </div>

          {/* Ecosystem Telemetry Updates */}
          <div className="space-y-3">
            <h3 className="text-white font-bold uppercase tracking-wider text-[11px] font-mono">Ecosystem Updates</h3>
            <p className="text-xs text-slate-400">Subscribe to our telemetry newsletter for breakthroughs in machine intelligence.</p>

            {subscribed ? (
              <div className="p-2.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Subscribed! Telemetry feed active.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-1.5">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter email..."
                  required
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs shrink-0"
                >
                  →
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar with Scroll To Top */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono">
          <p className="text-slate-400">
            Copyright © 2026 Dj Group of Industry. All systems operational.
          </p>

          <button
            onClick={handleScrollTop}
            className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
          >
            <span>Scroll to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  )
}
