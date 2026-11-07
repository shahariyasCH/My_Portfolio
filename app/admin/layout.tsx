import React from "react";
import AuthProvider from "@/components/admin/SessionProvider";
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

export const metadata = {
  title: "Admin CMS | Shahariyas Portfolio",
  description: "Secure Content Management Portal for Shahariyas's Portfolio",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </AuthProvider>
  );
}
