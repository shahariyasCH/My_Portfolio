"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Github, Linkedin, Mail, Shield, Bot } from "lucide-react";

interface FooterProps {
  name?: string;
  title?: string;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  resumeUrl?: string;
}

export default function Footer({
  name = "Shahariyas",
  title = "Python Full Stack Developer & Automation Engineer",
  githubUrl = "https://github.com",
  linkedinUrl = "https://linkedin.com",
  resumeUrl = "/resume.pdf",
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openAssistant = () => {
    window.dispatchEvent(
      new CustomEvent("open-shahariyas-assistant", {
        detail: {},
      })
    );
  };

  return (
    <footer className="py-14 bg-white/70 text-slate-500 text-xs border-t border-slate-200/60">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <span className="font-bold text-slate-900 text-sm">{name}</span>
              <span className="text-indigo-600 font-semibold">•</span>
              <span className="text-slate-600 font-medium">Software & Automation</span>
            </div>
            <div className="text-slate-400 text-[11px]">{title}</div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={openAssistant}
              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 hover:bg-indigo-100 transition-colors font-medium cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Voice Assistant</span>
            </button>

            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 transition-colors p-1"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600 transition-colors p-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            <a
              href="mailto:shahariyaschatheri10@gmail.com"
              className="hover:text-indigo-600 transition-colors p-1"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer shadow-2xs"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} {name}. Built with Next.js, Prisma, and Modern AI Light Aesthetics.
          </div>
          <div className="flex items-center space-x-3">
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-slate-700 transition-colors">
              Resume PDF
            </a>
            <span>•</span>
            <Link href="/admin" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>Admin CMS</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
