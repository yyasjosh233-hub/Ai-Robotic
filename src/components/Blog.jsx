import React, { useState } from 'react'
import { blogData, upcomingTech } from '../data/roboticsData'
import { FileText, ArrowRight, Sparkles, X, CheckCircle2, Mail } from 'lucide-react'

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [subscribed, setSubscribed] = useState(false)
  const [emailInput, setEmailInput] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!emailInput.trim()) return
    setSubscribed(true)
    setEmailInput('')
  }

  return (
    <section id="blog" className="py-24 relative bg-[#090e1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <FileText className="w-3.5 h-3.5" />
            <span>PRESS & TELEMETRY INSIGHTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Robotics <span className="gradient-text">Research Journal</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Technical papers, neural architecture breakdowns, and upcoming technology spectrums from DJ Group robotics labs.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogData.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[11px] font-mono text-cyan-400">
                  <span>{article.category}</span>
                  <span className="text-slate-500">{article.date}</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400">
                <span>By {article.author}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Breakthrough Technologies Section */}
        <div className="mt-20 p-8 rounded-2xl glass-panel border border-cyan-500/30 space-y-6">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>NEXT-DECADE BREAKTHROUGHS</span>
          </div>
          <h3 className="text-2xl font-bold text-white">Emerging R&D Horizon</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingTech.map((tech) => (
              <div key={tech.id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <h4 className="text-sm font-bold text-cyan-300">{tech.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription Box */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 text-center max-w-2xl mx-auto space-y-4">
          <h3 className="text-xl font-bold text-white">Subscribe to Telemetry Newsletter</h3>
          <p className="text-xs text-slate-400">Receive monthly neural motion updates, ROS 2 release notes, and case study whitepapers.</p>
          
          {subscribed ? (
            <div className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono text-xs flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Subscription Active! Welcome to DJ Group Insights.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="enter.your.email@domain.com"
                required
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs font-mono"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl glass-panel border border-cyan-500/40 p-6 shadow-2xl space-y-6 text-slate-100">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">{selectedArticle.category} · {selectedArticle.date}</span>
                <h3 className="text-xl font-bold text-white mt-1">{selectedArticle.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">Author: {selectedArticle.author}</p>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 leading-relaxed space-y-3 font-sans">
              <p className="font-semibold text-cyan-300">{selectedArticle.excerpt}</p>
              <p>{selectedArticle.content}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-semibold text-xs"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
