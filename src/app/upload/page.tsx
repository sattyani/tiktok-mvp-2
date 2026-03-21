import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import UploadForm from "@/features/video/UploadForm";

export default async function UploadPage() {
  const session = await getSession();
  console.log("[upload] session.userId:", session.userId);
  if (!session.userId) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-xl font-semibold mb-6">Upload a video</h1>
      <UploadForm />
    </main>
  );
}
