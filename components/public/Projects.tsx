"use client";

import React from "react";
import { ExternalLink, Github, BookOpen, Sparkles, Bot, Layers, ArrowUpRight } from "lucide-react";
import { ProjectData } from "@/lib/initial-data";

interface ProjectsProps {
  projects?: ProjectData[];
}

export default function Projects({ projects = [] }: ProjectsProps) {
  const askProjectDetails = (title: string) => {
    window.dispatchEvent(
      new CustomEvent("open-shahariyas-assistant", {
        detail: { query: `Tell me about Shahariyas's ${title} project, its features and architecture` },
      })
    );
  };

  return (
    <section id="projects" className="py-20 sm:py-24 border-b border-slate-200/70 relative bg-white/40">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-indigo-700 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Featured Engineering</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Selected Projects
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
            Production-grade web platforms and emergency coordination systems architected with Django, React, and PostgreSQL.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {projects.map((project) => {
            const hasLinks = Boolean(project.liveUrl || project.githubUrl || project.caseStudyUrl);

            return (
              <div
                key={project.id}
                className="ai-glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 relative overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Category Pill & Index */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-indigo-700 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 shadow-2xs">
                      {project.category}
                    </span>
                    <button
                      onClick={() => askProjectDetails(project.title)}
                      className="text-xs text-slate-500 hover:text-indigo-600 flex items-center gap-1 font-medium transition-colors cursor-pointer"
                      title="Ask AI about this project"
                    >
                      <Bot className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Ask AI</span>
                    </button>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Core Features */}
                  {project.features && project.features.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                        Key Architecture & Implementations
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-600 leading-relaxed">
                        {project.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start space-x-2">
                            <span className="text-indigo-500 mt-0.5 font-bold">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech stack */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-slate-100/90 border border-slate-200/80 text-slate-700 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 px-3.5 py-1.5 rounded-xl transition-all shadow-xs"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3 text-slate-300" />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}

                    {project.caseStudyUrl && (
                      <a
                        href={project.caseStudyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Case Study</span>
                      </a>
                    )}
                  </div>

                  {!hasLinks && (
                    <span className="text-xs text-slate-400 font-mono">
                      Verified
                    </span>
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
