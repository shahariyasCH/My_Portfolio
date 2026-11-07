"use client";

import React, { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Save, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

export default function RecruiterAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [availabilityStatus, setAvailabilityStatus] = useState("Open to opportunities");
  const [customStatus, setCustomStatus] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  useEffect(() => {
    fetch("/api/admin/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) {
          const status = data.profile.availabilityStatus || "Open to opportunities";
          if (status === "Open to opportunities" || status === "Not currently available" || status === "Open for selective consulting") {
            setAvailabilityStatus(status);
            setIsCustom(false);
          } else {
            setIsCustom(true);
            setCustomStatus(status);
          }
        }
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setToast(null);

    const finalStatus = isCustom ? customStatus : availabilityStatus;

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ availabilityStatus: finalStatus }),
      });

      if (res.ok) {
        setToast({ type: "success", text: `Availability status updated to "${finalStatus}" across your portfolio!` });
      } else {
        setToast({ type: "error", text: "Failed to update status." });
      }
    } catch (e) {
      setToast({ type: "error", text: "Network error occurred." });
    } finally {
      setSaving(false);
    }
  };

  const statusPresets = [
    { label: "Open to opportunities", desc: "Available for full-time or contract software engineering roles." },
    { label: "Open for selective consulting", desc: "Available for targeted automation and backend consulting." },
    { label: "Not currently available", desc: "Focused on current role, not actively taking new positions." },
  ];

  if (loading) {
    return <div className="p-12 text-slate-500 font-mono text-sm bg-slate-50">Loading status...</div>;
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <AdminHeader
        title="Recruiter CTA & Availability Status"
        description="Configure your live availability status displayed on the Navbar, Hero, and Recruiter CTA sections."
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

        <form onSubmit={handleSave} className="space-y-6">
          <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-7 space-y-6 shadow-sm">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-cyan-600" />
                <span>Select Live Status</span>
              </h2>
              <p className="text-xs text-slate-500">
                This badge is displayed to recruiters on all pages and is instantly synced.
              </p>
            </div>

            {/* Presets */}
            <div className="space-y-3">
              {statusPresets.map((preset) => {
                const isSelected = !isCustom && availabilityStatus === preset.label;
                return (
                  <div
                    key={preset.label}
                    onClick={() => {
                      setIsCustom(false);
                      setAvailabilityStatus(preset.label);
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start space-x-3 ${
                      isSelected
                        ? "bg-cyan-50 border-cyan-400 shadow-xs"
                        : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center ${
                        isSelected ? "border-cyan-600 bg-cyan-600" : "border-slate-400"
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <div className={`text-sm font-semibold ${isSelected ? "text-cyan-900" : "text-slate-800"}`}>
                        {preset.label}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{preset.desc}</div>
                    </div>
                  </div>
                );
              })}

              {/* Custom Status */}
              <div
                onClick={() => setIsCustom(true)}
                className={`p-4 rounded-xl border cursor-pointer transition-all space-y-3 ${
                  isCustom
                    ? "bg-cyan-50 border-cyan-400 shadow-xs"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isCustom ? "border-cyan-600 bg-cyan-600" : "border-slate-400"
                    }`}
                  >
                    {isCustom && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div className={`text-sm font-semibold ${isCustom ? "text-cyan-900" : "text-slate-800"}`}>
                    Custom Status Message
                  </div>
                </div>

                {isCustom && (
                  <div className="pl-7">
                    <input
                      type="text"
                      value={customStatus}
                      onChange={(e) => setCustomStatus(e.target.value)}
                      placeholder="e.g. Exploring Backend Engineering opportunities in Q4..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 focus:outline-none shadow-xs"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-semibold bg-cyan-600 text-white hover:bg-cyan-500 transition-all duration-200 shadow-md shadow-cyan-600/20 disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "Publishing..." : "Update Live Status"}</span>
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
