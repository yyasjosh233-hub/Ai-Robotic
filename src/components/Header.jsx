import React, { useState, useEffect } from 'react'
import { Bot, Cpu, Menu, X, ChevronRight, Activity, Sparkles } from 'lucide-react'

export default function Header({ activeTab, setActiveTab, onOpenCrest, onOpenPlatform }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'workforce-film', label: '25-Robot Film' },
    { id: 'ai-media-studio', label: '🎬 AI Media Studio' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'illustrations', label: 'Illustrations' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
    { id: 'industrial-ai', label: 'Industrial AI Platform' }
  ]

  const handleNavClick = (id) => {
    setActiveTab(id)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? 'bg-[#070b14]/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-2xl' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo with Crest Click */}
        <div 
          onClick={onOpenCrest}
          title="Click to view full crest logo"
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-amber-500/40 to-blue-600 p-[1px] shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-400/50 transition-all overflow-hidden">
            <img
              src="/assets/logo_perfect.png"
              alt="DJ Group Crest"
              className="w-full h-full object-cover rounded-[11px]"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base sm:text-lg tracking-wider text-white flex items-center gap-1.5">
              Dj <span className="text-xs font-normal text-cyan-400">Group of Industry</span>
            </span>
            <span className="text-[9px] text-slate-400 tracking-widest uppercase">Architects of Autonomy</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/70 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                activeTab === link.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenPlatform}
            className="relative group overflow-hidden px-5 py-2.5 rounded-xl font-medium text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/25 flex items-center gap-2"
          >
            <Cpu className="w-4 h-4 animate-spin-slow" />
            <span>Platform Workspace</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0f1d] border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 mt-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === link.id
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              onOpenPlatform()
              setMobileMenuOpen(false)
            }}
            className="w-full mt-2 px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm flex items-center justify-center gap-2"
          >
            <Cpu className="w-4 h-4" />
            <span>Launch 6-DOF Workspace</span>
          </button>
        </div>
      )}
    </header>
  )
}
