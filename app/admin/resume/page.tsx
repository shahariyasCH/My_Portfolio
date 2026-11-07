"use client";

import React, { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Upload, FileText, CheckCircle2, AlertCircle, ExternalLink, Download, Link2, Save } from "lucide-react";

export default function ResumeAdminPage() {
  const [currentResumeUrl, setCurrentResumeUrl] = useState("/resume.pdf");
  const [directUrl, setDirectUrl] = useState("/resume.pdf");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [savingUrl, setSavingUrl] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.profile?.resumeUrl) {
          setCurrentResumeUrl(data.profile.resumeUrl);
          setDirectUrl(data.profile.resumeUrl);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setToast({ type: "error", text: "Please select a valid PDF file." });
      return;
    }

    setUploading(true);
    setToast(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "resume");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setCurrentResumeUrl(data.url);
        setDirectUrl(data.url);
        setToast({ type: "success", text: "Resume PDF uploaded and updated across all portfolio download buttons!" });
      } else {
        setToast({ type: "error", text: data.error || "Upload failed." });
      }
    } catch (err) {
      setToast({ type: "error", text: "Network error during upload." });
    } finally {
      setUploading(false);
    }
  };

  const handleSaveDirectUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingUrl(true);
    setToast(null);

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeUrl: directUrl }),
      });

      const data = await res.json();
      if (res.ok) {
        setCurrentResumeUrl(directUrl);
        setToast({ type: "success", text: "Resume link saved and published live!" });
      } else {
        setToast({ type: "error", text: data.error || "Failed to update resume link." });
      }
    } catch (err) {
      setToast({ type: "error", text: "Network error saving resume link." });
    } finally {
      setSavingUrl(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <AdminHeader
        title="Resume & CV Manager"
        description="Upload and replace your active CV/Resume PDF distributed across all download buttons on the portfolio."
      />

      <main className="p-6 sm:p-8 max-w-4xl space-y-6">
        {toast && (
          <div
            className={`p-4 rounded-xl flex items-center space-x-3 text-xs font-mono ${
              toast.type === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                : "bg-rose-50 border border-rose-200 text-rose-800"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            )}
            <span>{toast.text}</span>
          </div>
        )}

        {/* Current Active Resume Card */}
        <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-7 space-y-5 shadow-sm">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-cyan-600" />
              <span>Current Active Resume</span>
            </h2>
            <p className="text-xs text-slate-500">
              This file is served to recruiters downloading your resume via the Navbar, Hero, and Recruiter sections.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-lg bg-cyan-50 text-cyan-700">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-slate-500">Active Resume Source</div>
                <div className="text-sm font-semibold text-slate-800 break-all">{currentResumeUrl}</div>
              </div>
            </div>

            <a
              href={currentResumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-cyan-700 hover:bg-slate-50 transition-colors shrink-0 shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Active Resume</span>
            </a>
          </div>

          {/* Option A: Upload New PDF File */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <label className="text-xs font-mono font-medium text-slate-700">
              Option 1: Upload New PDF Document
            </label>
            <div className="border-2 border-dashed border-slate-200 hover:border-cyan-400 rounded-2xl p-8 text-center transition-colors bg-slate-50/50 hover:bg-cyan-50/20">
              <div className="max-w-sm mx-auto space-y-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center mx-auto text-cyan-600">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    {uploading ? "Uploading & publishing PDF..." : "Click to browse and upload PDF"}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Supports .pdf files up to 10MB.
                  </p>
                </div>
                <label className="inline-block px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-600 text-white hover:bg-cyan-500 cursor-pointer transition-colors shadow-xs">
                  <span>Browse PDF File</span>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Option B: Direct URL Input */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <label className="text-xs font-mono font-medium text-slate-700">
              Option 2: Or Provide Direct Resume URL
            </label>
            <form onSubmit={handleSaveDirectUrl} className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Link2 className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={directUrl}
                  onChange={(e) => setDirectUrl(e.target.value)}
                  placeholder="/resume.pdf or https://drive.google.com/..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 focus:outline-none shadow-xs"
                />
              </div>
              <button
                type="submit"
                disabled={savingUrl}
                className="inline-flex items-center justify-center space-x-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{savingUrl ? "Saving..." : "Save Resume URL"}</span>
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
