"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DeleteConfirmationDialogProps {
  id?: string;
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  onConfirm: () => Promise<void> | void;
  confirmText?: string;
  cancelText?: string;
  loadingText?: string;
}

export function DeleteConfirmationDialog({
  id,
  trigger,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete the item.",
  onConfirm,
  confirmText = "Delete",
  cancelText = "Cancel",
  loadingText = "Deleting...",
}: DeleteConfirmationDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
      setOpen(false); // close dialog on success
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            id={id}
            variant="destructive"
            onClick={() => {
              handleConfirm();
            }}
            disabled={loading}
          >
            {loading ? loadingText : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
