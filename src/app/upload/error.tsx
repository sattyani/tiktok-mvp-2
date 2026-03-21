"use client";

export default function UploadError() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-xl font-semibold mb-6">Upload a video</h1>
      <p className="text-sm text-red-600">Upload failed. File must be 100 MB or smaller.</p>
    </main>
  );
}
