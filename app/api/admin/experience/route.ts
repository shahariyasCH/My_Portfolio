import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const experiences = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ experiences });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();

    const count = await prisma.experience.count();

    const created = await prisma.experience.create({
      data: {
        company: data.company,
        title: data.title,
        location: data.location || "Kerala, India",
        startDate: data.startDate,
        endDate: data.endDate || null,
        isCurrent: Boolean(data.isCurrent),
        responsibilities: typeof data.responsibilities === "string" ? data.responsibilities : JSON.stringify(data.responsibilities || []),
        techTags: typeof data.techTags === "string" ? data.techTags : JSON.stringify(data.techTags || []),
        order: data.order ?? count + 1,
      },
    });

    try {
      revalidatePath("/");
      revalidatePath("/", "layout");
    } catch (e) {}

    return NextResponse.json({ success: true, experience: created });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create experience" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();

    // Check if batch reordering
    if (Array.isArray(data.items)) {
      for (const item of data.items) {
        await prisma.experience.update({
          where: { id: item.id },
          data: { order: item.order },
        });
      }
      try {
        revalidatePath("/");
        revalidatePath("/", "layout");
      } catch (e) {}
      return NextResponse.json({ success: true });
    }

    const updated = await prisma.experience.update({
      where: { id: data.id },
      data: {
        company: data.company,
        title: data.title,
        location: data.location,
        startDate: data.startDate,
        endDate: data.endDate || null,
        isCurrent: Boolean(data.isCurrent),
        responsibilities: typeof data.responsibilities === "string" ? data.responsibilities : JSON.stringify(data.responsibilities || []),
        techTags: typeof data.techTags === "string" ? data.techTags : JSON.stringify(data.techTags || []),
        order: data.order !== undefined ? data.order : undefined,
      },
    });

    try {
      revalidatePath("/");
      revalidatePath("/", "layout");
    } catch (e) {}

    return NextResponse.json({ success: true, experience: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update experience" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    await prisma.experience.delete({
      where: { id },
    });

    try {
      revalidatePath("/");
      revalidatePath("/", "layout");
    } catch (e) {}

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete experience" }, { status: 500 });
  }
}
