"use client";

import React, { useState } from "react";
import {
  Code,
  Server,
  Smartphone,
  Database,
  Cloud,
  Cpu,
  Bot,
  Wrench,
  Sparkles,
  Info,
} from "lucide-react";
import { SkillCategoryData } from "@/lib/initial-data";

interface SkillsProps {
  categories?: SkillCategoryData[];
}

export default function SkillsBento({ categories = [] }: SkillsProps) {
  const [activeTooltip, setActiveTooltip] = useState<{
    skillName: string;
    description: string;
  } | null>(null);

  const getCategoryIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("core") || lower.includes("language")) return Code;
    if (lower.includes("backend") || lower.includes("api")) return Server;
    if (lower.includes("frontend") || lower.includes("mobile")) return Smartphone;
    if (lower.includes("database") || lower.includes("sql")) return Database;
    if (lower.includes("cloud") || lower.includes("devops")) return Cloud;
    if (lower.includes("automation") || lower.includes("rpa")) return Cpu;
    if (lower.includes("ai") || lower.includes("learning") || lower.includes("bot")) return Bot;
    return Wrench;
  };

  const askAssistantAboutSkill = (skillName: string) => {
    window.dispatchEvent(
      new CustomEvent("open-shahariyas-assistant", {
        detail: { query: `How does Shahariyas use ${skillName} in his projects and experience?` },
      })
    );
  };

  return (
    <section id="skills" className="py-20 sm:py-24 border-b border-slate-200/70 relative">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-indigo-700 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100">
              <Cpu className="w-3.5 h-3.5 text-indigo-600" />
              <span>Technical Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Skills & Proficiencies
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
              Languages, backend frameworks, robotic automation tools, and databases used across production applications.
            </p>
          </div>

          <div className="text-xs text-slate-400 font-mono hidden sm:block">
            Click any skill to query AI
          </div>
        </div>

        {/* Stack Groups Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category.name);

            return (
              <div
                key={category.id}
                className="ai-glass-card rounded-3xl p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900">
                        {category.name}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {category.skills.length}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <button
                        key={skill.id}
                        onClick={() => askAssistantAboutSkill(skill.name)}
                        onMouseEnter={() =>
                          setActiveTooltip({
                            skillName: skill.name,
                            description:
                              skill.description ||
                              `Production engineering with ${skill.name}. Click to ask AI assistant.`,
                          })
                        }
                        onMouseLeave={() => setActiveTooltip(null)}
                        className="group/chip px-3 py-1.5 rounded-xl bg-slate-50/90 hover:bg-indigo-50 border border-slate-200/90 hover:border-indigo-300 text-xs font-medium text-slate-700 hover:text-indigo-700 transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
                        title="Click to ask AI assistant about this skill"
                      >
                        <span>{skill.name}</span>
                        <Sparkles className="w-2.5 h-2.5 opacity-0 group-hover/chip:opacity-100 text-indigo-500 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hover Context Banner */}
        <div className="min-h-[50px] p-3 px-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between text-xs">
          {activeTooltip ? (
            <div className="flex items-center space-x-2 text-slate-700">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
              <div>
                <span className="font-bold text-slate-900">{activeTooltip.skillName}:</span>{" "}
                <span>{activeTooltip.description}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-slate-400 font-mono">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>Hover over any skill to see context or click to ask Shahariyas Assistant.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
