"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IconPencilCog } from "@tabler/icons-react";
import { getBaseUrl } from "@/config/site";

export type AnnouncementForm = {
  id: string;
  content: string;
  featured: boolean;
  approved: boolean;
};

interface EditAnnouncementDialogProps {
  announcement: AnnouncementForm | null;
}

export default function EditAnnouncementDialog({
  announcement,
}: EditAnnouncementDialogProps) {
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);

  const [formState, setFormState] = useState<AnnouncementForm>({
    id: "",
    content: "",
    featured: false,
    approved: false,
  });
  const [loading, setLoading] = useState(false);

  // Populate form when `announcement` changes
  useEffect(() => {
    if (announcement) {
      setFormState(announcement);
    }
  }, [announcement]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${getBaseUrl()}/api/announcements`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (!res.ok)
        throw new Error((await res.json()).error || "Failed to update");

      toast.success("Announcement updated!");
      closeRef.current?.click(); // ✅ Close the dialog
      router.refresh();

      // ✅ Reset form state
      setFormState({
        id: "",
        content: "",
        featured: false,
        approved: false,
      });
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <IconPencilCog className="cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Announcement</DialogTitle>
            <DialogDescription>
              Modify the fields below and save.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formState.content}
              onChange={(e) =>
                setFormState((f) => ({ ...f, content: e.target.value }))
              }
              required
              className="h-[200px]"
            />

            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formState.featured}
                  onChange={(e) =>
                    setFormState((f) => ({ ...f, featured: e.target.checked }))
                  }
                />
                Featured
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formState.approved}
                  onChange={(e) =>
                    setFormState((f) => ({ ...f, approved: e.target.checked }))
                  }
                />
                Approved
              </label>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" ref={closeRef}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
