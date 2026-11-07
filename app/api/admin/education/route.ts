import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const education = await prisma.education.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ education });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch education" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    const count = await prisma.education.count();

    const created = await prisma.education.create({
      data: {
        institution: data.institution,
        degree: data.degree,
        location: data.location || "Kerala, India",
        startDate: data.startDate,
        endDate: data.endDate,
        gpa: data.gpa || null,
        coursework: typeof data.coursework === "string" ? data.coursework : JSON.stringify(data.coursework || []),
        order: data.order ?? count + 1,
      },
    });

    try { revalidatePath("/"); revalidatePath("/", "layout"); } catch (e) {}

    return NextResponse.json({ success: true, education: created });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create education" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();

    if (Array.isArray(data.items)) {
      for (const item of data.items) {
        await prisma.education.update({
          where: { id: item.id },
          data: { order: item.order },
        });
      }
      try { revalidatePath("/"); revalidatePath("/", "layout"); } catch (e) {}
      return NextResponse.json({ success: true, message: "Order updated" });
    }

    const updated = await prisma.education.update({
      where: { id: data.id },
      data: {
        institution: data.institution,
        degree: data.degree,
        location: data.location,
        startDate: data.startDate,
        endDate: data.endDate,
        gpa: data.gpa,
        coursework: typeof data.coursework === "string" ? data.coursework : JSON.stringify(data.coursework),
        order: data.order,
      },
    });

    try { revalidatePath("/"); revalidatePath("/", "layout"); } catch (e) {}

    return NextResponse.json({ success: true, education: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update education" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    await prisma.education.delete({ where: { id } });

    try { revalidatePath("/"); revalidatePath("/", "layout"); } catch (e) {}

    return NextResponse.json({ success: true, message: "Education deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete education" }, { status: 500 });
  }
}
