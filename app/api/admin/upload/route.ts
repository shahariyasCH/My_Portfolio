import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { uploadFile } from "@/lib/blob";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const type = (formData.get("type") as string) || "asset";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const folder = type === "resume" ? "resumes" : "images";
    const fileUrl = await uploadFile(file, folder);

    // If uploading resume, update profile singleton automatically
    if (type === "resume") {
      await prisma.profile.upsert({
        where: { id: "default" },
        update: { resumeUrl: fileUrl },
        create: {
          id: "default",
          name: "Shahariyas",
          title: "Python Full Stack Developer",
          headline: "Building scalable web applications",
          statement: "",
          email: "shahariyaschatheri10@gmail.com",
          phone: "+91 9061451636",
          location: "Tirur, Kerala, India",
          resumeUrl: fileUrl,
        },
      });
      try { revalidatePath("/"); } catch (e) {}
    }

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "File upload failed" }, { status: 500 });
  }
}
