"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  banned: z.boolean(),
  banReason: z.string().min(2, "Reason is required"),
});

type Props = {
  userId: string;
  initialBanned: boolean;
};

export function BanToggleForm({ userId, initialBanned }: Props) {
  const [showDialog, setShowDialog] = useState(false);
  const [isBanning, setIsBanning] = useState(true); // To determine ban/unban mode
  const router = useRouter(); // Initialize router for navigation

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      banned: initialBanned,
      banReason: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const res = await fetch(`/api/users/ban`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userId,
          banned: data.banned,
          banReason: data.banReason,
        }),
      });

      if (!res.ok) throw new Error("Failed to update user");

      toast.success(
        data.banned ? "User banned successfully" : "User unbanned successfully"
      );

      form.setValue("banned", data.banned);
      router.refresh(); // Refresh the page after successful update
      setShowDialog(false);
    } catch (err) {
      toast.error("An error occurred. Try again.");
    }
  };

  return (
    <>
      <Form {...form}>
        <form className="w-full space-y-4">
          <FormField
            control={form.control}
            name="banned"
            render={({ field }) => (
              <FormItem className="flex items-center gap-1">
                <FormLabel className="text-xs">Ban User</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      form.setValue("banned", checked);
                      setIsBanning(checked);
                      setShowDialog(true);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {isBanning ? "Confirm Ban" : "Confirm Unban"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="banReason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {isBanning
                        ? "Reason for banning"
                        : "Reason for unbanning"}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-16"
                        {...field}
                        placeholder={
                          isBanning
                            ? "e.g., spamming, abuse"
                            : "e.g., appeal granted"
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">
                  {isBanning ? "Confirm Ban" : "Confirm Unban"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
