"use client";

import React from "react";
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Sparkles } from "lucide-react";
import { EducationData } from "@/lib/initial-data";

interface EducationProps {
  education?: EducationData[];
}

export default function Education({ education = [] }: EducationProps) {
  return (
    <section id="education" className="py-20 sm:py-24 border-b border-slate-200/70 relative bg-white/40">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-indigo-700 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Education
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
            Formal foundations in Computer Science & Engineering, operating systems, and distributed databases.
          </p>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="ai-glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="text-right text-xs font-mono text-slate-500 space-y-0.5">
                    <div className="font-semibold text-slate-700">{edu.startDate} – {edu.endDate}</div>
                    <div className="text-slate-400">{edu.location}</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-semibold text-indigo-700">
                    {edu.institution}
                  </p>
                </div>

                {edu.gpa && (
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    <span>GPA: {edu.gpa}</span>
                  </div>
                )}

                {edu.coursework && edu.coursework.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                      Relevant Coursework:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((course, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2.5 py-1 rounded-lg bg-slate-100/90 border border-slate-200 text-slate-700 text-xs font-medium"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
