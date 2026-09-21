import React, { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Solutions from './components/Solutions'
import Architecture from './components/Architecture'
import Evolution from './components/Evolution'
import AboutUs from './components/AboutUs'
import RegionalHubs from './components/RegionalHubs'
import Testimonials from './components/Testimonials'
import Blog from './components/Blog'
import ContactPage from './components/ContactPage'
import Illustrations from './components/Illustrations'
import Footer from './components/Footer'
import CrestModal from './components/CrestModal'
import PlatformLayout from './components/PlatformLayout'
import PAI_AIBot from './components/pai_ir/PAI_AIBot'
import Workforce25Film from './components/Workforce25Film'

export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [isCrestModalOpen, setIsCrestModalOpen] = useState(false)
  const [isPlatformOpen, setIsPlatformOpen] = useState(false)
  const [activeSubRoute, setActiveSubRoute] = useState('pai-ir')

  const handleOpenPlatform = (subRoute = 'pai-ir') => {
    setActiveSubRoute(subRoute)
    setIsPlatformOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToSite = () => {
    setIsPlatformOpen(false)
    setActiveTab('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // If Platform Workspace is toggled or 'industrial-ai' tab is selected, render full PlatformLayout
  if (isPlatformOpen || activeTab === 'industrial-ai') {
    return (
      <PlatformLayout
        activeSubRoute={activeSubRoute}
        onNavigateSubRoute={(route) => setActiveSubRoute(route)}
        onBackToSite={handleBackToSite}
      />
    )
  }

  return (
    <div className="relative min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      
      {/* Total Site ROBOCORP 25 Master Infographic Background Wallpaper */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-15 pointer-events-none mix-blend-luminosity scale-105"
        style={{ backgroundImage: "url('/assets/robocorp25_master_bg.jpg')" }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#070b14]/60 via-[#070b14]/85 to-[#070b14] pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1">
        {/* Fixed Site Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenCrest={() => setIsCrestModalOpen(true)}
          onOpenPlatform={() => handleOpenPlatform('pai-ir')}
        />

      {/* Main Content Sections based on Active Tab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-6">
            <Hero onOpenPlatform={() => handleOpenPlatform('pai-ir')} onExplore={() => setActiveTab('services')} />
            
            {/* Quick Section Highlights Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <button
                  onClick={() => setActiveTab('about')}
                  className="p-5 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all text-left group"
                >
                  <span className="text-xs font-mono text-cyan-400 block mb-1">01. COMPANY</span>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300">About Us &rarr;</h4>
                </button>

                <button
                  onClick={() => setActiveTab('services')}
                  className="p-5 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all text-left group"
                >
                  <span className="text-xs font-mono text-cyan-400 block mb-1">02. SOLUTIONS</span>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300">Services &rarr;</h4>
                </button>

                <button
                  onClick={() => setActiveTab('illustrations')}
                  className="p-5 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all text-left group"
                >
                  <span className="text-xs font-mono text-cyan-400 block mb-1">03. GALLERY</span>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300">Illustrations &rarr;</h4>
                </button>

                <button
                  onClick={() => setActiveTab('blog')}
                  className="p-5 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all text-left group"
                >
                  <span className="text-xs font-mono text-cyan-400 block mb-1">04. INSIGHTS</span>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300">Engineering Blog &rarr;</h4>
                </button>

                <button
                  onClick={() => setActiveTab('contact')}
                  className="p-5 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all text-left group col-span-2 md:col-span-1"
                >
                  <span className="text-xs font-mono text-cyan-400 block mb-1">05. REACH OUT</span>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300">Contact Us &rarr;</h4>
                </button>
              </div>
            </div>

            <Testimonials />
          </div>
        )}

        {activeTab === 'workforce-film' && (
          <div className="pt-20">
            <Workforce25Film />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="pt-20">
            <AboutUs />
            <Evolution />
            <RegionalHubs />
          </div>
        )}

        {activeTab === 'services' && (
          <div className="pt-20">
            <Solutions onSelectSolution={(sol) => handleOpenPlatform(sol)} />
            <Architecture />
          </div>
        )}

        {activeTab === 'illustrations' && (
          <div className="pt-20">
            <Illustrations />
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="pt-20">
            <Blog />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="pt-20">
            <ContactPage />
          </div>
        )}
      </main>

      {/* Site Footer */}
      <Footer setActiveTab={setActiveTab} onOpenPlatform={() => handleOpenPlatform('pai-ir')} />

      {/* Crest Logo Modal */}
      <CrestModal isOpen={isCrestModalOpen} onClose={() => setIsCrestModalOpen(false)} />

      {/* Floating PAI AI Copilot Bot */}
      <PAI_AIBot />
      </div>
    </div>
  )
}
