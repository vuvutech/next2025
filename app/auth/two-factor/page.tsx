"use client";

import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@/hooks/use-session";
import { client } from "@/lib/auth-client";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

export default function TwoFactorComponent() {
  const [totpCode, setTotpCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize router
  const { session, isLoading } = useSession();

  useEffect(() => {
    if (session) {
      router.replace("/"); // Use router.replace for client-side redirect
    }
  }, [session, router]); // Add router to dependencies

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totpCode.length !== 6 || !/^\d+$/.test(totpCode)) {
      setError("TOTP code must be 6 digits");
      return;
    }
    client.twoFactor
      .verifyTotp({
        code: totpCode,
      })
      .then((res) => {
        if (res.data?.token) {
          setError("");
          router.replace("/"); // Client-side redirect immediately after verification
        } else {
          setError("Invalid TOTP code");
        }
      })
      .catch(() => {
        setError("Verification failed. Please try again.");
      });
  };

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center"><div className="loaderAnim" /></div>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>TOTP Verification</CardTitle>
            <CardDescription>
              Enter your 6-digit TOTP code to authenticate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="totp">TOTP Code</Label>
                <Input
                  id="totp"
                  type="text"
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  required
                />
              </div>
              {error && (
                <div className="flex items-center mt-2 text-red-500">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              <Button type="submit" className="w-full mt-4">
                Verify
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground gap-2">
            <Link href={`/auth/two-factor/otp`} >
              <Button variant="link" size="sm">
                Switch to <span className="font-bold">Email Verification</span>
              </Button>
            </Link>

          </CardFooter>
        </Card>
      </main>
    </Suspense>
  );
}