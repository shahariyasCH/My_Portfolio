import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const categories = await prisma.skillCategory.findMany({
      orderBy: { order: "asc" },
      include: {
        skills: {
          orderBy: { order: "asc" },
        },
      },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();

    if (data.type === "category") {
      const count = await prisma.skillCategory.count();
      const created = await prisma.skillCategory.create({
        data: {
          name: data.name,
          order: data.order ?? count + 1,
        },
      });
      try { revalidatePath("/"); revalidatePath("/", "layout"); } catch (e) {}
      return NextResponse.json({ success: true, category: created });
    } else {
      // Individual skill
      const count = await prisma.skill.count({ where: { categoryId: data.categoryId } });
      const created = await prisma.skill.create({
        data: {
          categoryId: data.categoryId,
          name: data.name,
          description: data.description || null,
          order: data.order ?? count + 1,
        },
      });
      try { revalidatePath("/"); revalidatePath("/", "layout"); } catch (e) {}
      return NextResponse.json({ success: true, skill: created });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create skill" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();

    if (data.type === "category") {
      const updated = await prisma.skillCategory.update({
        where: { id: data.id },
        data: {
          name: data.name,
          order: data.order,
        },
      });
      try { revalidatePath("/"); revalidatePath("/", "layout"); } catch (e) {}
      return NextResponse.json({ success: true, category: updated });
    } else {
      const updated = await prisma.skill.update({
        where: { id: data.id },
        data: {
          name: data.name,
          description: data.description,
          order: data.order,
          categoryId: data.categoryId,
        },
      });
      try { revalidatePath("/"); revalidatePath("/", "layout"); } catch (e) {}
      return NextResponse.json({ success: true, skill: updated });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update skill" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const type = searchParams.get("type") || "skill";

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    if (type === "category") {
      await prisma.skillCategory.delete({ where: { id } });
    } else {
      await prisma.skill.delete({ where: { id } });
    }

    try { revalidatePath("/"); } catch (e) {}
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete" }, { status: 500 });
  }
}
