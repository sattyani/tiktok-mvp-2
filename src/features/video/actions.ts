"use server";

import { redirect } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export type UploadState = {
  error: string;
};

export async function uploadAction(
  _prev: UploadState,
  formData: FormData
): Promise<UploadState> {
  const session = await getSession();
  if (!session.userId) {
    redirect("/login");
  }

  const file = formData.get("file") as File | null;
  const caption = (formData.get("caption") as string) ?? "";

  if (!file || file.size === 0) {
    return { error: "Upload failed. Please try again." };
  }

  try {
    const uuid = crypto.randomUUID();
    const filename = `${uuid}.mp4`;
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    await fs.mkdir(uploadsDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    await fs.writeFile(path.join(uploadsDir, filename), Buffer.from(bytes));

    await prisma.video.create({
      data: {
        userId: session.userId,
        filename,
        caption: caption.trim() || null,
      },
    });
  } catch {
    return { error: "Upload failed. Please try again." };
  }

  redirect("/profile");
}
