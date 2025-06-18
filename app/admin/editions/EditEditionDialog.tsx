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

export type EditionForm = {
  id: string;
  overview: string;

};

interface EditEditionDialogProps {
  edition: EditionForm | null;
}

export default function EditEditionDialog({
  edition,
}: EditEditionDialogProps) {
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);

  const [formState, setFormState] = useState<EditionForm>({
    id: "",
    overview: "",
   
  });
  const [loading, setLoading] = useState(false);

  // Populate form when `edition` changes
  useEffect(() => {
    if (edition) {
      setFormState(edition);
    }
  }, [edition]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${getBaseUrl()}/api/editions`, {
        method: "PUT",
        headers: { "Overview-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (!res.ok)
        throw new Error((await res.json()).error || "Failed to update");

      toast.success("Edition updated!");
      closeRef.current?.click(); // ✅ Close the dialog
      router.refresh();

      // ✅ Reset form state
      setFormState({
        id: "",
        overview: "",
       
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
            <DialogTitle>Edit Edition</DialogTitle>
            <DialogDescription>
              Modify the fields below and save.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Label htmlFor="overview">Overview</Label>
            <Textarea
              id="overview"
              value={formState.overview}
              onChange={(e) =>
                setFormState((f) => ({ ...f, overview: e.target.value }))
              }
              required
              className="h-[200px]"
            />

       
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button className="cursor-pointer" variant="outline" ref={closeRef}>
                Cancel
              </Button>
            </DialogClose>
            <Button className="cursor-pointer" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
