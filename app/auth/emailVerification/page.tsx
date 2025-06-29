"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "@/hooks/use-session";
import { useRouter, useSearchParams } from "next/navigation"; // Added useSearchParams
import { useEffect } from "react";
import Link from "next/link";
import Loading from "@/components/Loading";

export default function EmailVerification() {
  const searchParams = useSearchParams(); // 👈 Get query params
  const signupEmail = searchParams.get("signupEmail"); // 👈 Extract the email
  const { session, isLoading } = useSession();
  const router = useRouter();

  // Redirect to home if already signed in
  useEffect(() => {
    if (session && session.userId) {
      router.push("/");
    }
  }, [session, router]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex p-4 flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-auto bg-muted">
        <CardHeader>
          <CardTitle className="text-xl">Verify Email to Continue ...</CardTitle>
          <CardDescription>
            An email has been sent to{" "}
            <span className="font-bold text-destructive">
              {signupEmail || "your email"}
            </span>.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          Visit your inbox to verify your email. If not in your inbox, then
          check your spam folder.
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" asChild>
            <Link href="/">Back to Website</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export const dynamic = "force-dynamic";
