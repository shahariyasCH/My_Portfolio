import fs from "fs";
import path from "path";
import { put } from "@vercel/blob";

export async function uploadFile(file: File, folder: string = "uploads"): Promise<string> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  // If Vercel Blob token is set, upload to cloud storage
  if (token) {
    try {
      const filename = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const blob = await put(filename, file, {
        access: "public",
        token: token,
      });
      return blob.url;
    } catch (err) {
      console.warn("Vercel blob upload fallback to local storage:", err);
    }
  }

  // Local filesystem storage for development
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const safeFilename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, safeFilename);
  fs.writeFileSync(filePath, buffer);

  return `/uploads/${safeFilename}`;
}
