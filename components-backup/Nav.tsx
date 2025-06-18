import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import AuthButtons from "./AuthButtons";

export default function Nav() {
  return (
    <nav className="my-10 mx-auto flex items-center justify-between px-5">
      <ModeToggle />
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <AuthButtons />
      </SignedOut>
    </nav>
  );
}
