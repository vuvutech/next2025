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
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IconPencilCog } from "@tabler/icons-react";
import { getBaseUrl } from "@/config/site";
import { UploadImage } from "@/components/custom/UploadImage";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export type EditionForm = {
  id: string;
  title: string;
  theme: string;
  seo: string;
  overview: string;
  price: string;
  earlyBirdPrice: string;
  priceViaZoom: string;
  startDate: string;
  endDate: string;
  earlyBirdDeadline: string;
  banner: string;
  verticalBanner: string;
  inPersonDelivery: boolean;
  onlineDelivery: boolean;
};

interface EditEditionDialogProps {
  edition: EditionForm | null;
}

export default function EditEditionDialog({ edition }: EditEditionDialogProps) {
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);

  const [form, setForm] = useState<EditionForm>({
    id: "",
    title: "",
    theme: "",
    seo: "",
    overview: "",
    price: "",
    earlyBirdPrice: "",
    priceViaZoom: "",
    startDate: "",
    endDate: "",
    earlyBirdDeadline: "",
    banner: "",
    verticalBanner: "",
    inPersonDelivery: false,
    onlineDelivery: false,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (edition) setForm(edition);
  }, [edition]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${getBaseUrl()}/api/editions`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price || "0"),
          earlyBirdPrice: parseFloat(form.earlyBirdPrice || "0"),
          priceViaZoom: parseFloat(form.priceViaZoom || "0"),
          startDate: form.startDate ? new Date(form.startDate) : null,
          endDate: form.endDate ? new Date(form.endDate) : null,
          earlyBirdDeadline: form.earlyBirdDeadline ? new Date(form.earlyBirdDeadline) : null,
        }),
      });

      if (!res.ok)
        throw new Error((await res.json()).error || "Failed to update");

      toast.success("Edition updated!");
      closeRef.current?.click();
      router.refresh();
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

      <DialogContent className="sm:max-w-4xl overflow-y-scroll max-h-[90vh]">
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Edit Edition</DialogTitle>
            <DialogDescription>Update edition details below.</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input name="title" value={form.title} onChange={handleChange} />
            </div>
            <div>
              <Label>Theme</Label>
              <Input name="theme" value={form.theme} onChange={handleChange} />
            </div>
          </div>

          <div>
            <Label>SEO</Label>
            <Input name="seo" value={form.seo} onChange={handleChange} />
          </div>

          <div>
            <Label>Overview</Label>
            <Textarea
              name="overview"
              value={form.overview}
              onChange={handleChange}
              className="min-h-[150px]"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Price</Label>
              <Input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Online Price</Label>
              <Input
                name="priceViaZoom"
                type="number"
                value={form.priceViaZoom}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col justify-end gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="inPersonDelivery"
                  checked={form.inPersonDelivery}
                  onCheckedChange={(checked) =>
                    setForm((f) => ({
                      ...f,
                      inPersonDelivery: Boolean(checked),
                    }))
                  }
                />
                <Label htmlFor="inPersonDelivery">In-Person Delivery</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="onlineDelivery"
                  checked={form.onlineDelivery}
                  onCheckedChange={(checked) =>
                    setForm((f) => ({
                      ...f,
                      onlineDelivery: Boolean(checked),
                    }))
                  }
                />
                <Label htmlFor="onlineDelivery">Online Delivery</Label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.startDate
                      ? format(new Date(form.startDate), "PPP")
                      : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      form.startDate ? new Date(form.startDate) : undefined
                    }
                    onSelect={(date) =>
                      setForm((prev) => ({
                        ...prev,
                        startDate: date?.toISOString().split("T")[0] || "",
                      }))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.endDate
                      ? format(new Date(form.endDate), "PPP")
                      : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.endDate ? new Date(form.endDate) : undefined}
                    onSelect={(date) =>
                      setForm((prev) => ({
                        ...prev,
                        endDate: date?.toISOString().split("T")[0] || "",
                      }))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>Early Bird Deadline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.earlyBirdDeadline && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.earlyBirdDeadline
                      ? format(new Date(form.earlyBirdDeadline), "PPP")
                      : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.earlyBirdDeadline ? new Date(form.earlyBirdDeadline) : undefined}
                    onSelect={(date) =>
                      setForm((prev) => ({
                        ...prev,
                        earlyBirdDeadline: date?.toISOString().split("T")[0] || "",
                      }))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <UploadImage
              label="Banner"
              onUpload={(url) => setForm((f) => ({ ...f, banner: url }))}
            />
            <UploadImage
              label="Vertical Banner"
              onUpload={(url) =>
                setForm((f) => ({ ...f, verticalBanner: url }))
              }
            />
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
