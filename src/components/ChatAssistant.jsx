import React, { useState } from 'react'
import { Bot, MessageSquare, Send, X, Sparkles, ChevronRight, FileText } from 'lucide-react'

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am the DJ Group AI Expert Assistant. How can I assist you with industrial robotics, URDF kinematics, or Nav2 ROS node state today?'
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const quickPrompts = [
    { label: 'What is a robot?', query: 'What is a robot and how does DJ Group define cognitive industrial cobots?' },
    { label: 'Analyze URDF Kinematics', query: 'Analyze URDF Kinematics and explain DLS Inverse Kinematics.' },
    { label: 'Industry 5.0 & Cobots', query: 'What are Industry 5.0 Cobots and how do they ensure zero-gate human safety?' },
    { label: 'Generate PDF Audit', query: 'Generate PDF Audit Report for active 6-DOF industrial robot arms.' }
  ]

  const handleSend = (textToSend) => {
    const query = textToSend || input
    if (!query.trim()) return

    // Add User Message
    const newMsgs = [...messages, { sender: 'user', text: query }]
    setMessages(newMsgs)
    if (!textToSend) setInput('')
    setIsTyping(true)

    // Simulate AI Response
    setTimeout(() => {
      let botResponse = ""
      const qLower = query.toLowerCase()

      if (qLower.includes('what is a robot')) {
        botResponse = "🤖 **A Robot** is an autonomous or semi-autonomous electromechanical system governed by software perception, kinematics controllers, and sensor feedback loops. At DJ Group, our 6-DOF Cobots combine optical vision, haptic force sensing, and edge AI cores for sub-millimeter factory automation."
      } else if (qLower.includes('urdf') || qLower.includes('kinematics')) {
        botResponse = "📐 **URDF Kinematics Analysis**: Our 6-DOF arms utilize Damped Least Squares (DLS) Inverse Kinematics to handle kinematic singularities smoothly, maintaining trajectory continuity even when the Yoshikawa Manipulability Index drops below 0.12."
      } else if (qLower.includes('industry 5.0') || qLower.includes('cobot')) {
        botResponse = "🤝 **Industry 5.0 & Collaborative Cobots**: Industry 5.0 prioritizes human-robot collaboration. DJ Group cobots feature zero-gate safety barriers, human pose tracking, and real-time haptic torque sensing to immediately pause or alter trajectory upon human touch."
      } else if (qLower.includes('pdf') || qLower.includes('audit')) {
        botResponse = "📑 **Executive PDF Audit Report Summary**:\n\n- **Plant OEE Score**: 88.4% (World-Class)\n- **Active Robots**: 6-DOF Industrial Arm, AGRO-R1 AMR, Logistics AMR Fleet\n- **Total Completed Jobs**: 434 Tasks\n- **Defect Rate**: 0.6% (Audited via OpenCV Pipeline)"
      } else {
        botResponse = `⚡ **DJ AI Assistant**: Regarding "${query}" — DJ Group sovereign robotics platforms provide edge-deployed AI controllers with sub-millimeter precision, 6-DOF trajectory planning, and 24/7 autonomous plant synchronization.`
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }])
      setIsTyping(false)
    }, 800)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-2xl shadow-cyan-500/40 hover:scale-110 transition-all duration-300 flex items-center justify-center"
        >
          <Bot className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-[#070b14] animate-ping" />
        </button>
      )}

      {/* Chat Window Container */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[540px] rounded-2xl glass-panel-glow flex flex-col overflow-hidden shadow-2xl animate-fade-in border border-cyan-500/40">
          
          {/* Header */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">DJ Expert Assistant</h3>
                <p className="text-[10px] text-cyan-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>AI Robotics Core Online</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono">
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                onClick={() => handleSend(qp.query)}
                className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-800 whitespace-nowrap transition-colors shrink-0"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none font-sans'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.text}</div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono animate-pulse">
                  DJ AI is thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about 6-DOF cobots, ROS 2, or URDF..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  )
}
