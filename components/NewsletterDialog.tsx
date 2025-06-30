"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useDialog } from "@/providers/DialogProvider";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Turnstile } from "@marsidev/react-turnstile"; // Add this if not already

interface NewsletterSubscription {
  name: string;
  email: string;
  notifyPermission: boolean;
}

export function NewsletterDialog() {
  const { activeDialog, close } = useDialog();
  const isOpen = activeDialog === "newsletter";

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileStatus, setTurnstileStatus] = useState("required");
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { isSubmitting },
  } = useForm<NewsletterSubscription>({
    defaultValues: {
      name: "",
      email: "",
      notifyPermission: false,
    },
  });

  const email = watch("email");
  const name = watch("name");
  const notifyPermission = watch("notifyPermission");

  const onSubmit = async (data: NewsletterSubscription) => {
    try {
      // 1. First verify the Turnstile token
      const verifyRes = await fetch("/api/verify-turnstile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: turnstileToken }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok || !verifyData.success) {
        toast.error("CAPTCHA verification failed. Please try again.");
        return;
      }

      // 2. Proceed to send newsletter subscription data
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong.");
      }

      toast.success("You are subscribed to COSTrAD!");
      reset();
      close();
    } catch (error: any) {
      toast.error(error.message || "Subscription failed");
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-[550px] sm:w-3/5 rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <DialogHeader className="text-left">
            <DialogTitle>Subscribe to COSTrAD Newsletter</DialogTitle>
            <DialogDescription>
              Let us keep the communication channels open.
            </DialogDescription>
          </DialogHeader>

          {/* Input: Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Your Name"
              {...register("name", { required: true })}
            />
          </div>

          {/* Input: Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="eg. paul.silas@example.com"
              {...register("email", { required: true })}
            />
          </div>

          <div>
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
              options={{ theme: "auto", size: "flexible" }} // Customize the widget's theme (dark mode in this case)
              onError={() => {
                setTurnstileStatus("error");
                setError("Security check failed. Please try again.");
              }}
              onExpire={() => {
                setTurnstileStatus("expired");
                setError("Security check expired. Please verify again.");
              }}
              onWidgetLoad={() => {
                setTurnstileStatus("required");
                setError(null);
              }}
              onSuccess={(token) => {
                setTurnstileToken(token);
                setTurnstileStatus("success");
                console.log("Token received:", token);
              }}
            />
          </div>

          {/* Checkbox: Notify Permission */}
          <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
            <Controller
              name="notifyPermission"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="notifyPermission"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                />
              )}
            />
            <div className="grid gap-1.5 font-normal">
              <p className="text-sm leading-none font-medium">
                Subscribe to Newsletters
              </p>
              <p className="text-muted-foreground text-sm">
                I agree to receive occasional newsletters, updates, and event
                invitations from COSTrAD. I understand I can unsubscribe at any
                time.
              </p>
            </div>
          </Label>

          {error && (
            <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
          )}
          <DialogFooter className="w-full mt-4 grid sm:grid-cols-2 gap-2">
            <DialogClose asChild>
              <Button className="w-full" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <Button
                      className="w-full"
                      type="submit"
                      disabled={
                        isSubmitting ||
                        !name ||
                        !email ||
                        !notifyPermission ||
                        turnstileStatus !== "success"
                      }
                    >
                      {isSubmitting ? "Submitting..." : "Subscribe"}
                    </Button>
                  </span>
                </TooltipTrigger>
                {!notifyPermission && (
                  <TooltipContent side="top" className="text-xs">
                    You must agree to receive newsletters to subscribe.
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
