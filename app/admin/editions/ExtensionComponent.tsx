"use client";

import { useEffect, useState } from "react";
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
import { toast } from "sonner";
import { getBaseUrl } from "@/config/site";
import { Button } from "@/components/ui/button";
import { UploadImage } from "@/components/custom/UploadImage";
import { InstituteCombobox } from "@/components/custom/InstituteCombobox";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

type Institute = {
  id: string;
  name: string;
  logo?: string;
};

export function ExtensionComponent() {
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [selectedInstituteId, setSelectedInstituteId] = useState<string>("");

  useEffect(() => {
    fetch("/api/institutes")
      .then((res) => res.json())
      .then((data) => setInstitutes(data));
  }, []);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    instituteId: "",
    title: "",
    overview: "",
    theme: "",
    seo: "",
    price: "",
    startDate: "",
    endDate: "",
    banner: "",
    verticalBanner: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    if (!form.instituteId || !form.title || !form.startDate || !form.endDate || !form.price) {
      toast.error("Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${getBaseUrl()}/api/editions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          startDate: form.startDate ? new Date(form.startDate) : null,
          endDate: form.endDate ? new Date(form.endDate) : null,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message || "Failed to create edition.");
      }

      toast.success("Edition created successfully!");
      setForm({
        instituteId: "",
        title: "",
        overview: "",
        theme: "",
        seo: "",
        price: "",
        startDate: "",
        endDate: "",
        banner: "",
        verticalBanner: "",
      });
      router.refresh();
    } catch (err) {
      if (err && typeof err === "object" && "message" in err) {
        toast.error(
          (err as { message: string }).message || "Something went wrong."
        );
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
        <div
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 ml-auto
        cursor-pointer"
        >
          Add Edition
        </div>
      </SheetTrigger>
      <SheetContent className="p-4 overflow-y-scroll sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Add New Edition</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-2">
          <div className="grid gap-2">
            {/* <Label>Institute</Label> */}
            <InstituteCombobox
              institutes={institutes}
              onSelect={(id) => {
                setSelectedInstituteId(id);
                setForm((prev) => ({ ...prev, instituteId: id })); // ✅ update the form
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="eg. FDI 2026 EDITION"
              />
            </div>
            <div className="grid gap-2">
              <Label>Theme</Label>
              <Input
                name="theme"
                value={form.theme}
                onChange={handleChange}
                placeholder="eg. "
              />
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
            <div className="grid gap-2">
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
                    buttonVariant={"outline"}
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
                    captionLayout="dropdown"
                    fromYear={new Date().getFullYear()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
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
                    captionLayout="dropdown"
                    fromYear={new Date().getFullYear()}
                    toYear={2045} // ⬅️ future year range
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>SEO</Label>
              <Input
                name="seo"
                value={form.seo}
                onChange={handleChange}
                placeholder="eg. use comma seperated keywords"
              />
            </div>
            <div className="grid gap-2">
              <Label>Price (eg. 120.00)</Label>
              <Input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <div>
              <UploadImage
                label="Banner"
                onUpload={(url) => setForm((f) => ({ ...f, banner: url }))}
              />
            </div>

            <div>
              <UploadImage
                label="Vertical Banner"
                onUpload={(url) =>
                  setForm((f) => ({ ...f, verticalBanner: url }))
                }
              />
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Edition"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
