import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, MessageSquare, Send, Sparkles, Play, Pause, Radio, RefreshCw, Bot, UserCheck, CheckCircle2 } from 'lucide-react';

export default function HumanInteractionCenter({ onVoiceCommand, hriHistory }) {
  const [inputCommand, setInputCommand] = useState('');
  const [selectedTargetRobot, setSelectedTargetRobot] = useState('BOTH'); // 'UNIT_A' | 'UNIT_B' | 'BOTH'
  const [isListening, setIsListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingRobot, setSpeakingRobot] = useState(null); // 'UNIT_A' | 'UNIT_B' | null
  const [robotConversationActive, setRobotConversationActive] = useState(false);
  const [robotDialogIndex, setRobotDialogIndex] = useState(0);

  const chatScrollRef = useRef(null);
  const conversationTimerRef = useRef(null);

  // Scripted Robot-to-Robot Face-to-Face Dialogue Sequence
  const robotToRobotSequence = [
    { speaker: 'UNIT_A', text: 'Unit-B, initializing spatial LiDAR telemetry for conveyor segment 4.', name: 'UNIT-A (CYAN CYBER)' },
    { speaker: 'UNIT_B', text: 'Telemetry received Unit-A. I have detected surface crack defect on component COMP-9041.', name: 'UNIT-B (MAGENTA ANDROID)' },
    { speaker: 'UNIT_A', text: 'Affirmative. Requesting Safety Guard validation for 6-DOF robotic arm trajectory.', name: 'UNIT-A (CYAN CYBER)' },
    { speaker: 'UNIT_B', text: 'Safety Guard checks cleared. Human operator is at a safe 2.4 meter distance. Proceeding with pick-and-place transport.', name: 'UNIT-B (MAGENTA ANDROID)' },
    { speaker: 'UNIT_A', text: 'Component transported to Rejection Bin Station. Database updated.', name: 'UNIT-A (CYAN CYBER)' },
    { speaker: 'UNIT_B', text: 'Standing by for human voice or gesture command.', name: 'UNIT-B (MAGENTA ANDROID)' }
  ];

  // Auto-scroll chat history
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [hriHistory, robotDialogIndex, robotConversationActive]);

  // Handle Autonomous Robot-to-Robot Conversation Loop
  useEffect(() => {
    if (robotConversationActive) {
      if (robotDialogIndex < robotToRobotSequence.length) {
        const item = robotToRobotSequence[robotDialogIndex];
        speakRobotVoice(item.speaker, item.text, () => {
          // Callback when finished speaking step
          conversationTimerRef.current = setTimeout(() => {
            setRobotDialogIndex(prev => prev + 1);
          }, 1200);
        });
      } else {
        setRobotConversationActive(false);
        setRobotDialogIndex(0);
      }
    }
    return () => {
      if (conversationTimerRef.current) clearTimeout(conversationTimerRef.current);
    };
  }, [robotConversationActive, robotDialogIndex]);

  // Distinct Vocal Synthesis for Unit-A vs Unit-B
  const speakRobotVoice = (speaker, text, onEndCallback) => {
    if (!('speechSynthesis' in window) || !ttsEnabled) {
      if (onEndCallback) onEndCallback();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);

    if (speaker === 'UNIT_A') {
      utterance.pitch = 0.65; // Deep authoritative mechanical voice
      utterance.rate = 0.95;
    } else if (speaker === 'UNIT_B') {
      utterance.pitch = 1.55; // High-frequency sleek android voice
      utterance.rate = 1.20;
    } else {
      utterance.pitch = 1.0;
      utterance.rate = 1.05;
    }

    utterance.volume = 1.0;

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const preferred = voices.find(v => v.lang.includes('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('David') || v.name.includes('Zira')));
      if (preferred) utterance.voice = preferred;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setSpeakingRobot(speaker);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingRobot(null);
      if (onEndCallback) onEndCallback();
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeakingRobot(null);
      if (onEndCallback) onEndCallback();
    };

    window.speechSynthesis.speak(utterance);
  };

  // Web Speech API: Speech-to-Text Microphone Input
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Web Speech Recognition API is not supported in this browser. You can type commands in the text box.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputCommand(transcript);
      handleSendHumanCommand(transcript);
    };

    recognition.start();
  };

  const handleSendHumanCommand = (textToSend) => {
    const cmd = textToSend || inputCommand;
    if (!cmd.trim()) return;

    // Trigger user prompt
    onVoiceCommand(cmd);
    setInputCommand('');

    // Speak response out loud using selected target robot voice
    const targetSpeaker = selectedTargetRobot === 'UNIT_B' ? 'UNIT_B' : 'UNIT_A';
    const responseText = `Received command: "${cmd}". Unit-${targetSpeaker === 'UNIT_A' ? 'A' : 'B'} processing task plan and spatial safety validation.`;
    speakRobotVoice(targetSpeaker, responseText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendHumanCommand(inputCommand);
  };

  const toggleRobotConversation = () => {
    if (robotConversationActive) {
      setRobotConversationActive(false);
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingRobot(null);
    } else {
      setRobotDialogIndex(0);
      setRobotConversationActive(true);
    }
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Top Banner Control Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center space-x-4">
          <Bot className="w-8 h-8 text-cyan-400" />
          <div>
            <h1 className="text-xl font-black text-slate-100 tracking-wider uppercase">DUAL-ROBOT FACE-TO-FACE TALKING ARENA</h1>
            <p className="text-xs text-slate-400">Interactive Human ↔ Robot & Autonomous Robot ↔ Robot Speech Dialogue</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button
            onClick={() => setTtsEnabled(!ttsEnabled)}
            className={`px-3 py-2 rounded-lg text-xs font-bold border flex items-center space-x-2 transition-all ${
              ttsEnabled ? 'bg-cyan-950 text-cyan-400 border-cyan-800' : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>{ttsEnabled ? 'VOICE OUT LOUD: ON' : 'VOICE MUTED'}</span>
          </button>

          <button
            onClick={toggleRobotConversation}
            className={`px-4 py-2 rounded-lg font-black text-xs uppercase tracking-wider border flex items-center space-x-2 shadow-lg transition-all ${
              robotConversationActive
                ? 'bg-amber-600 hover:bg-amber-500 text-white border-amber-400 animate-pulse'
                : 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white border-cyan-400'
            }`}
          >
            {robotConversationActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{robotConversationActive ? 'PAUSE ROBOT DEBATE' : '⚡ START ROBOTS TALKING TO EACH OTHER'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Face-to-Face Dual Robot 3D Asset Arena + Interactive Talk Console */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Dual Robots Visual Display with Holographic Speech Bubbles */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl h-[520px]">
            {/* High Quality Dual Robot Render Background */}
            <img
              src="/assets/dual_robots_talking.jpg"
              alt="Dual Robots Face-to-Face"
              className="w-full h-full object-cover opacity-85"
            />

            {/* Glowing Holographic Overlay Canvas */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60 p-6 flex flex-col justify-between">
              
              {/* Top Unit Status Headers */}
              <div className="flex justify-between items-start">
                <div className={`bg-slate-900/90 border p-3 rounded-xl backdrop-blur-md font-mono text-xs transition-all ${speakingRobot === 'UNIT_A' ? 'border-cyan-400 shadow-lg shadow-cyan-500/50 scale-105' : 'border-cyan-800/80'}`}>
                  <div className="flex items-center space-x-2">
                    <span className="h-3 w-3 rounded-full bg-cyan-400 animate-ping"></span>
                    <strong className="text-cyan-400 font-black">UNIT-A (CYAN CYBER)</strong>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">STATUS: {speakingRobot === 'UNIT_A' ? '🔊 SPEAKING OUT LOUD' : 'ONLINE'}</div>
                </div>

                <div className={`bg-slate-900/90 border p-3 rounded-xl backdrop-blur-md font-mono text-xs text-right transition-all ${speakingRobot === 'UNIT_B' ? 'border-purple-400 shadow-lg shadow-purple-500/50 scale-105' : 'border-purple-800/80'}`}>
                  <div className="flex items-center justify-end space-x-2">
                    <strong className="text-purple-300 font-black">UNIT-B (MAGENTA ANDROID)</strong>
                    <span className="h-3 w-3 rounded-full bg-purple-400 animate-ping"></span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">STATUS: {speakingRobot === 'UNIT_B' ? '🔊 SPEAKING OUT LOUD' : 'ONLINE'}</div>
                </div>
              </div>

              {/* Center Dynamic Holographic Speech Bubble */}
              {isSpeaking && (
                <div className="self-center bg-slate-900/95 border-2 border-cyan-400/80 p-5 rounded-2xl backdrop-blur-md max-w-lg shadow-2xl shadow-cyan-500/30 text-center space-y-2 animate-bounce">
                  <div className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                    HOLOGRAPHIC VOICE TRANSMISSION — {speakingRobot === 'UNIT_A' ? 'UNIT-A (CYAN)' : 'UNIT-B (MAGENTA)'}
                  </div>
                  <p className="text-sm font-semibold text-slate-100 italic">
                    "{speakingRobot === 'UNIT_A' ? robotToRobotSequence[robotDialogIndex]?.text || lastRobotSpeech : robotToRobotSequence[robotDialogIndex]?.text || lastRobotSpeech}"
                  </p>
                </div>
              )}

              {/* Bottom Target Robot Selector Bar */}
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl backdrop-blur-md flex items-center justify-between font-mono text-xs">
                <span className="text-slate-400 font-bold uppercase">SELECT ROBOT TO TALK TO:</span>
                <div className="flex space-x-2">
                  {[
                    { id: 'UNIT_A', label: 'UNIT-A (CYAN)', color: 'bg-cyan-950 text-cyan-300 border-cyan-500' },
                    { id: 'UNIT_B', label: 'UNIT-B (MAGENTA)', color: 'bg-purple-950 text-purple-300 border-purple-500' },
                    { id: 'BOTH', label: 'BOTH ROBOTS', color: 'bg-amber-950 text-amber-300 border-amber-500' }
                  ].map((target) => (
                    <button
                      key={target.id}
                      onClick={() => setSelectedTargetRobot(target.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        selectedTargetRobot === target.id
                          ? `${target.color} shadow-lg font-black`
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {target.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Voice Command Preset Buttons */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">QUICK COMMAND PRESETS TO TALK TO ROBOTS</span>
            <div className="flex flex-wrap gap-2">
              {[
                "Unit-A, inspect the component near conveyor.",
                "Unit-B, what is the surface defect status?",
                "Robots, follow me.",
                "Robots, emergency stop!"
              ].map((preset, i) => (
                <button
                  key={i}
                  onClick={() => handleSendHumanCommand(preset)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
                >
                  "{preset}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Interactive Speech Dialogue Console */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl flex flex-col justify-between h-[600px] space-y-3">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <h2 className="text-sm font-black text-slate-100 uppercase tracking-wide">ROBOT SPEECH DIALOGUE</h2>
              </div>
              <span className="px-2 py-0.5 bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px] font-bold rounded">
                LIVE STT/TTS
              </span>
            </div>

            {/* Dialogue Log */}
            <div ref={chatScrollRef} className="space-y-3 max-h-[420px] overflow-y-auto pr-1 font-mono text-xs">
              {robotConversationActive ? (
                /* Robot-to-Robot Speech History */
                robotToRobotSequence.slice(0, robotDialogIndex + 1).map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg space-y-1 ${item.speaker === 'UNIT_A' ? 'bg-cyan-950/40 border border-cyan-800' : 'bg-purple-950/40 border border-purple-800'}`}
                  >
                    <div className="flex justify-between items-center text-[10px]">
                      <strong className={item.speaker === 'UNIT_A' ? 'text-cyan-300' : 'text-purple-300'}>
                        🤖 {item.name}
                      </strong>
                      <button
                        onClick={() => speakRobotVoice(item.speaker, item.text)}
                        title="Replay Voice Out Loud"
                        className="text-amber-400 hover:text-amber-200"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-slate-200">{item.text}</p>
                  </div>
                ))
              ) : (
                /* Human to Robot Speech History */
                (hriHistory && hriHistory.length > 0 ? hriHistory : [
                  { sender: "ROBOT", text: "Dual-Robot Talking Arena active. Click the microphone or select a preset to speak with Unit-A and Unit-B out loud.", timestamp: "10:14:00" },
                  { sender: "HUMAN", text: "Unit-A, inspect that component.", timestamp: "10:14:05" },
                  { sender: "ROBOT", text: "Unit-A identified component COMP-9041 on conveyor. Navigating to begin inspection.", timestamp: "10:14:08" }
                ]).map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg space-y-1 ${msg.sender === 'HUMAN' ? 'bg-amber-950/40 border border-amber-800 ml-3' : 'bg-slate-950 border border-slate-800 mr-3'}`}
                  >
                    <div className="flex justify-between items-center text-[10px]">
                      <strong className={msg.sender === 'HUMAN' ? 'text-amber-300' : 'text-cyan-300'}>
                        {msg.sender === 'HUMAN' ? '👤 HUMAN OPERATOR' : '🤖 PAI ROBOT'}
                      </strong>
                      <span>{msg.timestamp || '10:14'}</span>
                    </div>
                    <p className="text-slate-200">{msg.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Microphone & Send Input Bar */}
          <form onSubmit={handleSubmit} className="pt-3 border-t border-slate-800 flex space-x-2 items-center">
            {/* Live Mic Button */}
            <button
              type="button"
              onClick={startListening}
              title="Click to speak to robots with your microphone"
              className={`p-3 rounded-xl font-bold text-white transition-all flex items-center justify-center space-x-1 shadow-lg ${
                isListening
                  ? 'bg-red-600 border-2 border-red-400 animate-bounce shadow-red-900/80 scale-105'
                  : 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white border border-cyan-400'
              }`}
            >
              <Mic className="w-5 h-5 text-white animate-pulse" />
              <span className="text-xs font-black uppercase">{isListening ? 'LISTENING...' : 'SPEAK NOW'}</span>
            </button>

            <input
              type="text"
              value={inputCommand}
              onChange={(e) => setInputCommand(e.target.value)}
              placeholder={isListening ? "Listening to your voice..." : "Type command or click SPEAK NOW..."}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            />

            <button
              type="submit"
              className="p-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
