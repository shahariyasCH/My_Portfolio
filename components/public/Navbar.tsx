"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Download, Menu, X, ArrowUpRight, Shield, Bot, Sparkles } from "lucide-react";

interface NavbarProps {
  name?: string;
  availabilityStatus?: string;
  resumeUrl?: string;
}

export default function Navbar({
  name = "Shahariyas",
  availabilityStatus = "Open to opportunities",
  resumeUrl = "/resume.pdf",
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openAssistant = () => {
    window.dispatchEvent(
      new CustomEvent("open-shahariyas-assistant", {
        detail: {},
      })
    );
  };

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? "glass-nav py-3.5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)]"
          : "bg-white/80 backdrop-blur-md py-4.5 border-b border-slate-200/60"
      }`}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 text-white flex items-center justify-center font-bold text-xs tracking-tight shadow-sm group-hover:scale-105 transition-transform">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-sm tracking-tight group-hover:text-indigo-600 transition-colors">
              {name}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              Python • Automation
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center space-x-2.5">
          {/* AI Assistant Quick Trigger */}
          <button
            onClick={openAssistant}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-50 to-sky-50 border border-indigo-200/70 text-xs font-medium text-indigo-700 hover:from-indigo-100 hover:to-sky-100 transition-all cursor-pointer shadow-2xs"
            title="Open Shahariyas Voice Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span>AI Assistant</span>
          </button>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-2xs"
          >
            <span>Resume</span>
            <Download className="w-3 h-3 text-slate-300" />
          </a>

          <Link
            href="/admin"
            title="Admin CMS"
            className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors rounded-md"
          >
            <Shield className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={openAssistant}
            className="p-1.5 text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg text-xs font-medium flex items-center gap-1"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-700 hover:text-slate-900 rounded-lg border border-slate-200 bg-white"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-5 py-4 space-y-3 shadow-md animate-in fade-in duration-150">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-sm font-semibold text-slate-700 hover:text-indigo-600"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              {availabilityStatus}
            </span>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-slate-500 hover:text-slate-900 font-medium flex items-center gap-1"
            >
              <Shield className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
