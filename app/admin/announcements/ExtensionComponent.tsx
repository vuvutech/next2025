"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { IconCirclePlus } from "@tabler/icons-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { getBaseUrl } from "@/config/site";


export function ExtensionComponent() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${getBaseUrl()}/api/announcements`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }), // ✅ match model field
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message || "Failed to create announcement.");
      }

      toast.success("Announcement created successfully!");
      setContent(""); // reset form
      document.getElementById("dialog-close-btn")?.click();
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="lg" className="cursor-pointer">
            <IconCirclePlus /> Add New
          </Button>
        </DialogTrigger>
        <DialogContent className=" sm:max-w-[725px] overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add Announcement</DialogTitle>
              <DialogDescription>
                Provide a clear title and message content. This announcement
                will be visible to all users once published. Review before
                submitting.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-3">
                <Label htmlFor="content">Content</Label>
                <Textarea
                
                  id="content"
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter announcement content"
                  required
                  className="h-[250px]"
                />               
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" id="dialog-close-btn">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
