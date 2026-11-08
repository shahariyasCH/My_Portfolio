"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Send,
  Sparkles,
  ArrowUpRight,
  Bot,
  User,
  Briefcase,
  Layers,
  GraduationCap,
  Mail,
  Phone,
  FileText,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface Message {
  id: string;
  sender: "assistant" | "user";
  text: string;
  timestamp: string;
  action?: {
    type: "scroll" | "email" | "resume" | "call" | "link";
    target?: string;
    label: string;
  };
}

interface AssistantProps {
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  resumeUrl?: string;
}

export default function ShahariyasAssistant({
  name = "Shahariyas",
  title = "Python Full Stack Developer & Lead Automation Engineer",
  email = "shahariyaschatheri10@gmail.com",
  phone = "+971 54 153 3979",
  location = "Dubai, UAE",
  resumeUrl = "/resume.pdf",
}: AssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [transcriptPreview, setTranscriptPreview] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro-1",
      sender: "assistant",
      text: `Hello! I'm Shahariyas Assistant, an interactive voice and chat AI built to answer anything about Shahariyas—his backend engineering experience, Python & Django skills, UiPath automations, featured projects, or how to hire him. How can I help you today?`,
      timestamp: "Just now",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize Speech Synthesis and Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;

      // Listen for custom trigger from any button on page
      const handleOpenEvent = (e: any) => {
        setIsOpen(true);
        if (e.detail?.query) {
          handleUserQuery(e.detail.query);
        }
      };
      window.addEventListener("open-shahariyas-assistant", handleOpenEvent);

      // Setup SpeechRecognition
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onstart = () => {
          setIsListening(true);
          setTranscriptPreview("Listening... speak now");
        };

        recognition.onresult = (event: any) => {
          let currentTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscriptPreview(currentTranscript);
          if (event.results[0].isFinal) {
            handleUserQuery(currentTranscript);
            recognition.stop();
          }
        };

        recognition.onerror = (event: any) => {
          console.warn("Speech recognition error:", event.error);
          setIsListening(false);
          setTranscriptPreview("");
        };

        recognition.onend = () => {
          setIsListening(false);
          setTranscriptPreview("");
        };

        recognitionRef.current = recognition;
      }

      return () => {
        window.removeEventListener("open-shahariyas-assistant", handleOpenEvent);
        if (synthRef.current) {
          synthRef.current.cancel();
        }
      };
    }
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSpeaking, isListening]);

  // Text-To-Speech Function
  const speakText = (text: string) => {
    if (!voiceEnabled || !synthRef.current) return;

    synthRef.current.cancel(); // Cancel any existing speech

    // Clean markdown/bullet points for spoken audio
    const spokenText = text
      .replace(/[#*•_`]/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .slice(0, 300); // Keep spoken answer concise

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    // Pick a natural english voice if available
    const voices = synthRef.current.getVoices();
    const naturalVoice =
      voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.includes("Natural") ||
            v.name.includes("Google") ||
            v.name.includes("Samantha") ||
            v.name.includes("Daniel"))
      ) || voices.find((v) => v.lang.startsWith("en"));

    if (naturalVoice) utterance.voice = naturalVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleMic = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      stopSpeaking();
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.warn("Recognition start error:", e);
      }
    }
  };

  // Comprehensive Knowledge Base Engine
  const answerKnowledge = (query: string): { text: string; action?: Message["action"] } => {
    const q = query.toLowerCase().trim();

    // 1. Who is Shahariyas / Background
    if (
      q.includes("who is") ||
      q.includes("about") ||
      q.includes("introduce") ||
      q.includes("yourself") ||
      q.includes("bio") ||
      q.includes("background")
    ) {
      return {
        text: `Shahariyas is a Python Full Stack Developer and Lead Automation Engineer based in ${location}. He specializes in architecting scalable Django REST APIs, building modern React frontends, and engineering autonomous enterprise bots with UiPath and n8n.`,
        action: {
          type: "scroll",
          target: "#about",
          label: "Read Full About Story",
        },
      };
    }

    // 2. Experience & Roles
    if (
      q.includes("experience") ||
      q.includes("work") ||
      q.includes("job") ||
      q.includes("company") ||
      q.includes("career") ||
      q.includes("history") ||
      q.includes("intellijhon") ||
      q.includes("luminar")
    ) {
      return {
        text: `Shahariyas has dual professional experience in Kerala:
1. Lead Automation Developer at Intellijhon, Kochi (Sep 2025 – Present), engineering high-volume UiPath bot flows and automated queue management.
2. Python Full Stack Developer at Luminar Techno Lab, Kochi (Sep 2024 – Present), designing Django REST APIs, database migrations, and React interfaces.`,
        action: {
          type: "scroll",
          target: "#experience",
          label: "View Work Experience Ledger",
        },
      };
    }

    // 3. Technical Skills & Tools
    if (
      q.includes("skill") ||
      q.includes("stack") ||
      q.includes("tech") ||
      q.includes("python") ||
      q.includes("django") ||
      q.includes("react") ||
      q.includes("uipath") ||
      q.includes("language") ||
      q.includes("database")
    ) {
      return {
        text: `Shahariyas's core technical stack includes:
• Backend: Python, Django, Django REST Framework, JWT Auth, REST APIs, Celery, Redis
• Frontend & Mobile: React.js, Next.js, Flutter, Tailwind CSS
• Automation & RPA: UiPath, Automation Anywhere, n8n, Web Scraping
• Databases: PostgreSQL, MySQL, SQLite
• DevOps & Tools: Docker, Git, Linux, CI/CD, Postman`,
        action: {
          type: "scroll",
          target: "#skills",
          label: "Explore Skills Matrix",
        },
      };
    }

    // 4. Projects
    if (
      q.includes("project") ||
      q.includes("built") ||
      q.includes("portfolio") ||
      q.includes("ecommerce") ||
      q.includes("dams") ||
      q.includes("app")
    ) {
      return {
        text: `Shahariyas has engineered several production-grade applications, notably:
1. Full Stack E-Commerce Platform: Built with Django REST Framework, React, PostgreSQL, JWT Authentication, and Razorpay payment processing.
2. Disaster Alert & Management System (DAMS): A crisis response coordination system with real-time geolocation mapping, SOS alert broadcasts, and volunteer routing.`,
        action: {
          type: "scroll",
          target: "#projects",
          label: "Inspect Featured Projects",
        },
      };
    }

    // 5. Contact & How to Hire
    if (
      q.includes("contact") ||
      q.includes("email") ||
      q.includes("phone") ||
      q.includes("call") ||
      q.includes("reach") ||
      q.includes("hire") ||
      q.includes("interview") ||
      q.includes("available") ||
      q.includes("whatsapp") ||
      q.includes("dubai")
    ) {
      if (q.includes("whatsapp")) {
        return {
          text: `You can reach Shahariyas directly on WhatsApp at ${phone} for quick messages, discussions, and interview coordination!`,
          action: {
            type: "link",
            target: `https://wa.me/${phone.replace(/[^0-9]/g, "")}`,
            label: `Open WhatsApp (${phone})`,
          },
        };
      }
      return {
        text: `Shahariyas is based in ${location} and actively open to full-stack engineering, Python backend, and AI/automation opportunities.
• Phone: ${phone}
• Email: ${email}
• Location: ${location} (Available immediately, open to remote and local UAE opportunities)
Feel free to contact him directly via email or WhatsApp!`,
        action: {
          type: "link",
          target: `https://wa.me/${phone.replace(/[^0-9]/g, "")}`,
          label: `Chat on WhatsApp (${phone})`,
        },
      };
    }

    // 6. Resume / CV
    if (
      q.includes("resume") ||
      q.includes("cv") ||
      q.includes("download") ||
      q.includes("pdf")
    ) {
      return {
        text: `You can view and download Shahariyas's verified resume PDF containing complete academic records, experience timelines, and technical skill verifications.`,
        action: {
          type: "resume",
          target: resumeUrl,
          label: "Download Resume PDF",
        },
      };
    }

    // 7. Education
    if (
      q.includes("education") ||
      q.includes("degree") ||
      q.includes("college") ||
      q.includes("university") ||
      q.includes("gpa") ||
      q.includes("study")
    ) {
      return {
        text: `Shahariyas graduated with a B.Tech in Computer Science & Engineering from APJ Abdul Kalam Technological University (2020–2024, GPA: 6.7/10), preceded by Higher Secondary education at MSM HSS (2018–2020). Coursework includes System Software, DBMS, and Algorithm Design.`,
        action: {
          type: "scroll",
          target: "#education",
          label: "View Education Details",
        },
      };
    }

    // 8. Automation / RPA specifics
    if (
      q.includes("automation") ||
      q.includes("bot") ||
      q.includes("rpa") ||
      q.includes("scrape")
    ) {
      return {
        text: `As Lead Automation Developer at Intellijhon, Shahariyas engineers resilient bot architectures using UiPath, Python, and n8n. His focus is on high-volume document extraction, dynamic queue management, automated retries, and eliminating repetitive business processes.`,
        action: {
          type: "scroll",
          target: "#experience",
          label: "See Automation Roles",
        },
      };
    }

    // Default Fallback
    return {
      text: `Shahariyas is a Python Full Stack Developer & Lead Automation Engineer specializing in Django REST Framework, React, UiPath, and PostgreSQL. Would you like to view his projects, review his work experience, or download his resume?`,
      action: {
        type: "scroll",
        target: "#projects",
        label: "View Featured Projects",
      },
    };
  };

  const handleUserQuery = async (query: string) => {
    if (!query.trim() || isLoading) return;

    stopSpeaking();

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      if (!res.ok) throw new Error("Chat API non-ok status");

      const data = await res.json();
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        sender: "assistant",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        action: data.action,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      speakText(data.text);
    } catch (err) {
      console.warn("Chat API unavailable, falling back to local knowledge base:", err);
      const fallback = answerKnowledge(query);

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        sender: "assistant",
        text: fallback.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        action: fallback.action,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      speakText(fallback.text);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (action: Message["action"]) => {
    if (!action) return;

    if (action.type === "scroll" && action.target) {
      const element = document.querySelector(action.target);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (action.type === "email" && action.target) {
      window.location.href = action.target;
    } else if ((action.type === "resume" || action.type === "link") && action.target) {
      window.open(action.target, "_blank");
    } else if (action.type === "call" && action.target) {
      window.location.href = action.target;
    }
  };

  const quickPrompts = [
    "💼 Work Experience",
    "🛠️ Tech Stack & Skills",
    "🚀 Featured Projects",
    "🎓 Education & GPA",
    "📬 Contact & Hire",
  ];

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3">
        {/* Subtle Greeting Pill on first visit */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="hidden sm:inline-flex items-center space-x-2 px-3.5 py-2 rounded-full bg-white/95 border border-indigo-100 shadow-[0_4px_20px_rgba(99,102,241,0.14)] text-xs font-medium text-slate-800 hover:border-indigo-300 transition-all cursor-pointer backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span>✦ Ask Shahariyas Assistant</span>
          </button>
        )}

        {/* Circular AI Orb Button */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            stopSpeaking();
          }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 via-sky-500 to-violet-600 p-[2px] shadow-[0_8px_25px_rgba(79,70,229,0.35)] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          aria-label="Toggle Shahariyas AI Voice Assistant"
        >
          {/* Inner Core */}
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center relative overflow-hidden">
            {/* Luminous rotating aura */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-sky-400/20 to-violet-500/20 animate-spin duration-7000" />
            
            {isOpen ? (
              <X className="w-6 h-6 text-slate-800 relative z-10" />
            ) : isSpeaking ? (
              /* Animated Audio Wave */
              <div className="flex items-center space-x-0.5 relative z-10">
                <span className="w-1 bg-indigo-600 rounded-full voice-wave-bar" />
                <span className="w-1 bg-sky-500 rounded-full voice-wave-bar" />
                <span className="w-1 bg-violet-600 rounded-full voice-wave-bar" />
                <span className="w-1 bg-indigo-600 rounded-full voice-wave-bar" />
              </div>
            ) : (
              <div className="flex items-center justify-center relative z-10">
                <Sparkles className="w-6 h-6 text-indigo-600" />
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Expandable Assistant Dialog */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[640px] h-[85vh] bg-white/95 backdrop-blur-2xl border border-indigo-100 rounded-3xl shadow-[0_25px_60px_-15px_rgba(79,70,229,0.22)] flex flex-col overflow-hidden animate-in fade-in-50 zoom-in-95 duration-200">
          {/* Assistant Header */}
          <div className="p-4 px-5 bg-gradient-to-b from-indigo-50/60 to-white/40 border-b border-indigo-50/80 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-500 p-0.5 shadow-sm">
                <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                  <Bot className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="font-bold text-sm text-slate-900 tracking-tight">
                    Shahariyas Assistant
                  </h3>
                  <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded-md border border-indigo-100">
                    AI Voice
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Online • Ready to converse</span>
                </div>
              </div>
            </div>

            {/* Header Audio Controls */}
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => {
                  if (voiceEnabled) stopSpeaking();
                  setVoiceEnabled(!voiceEnabled);
                }}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  voiceEnabled
                    ? "text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
                    : "text-slate-400 bg-slate-100 hover:bg-slate-200"
                }`}
                title={voiceEnabled ? "Voice Output Active" : "Voice Output Muted"}
              >
                {voiceEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  stopSpeaking();
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Voice Waveform Indicator */}
          {isSpeaking && (
            <div className="px-5 py-2 bg-gradient-to-r from-indigo-50 via-sky-50 to-violet-50 border-b border-indigo-100/60 flex items-center justify-between animate-in fade-in duration-150">
              <div className="flex items-center space-x-2 text-xs font-medium text-indigo-700">
                <div className="flex items-center space-x-0.5">
                  <span className="w-1 bg-indigo-600 rounded-full voice-wave-bar" />
                  <span className="w-1 bg-sky-500 rounded-full voice-wave-bar" />
                  <span className="w-1 bg-violet-600 rounded-full voice-wave-bar" />
                  <span className="w-1 bg-indigo-600 rounded-full voice-wave-bar" />
                </div>
                <span>Shahariyas Assistant is speaking...</span>
              </div>
              <button
                onClick={stopSpeaking}
                className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 underline cursor-pointer"
              >
                Stop
              </button>
            </div>
          )}

          {/* Active Mic Listening Indicator */}
          {isListening && (
            <div className="px-5 py-2.5 bg-rose-50 border-b border-rose-100 flex items-center space-x-3 text-xs text-rose-800 animate-in fade-in duration-150">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping shrink-0" />
              <span className="font-medium truncate">
                {transcriptPreview || "Listening... ask me anything!"}
              </span>
            </div>
          )}

          {/* Chat Messages Stream */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 space-y-2 leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-indigo-600 to-sky-600 text-white rounded-tr-none shadow-sm"
                      : "bg-slate-100/90 text-slate-800 rounded-tl-none border border-slate-200/60"
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {/* Interactive Action Button */}
                  {msg.action && (
                    <button
                      onClick={() => handleActionClick(msg.action)}
                      className="mt-2 inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white text-indigo-700 hover:bg-indigo-50 border border-indigo-200 shadow-xs transition-colors cursor-pointer"
                    >
                      <span>{msg.action.label}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <span className="text-[10px] text-slate-400 mt-1 px-1 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Thinking / Generating Indicator */}
            {isLoading && (
              <div className="flex flex-col items-start animate-in fade-in duration-150">
                <div className="max-w-[88%] rounded-2xl p-3 bg-slate-100/90 text-slate-600 rounded-tl-none border border-slate-200/60 flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Shahariyas Assistant is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="p-2.5 px-4 bg-slate-50/80 border-t border-slate-100 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleUserQuery(prompt.replace(/^[^\w]+/, ""))}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-indigo-300 text-[11px] font-medium text-slate-700 hover:text-indigo-700 transition-colors shadow-2xs shrink-0 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input & Voice Controls */}
          <div className="p-3 px-4 bg-white border-t border-slate-100 flex items-center space-x-2">
            {/* Microphone Button */}
            <button
              onClick={toggleMic}
              className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                isListening
                  ? "bg-rose-500 text-white shadow-md shadow-rose-500/30 animate-pulse"
                  : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
              }`}
              title={isListening ? "Stop listening" : "Speak to Shahariyas Assistant"}
            >
              {isListening ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleUserQuery(inputText);
                }
              }}
              placeholder="Ask anything or use voice..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
            />

            {/* Send Button */}
            <button
              onClick={() => handleUserQuery(inputText)}
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition-all cursor-pointer disabled:cursor-not-allowed shadow-xs"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
