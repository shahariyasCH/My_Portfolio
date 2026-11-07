"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Github, Linkedin, Sparkles, MessageCircle } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactProps {
  email?: string;
  phone?: string;
  location?: string;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
}

export default function Contact({
  email = "shahariyaschatheri10@gmail.com",
  phone = "+971 54 153 3979",
  location = "Dubai, UAE",
  githubUrl = "https://github.com",
  linkedinUrl = "https://linkedin.com",
}: ContactProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (response.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
        setErrorMessage(resData.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error occurred. Please reach out directly via email.");
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 border-b border-slate-200/70 relative">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-indigo-700 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100">
            <Mail className="w-3.5 h-3.5 text-indigo-600" />
            <span>Direct Channels</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Get In Touch
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
            Have a project, role opening, or technical question? Send a message directly to my inbox.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Details */}
          <div className="lg:col-span-5 space-y-5">
            <div className="ai-glass-card rounded-3xl p-6 sm:p-7 space-y-6">
              <h3 className="font-bold text-base text-slate-900">Direct Information</h3>

              <div className="space-y-3.5">
                <a
                  href={`mailto:${email}`}
                  className="flex items-start space-x-3.5 p-3 rounded-2xl bg-slate-50/80 hover:bg-indigo-50/50 border border-slate-200/80 hover:border-indigo-200 text-sm text-slate-700 hover:text-slate-900 transition-all group"
                >
                  <div className="p-2 rounded-xl bg-white border border-slate-200 text-indigo-600 group-hover:scale-105 transition-transform shadow-2xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase">Email Address</div>
                    <div className="font-semibold text-slate-800 break-all">{email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="flex items-start space-x-3.5 p-3 rounded-2xl bg-slate-50/80 hover:bg-indigo-50/50 border border-slate-200/80 hover:border-indigo-200 text-sm text-slate-700 hover:text-slate-900 transition-all group"
                >
                  <div className="p-2 rounded-xl bg-white border border-slate-200 text-sky-600 group-hover:scale-105 transition-transform shadow-2xs">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase">Phone Number</div>
                    <div className="font-semibold text-slate-800">{phone}</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/971541533979"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-3.5 p-3 rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-200/70 hover:border-emerald-300 text-sm text-slate-700 hover:text-slate-900 transition-all group"
                >
                  <div className="p-2 rounded-xl bg-white border border-emerald-200 text-emerald-600 group-hover:scale-105 transition-transform shadow-2xs">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-emerald-700 font-semibold uppercase">WhatsApp Direct</div>
                    <div className="font-semibold text-slate-800">+971 54 153 3979</div>
                  </div>
                </a>

                <div className="flex items-start space-x-3.5 p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-sm text-slate-700">
                  <div className="p-2 rounded-xl bg-white border border-slate-200 text-violet-600 shadow-2xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase">Location</div>
                    <div className="font-semibold text-slate-800">{location}</div>
                  </div>
                </div>
              </div>

              {/* Social profiles */}
              <div className="pt-4 border-t border-slate-100 flex items-center space-x-3">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                )}

                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-indigo-600" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="ai-glass-card rounded-3xl p-6 sm:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700">Your Name *</label>
                    <input
                      {...register("name")}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-500 mt-0.5">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700">Your Email *</label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="jane@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-500 mt-0.5">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">Subject (Optional)</label>
                  <input
                    {...register("subject")}
                    placeholder="Python / Automation Developer Opportunity"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">Message *</label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    placeholder="Hello Shahariyas, we reviewed your verified portfolio..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors resize-none"
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-500 mt-0.5">{errors.message.message}</p>
                  )}
                </div>

                {/* Status alerts */}
                {status === "success" && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center space-x-2 text-xs text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>Your message has been sent successfully! I will respond promptly.</span>
                  </div>
                )}

                {status === "error" && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center space-x-2 text-xs text-rose-700">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {status === "loading" ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
