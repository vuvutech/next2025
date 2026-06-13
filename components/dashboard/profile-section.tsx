"use client";

import type { Session, User } from "better-auth";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateUserName } from "@/app/actions/userfunctions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProfileSectionProps {
	session: { user: User; session: Session };
}

function getInitials(name: string | null | undefined): string {
	if (!name) return "?";
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
}

export function ProfileSection({ session }: ProfileSectionProps) {
	const [isEditing, setIsEditing] = useState(false);

	const form = useForm<{ name: string }>({
		defaultValues: { name: session.user.name || "" },
	});

	const {
		formState: { isSubmitting },
	} = form;

	const handleSave = async (data: { name: string }) => {
		const result = await updateUserName(data);
		if (result.error) {
			toast.error(result.error);
			return;
		}
		toast.success("Name updated successfully");
		setIsEditing(false);
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
					Profile
				</h2>
				<p className="text-sm text-zinc-500 dark:text-zinc-400">
					Manage your personal information and how it appears to others.
				</p>
			</div>

			<Card className="border-zinc-200 dark:border-zinc-800 dark:bg-transparent">
				<CardHeader>
					<CardTitle className="text-zinc-900 dark:text-zinc-100">
						Profile Picture
					</CardTitle>
					<CardDescription className="text-zinc-500 dark:text-zinc-400">
						This will be displayed on your profile.
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
					<Avatar className="h-24 w-24 border border-zinc-200 dark:border-zinc-800">
						<AvatarImage
							src={session.user.image ?? ""}
							alt={session.user.name || "User"}
						/>
						<AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-xl text-zinc-800 dark:text-zinc-200">
							{getInitials(session.user.name)}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
						<p>Upload and manage your profile picture from account settings.</p>
					</div>
				</CardContent>
			</Card>

			<Card className="border-zinc-200 dark:border-zinc-800 dark:bg-transparent">
				<CardHeader>
					<CardTitle className="text-zinc-900 dark:text-zinc-100">
						Personal Information
					</CardTitle>
					<CardDescription className="text-zinc-500 dark:text-zinc-400">
						Update your personal details.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					{isEditing ? (
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(handleSave)}
								className="space-y-4"
							>
								<FormField
									control={form.control}
									name="name"
									rules={{ required: "Name is required" }}
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-zinc-900 dark:text-zinc-100">
												Name
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className="border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="space-y-2">
									<Label
										htmlFor="email-readonly"
										className="text-zinc-900 dark:text-zinc-100"
									>
										Email address
									</Label>
									<Input
										id="email-readonly"
										type="email"
										value={session.user.email}
										disabled
										className="border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
									/>
									<p className="text-xs text-zinc-500 dark:text-zinc-400">
										Email cannot be changed here.
									</p>
								</div>
								<div className="flex justify-end space-x-2">
									<Button
										type="button"
										variant="outline"
										onClick={() => {
											setIsEditing(false);
											form.reset({ name: session.user.name || "" });
										}}
										className="border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
									>
										Cancel
									</Button>
									<Button
										type="submit"
										disabled={isSubmitting}
										className="bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200"
									>
										{isSubmitting ? (
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										) : null}
										{isSubmitting ? "Saving..." : "Save changes"}
									</Button>
								</div>
							</form>
						</Form>
					) : (
						<>
							<div className="space-y-2">
								<Label
									htmlFor="name-display"
									className="text-zinc-900 dark:text-zinc-100"
								>
									Name
								</Label>
								<Input
									id="name-display"
									value={session.user.name}
									disabled
									className="border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
								/>
							</div>
							<div className="space-y-2">
								<Label
									htmlFor="email-display"
									className="text-zinc-900 dark:text-zinc-100"
								>
									Email address
								</Label>
								<Input
									id="email-display"
									type="email"
									value={session.user.email}
									disabled
									className="border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
								/>
							</div>
						</>
					)}
				</CardContent>
				{!isEditing && (
					<CardFooter className="flex justify-end border-t border-zinc-100 dark:border-zinc-800 px-6 py-4">
						<Button
							onClick={() => setIsEditing(true)}
							className="bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200"
						>
							Edit profile
						</Button>
					</CardFooter>
				)}
			</Card>
		</div>
	);
}
