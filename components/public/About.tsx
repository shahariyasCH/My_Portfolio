"use client";

import React from "react";
import { ShieldCheck, Zap, Database, Sparkles, Bot, Layers } from "lucide-react";

interface AboutProps {
  name?: string;
  title?: string;
  headline?: string;
  statement?: string;
  location?: string;
}

export default function About({
  name = "Shahariyas",
  title = "Python Full Stack Developer & Lead Automation Engineer",
  headline = "Bridging robust backend engineering, full-stack web development, and robotic process automation.",
  statement = "Professional Python Full Stack Developer with advanced backend expertise in Django REST Framework and frontend proficiency in React JS. Specializes in designing scalable and secure REST APIs, managing database migrations, and implementing robust JWT authentication systems.",
  location = "Kerala, India",
}: AboutProps) {
  const highlights = [
    {
      title: "Backend Integrity & Security",
      desc: "Designing modular REST architectures with Django REST Framework, JWT role-based access control, and optimized database indexing.",
      icon: ShieldCheck,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      title: "Autonomous Workflows & RPA",
      desc: "Building self-healing bot pipelines using UiPath, Python, and n8n that process high volumes of data with automated retries and exception queues.",
      icon: Zap,
      color: "text-sky-600 bg-sky-50 border-sky-100",
    },
    {
      title: "Clean Data & Scalable Systems",
      desc: "Managing smooth schema migrations, query tuning with PostgreSQL & Redis, and deploying maintainable services for web and mobile.",
      icon: Database,
      color: "text-violet-600 bg-violet-50 border-violet-100",
    },
  ];

  const askAssistant = (topic: string) => {
    window.dispatchEvent(
      new CustomEvent("open-shahariyas-assistant", {
        detail: { query: `Tell me about Shahariyas's approach to ${topic}` },
      })
    );
  };

  return (
    <section id="about" className="py-20 sm:py-24 border-b border-slate-200/70 relative bg-white/40">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 space-y-12">
        {/* Section Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-indigo-700 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Philosophy & Background</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Engineering for real-world impact
          </h2>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            <p>
              I am <strong className="text-slate-900 font-semibold">{name}</strong>, a developer based in {location}. I spend most of my time designing backend architectures, deploying full-stack web platforms, and engineering autonomous bot pipelines that replace repetitive manual tasks.
            </p>
            <p className="text-slate-800">
              {statement}
            </p>
            <p>
              In my day-to-day work across <span className="font-semibold text-slate-900">Intellijhon</span> and <span className="font-semibold text-slate-900">Luminar Techno Lab</span>, I bridge two worlds: developing clean, modular web services with <span className="text-indigo-600 font-medium">Django & React</span>, and building robotic automation flows with <span className="text-indigo-600 font-medium">UiPath, Python, and n8n</span>. I value clean code, predictable database design, and systems that just work without constant firefighting.
            </p>

            <div className="pt-2">
              <button
                onClick={() => askAssistant("backend architecture and automation")}
                className="ai-pill px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:text-indigo-600 flex items-center gap-2 cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5 text-indigo-500" />
                <span>Ask AI Assistant about my engineering methodology →</span>
              </button>
            </div>
          </div>

          {/* Core values */}
          <div className="lg:col-span-5 space-y-3.5">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="ai-glass-card rounded-2xl p-5 space-y-2 border border-slate-200/80"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className={`p-2 rounded-xl border ${item.color}`}>
                      <Icon className="w-4 h-4 shrink-0" />
                    </div>
                    <span className="font-bold text-slate-900 text-sm">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed pl-1">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
