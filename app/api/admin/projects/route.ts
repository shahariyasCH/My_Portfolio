import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    const count = await prisma.project.count();

    const created = await prisma.project.create({
      data: {
        title: data.title,
        category: data.category || "Full Stack Web Development",
        description: data.description,
        features: typeof data.features === "string" ? data.features : JSON.stringify(data.features || []),
        techStack: typeof data.techStack === "string" ? data.techStack : JSON.stringify(data.techStack || []),
        liveUrl: data.liveUrl || null,
        githubUrl: data.githubUrl || null,
        caseStudyUrl: data.caseStudyUrl || null,
        coverImageUrl: data.coverImageUrl || null,
        order: data.order ?? count + 1,
      },
    });

    try { revalidatePath("/"); revalidatePath("/", "layout"); } catch (e) {}

    return NextResponse.json({ success: true, project: created });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create project" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();

    if (Array.isArray(data.items)) {
      for (const item of data.items) {
        await prisma.project.update({
          where: { id: item.id },
          data: { order: item.order },
        });
      }
      try { revalidatePath("/"); revalidatePath("/", "layout"); } catch (e) {}
      return NextResponse.json({ success: true, message: "Order updated" });
    }

    const updated = await prisma.project.update({
      where: { id: data.id },
      data: {
        title: data.title,
        category: data.category,
        description: data.description,
        features: typeof data.features === "string" ? data.features : JSON.stringify(data.features),
        techStack: typeof data.techStack === "string" ? data.techStack : JSON.stringify(data.techStack),
        liveUrl: data.liveUrl || null,
        githubUrl: data.githubUrl || null,
        caseStudyUrl: data.caseStudyUrl || null,
        coverImageUrl: data.coverImageUrl || null,
        order: data.order,
      },
    });

    try { revalidatePath("/"); revalidatePath("/", "layout"); } catch (e) {}

    return NextResponse.json({ success: true, project: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    await prisma.project.delete({ where: { id } });

    try { revalidatePath("/"); revalidatePath("/", "layout"); } catch (e) {}

    return NextResponse.json({ success: true, message: "Project deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete project" }, { status: 500 });
  }
}
