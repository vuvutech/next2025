"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PasswordInput } from "./ui/password-input";
import SeperatorWithText from "./ui/seperatorWithText";

export const dynamic = "force-dynamic";
export default function SignInComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const costradCallbackUrl = searchParams.get("callbackUrl") || "/";

  // Prepopulate email if saved previously
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("signupEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const signInPromise = signIn.email(
        { email, password, callbackURL: costradCallbackUrl, rememberMe },
        {
          onSuccess: () => {
            console.log("Signed in successfully!");
          },
          onError: (ctx) => {
            if (ctx.error.status === 403) {
              toast.error("Please verify your email address.");
              sessionStorage.setItem("signupEmail", email);
              router.push("/auth/emailVerification");
            } else if (ctx.error.status === 404) {
              toast.error("User or Password Error");
            } else if (ctx.error.status === 400) {
              toast.error("User or Password Error");
            } else if (ctx.error.status === 401) {
              toast.error("Invalid email or password.");
            } else {
              toast.error(
                ctx.error.message || "Something went wrong. Try again."
              );
            }
          },
        }
      );

      await toast.promise(signInPromise, {
        loading: "Authenticating User...",
        success: "Signed in successfully!",
        error: "Login failed. Please check your details.",
      });
    } catch (error: any) {
      toast.error("Error signing in. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Card className=" rounded-none bg-transparent w-full border-none shadow-none ">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">COSTrAD Sign In</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="py-5">
          <form
            id="emailAndPassword"
            className="grid gap-4"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="me@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/auth/forget-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <PasswordInput
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="password"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox onClick={() => setRememberMe(!rememberMe)} />
              <Label>Remember me</Label>
            </div>
            <Button
              type="submit"
              className="w-full cursor-pointer text-background bg-foreground "
              disabled={loading}
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Login to your account"
              )}
            </Button>
          </form>
          <SeperatorWithText seperatorText="Or" />

          <div className="grid grid-cols-2 gap-2">
            <Button
              id="google-signin"
              variant="outline"
              className="gap-2 z-10 pointer-events-auto cursor-pointer "
              onClick={async () => {
                await signIn.social({
                  provider: "google",
                  callbackURL: costradCallbackUrl,
                });
              }}
            >
              {/* Google SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="0.98em"
                height="1em"
                viewBox="0 0 256 262"
              >
                <path
                  fill="#4285F4"
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                />
                <path
                  fill="#34A853"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                />
                <path
                  fill="#FBBC05"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                />
                <path
                  fill="#EB4335"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                />
              </svg>
            </Button>
            <Button
              variant="outline"
              className="gap-2 z-10 cursor-pointer"
              onClick={async () => {
                const { data } = await signIn.social({
                  provider: "microsoft",
                  callbackURL: costradCallbackUrl,
                });
              }}
            >
              {/* Microsoft SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M2 3h9v9H2zm9 19H2v-9h9zm11-19v9h-9V3zm0 19h-9v-9h9z"
                ></path>
              </svg>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-balance text-center text-sm text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            Don't have an account? Rather{" "}
            <Link href="/auth/sign-up" className="font-bold">
              Register
            </Link>
            .
          </div>
          <div className="text-balance text-center pt-2 text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            By clicking continue, you agree to our <br />
            <a href="/terms">Terms of Service</a> and{" "}
            <a href="/privacy">Privacy Policy</a>.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
