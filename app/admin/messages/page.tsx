import React from "react";
import prisma from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import { MessageSquare, Mail, Calendar, User } from "lucide-react";

export default async function MessagesAdminPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <AdminHeader
        title="Contact Inquiries Inbox"
        description="View incoming messages and job opportunities submitted through the portfolio contact form."
      />

      <main className="p-6 sm:p-8 max-w-5xl space-y-6">
        <div className="flex justify-between items-center text-xs font-mono text-slate-500">
          <span>Total Received Inquiries: {messages.length}</span>
        </div>

        {messages.length === 0 ? (
          <div className="rounded-2xl bg-white border border-slate-200 p-12 text-center text-xs font-mono text-slate-500 space-y-2 shadow-sm">
            <MessageSquare className="w-8 h-8 text-slate-400 mx-auto" />
            <p>No contact messages yet. Inquiries will appear here live when sent.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="rounded-2xl bg-white border border-slate-200/90 p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-700 font-semibold text-xs">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{msg.name}</h3>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-xs font-mono text-cyan-700 hover:underline flex items-center gap-1"
                      >
                        <Mail className="w-3 h-3" />
                        <span>{msg.email}</span>
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 text-xs font-mono text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{new Date(msg.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                {msg.subject && (
                  <div className="text-xs font-mono text-slate-700 font-semibold">
                    Subject: <span className="text-slate-900">{msg.subject}</span>
                  </div>
                )}

                <div className="text-sm text-slate-700 whitespace-pre-line leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {msg.message}
                </div>

                <div className="pt-2 flex justify-end">
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || "Portfolio Inquiry")}`}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-600 text-white hover:bg-cyan-500 transition-colors shadow-xs"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Reply to Sender</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
