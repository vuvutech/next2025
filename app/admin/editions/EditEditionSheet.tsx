"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { UploadImage } from "@/components/custom/UploadImage";
import { InstituteCombobox } from "@/components/custom/InstituteCombobox";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { getBaseUrl } from "@/config/site";
import { IconEdit } from "@tabler/icons-react";

export function EditEditionSheet({ edition }: { edition: any }) {
  const router = useRouter();
  const [institutes, setInstitutes] = useState<{ id: string; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    instituteId: edition.instituteId,
    title: edition.title,
    theme: edition.theme || "",
    overview: edition.overview || "",
    seo: edition.seo || "",
    price: edition.price.toString(),
    startDate: edition.startDate
      ? new Date(edition.startDate).toISOString().split("T")[0]
      : "",
    endDate: edition.endDate
      ? new Date(edition.endDate).toISOString().split("T")[0]
      : "",
    banner: edition.banner || "",
    verticalBanner: edition.verticalBanner || "",
  });

  useEffect(() => {
    fetch("/api/institutes")
      .then((res) => res.json())
      .then((data) => setInstitutes(data));
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${getBaseUrl()}/api/editions`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: edition.id,
          ...form,
          price: parseFloat(form.price),
          startDate: new Date(form.startDate),
          endDate: new Date(form.endDate),
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message || "Update failed.");
      }

      toast.success("Edition updated!");
      router.refresh();
    } catch (err) {
      toast.error((err as any)?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger
        className=" cursor-pointer 
      inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3
      "
      >
        <IconEdit />
      </SheetTrigger>
      <SheetContent className="p-4 overflow-y-scroll sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Edit Edition</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleUpdate} className="grid gap-4 py-2">
          <InstituteCombobox
            institutes={institutes}
            selectedId={form.instituteId} // ✅ Pre-select based on edition.instituteId
            onSelect={(id) => setForm((prev) => ({ ...prev, instituteId: id }))}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input name="title" value={form.title} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label>Theme</Label>
              <Input name="theme" value={form.theme} onChange={handleChange} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Overview</Label>
            <Textarea
              name="overview"
              value={form.overview}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {(["startDate", "endDate"] as const).map((key) => (
              <div className="grid gap-2" key={key}>
                <Label>{key === "startDate" ? "Start Date" : "End Date"}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !form[key] && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form[key]
                        ? format(new Date(form[key]), "PPP")
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={form[key] ? new Date(form[key]) : undefined}
                      onSelect={(date) =>
                        setForm((prev) => ({
                          ...prev,
                          [key]: date?.toISOString().split("T")[0] || "",
                        }))
                      }
                      captionLayout="dropdown"
                      fromYear={2020}
                      toYear={2045}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>SEO</Label>
              <Input name="seo" value={form.seo} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label>Price</Label>
              <Input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <UploadImage
            label="Banner"
            onUpload={(url) => setForm((f) => ({ ...f, banner: url }))}
          />
          <UploadImage
            label="Vertical Banner"
            onUpload={(url) => setForm((f) => ({ ...f, verticalBanner: url }))}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Update Edition"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
