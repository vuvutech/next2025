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
import { useRouter } from "next/navigation"; // Import useRouter
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "@/components/Loading";

export default function EmailVerification() {
  const [signupEmail, setSignupEmail] = useState<string | null>(null);
  const { session, isLoading } = useSession(); // Get the user's session
  const router = useRouter(); // Initialize the router

  // Redirect to home if user is already signed in
  useEffect(() => {
    const fetchData = async () => {
      const emailFromStorage = await sessionStorage.getItem("signupEmail");
      setSignupEmail(emailFromStorage);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (session && session.userId) {
      router.push("/");
    }
  }, [session, router]);

  if (isLoading) {
    return <Loading />;
  }

  // if (session && session.userId) {
  // 	return router.push("/");
  // }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Verify Email to Continue ...</CardTitle>
          <CardDescription>
            An email has been sent to{" "}
            <span className="font-bold text-green-500">{signupEmail}</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          Visit your inbox to verify your email. If not in your inbox, kindly
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
