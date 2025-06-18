// components/UserAvatar.tsx
"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { client } from "@/lib/auth-client";

export function UserAvatar({ className = "" }: { className?: string }) {
  const {
    data: session,
    isPending, //loading state
    error, //error object
  } = client.useSession();

  if (isPending) {
    return (
      <Avatar className={`h-9 w-9 bg-gray-300 animate-pulse ${className}`} />
    );
  }

  const user = session?.user;

  if (!user) {
    return (
      <Avatar className={`h-9 w-9 ${className}`}>
        <AvatarFallback>?</AvatarFallback>
      </Avatar>
    );
  }


  return (
    <div className="flex items-start justify-between z-30 ">
      <div className="flex items-center gap-4">
        <Avatar className="hidden h-9 w-9 sm:flex ">
          <AvatarImage
            src={session?.user.image || "#"}
            alt="Avatar"
            className="object-cover"
          />
          <AvatarFallback>{session?.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <p className="text-sm font-medium leading-none">
            {session?.user.name}
          </p>
          <p className="text-sm">{session?.user.email}</p>
        </div>
      </div>
    </div>
  );
}
