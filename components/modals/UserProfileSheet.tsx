"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { countryCodeToFlagEmoji, getCountryCode } from "@/lib/countries";

interface UserProfileSheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	userId: string | null;
}

interface Profile {
	country?: string | null;
	telephone?: string | null;
	mobile?: string | null;
	biography?: string | null;
	religion?: string | null;
	profession?: string | null;
	highestQualification?: string | null;
	disabilityAssistance?: boolean | null;
	disabilityDescription?: string | null;
	emergencyContactName?: string | null;
	emergencyContactTelephone?: string | null;
	address?: string | null;
	addressLine2?: string | null;
	city?: string | null;
	state?: string | null;
	postalCode?: string | null;
	facebook?: string | null;
	twitter?: string | null;
	youtube?: string | null;
	linkedin?: string | null;
	instagram?: string | null;
	tiktok?: string | null;
}

interface UserDetails {
	id: string;
	name?: string | null;
	email?: string | null;
	image?: string | null;
	profile?: Profile | null;
}

export function UserProfileSheet({
	open,
	onOpenChange,
	userId,
}: UserProfileSheetProps) {
	const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
	const [loadingUser, setLoadingUser] = useState(false);

	useEffect(() => {
		if (!open || !userId) {
			setUserDetails(null);
			return;
		}

		const fetchUser = async () => {
			setLoadingUser(true);
			setUserDetails(null);

			try {
				const res = await fetch(`/api/user?id=${userId}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (!res.ok) throw new Error("Failed to load user");

				const data = await res.json();
				setUserDetails(data);
			} catch (err) {
				console.error(err);
				setUserDetails(null);
			} finally {
				setLoadingUser(false);
			}
		};

		fetchUser();
	}, [open, userId]);

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent side="right" className="sm:max-w-xl overflow-y-auto">
				<SheetHeader>
					<SheetTitle>User Details</SheetTitle>
				</SheetHeader>

				{loadingUser ? (
					<p className="text-sm text-muted-foreground p-4">
						Loading user info...
					</p>
				) : userDetails ? (
					<div className="p-4">
						<Card className="border-dotted divide-y-1 divide-muted">
							<CardHeader>
								<div className="flex items-center gap-4 pb-2">
									<div className="relative">
										<Avatar className="h-16 w-16">
											<AvatarImage
												src={userDetails.image ?? undefined}
												alt={userDetails.name ?? ""}
											/>
											<AvatarFallback>
												{userDetails.name?.charAt(0) || "CN"}
											</AvatarFallback>
										</Avatar>
										<span className="absolute -bottom-1 right-0">
											{userDetails.profile?.country &&
												(() => {
													const code = getCountryCode(
														userDetails.profile?.country || "",
													);
													return code ? (
														<span
															className="translate-x-1/4 translate-y-1/4 text-base px-[2px] leading-none"
															title={userDetails.profile?.country || ""}
														>
															{countryCodeToFlagEmoji(code)}
														</span>
													) : null;
												})()}
										</span>
									</div>
									<div>
										<h4 className="font-semibold">{userDetails.name}</h4>
										<p className="text-xs text-muted-foreground">
											{userDetails.email || "No email specified"}
										</p>
										<p className="text-xs text-muted-foreground">
											{userDetails.profile?.telephone || "-"},{" "}
											{userDetails.profile?.mobile || "-"}
										</p>
									</div>
								</div>
							</CardHeader>
							<CardContent className="divide-y-1 divide-muted">
								<p className="text-sm text-foreground py-2">
									{userDetails.profile?.biography || "No biography available"}
								</p>

								<div className="flex items-center justify-between gap-2 py-2">
									<span className="font-semibold">Belief system:</span>
									<span className="text-xs text-muted-foreground">
										{userDetails.profile?.religion ||
											"No belief system specified"}
									</span>
								</div>
								<div className="flex items-center justify-between gap-2 py-2">
									<span className="font-semibold">Profession:</span>
									<span className="text-xs text-muted-foreground">
										{userDetails.profile?.profession ||
											"No profession specified"}
									</span>
								</div>
								<div className="flex items-center justify-between gap-2 py-2">
									<span className="font-semibold">Highest Qualification:</span>
									<span className="text-xs text-muted-foreground">
										{userDetails.profile?.highestQualification ||
											"No highest qualification specified"}
									</span>
								</div>
								<div className="flex items-center justify-between gap-2 py-2">
									<span className="font-semibold">
										Disability Assistance Required:
									</span>
									<span className="text-xs text-muted-foreground">
										{userDetails.profile?.disabilityAssistance ? "Yes" : "No"}
									</span>
								</div>
								<div className="flex flex-col items-start justify-between gap-2 py-2">
									<span className="font-semibold">
										Disability Assistance Type:
									</span>
									<span className="text-xs text-muted-foreground">
										{userDetails.profile?.disabilityDescription ||
											"No disability assistance specified"}
									</span>
								</div>
								<div className="flex items-center justify-between gap-2 py-2">
									<span className="font-semibold">Emergency Contact Name:</span>
									<span className="text-xs text-muted-foreground">
										{userDetails.profile?.emergencyContactName ||
											"No emergency contact specified"}
									</span>
								</div>
								<div className="flex items-center justify-between gap-2 py-2">
									<span className="font-semibold">
										Emergency Contact Telephone:
									</span>
									<span className="text-xs text-muted-foreground">
										{userDetails.profile?.emergencyContactTelephone ||
											"No emergency contact specified"}
									</span>
								</div>
								<div className="flex items-center justify-between gap-2 py-2">
									<span className="font-semibold">Address:</span>
									<span className="text-xs text-muted-foreground text-right">
										{`${userDetails.profile?.address}`},
										{`${userDetails.profile?.addressLine2 || ""}, `}
										<br />
										{`${userDetails.profile?.city || ""}, `}
										{`${userDetails.profile?.state || ""}, `}
										{`${userDetails.profile?.postalCode || ""}, `}
										{`${userDetails.profile?.country || ""}`}
									</span>
								</div>
								<div className="flex items-center justify-between gap-2 py-2">
									<span className="font-semibold">Facebook:</span>
									<span className="text-xs text-muted-foreground">
										{userDetails.profile?.facebook ||
											"No Facebook account specified"}
									</span>
								</div>
								<div className="flex items-center justify-between gap-2 py-2">
									<span className="font-semibold">Twitter (X):</span>
									<Link
										target="_blank"
										href={userDetails.profile?.twitter || "#"}
										className="text-xs text-muted-foreground"
										prefetch={false}
									>
										{userDetails.profile?.twitter ||
											"No Twitter account specified"}
									</Link>
								</div>
								<div className="flex items-center justify-between gap-2 py-2">
									<span className="font-semibold">Youtube:</span>
									<Link
										target="_blank"
										href={userDetails.profile?.youtube || "#"}
										className="text-xs text-muted-foreground"
										prefetch={false}
									>
										{userDetails.profile?.youtube ||
											"No Youtube account specified"}
									</Link>
								</div>
								<div className="flex items-center justify-between gap-2 py-2">
									<span className="font-semibold">LinkedIn:</span>
									<Link
										target="_blank"
										href={userDetails.profile?.linkedin || "#"}
										className="text-xs text-muted-foreground"
										prefetch={false}
									>
										{userDetails.profile?.linkedin ||
											"No LinkedIn account specified"}
									</Link>
								</div>
								<div className="flex items-center justify-between gap-2 py-2">
									<span className="font-semibold">Instagram:</span>
									<Link
										target="_blank"
										href={userDetails.profile?.instagram || "#"}
										className="text-xs text-muted-foreground"
										prefetch={false}
									>
										{userDetails.profile?.instagram ||
											"No Instagram account specified"}
									</Link>
								</div>
								<div className="flex items-center justify-between gap-2 py-2">
									<span className="font-semibold">TikTok:</span>
									<Link
										target="_blank"
										href={userDetails.profile?.tiktok || "#"}
										className="text-xs text-muted-foreground"
										prefetch={false}
									>
										{userDetails.profile?.tiktok ||
											"No TikTok account specified"}
									</Link>
								</div>
							</CardContent>
						</Card>
					</div>
				) : (
					<p className="text-sm text-red-500 p-4">
						Failed to load user information.
					</p>
				)}
			</SheetContent>
		</Sheet>
	);
}
