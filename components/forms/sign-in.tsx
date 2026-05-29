"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import SeperatorWithText from "@/components/ui/seperatorWithText";
import { signIn } from "@/lib/auth-client";
import { baseUrl } from "@/lib/metadata";
import { useDialog } from "@/providers/DialogProvider";

const signInSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	password: z.string().min(1, "Password is required"),
	rememberMe: z.boolean(),
});

type FormValues = z.infer<typeof signInSchema>;

export const dynamic = "force-dynamic";

type RegisterLoginProps = {
	costradCallbackUrl?: string | null;
	displayFooterText?: boolean | null;
};

export default function SignInComponent({
	costradCallbackUrl,
	displayFooterText = true,
}: RegisterLoginProps) {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const { close } = useDialog();

	const [turnstileStatus, setTurnstileStatus] = useState("required");
	const [turnstileError, setTurnstileError] = useState<string | null>(null);
	const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

	const callbackUrl =
		costradCallbackUrl || searchParams.get("callbackUrl") || "/";

	const form = useForm<FormValues>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
		mode: "onBlur",
	});

	useEffect(() => {
		const storedEmail = sessionStorage.getItem("signupEmail");
		if (storedEmail) form.setValue("email", storedEmail);
	}, [form]);

	const onSubmit = async (values: FormValues) => {
		if (!turnstileToken) {
			toast.error("Please complete the security challenge first.");
			return;
		}

		setLoading(true);

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

			const signInPromise = signIn.email(
				{
					email: values.email,
					password: values.password,
					callbackURL: callbackUrl,
					rememberMe: values.rememberMe,
				},
				{
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
									`/auth/emailVerification?signupEmail=${encodeURIComponent(values.email)}`,
								);
							} else {
								router.push(`${baseUrl}`);
							}
						} catch (error) {
							console.error("Failed to verify email:", error);
							toast.error("Something went wrong. Please try again.");
						}
					},
					onError: (ctx) => {
						if (ctx.error.status === 403) {
							toast.error("Please verify your email address.");
							sessionStorage.setItem("signupEmail", values.email);
							router.push(
								`/auth/emailVerification?signupEmail=${encodeURIComponent(values.email)}`,
							);
						} else if ([400, 401, 404].includes(ctx.error.status)) {
							toast.error("Invalid email or password.");
						} else {
							toast.error(
								ctx.error.message || "Something went wrong. Try again.",
							);
						}
					},
				},
			);

			await toast.promise(signInPromise, {
				loading: "Authenticating...",
				success: "Signed in successfully!",
				error: "Login failed. Please check your details.",
			});
		} catch (error) {
			console.error("Error during sign-in:", error);
			toast.error("Error signing in. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className="rounded-none bg-transparent w-full border-none shadow-none">
			<CardHeader>
				<CardTitle className="text-xl md:text-2xl">Sign In</CardTitle>
				<CardDescription className="text-sm">
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent className="py-5">
				<div className="grid grid-cols-2 gap-4">
					<Button
						variant="outline"
						className="w-full"
						onClick={async () => {
							await signIn.social({
								provider: "google",
								callbackURL: callbackUrl,
							});
						}}
					>
						<svg className="mr-2 size-4" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							/>
							<path
								fill="currentColor"
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							/>
							<path
								fill="currentColor"
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
							/>
							<path
								fill="currentColor"
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.14-4.53z"
							/>
						</svg>
						Google
					</Button>
					<Button
						variant="outline"
						className="w-full"
						onClick={async () => {
							await signIn.social({
								provider: "microsoft",
								callbackURL: callbackUrl,
							});
						}}
					>
						<svg className="mr-2 size-4" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M1 1h10v10H1zM13 1h10v10H13zM1 13h10v10H1zM13 13h10v10H13z"
							/>
						</svg>
						Microsoft
					</Button>
				</div>

				<SeperatorWithText seperatorText="Or" />

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="me@example.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<div className="flex items-center justify-between">
										<FormLabel>Password</FormLabel>
										<Link
											href="/auth/forget-password"
											className="text-xs underline hover:text-primary"
											onClick={() => close()}
										>
											Forgot password?
										</Link>
									</div>
									<FormControl>
										<PasswordInput placeholder="••••••••" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="rememberMe"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center space-x-2 space-y-0">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormLabel className="text-sm font-normal">
										Remember me
									</FormLabel>
								</FormItem>
							)}
						/>

						<div className="py-2">
							<Turnstile
								siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
								options={{ theme: "auto", size: "flexible" }}
								onError={() => {
									setTurnstileStatus("error");
									setTurnstileError("Security check failed.");
								}}
								onExpire={() => {
									setTurnstileStatus("expired");
									setTurnstileError("Security check expired.");
								}}
								onWidgetLoad={() => {
									setTurnstileStatus("required");
									setTurnstileError(null);
								}}
								onSuccess={(token) => {
									setTurnstileToken(token);
									setTurnstileStatus("success");
								}}
							/>
						</div>

						{turnstileError && (
							<p className="text-destructive text-sm text-center font-medium">
								{turnstileError}
							</p>
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
								"Sign In"
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter>
				{displayFooterText && (
					<div className="text-xs text-muted-foreground leading-relaxed">
						Don't have an account?{" "}
						<Link
							href="/auth/sign-up"
							className="font-bold text-foreground hover:underline"
						>
							Sign Up
						</Link>
						<br />
						By signing in, you agree to our{" "}
						<Link href="/terms" className="underline hover:text-primary">
							Terms
						</Link>{" "}
						and{" "}
						<Link href="/privacy" className="underline hover:text-primary">
							Privacy
						</Link>
						.
					</div>
				)}
			</CardFooter>
		</Card>
	);
}
