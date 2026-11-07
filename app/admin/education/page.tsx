"use client";

import React, { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import {
  Plus,
  Edit2,
  Trash2,
  ChevronUp,
  ChevronDown,
  Save,
  X,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  Calendar,
  MapPin,
  Award,
} from "lucide-react";
import { parseJsonArray } from "@/lib/utils";

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string | null;
  coursework: string;
  order: number;
}

export default function EducationAdminPage() {
  const [educationList, setEducationList] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EducationItem | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    location: "Kerala, India",
    startDate: "June 2020",
    endDate: "May 2024",
    gpa: "6.7/10",
    coursework: ["System Software", "Database Management System"],
  });

  const loadEducation = () => {
    fetch("/api/admin/education")
      .then((res) => res.json())
      .then((data) => {
        if (data.education) setEducationList(data.education);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadEducation();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      institution: "",
      degree: "",
      location: "Kerala, India",
      startDate: "June 2020",
      endDate: "May 2024",
      gpa: "",
      coursework: ["Data Structures & Algorithms", "Operating Systems"],
    });
    setModalOpen(true);
  };

  const openEditModal = (item: EducationItem) => {
    setEditingItem(item);
    setFormData({
      institution: item.institution,
      degree: item.degree,
      location: item.location,
      startDate: item.startDate,
      endDate: item.endDate,
      gpa: item.gpa || "",
      coursework: parseJsonArray(item.coursework),
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast(null);

    const payload = {
      ...formData,
      coursework: formData.coursework.filter((c) => c.trim().length > 0),
      ...(editingItem ? { id: editingItem.id } : {}),
    };

    try {
      const res = await fetch("/api/admin/education", {
        method: editingItem ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setToast({
          type: "success",
          text: editingItem ? "Degree updated successfully!" : "New education entry created!",
        });
        setModalOpen(false);
        loadEducation();
      } else {
        setToast({ type: "error", text: data.error || "Save operation failed." });
      }
    } catch (err) {
      setToast({ type: "error", text: "Network error occurred." });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this academic record?")) return;

    try {
      const res = await fetch(`/api/admin/education?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setToast({ type: "success", text: "Education entry deleted." });
        loadEducation();
      } else {
        setToast({ type: "error", text: "Failed to delete item." });
      }
    } catch (e) {
      setToast({ type: "error", text: "Network error occurred." });
    }
  };

  const moveOrder = async (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === educationList.length - 1)
    )
      return;

    const newList = [...educationList];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const temp = newList[index];
    newList[index] = newList[targetIndex];
    newList[targetIndex] = temp;

    const items = newList.map((item, idx) => ({ id: item.id, order: idx + 1 }));
    setEducationList(newList);

    try {
      await fetch("/api/admin/education", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      setToast({ type: "success", text: "Education order updated!" });
    } catch (e) {
      loadEducation();
    }
  };

  if (loading) {
    return <div className="p-12 text-slate-500 font-mono text-sm bg-slate-50">Loading education...</div>;
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <AdminHeader
        title="Academic History & Coursework"
        description="Add, edit, reorder, and curate degrees and relevant technical coursework."
        actionButton={
          <button
            onClick={openAddModal}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-600 text-white hover:bg-cyan-500 transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Degree</span>
          </button>
        }
      />

      <main className="p-6 sm:p-8 max-w-5xl space-y-6">
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

        <div className="space-y-4">
          {educationList.map((edu, idx) => {
            const coursework = parseJsonArray(edu.coursework);

            return (
              <div
                key={edu.id}
                className="rounded-2xl bg-white border border-slate-200/90 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-bold text-base text-slate-900">{edu.degree}</h3>
                    {edu.gpa && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800">
                        GPA: {edu.gpa}
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-semibold text-cyan-700">{edu.institution}</div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {edu.startDate} – {edu.endDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {edu.location}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {coursework.map((c, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-mono border border-slate-200"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => moveOrder(idx, "up")}
                    disabled={idx === 0}
                    className="p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 disabled:opacity-30 cursor-pointer"
                    title="Move Up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => moveOrder(idx, "down")}
                    disabled={idx === educationList.length - 1}
                    className="p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 disabled:opacity-30 cursor-pointer"
                    title="Move Down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => openEditModal(edu)}
                    className="p-2 rounded-lg bg-cyan-50 border border-cyan-200 hover:bg-cyan-100 text-cyan-700 cursor-pointer"
                    title="Edit Degree"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(edu.id)}
                    className="p-2 rounded-lg bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 cursor-pointer"
                    title="Delete Degree"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-cyan-600" />
                <span>{editingItem ? "Edit Academic Record" : "Add Academic Credential"}</span>
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-700">Institution / University *</label>
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:border-cyan-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-700">Degree / Certificate *</label>
                  <input
                    type="text"
                    required
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:border-cyan-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-700">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:border-cyan-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-700">Start Date</label>
                  <input
                    type="text"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    placeholder="June 2020"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:border-cyan-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-700">End Date</label>
                  <input
                    type="text"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    placeholder="May 2024"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:border-cyan-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-slate-700">GPA / Grade Score</label>
                <input
                  type="text"
                  value={formData.gpa}
                  onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                  placeholder="e.g. 6.7/10 or First Class"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:border-cyan-600 focus:outline-none"
                />
              </div>

              {/* Coursework */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-medium text-slate-700">
                    Relevant Coursework & Subjects
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, coursework: [...formData.coursework, ""] })}
                    className="text-xs font-mono text-cyan-700 hover:text-cyan-800 font-semibold cursor-pointer"
                  >
                    + Add Subject
                  </button>
                </div>

                {formData.coursework.map((course, cIdx) => (
                  <div key={cIdx} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={course}
                      onChange={(e) => {
                        const updated = [...formData.coursework];
                        updated[cIdx] = e.target.value;
                        setFormData({ ...formData, coursework: updated });
                      }}
                      placeholder={`Subject ${cIdx + 1}...`}
                      className="flex-1 px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:border-cyan-600 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = formData.coursework.filter((_, idx) => idx !== cIdx);
                        setFormData({ ...formData, coursework: updated });
                      }}
                      className="p-2 text-slate-400 hover:text-rose-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-cyan-600 text-white hover:bg-cyan-500 shadow-xs cursor-pointer"
                >
                  {editingItem ? "Save Changes" : "Create Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
