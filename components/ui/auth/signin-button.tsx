"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { LogOut, LucideArrowUpRight, UserIcon } from "lucide-react";
import { client } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SignInButton() {
  const router = useRouter(); // Use Next.js router
  const [isSignOut, setIsSignOut] = useState<boolean>(false);

  const {
    data: session,
    isPending, //loading state
    error, //error object
  } = client.useSession();

  // console.log("Session Data:", session);

  return (
    <>
      {!session ? (
        <div className="flex items-center gap-0 h-7 pr-2">
          <Button
            onPress={() => router.push("/auth/sign-in")} // Redirect to the sign-in page
            className="uppercase  bg-secondary text-secondary cursor-pointer h-full "
            size="sm"
            variant="solid"
          >
            <span className="text-sm normal-case text-foreground  ">
              {session ? "" : "LOGIN/SIGNUP"}
            </span>
          </Button>
          <LucideArrowUpRight className="bg-primary text-secondary text-[5em] h-full" />
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-start justify-between z-30  ">
              <div className="flex items-center  gap-x-2">
                <div className="pr-2">
                  <Avatar className="hidden h-9 w-9 sm:flex outline-2 outline-offset-1 outline-accent box-content ">
                    <AvatarImage
                      src={session?.user.image || "#"}
                      alt="Avatar"
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {session?.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="grid gap-1 ">
                  <p className="text-sm uppercase font-bold  leading-none">
                    {session?.user.name}
                  </p>
                  <p className="text-xs font-ibmplex">{session?.user.email}</p>
                </div>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="cursor-pointer">
              <DropdownMenuItem
                onSelect={() => {
                  router.push("/dashboard");
                }}
                className="cursor-pointer"
              >
                <UserIcon />
                <span>Dashboard</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={async () => {
                await client.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/"); // redirect to login page
                    },
                  },
                });
              }}
            >
              <LogOut />
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
