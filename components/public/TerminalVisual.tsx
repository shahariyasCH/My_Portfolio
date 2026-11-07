"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, CheckCircle2, Sparkles, Send } from "lucide-react";

interface TerminalVisualProps {
  name?: string;
  title?: string;
  availability?: string;
  skills?: string[];
}

export default function TerminalVisual({
  name = "Shahariyas",
  title = "Python Full Stack Developer & Automation Engineer",
  availability = "Open to opportunities",
  skills = ["Python", "Django", "React", "UiPath", "n8n", "PostgreSQL", "Docker"],
}: TerminalVisualProps) {
  const [history, setHistory] = useState<
    Array<{ type: "cmd" | "output" | "system"; text: string; color?: string }>
  >([
    { type: "system", text: "⚡ shahariyas-os v2.6.0 (x86_64-node-env)", color: "text-slate-400" },
    { type: "system", text: "Type 'help' for available interactive commands.", color: "text-slate-500" },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isTypingCycle, setIsTypingCycle] = useState(true);
  const [demoStep, setDemoStep] = useState(0);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const demoCommands = [
    { cmd: "whoami", output: `Shahariyas :: ${title}` },
    { cmd: "skills --core", output: `[ ${skills.slice(0, 5).join(", ")} ]` },
    { cmd: "status --check", output: `Status: 🟢 ${availability} | Location: Dubai, UAE` },
  ];

  // Auto-typing demo simulation
  useEffect(() => {
    if (!isTypingCycle) return;

    const currentDemo = demoCommands[demoStep % demoCommands.length];
    let charIndex = 0;
    let typedText = "";

    const typeInterval = setInterval(() => {
      if (charIndex < currentDemo.cmd.length) {
        typedText += currentDemo.cmd[charIndex];
        setInputVal(typedText);
        charIndex++;
      } else {
        clearInterval(typeInterval);

        // Execute command after a small pause
        setTimeout(() => {
          setHistory((prev) => [
            ...prev,
            { type: "cmd", text: `$ ${currentDemo.cmd}` },
            { type: "output", text: currentDemo.output, color: "text-cyan-300" },
          ]);
          setInputVal("");

          // Wait before starting next command
          setTimeout(() => {
            setDemoStep((prev) => (prev + 1) % demoCommands.length);
          }, 3500);
        }, 600);
      }
    }, 90);

    return () => clearInterval(typeInterval);
  }, [demoStep, isTypingCycle]);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    setIsTypingCycle(false); // Stop automated cycle once user interacts
    const rawCmd = inputVal.trim();
    const cmd = rawCmd.toLowerCase();

    const newHistory = [...history, { type: "cmd" as const, text: `$ ${rawCmd}` }];

    switch (cmd) {
      case "help":
        newHistory.push({
          type: "output",
          text: "Available commands: whoami, skills, projects, contact, status, clear, resume",
          color: "text-emerald-400",
        });
        break;
      case "whoami":
        newHistory.push({
          type: "output",
          text: `Developer: ${name} | ${title}`,
          color: "text-cyan-300",
        });
        break;
      case "skills":
      case "skills --list":
      case "skills --core":
        newHistory.push({
          type: "output",
          text: `Core Tech: Python, Django, React, FastAPIs, UiPath, n8n, SQL, Cloud DevOps, AI Integrations`,
          color: "text-cyan-300",
        });
        break;
      case "status":
      case "status --check":
        newHistory.push({
          type: "output",
          text: `🟢 Current Status: ${availability}`,
          color: "text-emerald-300",
        });
        break;
      case "projects":
        newHistory.push({
          type: "output",
          text: `1. E-Commerce Web Application (Python/Django)\n2. Disaster Alert & Management System (Flutter/Firebase)`,
          color: "text-amber-300",
        });
        break;
      case "contact":
        newHistory.push({
          type: "output",
          text: `Email: shahariyaschatheri10@gmail.com | Phone: +971 54 153 3979`,
          color: "text-cyan-300",
        });
        break;
      case "resume":
        newHistory.push({
          type: "output",
          text: `Opening resume download... Check the navbar or hero button.`,
          color: "text-purple-300",
        });
        break;
      case "clear":
        setHistory([]);
        setInputVal("");
        return;
      default:
        newHistory.push({
          type: "output",
          text: `zsh: command not found: ${rawCmd}. Type 'help' for command list.`,
          color: "text-rose-400",
        });
    }

    setHistory(newHistory);
    setInputVal("");
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-xl overflow-hidden terminal-window font-mono text-xs sm:text-sm border border-slate-800/80">
      {/* Terminal Title Bar */}
      <div className="bg-[#12121c] px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:opacity-100 cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:opacity-100 cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:opacity-100 cursor-pointer" />
        </div>
        <div className="flex items-center space-x-1.5 text-slate-400 text-xs select-none">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>shahariyas@macbook-pro:~</span>
        </div>
        <div className="text-[10px] uppercase tracking-wider text-slate-500 px-1.5 py-0.5 rounded bg-slate-800/50">
          zsh
        </div>
      </div>

      {/* Terminal Body */}
      <div ref={terminalBodyRef} className="p-4 sm:p-5 h-[280px] sm:h-[320px] overflow-y-auto space-y-2 bg-[#0a0a10]/95 text-slate-200">
        {history.map((item, index) => (
          <div key={index} className="leading-relaxed break-words">
            {item.type === "cmd" ? (
              <div className="text-cyan-400 font-semibold flex items-center space-x-2">
                <span>{item.text}</span>
              </div>
            ) : item.type === "system" ? (
              <div className={`text-xs ${item.color || "text-slate-500"}`}>{item.text}</div>
            ) : (
              <div className={`pl-2 border-l-2 border-slate-800 whitespace-pre-line ${item.color || "text-slate-300"}`}>
                {item.text}
              </div>
            )}
          </div>
        ))}

        {/* Live Input Line */}
        <form onSubmit={handleCommandSubmit} className="flex items-center space-x-2 pt-1 text-cyan-400">
          <span className="text-emerald-400 select-none">➜</span>
          <span className="text-cyan-400 select-none">~</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => {
              setIsTypingCycle(false);
              setInputVal(e.target.value);
            }}
            placeholder={isTypingCycle ? "Interactive prompt (type 'help')..." : "Type command..."}
            className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder-slate-600 font-mono text-xs sm:text-sm"
          />
          {inputVal.length > 0 && (
            <button type="submit" className="text-xs text-cyan-400 hover:text-cyan-300">
              <Send className="w-3.5 h-3.5" />
            </button>
          )}
        </form>
      </div>

      {/* Footer bar */}
      <div className="bg-[#0e0e16] px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/60">
        <span className="flex items-center space-x-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Live Session Connected</span>
        </span>
        <span className="hidden sm:inline">UTF-8 • Node v22</span>
      </div>
    </div>
  );
}
