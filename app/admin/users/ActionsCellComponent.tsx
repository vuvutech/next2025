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
      const res = await fetch(`/api/user?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        },
      });

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
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
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
            <p className="text-sm text-muted-foreground">
              Loading user info...
            </p>
          ) : userDetails ? (
            <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-x-3">
                  <span
                    data-slot="avatar"
                    className="relative flex shrink-0 overflow-hidden rounded-full size-16"
                  >
                    <img
                      data-slot="avatar-image"
                      className="aspect-square size-full"
                      alt="Eliana Garcia"
                      src="https://images.unsplash.com/photo-1510706019500-d23a509eecd4?q=80&w=2667&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                    />
                  </span>
                  <div className="grow">
                    <h1 className="text-lg font-medium">Eliana Garcia</h1>
                    <p className="text-sm text-muted-foreground">
                      Graphic Designer, Web designer/developer
                    </p>
                  </div>
                </div>
                <div className="mt-8">
                  <p className="text-sm text-muted-foreground">
                    I am a seasoned graphic designer with over 14 years of
                    experience in creating visually appealing and user-centric
                    designs. My expertise spans across UI design, design
                    systems, and custom illustrations, helping clients bring
                    their digital visions to life.
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Currently, I work remotely for Notion, where I design
                    template UIs, convert them into HTML and CSS, and provide
                    comprehensive support to our users. I am passionate about
                    crafting elegant and functional designs that enhance user
                    experiences.
                  </p>
                  <ul className="mt-5 flex flex-col gap-y-3">
                    <li>
                      <a
                        className="flex items-center gap-x-2.5 text-sm text-muted-foreground hover:text-foreground"
                        href="mailto:elianagarcia997@about.me"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-mail size-3.5"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        elianagarcia997@about.me
                      </a>
                    </li>
                    <li>
                      <a
                        className="flex items-center gap-x-2.5 text-sm text-muted-foreground hover:text-foreground"
                        href="https://twitter.com/elianagarcia997"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-twitter size-3.5"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                        </svg>
                        @elianagarcia997
                      </a>
                    </li>
                    <li>
                      <a
                        className="flex items-center gap-x-2.5 text-sm text-muted-foreground hover:text-foreground"
                        href="#"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-map-pin size-3.5"
                        >
                          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        San Francisco, CA
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-red-500">
              Failed to load user information.
            </p>
          )}

          <DialogFooter className="pt-4">
            <Button
              className="py-0.5"
              variant="default"
              onClick={() => setShowViewDialog(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
