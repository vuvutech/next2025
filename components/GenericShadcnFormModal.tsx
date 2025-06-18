// components/GenericShadcnFormModal.tsx
"use client"; // Essential for client-side functionality

import React from "react";
import { Button } from "@/components/ui/button"; // Shadcn Button
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Shadcn Dialog components

// Define the props interface for GenericShadcnFormModal
interface GenericShadcnFormModalProps {
  // --- Props for controlling the modal's behavior ---
  isOpen: boolean; // Controls the dialog's visibility (controlled component pattern)
  onOpenChange: (open: boolean) => void; // Callback when the dialog's open state changes

  // --- Props for customizing the modal's content ---
  title: string;
  description?: string; // Optional description for the dialog header
  children: React.ReactNode; // The actual form content goes here
  className?: string;

  // --- Props for customizing the footer buttons ---
  primaryButtonText?: string;
  secondaryButtonText?: string; // For the "Cancel" or "Close" button
  onPrimaryButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Callback for primary action
  onSecondaryButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Callback for secondary action (often triggers close)

  // --- Props for button states ---
  isLoading?: boolean; // If true, the primary button will show a loading state
  isPrimaryButtonDisabled?: boolean; // If true, the primary button will be disabled
  isSecondaryButtonDisabled?: boolean; // If true, the secondary button will be disabled

  // --- Optional prop for the trigger element ---
  // You can either provide a custom trigger or let the modal implicitly use `isOpen`/`onOpenChange`
  // If you provide a trigger, remember to set `asChild` if it's a component.
  trigger?: React.ReactNode;
}

export default function GenericShadcnFormModal({
  isOpen,
  onOpenChange,
  className,
  title,
  description,
  children,
  primaryButtonText = "Save changes",
  secondaryButtonText = "Cancel",
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  isLoading = false,
  isPrimaryButtonDisabled = false,
  isSecondaryButtonDisabled = false,
  trigger, // The optional trigger element
}: GenericShadcnFormModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {/* If a trigger is provided, render it. Otherwise, assume external control or no visual trigger needed. */}
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className="md:max-w-3/4  mx-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {/* The dynamic content for the form */}
        <div className="grid gap-4 py-4">
          {" "}
          {/* Added padding for consistency with Shadcn forms */}
          {children}
        </div>

        <DialogFooter>
          {/* Secondary Button: Defaults to closing the dialog */}
          <DialogClose asChild>
            <Button
              type="button" // Important to prevent default form submission if inside a form
              variant="outline"
              onClick={onSecondaryButtonClick} // Use onClick for general button actions
              disabled={isSecondaryButtonDisabled || isLoading}
            >
              {secondaryButtonText}
            </Button>
          </DialogClose>

          {/* Primary Button: Handles the main action */}
          <Button
            className={`${className}`}
            type="submit" // Assuming this button will submit a form within `children`
            onClick={onPrimaryButtonClick} // Use onClick for general button actions
            disabled={isPrimaryButtonDisabled || isLoading}
          >
            {isLoading ? "Loading..." : primaryButtonText}{" "}
            {/* Basic loading indicator */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
