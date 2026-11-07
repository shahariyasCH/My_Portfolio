"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, ShieldCheck, Home } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  description?: string;
  actionButton?: React.ReactNode;
}

export default function AdminHeader({
  title,
  description,
  actionButton,
}: AdminHeaderProps) {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
      <div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-700 font-semibold">
            Admin CMS
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-mono text-slate-500">Production Control</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
          {title}
        </h1>
        {description && (
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">{description}</p>
        )}
      </div>

      <div className="flex items-center space-x-3 shrink-0">
        <Link
          href="/"
          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200 hover:border-cyan-300 hover:text-cyan-700 transition-colors shadow-xs"
        >
          <Home className="w-3.5 h-3.5 text-cyan-600" />
          <span>Go to Live Website</span>
        </Link>

        {actionButton}

        <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Session Active</span>
        </div>
      </div>
    </header>
  );
}
