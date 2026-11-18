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
  name = "Shahariyas C",
  title = "AI Automation Developer | Full Stack Developer | n8n | LLMs & RAG",
  headline = "Engineering production-ready AI automations, agentic workflows, and secure full stack web applications.",
  statement = "Full Stack Developer and AI Automation Developer with 2+ years of experience building secure web applications and AI-powered automation. Full stack expertise in Django, Node.js, React.js, Next.js, REST APIs, JWT authentication, PostgreSQL, Docker and CI/CD. Delivered 50+ n8n workflows for 20+ clients, plus AI agents and chatbots built on OpenAI, Gemini and the WhatsApp Business API for customer engagement.",
  location = "Dubai, UAE",
}: AboutProps) {
  const highlights = [
    {
      title: "Agentic AI & RAG Engineering",
      desc: "Architecting context-aware AI chatbots and autonomous agents using OpenAI, Gemini, LangChain, LangGraph, and RAG from business knowledge bases.",
      icon: Bot,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      title: "n8n & Workflow Orchestration",
      desc: "Delivered 50+ n8n agentic/non-agentic workflows for 20+ clients across WhatsApp, Instagram & Facebook with 24/7 automated error recovery.",
      icon: Zap,
      color: "text-sky-600 bg-sky-50 border-sky-100",
    },
    {
      title: "Full Stack & Backend Security",
      desc: "Engineering modular Django & Node.js backends with RESTful APIs, JWT authentication, RBAC, PostgreSQL, React, Next.js, and Docker.",
      icon: ShieldCheck,
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
              I am <strong className="text-slate-900 font-semibold">{name}</strong>, an AI Automation & Full Stack Developer based in {location} (Immediate joiner, open to relocation). I specialize in designing autonomous AI agents, enterprise workflow automations, and resilient full stack web applications.
            </p>
            <p className="text-slate-800">
              {statement}
            </p>
            <p>
              In my work across <span className="font-semibold text-slate-900">IntelliJohn Labs</span> and <span className="font-semibold text-slate-900">Luminar Techno Lab</span>, I have delivered over 50 n8n workflows for 20+ clients, integrated intelligent AI chatbots via OpenAI, Gemini, and the WhatsApp Business API that captured 200+ leads, and built full stack platforms in <span className="text-indigo-600 font-medium">Django, Node.js, React.js, and Next.js</span>. I focus on turning complex business requirements into dependable, production-ready systems.
            </p>

            <div className="pt-2">
              <button
                onClick={() => askAssistant("AI automation, n8n workflows, and full stack development")}
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
