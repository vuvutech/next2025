"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ActionsCellProps {
  id?: string;
}

export function ActionsCellComponent({ id }: ActionsCellProps) {
  const router = useRouter();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/users/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to delete user");
      }

      toast.success("User deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete user");
      console.error(error);
    } finally {
      setShowConfirmDialog(false);
    }
  };

  const handleViewUser = async () => {
    if (!id) return;
    setLoadingUser(true);
    setShowViewDialog(true);

    try {
      const res = await fetch(`/api/users/${id}`);
      if (!res.ok) throw new Error("Failed to load user");

      const data = await res.json();
      setUserDetails(data);
    } catch (err) {
      toast.error("Failed to load user details");
      console.error(err);
      setUserDetails(null);
    } finally {
      setLoadingUser(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-8 w-8 p-0 rounded-full">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-primary-foreground cursor-pointer"
            onClick={handleViewUser}
          >
            <span className="font-semibold text-primary">View User</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-destructive cursor-pointer"
            onClick={() => setShowConfirmDialog(true)}
          >
            <span className="font-semibold text-destructive">Delete User</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <p>
            This action cannot be undone. This will permanently delete the user.
          </p>
          <DialogFooter className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View User Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="sm:max-w-xl rounded-xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>

          {loadingUser ? (
            <p className="text-sm text-muted-foreground">Loading user info...</p>
          ) : userDetails ? (
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Name:</span> {userDetails.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {userDetails.email}
              </p>
              <p>
                <span className="font-medium">Role:</span>{" "}
                {userDetails.role || "N/A"}
              </p>
              {/* Add more fields as needed */}
            </div>
          ) : (
            <p className="text-sm text-red-500">
              Failed to load user information.
            </p>
          )}

          <DialogFooter className="pt-4">
            <Button className="py-0.5" variant="default" onClick={() => setShowViewDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
