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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { baseUrl } from "@/lib/metadata";
import { PasswordInput } from "./ui/password-input";
import { Turnstile } from "@marsidev/react-turnstile"; // Add this if not already

type SignUpProps = {
  costradCallbackUrl?: string | null;
  displayFooterText?: boolean | null;
};

export function SignUpComponent({
  costradCallbackUrl,
  displayFooterText = true,
}: SignUpProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileStatus, setTurnstileStatus] = useState("required");
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="first-name"
                placeholder="Max"
                required
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                value={firstName}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                id="last-name"
                placeholder="Robinson"
                required
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                value={lastName}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="Password"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Confirm Password</Label>
              <PasswordInput
                id="password_confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                autoComplete="new-password"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Profile Image (optional)</Label>
            <div className="flex items-end gap-4">
              {imagePreview && (
                <div className="relative w-16 h-16 rounded-sm overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Profile preview"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
              <div className="flex items-center gap-2 w-full">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />
                {imagePreview && (
                  <X
                    className="cursor-pointer"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
              options={{ theme: "auto", size:'flexible' }} // Customize the widget's theme (dark mode in this case)
            onError={() => {
              setTurnstileStatus("error");
              setError("Security check failed. Please try again.");
            }}
            onExpire={() => {
              setTurnstileStatus("expired");
              setError("Security check expired. Please verify again.");
            }}
            onWidgetLoad={() => {
              setTurnstileStatus("required");
              setError(null);
            }}
            onSuccess={(token) => {
              setTurnstileToken(token);
              setTurnstileStatus("success");
              console.log("Token received:", token);
            }}
          />

          {error && (
            <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading || turnstileStatus !== "success"}
            onClick={async () => {
              setError(null);

              if (!turnstileToken) {
                toast.error("Please complete the security challenge first.");
                setLoading(false);
                return;
              }

              setLoading(true);

              try {
                // 1. Verify Turnstile token
                const response = await fetch("/api/verify-turnstile", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ token: turnstileToken }),
                });

                const data = await response.json();

                if (!data.success) {
                  toast.error(
                    "Security verification failed. Please try again."
                  );
                  setLoading(false);
                  return;
                }

                // 2. Proceed with sign-up if Turnstile passes
                await signUp.email({
                  email,
                  password,
                  name: `${firstName} ${lastName}`,
                  image: image ? await convertImageToBase64(image) : "",
                  callbackURL: `${baseUrl}/dashboard`,
                  fetchOptions: {
                    onRequest: () => setLoading(true),
                    onResponse: () => setLoading(false),
                    onError: (ctx) => {
                      toast.error(ctx.error.message);
                    },
                    onSuccess: async () => {
                      try {
                        const res = await fetch("/api/isEmailVerified", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ email }),
                        });

                        const { verified } = await res.json();

                        if (!verified) {
                          router.push(
                            `/auth/emailVerification?signupEmail=${encodeURIComponent(email)}`
                          );
                        } else {
                          router.push(`${costradCallbackUrl}`);
                        }
                      } catch (error) {
                        console.error("Failed to verify email:", error);
                        toast.error("Something went wrong. Please try again.");
                      }
                    },
                  },
                });
              } catch (err) {
                console.error("Error in Turnstile or sign-up flow", err);
                toast.error("Unexpected error. Please try again.");
                setLoading(false);
              }
            }}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : turnstileStatus !== "success" ? (
              "Waiting for Human/Robot Verification..."
            ) : (
              "Create an account"
            )}
          </Button>
        </div>
      </CardContent>
      <CardFooter className=" w-full flex flex-col">
        {displayFooterText ? (
          <div className=" text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            Rather Sign In?{" "}
            <Link href={"/auth/sign-in"} className="font-bold">
              Sign In.{" "}
            </Link>{" "}
            <br />
            By clicking continue, you agree to our{" "}
            <Link href={"/terms"}>Terms of Service</Link> and{" "}
            <Link href={"/privacy"}>Privacy Policy</Link>.
          </div>
        ) : (
          " "
        )}
      </CardFooter>
    </Card>
  );
}

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
