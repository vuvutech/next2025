"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LucideScanFace, LucideTrash2, MoreHorizontal } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { getCountryCode, countryCodeToFlagEmoji } from "@/lib/countries";

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
            className="text-foreground cursor-pointer"
            onClick={handleViewUser}
          >
            <span className=" flex items-center gap-1">
              <LucideScanFace /> View User
            </span>
          </DropdownMenuItem>

          {/* <DropdownMenuItem
            className=" cursor-pointer"
            onClick={() => setShowConfirmDialog(true)}
          >
            <span className=" hover:text-destructive flex items-center gap-1">
              <LucideTrash2 />
              Delete User
            </span>
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* View User Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="sm:max-w-2xl rounded-xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>

          {loadingUser ? (
            <p className="text-sm text-muted-foreground">
              Loading user info...
            </p>
          ) : userDetails ? (
            <Card className="-space-y-5 border-dotted divide-y-1 divide-muted  ">
              <CardHeader>
                <div className="flex items-center gap-4 pb-2">
                  <div className="relative">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={userDetails.image || null}
                        alt={userDetails.name || null}
                      />
                      <AvatarFallback>
                        {userDetails.name.charAt(0) || "CN"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute -bottom-1 right-0">
                      {userDetails.profile?.country &&
                        (() => {
                          const code = getCountryCode(
                            userDetails.profile.country
                          );
                          return code ? (
                            <span
                              className=" translate-x-1/4 translate-y-1/4 text-base  px-[2px]  leading-none "
                              title={userDetails.profile.country}
                            >
                              {countryCodeToFlagEmoji(code)}
                            </span>
                          ) : null;
                        })()}
                    </span>
                  </div>
                  <div>
                    <h2 className=" font-semibold">{userDetails.name}</h2>
                    <p className="text-xs text-muted-foreground">
                      {userDetails.email || "No email specified"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {userDetails.profile?.telephone || "-"},{" "}
                      {userDetails.profile?.mobile || "-"}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="-space-y-1  border-dotted divide-y-1 divide-muted  ">
                <p className="text-sm text-foreground py-2">
                  {userDetails.profile?.biography || "No biography available"}
                </p>

                {/* <SeperatorWithText seperatorText="Contact Information" /> */}
                <div className="flex items-center justify-between gap-2 py-2">
                  <span className="font-semibold">Belief system:</span>
                  <span className="text-xs text-muted-foreground">
                    {userDetails.profile?.religion ||
                      "No belief system specified"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 py-2">
                  <span className="font-semibold">Profession:</span>
                  <span className="text-xs text-muted-foreground">
                    {userDetails.profile?.profession ||
                      "No profession specified"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 py-2">
                  <span className="font-semibold">Highest Qualification:</span>
                  <span className="text-xs text-muted-foreground">
                    {userDetails.profile?.highestQualification ||
                      "No highest qualification specified"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 py-2">
                  <span className="font-semibold">
                    Disability Assistance Required:
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {userDetails.profile?.disabilityAssistance ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex flex-col items-start justify-between gap-2 py-2">
                  <span className="font-semibold">
                    Disability Assistance Type:
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {userDetails.profile?.disabilityDescription ||
                      "No disability assistance specified"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 py-2">
                  <span className="font-semibold">Emergency Contact Name:</span>
                  <span className="text-xs text-muted-foreground">
                    {userDetails.profile?.emergencyContactName ||
                      "No emergency contact specified"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 py-2">
                  <span className="font-semibold">
                    Emergency Contact Telephone:
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {userDetails.profile?.emergencyContactTelephone ||
                      "No emergency contact specified"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 py-2">
                  <span className="font-semibold">Address:</span>
                  <span className="text-xs text-muted-foreground text-right">
                    {`${userDetails.profile?.address}`},
                    {`${userDetails.profile?.addressLine2 || ""}, `}
                    <br />
                    {`${userDetails.profile?.city || ""}, `}
                    {`${userDetails.profile?.state || ""}, `}
                    {`${userDetails.profile?.postalCode || ""}, `}
                    {`${userDetails.profile?.country || ""}`}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 py-2">
                  <span className="font-semibold">Facebook:</span>
                  <span className="text-xs text-muted-foreground">
                    {userDetails.profile?.facebook ||
                      "No Facebook account specified"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 py-2">
                  <span className="font-semibold">Twitter (X):</span>
                  <Link
                    target="_blank"
                    href={userDetails.profile?.twitter || "#"}
                    className="text-xs text-muted-foreground"
                  >
                    {userDetails.profile?.twitter ||
                      "No Twitter account specified"}
                  </Link>
                </div>
                <div className="flex items-center justify-between gap-2 py-2">
                  <span className="font-semibold">Youtube:</span>
                  <Link
                    target="_blank"
                    href={userDetails.profile?.youtube || "#"}
                    className="text-xs text-muted-foreground"
                  >
                    {userDetails.profile?.youtube ||
                      "No Youtube account specified"}
                  </Link>
                </div>
                <div className="flex items-center justify-between gap-2 py-2">
                  <span className="font-semibold">LinkedIn:</span>
                  <Link
                    target="_blank"
                    href={userDetails.profile?.linkedin || "#"}
                    className="text-xs text-muted-foreground"
                  >
                    {userDetails.profile?.linkedin ||
                      "No LinkedIn account specified"}
                  </Link>
                </div>
                <div className="flex items-center justify-between gap-2 py-2">
                  <span className="font-semibold">Instagram:</span>
                  <Link
                    target="_blank"
                    href={userDetails.profile?.instagram || "#"}
                    className="text-xs text-muted-foreground"
                  >
                    {userDetails.profile?.instagram ||
                      "No Instagram account specified"}
                  </Link>
                </div>
                <div className="flex items-center justify-between gap-2 py-2">
                  <span className="font-semibold">TikTok:</span>
                  <Link
                    target="_blank"
                    href={userDetails.profile?.tiktok || "#"}
                    className="text-xs text-muted-foreground"
                  >
                    {userDetails.profile?.tiktok ||
                      "No TikTok account specified"}
                  </Link>
                </div>
              </CardContent>
            </Card>
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
