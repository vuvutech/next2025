"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function UploadImage({
  label,
  onUpload,
}: {
  label: string;
  onUpload: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    onUpload(data.secure_url);
    setUploading(false);
  };

  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Input type="file" accept="image/*" onChange={handleFileChange} />
      {uploading && (
        <p className="text-sm text-muted-foreground">Uploading...</p>
      )}
    </div>
  );
}
