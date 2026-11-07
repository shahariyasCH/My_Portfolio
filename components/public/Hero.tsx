"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  Mail,
  Check,
  Copy,
  MapPin,
  Briefcase,
  Layers,
  Sparkles,
  Bot,
  Mic,
  Code2,
  Cpu,
  ShieldCheck,
} from "lucide-react";

interface HeroProps {
  name?: string;
  title?: string;
  headline?: string;
  statement?: string;
  availabilityStatus?: string;
  resumeUrl?: string;
  skillsList?: string[];
  email?: string;
  location?: string;
}

export default function Hero({
  name = "Shahariyas",
  title = "Python Full Stack Developer & Lead Automation Engineer",
  headline = "Building scalable web backends, intelligent process automations, and resilient distributed architectures.",
  statement = "Specialized in designing robust Django REST APIs, modern React interfaces, and enterprise UiPath robotic process automations that eliminate manual overhead.",
  availabilityStatus = "Open to opportunities",
  resumeUrl = "/resume.pdf",
  email = "shahariyaschatheri10@gmail.com",
  location = "Kerala, India",
}: HeroProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const openAssistantWithQuery = (query: string) => {
    window.dispatchEvent(
      new CustomEvent("open-shahariyas-assistant", {
        detail: { query },
      })
    );
  };

  return (
    <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-24 overflow-hidden border-b border-slate-200/70">
      {/* Background Subtle AI Aurora Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[400px] bg-gradient-to-r from-indigo-400/12 via-sky-400/10 to-violet-400/12 rounded-full blur-3xl animate-pulse-aura" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-cyan-400/8 rounded-full blur-3xl animate-float-slow" />
      </div>

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: AI Narrative & Voice Prompts */}
          <div className="lg:col-span-7 space-y-6">
            {/* AI Status Badge */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200/90 text-xs text-slate-800 font-medium shadow-xs backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{availabilityStatus}</span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1 text-slate-600">
                <MapPin className="w-3 h-3 text-slate-400" />
                {location}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Hi, I'm{" "}
                <span className="ai-gradient-text">
                  {name}
                </span>
                .
              </h1>
              <p className="text-lg sm:text-xl font-medium text-slate-700 leading-snug">
                {title}
              </p>
            </div>

            {/* Core Narrative */}
            <div className="space-y-2.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              <p className="text-slate-800 font-normal">
                {headline}
              </p>
              <p className="text-xs sm:text-sm text-slate-500">
                {statement}
              </p>
            </div>

            {/* AI Assistant Quick Interactive Voice Prompts */}
            <div className="pt-1 space-y-2">
              <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Ask Shahariyas Assistant directly:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => openAssistantWithQuery("Tell me about your experience at Intellijhon and Luminar")}
                  className="ai-pill px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:text-indigo-600 flex items-center gap-1.5 cursor-pointer"
                >
                  <Bot className="w-3.5 h-3.5 text-indigo-500" />
                  <span>"Tell me about your experience"</span>
                </button>
                <button
                  onClick={() => openAssistantWithQuery("What is your Python and automation tech stack?")}
                  className="ai-pill px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:text-indigo-600 flex items-center gap-1.5 cursor-pointer"
                >
                  <Cpu className="w-3.5 h-3.5 text-sky-500" />
                  <span>"What is your tech stack?"</span>
                </button>
              </div>
            </div>

            {/* 3 Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-xs cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              {/* Open Voice Assistant Button */}
              <button
                onClick={() => openAssistantWithQuery("")}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-indigo-50 to-sky-50 text-indigo-700 hover:from-indigo-100 hover:to-sky-100 border border-indigo-200/80 transition-all shadow-xs cursor-pointer"
              >
                <Mic className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                <span>Talk to AI Assistant</span>
              </button>

              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Resume</span>
              </a>

              {/* 1-Click Copy Email */}
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center space-x-1.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy email</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: AI Glassmorphic Snapshot Card */}
          <div className="lg:col-span-5">
            <div className="ai-glass-card rounded-3xl p-6 sm:p-7 space-y-5 relative overflow-hidden">
              {/* Subtle top rainbow accent border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-sky-400 to-violet-500" />

              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                  <span className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Engineering Profile
                  </span>
                </div>
                <span className="text-[11px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                  Verified Roles
                </span>
              </div>

              {/* Current Roles */}
              <div className="space-y-3.5">
                <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-indigo-600 shadow-2xs mt-0.5">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div className="text-xs space-y-0.5">
                    <div className="font-bold text-slate-900">
                      Lead Automation Developer
                    </div>
                    <div className="text-slate-600 font-medium">Intellijhon • Kochi, Kerala</div>
                    <div className="text-[11px] text-slate-400 font-mono">Sep 2025 – Present</div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-sky-600 shadow-2xs mt-0.5">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="text-xs space-y-0.5">
                    <div className="font-bold text-slate-900">
                      Python Full Stack Developer
                    </div>
                    <div className="text-slate-600 font-medium">Luminar Techno Lab • Kochi</div>
                    <div className="text-[11px] text-slate-400 font-mono">Sep 2024 – Present</div>
                  </div>
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                  Core Technologies
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["Python", "Django REST", "React.js", "UiPath", "PostgreSQL", "n8n", "JWT Auth", "Docker"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200/90 text-slate-700 text-xs font-medium shadow-2xs"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Direct email display */}
              <div className="pt-2 text-[12px] font-mono text-slate-500 truncate flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span className="truncate">{email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
