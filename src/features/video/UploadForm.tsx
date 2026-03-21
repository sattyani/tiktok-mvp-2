"use client";

import { useActionState, useState } from "react";
import { uploadAction, UploadState } from "./actions";

const MAX_SIZE = 100 * 1024 * 1024;

const initialState: UploadState = { error: "" };

export default function UploadForm() {
  const [state, formAction, pending] = useActionState(uploadAction, initialState);
  const [fileError, setFileError] = useState("");
  const [hasFile, setHasFile] = useState(false);
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setFileError("");
      setHasFile(false);
      return;
    }
    if (file.type !== "video/mp4") {
      setFileError("Only MP4 files are accepted.");
      setHasFile(false);
      return;
    }
    if (file.size > MAX_SIZE) {
      setFileError("File must be 100 MB or smaller.");
      setHasFile(false);
      return;
    }
    setFileError("");
    setHasFile(true);
  }

  const disabled = pending || !!fileError || !hasFile;

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full max-w-sm">
      <div className="flex flex-col gap-1">
        <label htmlFor="file" className="text-sm font-medium">
          Video file
        </label>
        <input
          id="file"
          name="file"
          type="file"
          accept="video/mp4"
          onChange={handleFileChange}
          className="text-sm"
        />
        {fileError && (
          <p className="text-sm text-red-600">{fileError}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="caption" className="text-sm font-medium">
          Caption (optional)
        </label>
        <textarea
          id="caption"
          name="caption"
          maxLength={200}
          rows={3}
          className="border rounded px-3 py-2 text-sm resize-none"
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={disabled}
        className="bg-black text-white rounded px-4 py-2 text-sm disabled:opacity-50"
      >
        {pending ? "Uploading…" : "Upload"}
      </button>
    </form>
  );
}
