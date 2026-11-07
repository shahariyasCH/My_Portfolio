"use client";

import React from "react";
import { Briefcase, Calendar, MapPin, Sparkles, Bot, ChevronRight } from "lucide-react";
import { ExperienceData } from "@/lib/initial-data";

interface ExperienceProps {
  experiences?: ExperienceData[];
}

export default function Experience({ experiences = [] }: ExperienceProps) {
  const askRoleDetails = (company: string) => {
    window.dispatchEvent(
      new CustomEvent("open-shahariyas-assistant", {
        detail: { query: `Tell me about Shahariyas's work and achievements at ${company}` },
      })
    );
  };

  return (
    <section id="experience" className="py-20 sm:py-24 border-b border-slate-200/70 relative">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-indigo-700 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100">
              <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
              <span>Career Track</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Work Experience
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
              Verified technical roles spanning robotic process automation and Python full-stack engineering.
            </p>
          </div>
        </div>

        {/* Experience List */}
        <div className="space-y-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="ai-glass-card rounded-3xl p-6 sm:p-8 space-y-5 relative overflow-hidden"
            >
              {/* Top Accent Line for Active Roles */}
              {exp.isCurrent && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500" />
              )}

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      {exp.title}
                    </h3>
                    {exp.isCurrent && (
                      <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/90 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Present Role</span>
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-indigo-700">
                    {exp.company}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="space-y-2.5">
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start space-x-2.5">
                      <span className="text-indigo-500 mt-1 shrink-0 font-bold">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies & AI Ask CTA */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-[11px] font-medium text-slate-400 mr-1 uppercase font-mono">
                    Stack:
                  </span>
                  {exp.techTags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100/80 border border-slate-200/80 text-slate-700 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => askRoleDetails(exp.company)}
                  className="inline-flex items-center space-x-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Ask AI about {exp.company}</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
