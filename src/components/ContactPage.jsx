import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle2, Bot, Compass, Layers } from 'lucide-react'

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    subject: 'Feasibility Study Inquiry',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  const focusFields = [
    'Industrial Cobots & Arms',
    'AI Computer Vision & QA',
    'Edge Machine Learning Controllers',
    'Warehouse AMRs & AGVs',
    'Digital Twin Telemetry Mirror'
  ]

  const directives = [
    { label: 'Home Base', path: 'home' },
    { label: 'About Us', path: 'about' },
    { label: 'Services Offered', path: 'services' },
    { label: 'Press & Insights', path: 'blog' },
    { label: 'Contact Channels', path: 'contact' }
  ]

  return (
    <section id="contact" className="py-24 relative bg-[#070b14] cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <Mail className="w-3.5 h-3.5" />
            <span>CONTACT & FEASIBILITY STUDY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Start Your <span className="gradient-text">Automation Consultation</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Join the industry leaders who have already embraced the future of autonomous precision. Let's build your custom solution.
          </p>
        </div>

        {/* Content Layout */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Directives & Focus Fields Column */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Contact Details Card */}
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-cyan-400" />
                <span>Dj Group of Industry Headquarters</span>
              </h3>

              <div className="space-y-3 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Bengaluru R&D Campus, Karnataka, India</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>contact@djgroup-robotics.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>+91 (080) 4920-8800</span>
                </div>
              </div>
            </div>

            {/* Directives List */}
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3">
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                <span>Directives Navigation</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {directives.map((d, i) => (
                  <li key={i} className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-2">
                    <span className="text-cyan-500 font-mono">0{i+1}.</span>
                    <span>{d.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Focus Fields */}
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3">
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>Focus Fields</span>
              </h4>
              <div className="space-y-2 text-xs font-mono text-slate-300">
                {focusFields.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Inquiry Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl glass-panel-glow border border-cyan-500/30 space-y-6">
              <h3 className="text-xl font-bold text-white">Free Feasibility Study & Consultation</h3>

              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-cyan-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">Inquiry Successfully Transmitted!</h4>
                  <p className="text-xs text-slate-300">Our Senior Field Robotics Architect will reach out to you within 4 business hours to analyze your plant telemetry.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-400">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. Alexander Sterling"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alexander@cybernetics.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-400">Industrial City / Location</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Bengaluru / Chennai / Mumbai"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400">Subject</label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400">Plant Requirements / Message *</label>
                    <textarea
                      rows="4"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your target payload, cycle time, or cobot count..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-sans text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Feasibility Study Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
