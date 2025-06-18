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
import { signIn, signUp } from "@/lib/auth-client";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PasswordInput } from "./ui/password-input";
import Link from "next/link";
import SeperatorWithText from "./ui/seperatorWithText";

export function SignUpComponent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
  const [signUpResponse, setSignUpResponse] = useState<string | null>(null);

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
  const [loading, setLoading] = useState(false);

  return (
    <Card className=" rounded-none bg-transparent max-w-md border-none shadow-none ">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">COSTrAD Sign Up</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="first-name"
                placeholder="eg. Paul"
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
                placeholder="And-Silas"
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
              placeholder="kwame@example.com"
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
          <Button
            type="submit"
            className="w-full cursor-pointer text-background bg-foreground "
            disabled={loading}
            onClick={async () => {
              console.log("SUBMITTING APPLICATION");
              setLoading(true);

              const signUpPromise = signUp
                .email({
                  email,
                  password,
                  name: `${firstName} ${lastName}`,
                  image: image ? await convertImageToBase64(image) : "",
                  callbackURL: "/auth/emailVerification/",
                })
                .then((response) => {
                  if (response?.error) {
                    setSignUpResponse(response.error?.statusText as string);
                  }

                  if (response?.data?.user?.emailVerified === false) {
                    sessionStorage.setItem(
                      "signupEmail",
                      response?.data?.user?.email
                    );
                    setTimeout(() => {
                      router.push("/auth/emailVerification");
                    }, 3000);
                    setSignUpResponse(
                      "Email verification required. Redirecting ..."
                    );
                  }

                  if (response?.data?.user?.emailVerified === true) {
                    router.push("/");
                  }

                  if (response?.data?.user?.id !== null) {
                    setSignUpResponse("Sign-up successful!");
                  }
                });

              toast.promise(signUpPromise, {
                loading: "Signing up...",
                success: () => {
                  const successMessage = "Sign-up successful!";
                  setLoading(false);
                  return successMessage;
                },
                error: (error) => {
                  setLoading(false);
                  const errorMessage = "Sign-up failed!";
                  setSignUpResponse(errorMessage);
                  return errorMessage;
                },
              });
            }}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Create an account"
            )}
          </Button>

          <SeperatorWithText seperatorText="Or Signup With" />

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className=" gap-2 cursor-pointer"
              onClick={async () => {
                await signIn.social({
                  provider: "google",
                  callbackURL: "/",
                });
              }}
            >
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
              className="gap-2 cursor-pointer"
              onClick={async () => {
                const { data } = await signIn.social({
                  provider: "microsoft",
                  callbackURL: "/",
                });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M2 3h9v9H2zm9 19H2v-9h9zM21 3v9h-9V3zm0 19h-9v-9h9z"
                ></path>
              </svg>
            </Button>
            {/* 
							<Button
								variant="outline"
								className="gap-2"
								onClick={async () => {
									await signIn.social({
										provider: "facebook",
										callbackURL: "/",
									});
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="1.3em"
									height="1.3em"
									viewBox="0 0 24 24"
								>
									<path
										fill="currentColor"
										d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
									></path>
								</svg>
							</Button> */}
          </div>
        </div>
      </CardContent>
      <CardFooter className=" flex flex-col">
        <div className="text-balance text-center text-sm text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          Don't have an account? Rather{" "}
          <Link href={"/auth/sign-in"} className="font-bold">
            Login
          </Link>
          .
        </div>
        <div className="text-balance text-center pt-2 text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          By clicking continue, you agree to our <br />
          <a href={"/terms"}>Terms of Service</a> and{" "}
          <a href={"/privacy"}>Privacy Policy</a>.
        </div>
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

export const dynamic = "force-dynamic";
