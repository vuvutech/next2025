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
import { Turnstile } from "@marsidev/react-turnstile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const signUpSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  passwordConfirmation: z.string(),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"],
});

type FormValues = z.infer<typeof signUpSchema>;

type SignUpProps = {
  costradCallbackUrl?: string | null;
  displayFooterText?: boolean | null;
};

export function SignUpComponent({
  costradCallbackUrl,
  displayFooterText = true,
}: SignUpProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileStatus, setTurnstileStatus] = useState("required");
  const [error, setFormError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    mode: "onBlur",
  });

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

  async function onSubmit(values: FormValues) {
    if (!turnstileToken) {
      toast.error("Please complete the security challenge first.");
      return;
    }

    setLoading(true);
    setFormError(null);

    try {
      const response = await fetch("/api/verify-turnstile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: turnstileToken }),
      });

      const data = await response.json();

      if (!data.success) {
        toast.error("Security verification failed. Please try again.");
        setLoading(false);
        return;
      }

      await signUp.email({
        email: values.email,
        password: values.password,
        name: `${values.firstName} ${values.lastName}`,
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
                body: JSON.stringify({ email: values.email }),
              });

              const { verified } = await res.json();

              if (!verified) {
                router.push(
                  `/auth/emailVerification?signupEmail=${encodeURIComponent(values.email)}`
                );
              } else {
                router.push(costradCallbackUrl || "/dashboard");
              }
            } catch (error) {
              console.error("Failed to verify email:", error);
              toast.error("Something went wrong. Please try again.");
            }
          },
        },
      });
    } catch (err) {
      console.error("Error in sign-up flow", err);
      toast.error("Unexpected error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">Sign Up</CardTitle>
        <CardDescription className="text-sm">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="Max" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Robinson" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Profile Image (optional)</Label>
              <div className="flex items-center gap-4">
                {imagePreview && (
                  <div className="relative size-16 rounded-md overflow-hidden border">
                    <Image
                      src={imagePreview}
                      alt="Profile preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer"
                  />
                  {imagePreview && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                    >
                      <X className="size-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="py-2">
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                options={{ theme: "auto", size: "flexible" }}
                onError={() => {
                  setTurnstileStatus("error");
                  setFormError("Security check failed. Please try again.");
                }}
                onExpire={() => {
                  setTurnstileStatus("expired");
                  setFormError("Security check expired. Please verify again.");
                }}
                onWidgetLoad={() => {
                  setTurnstileStatus("required");
                  setFormError(null);
                }}
                onSuccess={(token) => {
                  setTurnstileToken(token);
                  setTurnstileStatus("success");
                }}
              />
            </div>

            {error && (
              <p className="text-destructive text-sm text-center font-medium">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading || turnstileStatus !== "success"}
            >
              {loading ? (
                <Loader2 className="animate-spin size-4" />
              ) : turnstileStatus !== "success" ? (
                "Complete Verification"
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        {displayFooterText && (
          <div className="text-xs text-muted-foreground leading-relaxed">
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="font-bold text-foreground hover:underline">
              Sign In
            </Link>
            <br />
            By signing up, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-primary">Terms</Link> and{" "}
            <Link href="/privacy" className="underline hover:text-primary">Privacy</Link>.
          </div>
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
