import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendContactEmail } from "@/lib/resend";
import * as z from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    // 1. Record message in Database
    const record = await prisma.contactMessage.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject || null,
        message: validatedData.message,
      },
    });

    // 2. Dispatch email via Resend
    await sendContactEmail({
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      message: validatedData.message,
    });

    return NextResponse.json({
      success: true,
      messageId: record.id,
      message: "Your message has been sent successfully!",
    });
  } catch (error: any) {
    console.error("Contact API error:", error);
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors[0]?.message || "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 });
  }
}
