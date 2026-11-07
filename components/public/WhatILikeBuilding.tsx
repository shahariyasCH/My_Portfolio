"use client";

import React, { useState } from "react";
import {
  Server,
  Cpu,
  Sparkles,
  Layout,
  Smartphone,
  Network,
  ArrowRight,
} from "lucide-react";

export default function WhatILikeBuilding() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const specialties = [
    {
      id: 1,
      title: "Scalable Backends",
      icon: Server,
      accent: "from-cyan-500/10 to-blue-500/5",
      borderGlow: "group-hover:border-cyan-500/50",
      description:
        "Architecting clean, modular RESTful APIs and microservices using Python Django & DRF with strict JWT authentication, role-based access control, and optimized database indexing.",
      highlights: ["Django REST Framework", "Modular MVC Architecture", "JWT Auth & RBAC", "Query Optimization"],
    },
    {
      id: 2,
      title: "Automation Systems",
      icon: Cpu,
      accent: "from-sky-500/10 to-indigo-500/5",
      borderGlow: "group-hover:border-sky-500/50",
      description:
        "Building resilient bot flows with UiPath, Automation Anywhere, and n8n that handle high-volume data extraction, document parsing, dynamic queueing, and error recovery.",
      highlights: ["RPA Bot Engineering", "Exception Handling", "Web Scraping Pipelines", "Queue Management"],
    },
    {
      id: 3,
      title: "AI-Powered Applications",
      icon: Sparkles,
      accent: "from-teal-500/10 to-emerald-500/5",
      borderGlow: "group-hover:border-teal-500/50",
      description:
        "Integrating Large Language Model APIs (Gemini, OpenAI) and NLP pipelines into production backends for smart conversational bots and automated categorization.",
      highlights: ["AI Chatbot Development", "LLM API Integrations", "NLP Text Analysis", "Prompt Engineering"],
    },
    {
      id: 4,
      title: "Modern Web Apps",
      icon: Layout,
      accent: "from-blue-500/10 to-cyan-500/5",
      borderGlow: "group-hover:border-blue-500/50",
      description:
        "Creating fast, responsive, component-driven user interfaces in React and Next.js with state hydration, clean Tailwind design systems, and seamless REST consumption.",
      highlights: ["React.js & Next.js", "Server & Client Components", "Tailwind CSS", "Fluid Responsive UI"],
    },
    {
      id: 5,
      title: "Mobile Applications",
      icon: Smartphone,
      accent: "from-indigo-500/10 to-sky-500/5",
      borderGlow: "group-hover:border-indigo-500/50",
      description:
        "Developing cross-platform mobile apps for Android & iOS using Flutter and React Native with native device integration, Google Maps APIs, and Firebase real-time state.",
      highlights: ["Flutter (Android & iOS)", "Firebase Realtime Sync", "Google Maps Geolocation", "React Native"],
    },
    {
      id: 6,
      title: "Integration Systems",
      icon: Network,
      accent: "from-cyan-500/10 to-teal-500/5",
      borderGlow: "group-hover:border-cyan-500/50",
      description:
        "Bridging disparate third-party services, legacy databases, payment gateways (Razorpay), webhooks, and REST/GraphQL APIs into unified, synchronous pipelines.",
      highlights: ["API Orchestration", "Payment Gateway Integration", "Webhook Processing", "Legacy Middleware"],
    },
  ];

  return (
    <section className="py-20 sm:py-24 border-t border-slate-200 bg-white relative overflow-hidden">
      {/* Background data line decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-700 tracking-wider uppercase px-2.5 py-1 rounded-md bg-cyan-50 border border-cyan-200">
            <span className="w-2 h-2 rounded-full bg-cyan-600" />
            <span>05 // Domains of Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            What I Like Building
          </h2>
          <p className="text-slate-600 max-w-2xl text-sm sm:text-base">
            End-to-end technical capabilities across backend engineering, workflow automation, and intelligent services.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialties.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative rounded-2xl bg-white border border-slate-200 p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-sm ${item.borderGlow}`}
              >
                {/* Subtle gradient background */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                />

                <div className="relative z-10 space-y-4">
                  {/* Icon & Index */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-700 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-slate-400">0{item.id}</span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Highlights list */}
                  <div className="space-y-1.5 pt-2">
                    {item.highlights.map((hl, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-center space-x-2 text-xs text-slate-700 font-mono"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subfooter */}
                <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Production Ready</span>
                  <span className="text-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-semibold">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
