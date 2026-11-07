"use client";

import React from "react";
import { ArrowRight, Download, Mail, Mic, Sparkles, Bot } from "lucide-react";

interface RecruiterCTAProps {
  availabilityStatus?: string;
  resumeUrl?: string;
  email?: string;
}

export default function RecruiterCTA({
  availabilityStatus = "Open to opportunities",
  resumeUrl = "/resume.pdf",
  email = "shahariyaschatheri10@gmail.com",
}: RecruiterCTAProps) {
  const openAssistant = () => {
    window.dispatchEvent(
      new CustomEvent("open-shahariyas-assistant", {
        detail: { query: "I'm interested in hiring Shahariyas. What is his availability and best contact method?" },
      })
    );
  };

  return (
    <section className="py-20 sm:py-24 border-b border-slate-200/70 relative overflow-hidden">
      {/* Background AI subtle glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[300px] bg-gradient-to-tr from-indigo-500/10 via-sky-400/8 to-violet-500/10 rounded-full blur-3xl animate-pulse-aura" />
      </div>

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
        <div className="ai-glass-card rounded-3xl p-8 sm:p-14 text-center space-y-7 relative overflow-hidden bg-gradient-to-b from-white/95 to-slate-50/80">
          {/* Subtle top rainbow border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-sky-400 to-violet-500" />

          {/* Status badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Current Status: {availabilityStatus}</span>
          </div>

          {/* Heading */}
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Looking for a high-impact developer?{" "}
              <span className="ai-gradient-accent">Let's build.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Seeking engineering roles where I can architect robust backend services with Python Django, streamline high-volume business workflows via RPA, and deliver modern full-stack web applications.
            </p>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-xs cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Get in touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Talk to Assistant */}
            <button
              onClick={openAssistant}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-indigo-50 to-sky-50 text-indigo-700 hover:from-indigo-100 hover:to-sky-100 border border-indigo-200 transition-all shadow-xs cursor-pointer"
            >
              <Mic className="w-4 h-4 text-indigo-600 animate-pulse" />
              <span>Ask AI About Hiring</span>
            </button>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-xs"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
