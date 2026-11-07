"use client";

import React from "react";
import {
  HelpCircle,
  Search,
  PenTool,
  Code,
  Network,
  CheckCircle2,
  Gauge,
  Rocket,
  ArrowRight,
} from "lucide-react";

export default function Workflow() {
  const steps = [
    {
      num: "01",
      title: "Problem",
      desc: "Identify friction points, manual bottlenecks, or feature requirements.",
      icon: HelpCircle,
    },
    {
      num: "02",
      title: "Understand",
      desc: "Analyze business logic, edge cases, data flows, and security constraints.",
      icon: Search,
    },
    {
      num: "03",
      title: "Design",
      desc: "Architect REST/GraphQL endpoints, database schemas, and UX wireframes.",
      icon: PenTool,
    },
    {
      num: "04",
      title: "Develop",
      desc: "Write clean, modular code with Django, React, Flutter, or RPA scripts.",
      icon: Code,
    },
    {
      num: "05",
      title: "Integrate",
      desc: "Connect third-party APIs, webhooks, payment gateways, and queue services.",
      icon: Network,
    },
    {
      num: "06",
      title: "Test",
      desc: "Run end-to-end API tests, exception handling, and UI responsiveness checks.",
      icon: CheckCircle2,
    },
    {
      num: "07",
      title: "Optimize",
      desc: "Profile query latencies, index databases, and minimize network overhead.",
      icon: Gauge,
    },
    {
      num: "08",
      title: "Deploy",
      desc: "Deploy via CI/CD pipelines to Vercel, Render, or Dockerized servers.",
      icon: Rocket,
    },
  ];

  return (
    <section id="workflow" className="py-20 sm:py-24 border-t border-slate-200 bg-slate-50/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-700 tracking-wider uppercase px-2.5 py-1 rounded-md bg-cyan-50 border border-cyan-200">
            <span className="w-2 h-2 rounded-full bg-cyan-600" />
            <span>06 // Engineering Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Developer Workflow
          </h2>
          <p className="text-slate-600 max-w-2xl text-sm sm:text-base">
            A disciplined 8-stage engineering process ensuring zero-defect deliverables from concept to live deployment.
          </p>
        </div>

        {/* 8-Stage Step Process Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="group relative rounded-xl bg-white border border-slate-200 p-5 flex flex-col justify-between hover:border-cyan-400 hover:shadow-md transition-all duration-200 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-700 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs font-bold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                      STAGE {step.num}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Phase {step.num}</span>
                  {idx < steps.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 transition-colors" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
