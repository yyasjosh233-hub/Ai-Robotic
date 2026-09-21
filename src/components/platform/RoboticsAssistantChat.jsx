import React, { useState } from 'react'
import { 
  Bot, Send, Plus, Search, ThumbsUp, ThumbsDown, Copy, RefreshCw, 
  Check, BookOpen, FileText, AlertCircle, Sparkles, MessageSquare, ExternalLink
} from 'lucide-react'

export default function RoboticsAssistantChat({ workspaceId, initialRoute }) {
  const [chats, setChats] = useState([
    { id: '1', title: 'ROS 2 QoS Mismatches', active: true },
    { id: '2', title: 'Nav2 Costmap Clearance Issue', active: false },
    { id: '3', title: 'URDF Kinematic Singularity', active: false },
    { id: '4', title: 'Gazebo Ignition Sensor Noise', active: false }
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [activeChatId, setActiveChatId] = useState('1')
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [feedbackState, setFeedbackState] = useState({})

  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'user',
      author: 'Operator',
      text: 'Why is my ROS 2 subscriber not receiving messages?'
    },
    {
      id: 'msg-2',
      sender: 'bot',
      author: 'Robotics Copilot',
      text: 'This is usually caused by mismatched QoS profile requirements. For instance, if your publisher is configured as Best Effort and your subscriber is configured as Reliable [1], the DDS middleware will silently ignore the subscription link. Change your subscriber to Best Effort to resolve this [1].',
      citationTag: '[1]',
      trustedSources: ['[1] ROS 2 QoS Settings (Open Robotics)'],
      confidence: 'HIGH (85%)',
      confidenceNote: 'Matches official ROS 2 QoS profile guides.'
    }
  ])

  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleNewChat = () => {
    const newId = String(Date.now())
    const newChat = { id: newId, title: 'New Robotics Discussion', active: true }
    setChats(prev => prev.map(c => ({ ...c, active: false })).concat(newChat))
    setActiveChatId(newId)
    setMessages([
      {
        id: 'msg-welcome',
        sender: 'bot',
        author: 'Robotics Copilot',
        text: 'Hello Operator 👋 How can I assist with your ROS 2 nodes, Nav2 costmaps, URDF kinematics, or DDS telemetry parameters today?',
        trustedSources: ['[1] ROS 2 Humble Documentation'],
        confidence: 'HIGH (95%)',
        confidenceNote: 'Connected to local RAG vector store.'
      }
    ])
  }

  const handleSelectChat = (id) => {
    setActiveChatId(id)
    setChats(prev => prev.map(c => ({ ...c, active: c.id === id })))
  }

  const handleSend = (textToSend) => {
    const q = textToSend || input
    if (!q.trim()) return

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      author: 'Operator',
      text: q
    }

    setMessages(prev => [...prev, userMsg])
    if (!textToSend) setInput('')
    setIsTyping(true)

    setTimeout(() => {
      let botResp = {}
      const qLower = q.toLowerCase()

      if (qLower.includes('qos') || qLower.includes('subscriber') || qLower.includes('not receiving')) {
        botResp = {
          id: `msg-bot-${Date.now()}`,
          sender: 'bot',
          author: 'Robotics Copilot',
          text: 'This is usually caused by mismatched QoS profile requirements. For instance, if your publisher is configured as Best Effort and your subscriber is configured as Reliable [1], the DDS middleware will silently ignore the subscription link. Change your subscriber to Best Effort to resolve this [1].',
          citationTag: '[1]',
          trustedSources: ['[1] ROS 2 QoS Settings (Open Robotics)'],
          confidence: 'HIGH (85%)',
          confidenceNote: 'Matches official ROS 2 QoS profile guides.'
        }
      } else if (qLower.includes('costmap') || qLower.includes('nav2') || qLower.includes('drift')) {
        botResp = {
          id: `msg-bot-${Date.now()}`,
          sender: 'bot',
          author: 'Robotics Copilot',
          text: 'Nav2 costmap clearing delays occur when laser scan update frequency drops below local costmap update_frequency (default 5.0Hz) [1]. Ensure TF2 transform odom -> base_link latency is under 20ms to prevent inflation layer drift [2].',
          citationTag: '[1]',
          trustedSources: ['[1] Nav2 Tuning Guide', '[2] TF2 Transform Best Practices'],
          confidence: 'HIGH (92%)',
          confidenceNote: 'Verified against Nav2 stack diagnostics.'
        }
      } else if (qLower.includes('urdf') || qLower.includes('kinematic') || qLower.includes('singularity')) {
        botResp = {
          id: `msg-bot-${Date.now()}`,
          sender: 'bot',
          author: 'Robotics Copilot',
          text: 'URDF kinematic singularities occur when 6-DOF joint 4 and joint 6 axes align [1]. Damped Least Squares (DLS) IK solver prevents joint velocity explosion by introducing a damping factor λ=0.02 near singular configurations [1].',
          citationTag: '[1]',
          trustedSources: ['[1] KDL Kinematic Solver Reference'],
          confidence: 'HIGH (88%)',
          confidenceNote: 'Matches ROS 2 MoveIt 2 DLS algorithm specs.'
        }
      } else {
        botResp = {
          id: `msg-bot-${Date.now()}`,
          sender: 'bot',
          author: 'Robotics Copilot',
          text: `Regarding your query "${q}" [1]: Workspace [${workspaceId.toUpperCase()}] ROS 2 daemon confirms topic links are operating normally. Check /rosout logs for specific node warnings [1].`,
          citationTag: '[1]',
          trustedSources: [`[1] Workspace ${workspaceId.toUpperCase()} Telemetry Mirror`],
          confidence: 'HIGH (89%)',
          confidenceNote: 'Verified against live ROS 2 topic graph.'
        }
      }

      setMessages(prev => [...prev, botResp])
      setIsTyping(false)
    }, 750)
  }

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(idx)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleFeedback = (msgId, type) => {
    setFeedbackState(prev => ({ ...prev, [msgId]: type }))
  }

  const filteredChats = chats.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-140px)] min-h-[550px] font-sans text-slate-100">
      
      {/* 1. LEFT SIDEBAR (Matching Screenshot 1:1) */}
      <div className="w-full md:w-64 bg-[#060a0d] border border-slate-800 rounded-2xl p-4 flex flex-col shrink-0 space-y-3 font-mono">
        
        {/* + New Chat Button (Yellow) */}
        <button
          onClick={handleNewChat}
          className="w-full py-2.5 px-4 rounded-xl bg-[#facc15] hover:bg-yellow-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-yellow-500/20 transition-all cursor-pointer"
        >
          <span>+</span>
          <span>New Chat</span>
        </button>

        {/* Search Chats Input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chats..."
            className="w-full px-3 py-2 rounded-xl bg-[#090e12] border border-slate-800 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-yellow-400/50"
          />
        </div>

        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto space-y-1.5 pt-1">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleSelectChat(chat.id)}
              className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                chat.active
                  ? 'bg-[#121c17] text-white border border-emerald-900/60 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">{chat.title}</span>
            </div>
          ))}
        </div>

      </div>

      {/* 2. MAIN CHAT AREA (Matching Screenshot 1:1) */}
      <div className="flex-1 bg-[#060b12] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between overflow-hidden relative font-sans">
        
        {/* Messages Stream Scroll Container */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {messages.map((m, idx) => (
            <div key={m.id || idx} className="space-y-1">
              
              {/* User Message */}
              {m.sender === 'user' && (
                <div className="flex items-start justify-end gap-3">
                  <div className="p-4 rounded-2xl bg-[#0f1915] border border-slate-800/80 max-w-xl text-right space-y-1 shadow-sm">
                    <div className="text-xs font-mono font-semibold text-slate-400">
                      {m.author || 'Operator'}
                    </div>
                    <div className="text-sm text-white font-medium">
                      {m.text}
                    </div>
                  </div>
                  
                  {/* User Yellow Avatar Badge (Matching screenshot 1:1) */}
                  <div className="w-8 h-8 rounded-full bg-[#facc15] text-black font-extrabold flex items-center justify-center text-xs shrink-0 shadow-md">
                    OP
                  </div>
                </div>
              )}

              {/* Robotics Copilot Bot Response */}
              {m.sender === 'bot' && (
                <div className="flex items-start justify-start gap-3">
                  
                  {/* Bot Robot Avatar */}
                  <div className="w-8 h-8 rounded-full bg-[#1c2436] border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0 shadow-md">
                    <Bot className="w-4 h-4" />
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0a1218] border border-slate-800/90 max-w-2xl space-y-4 shadow-md">
                    <div className="text-xs font-mono font-semibold text-slate-400">
                      {m.author || 'Robotics Copilot'}
                    </div>

                    {/* Response Main Body */}
                    <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans space-y-2">
                      <p>
                        {m.text.split('[1]').map((part, i, arr) => (
                          <React.Fragment key={i}>
                            {part}
                            {i < arr.length - 1 && (
                              <span className="bg-yellow-500/20 text-[#facc15] border border-yellow-500/40 px-1 py-0.5 rounded text-[10px] font-bold font-mono mx-0.5">
                                [1]
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </p>
                    </div>

                    {/* TRUSTED SOURCES Row (Matching screenshot 1:1) */}
                    {m.trustedSources && m.trustedSources.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                          TRUSTED SOURCES:
                        </span>
                        {m.trustedSources.map((source, sIdx) => (
                          <span
                            key={sIdx}
                            className="bg-yellow-500/10 text-[#facc15] border border-yellow-500/40 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 hover:bg-yellow-500/20 cursor-pointer transition-all"
                          >
                            {source}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* CONFIDENCE Score Row (Matching screenshot 1:1) */}
                    {m.confidence && (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 font-mono text-xs border-t border-slate-800/60">
                        <div className="text-emerald-400 font-bold">
                          CONFIDENCE:<span className="text-emerald-400 font-extrabold ml-1">{m.confidence}</span>
                        </div>
                        {m.confidenceNote && (
                          <div className="text-slate-400 text-xs font-sans">
                            {m.confidenceNote}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Buttons Row (Matching screenshot 1:1) */}
                    <div className="flex items-center gap-2 pt-2 font-mono text-xs border-t border-slate-800/60">
                      <button
                        onClick={() => handleCopy(m.text, idx)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                      >
                        {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedIndex === idx ? 'Copied' : 'Copy Answer'}</span>
                      </button>

                      <button
                        onClick={() => handleSend(messages[messages.length - 2]?.text || 'Regenerate')}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-yellow-400" />
                        <span>Regenerate</span>
                      </button>

                      <button
                        onClick={() => handleFeedback(m.id, 'up')}
                        className={`p-1.5 rounded-lg border transition-all ${
                          feedbackState[m.id] === 'up'
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-600'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-800'
                        }`}
                        title="Helpful"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleFeedback(m.id, 'down')}
                        className={`p-1.5 rounded-lg border transition-all ${
                          feedbackState[m.id] === 'down'
                            ? 'bg-rose-950 text-rose-400 border-rose-600'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-800'
                        }`}
                        title="Not Helpful"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>
              )}

            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1c2436] text-cyan-400 flex items-center justify-center">
                <Bot className="w-4 h-4 animate-bounce" />
              </div>
              <div className="p-3.5 rounded-2xl bg-[#0a1218] border border-slate-800 text-xs font-mono text-cyan-400 animate-pulse">
                Robotics Copilot is searching ROS 2 vector store and DDS QoS policies...
              </div>
            </div>
          )}
        </div>

        {/* Bottom Input Area (Matching Screenshot 1:1) */}
        <div className="pt-3 border-t border-slate-800 flex items-center gap-3 font-mono">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a robotics query (e.g. 'explain joint limits' or 'why does my map drift?')..."
            className="flex-1 px-4 py-3 rounded-xl bg-[#050a0f] border border-slate-800 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-yellow-400/60"
          />
          <button
            onClick={() => handleSend()}
            className="px-6 py-3 rounded-xl bg-[#facc15] hover:bg-yellow-400 text-black font-bold text-xs shadow-md shadow-yellow-500/20 transition-all cursor-pointer whitespace-nowrap"
          >
            Send
          </button>
        </div>

      </div>

    </div>
  )
}
