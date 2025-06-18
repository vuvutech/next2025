"use client";

import { Button } from "./ui/button";

export default function AuthButtons() {
  return (
    <div className="flex flex-row justify-center items-center space-x-3 mt-5">
      <Button onClick={() => (window.location.href = "/sign-in")}>Login</Button>
      <Button onClick={() => (window.location.href = "/sign-up")}>
        Sign up
      </Button>
    </div>
  );
}
