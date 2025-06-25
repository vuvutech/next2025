"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDialog } from "@/providers/DialogProvider";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Controller, useForm } from "react-hook-form";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";

interface TestimonialForm {
  content: string;
  userFeaturePermission: boolean;
}

export function TestimonialDialog() {
  const { activeDialog, close } = useDialog();
  const isOpen = activeDialog === "testimonial";
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<TestimonialForm>({
    defaultValues: {
      content: "",
      userFeaturePermission: false,
    },
  });

  const onSubmit = async (data: TestimonialForm) => {
    console.log(data);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to submit testimonial");
      }

      toast.success("Testimonial submitted!");
      reset(); // clear form
      close();
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    }
  };

  if (!session?.user) return null; // 🔒 restrict to logged-in users only

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-[800px] sm:w-2/5 rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <DialogHeader className="text-left">
            <DialogTitle>Share Your Testimonial</DialogTitle>
            <DialogDescription>
              We'd love to hear about your experience with COSTrAD.
            </DialogDescription>
          </DialogHeader>

          <Textarea
            id="testimonial-content"
            placeholder="Share your experience here..."
            {...register("content", { required: true })}
            className="resize-y"
            rows={7}
          />

          <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
            <Controller
              name="userFeaturePermission"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="feature"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                />
              )}
            />
            <div className="grid gap-1.5 font-normal">
              <p className="text-sm leading-none font-medium">
                Feature my testimonial
              </p>
              <p className="text-muted-foreground text-sm">
                I consent to having this testimonial published by COSTrAD.
              </p>
            </div>
          </Label>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
