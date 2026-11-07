import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { id: "default" },
    });

    return NextResponse.json({ profile });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const current = await prisma.profile.findUnique({ where: { id: "default" } });

    const updated = await prisma.profile.upsert({
      where: { id: "default" },
      update: {
        name: data.name ?? current?.name ?? "Shahariyas",
        title: data.title ?? current?.title ?? "Python Full Stack Developer",
        headline: data.headline ?? current?.headline ?? "Building scalable web applications",
        statement: data.statement ?? current?.statement ?? "",
        email: data.email ?? current?.email ?? "shahariyaschatheri10@gmail.com",
        phone: data.phone ?? current?.phone ?? "+971 54 153 3979",
        location: data.location ?? current?.location ?? "Dubai, UAE",
        availabilityStatus: data.availabilityStatus ?? current?.availabilityStatus ?? "Open to opportunities",
        resumeUrl: data.resumeUrl ?? current?.resumeUrl ?? "/resume.pdf",
        githubUrl: data.githubUrl !== undefined ? data.githubUrl : (current?.githubUrl ?? null),
        linkedinUrl: data.linkedinUrl !== undefined ? data.linkedinUrl : (current?.linkedinUrl ?? null),
        seoTitle: data.seoTitle !== undefined ? data.seoTitle : (current?.seoTitle ?? null),
        seoDescription: data.seoDescription !== undefined ? data.seoDescription : (current?.seoDescription ?? null),
        ogImageUrl: data.ogImageUrl !== undefined ? data.ogImageUrl : (current?.ogImageUrl ?? null),
      },
      create: {
        id: "default",
        name: data.name || "Shahariyas",
        title: data.title || "Python Full Stack Developer",
        headline: data.headline || "Building scalable applications",
        statement: data.statement || "",
        email: data.email || "shahariyaschatheri10@gmail.com",
        phone: data.phone || "+971 54 153 3979",
        location: data.location || "Dubai, UAE",
        availabilityStatus: data.availabilityStatus || "Open to opportunities",
        resumeUrl: data.resumeUrl || "/resume.pdf",
        githubUrl: data.githubUrl || null,
        linkedinUrl: data.linkedinUrl || null,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        ogImageUrl: data.ogImageUrl || null,
      },
    });

    try {
      revalidatePath("/");
      revalidatePath("/", "layout");
    } catch (e) {
      console.error("Revalidation error:", e);
    }

    return NextResponse.json({ success: true, profile: updated });
  } catch (error: any) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: error.message || "Failed to update profile" }, { status: 500 });
  }
}
