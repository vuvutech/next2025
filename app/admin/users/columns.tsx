// File: app/admin/registrations/columns.tsx
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { LucideBadgeCheck, LucideShieldUser } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { countryCodeToFlagEmoji, getCountryCode } from "@/lib/countries";
import { formatAccraDate } from "@/lib/date";
import { ActionsCellComponent } from "./ActionsCellComponent";
import { AdminRoleToggleForm } from "./AdminRoleToggleForm";
import { BanToggleForm } from "./BanToggleForm";

interface UserRow {
	id: string;
	image?: string;
	name: string;
	email: string;
	studentId?: string;
	role: string;
	banned: boolean;
	createdAt?: string;
	profile?: {
		gender?: string;
		country?: string;
		telephone?: string;
		updatedAt?: string;
	};
}

export function createColumns(
	onViewUser: (id: string) => void,
): ColumnDef<UserRow>[] {
	return [
		{
			header: "User",
			accessorKey: "name",
			cell: ({ row }) => (
				<button
					type="button"
					className="flex items-center gap-2 cursor-pointer"
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") onViewUser(row.original.id);
					}}
					onClick={() => onViewUser(row.original.id)}
				>
					<div className="relative">
						<Avatar className="h-12 w-12">
							<AvatarImage
								src={row.original.image || null}
								alt={row.original.name || null}
							/>
							<AvatarFallback>
								{row.original.name.charAt(0) || "CN"}
							</AvatarFallback>
						</Avatar>
					</div>
					<div>
						<h6 className="text-current gap-2 text-xs">
							{row.original.name}{" "}
							<span>
								<Badge variant={"secondary"} className="rounded-full">
									{row.original.profile?.gender
										? row.original.profile.gender === "MALE"
											? "M"
											: "F"
										: "N/A"}
								</Badge>
							</span>
							<span>
								{row.original.profile?.country &&
									(() => {
										const code = getCountryCode(row.original.profile.country);
										return code ? (
											<span
												className=" translate-x-1/4 translate-y-1/4 text-[12px]  px-[2px]  leading-none "
												title={row.original.profile.country}
											>
												{countryCodeToFlagEmoji(code)}
											</span>
										) : null;
									})()}
							</span>
						</h6>
						—
						<div className="text-[10px] font-bold uppercase">
							{row.original.email}
						</div>
					</div>
				</button>
			),
		},
		{
			header: "Student ID",
			accessorFn: (row) => row.studentId,
			accessorKey: "Student ID",
			cell: ({ row }) => (
				<div className="text-xs">
					{row.original.studentId || "Not specified"}
				</div>
			),
		},

		{
			header: "Country",
			accessorKey: "Country",
			accessorFn: (row) => row.profile?.country,
			cell: ({ row }) => (
				<div className="">
					<div>{row.original.profile?.country || "Not specified"}</div>
					<div className="font-bold">
						{row.original.profile?.telephone || "Not specified"}
					</div>
				</div>
			),
		},

		{
			header: "Role",
			accessorFn: (row) => row.role,
			accessorKey: "Role",
			cell: ({ row }) => (
				<div className="text-[9px] uppercase">
					{row.original.role === "ADMIN" ? (
						<Badge variant={"destructive"} className="flex items-center gap-1">
							{" "}
							<LucideShieldUser />
							ADMIN
						</Badge>
					) : (
						<Badge variant={"default"} className="flex items-center gap-1">
							{" "}
							<LucideBadgeCheck /> USER
						</Badge>
					)}
				</div>
			),
		},

		{
			header: "Created",
			enableSorting: true,

			accessorFn: (row) => (row.createdAt ? new Date(row.createdAt) : null),
			cell: ({ row }) => (
				<div className="text-xs">
					{formatAccraDate(row.original.createdAt, "PPP")}
				</div>
			),
		},
		{
			header: "Last Updated",
			enableSorting: true,
			accessorFn: (row) =>
				row.profile?.updatedAt ? new Date(row.profile.updatedAt) : null,
			cell: ({ row }) => {
				const updatedAt = row.original.profile?.updatedAt;
				if (!updatedAt) return <div className="text-xs text-muted">N/A</div>;

				try {
					return (
						<div className="text-xs">{formatAccraDate(updatedAt, "PPP")}</div>
					);
				} catch {
					console.error("Invalid date:", updatedAt);
					return <div className="text-xs text-destructive">Invalid date</div>;
				}
			},
		},
		{
			header: "Admin Status",
			id: "adminToggle",
			enableSorting: false,
			accessorFn: (row) => row.role,
			cell: ({ row }) => (
				<AdminRoleToggleForm
					userId={row.original.id}
					isAdmin={row.original.role === "ADMIN"}
				/>
			),
		},

		{
			enableSorting: true,
			header: "",
			id: "banned",
			accessorFn: (row) => (row.banned ? "Yes" : "No"),
			cell: ({ row }) => {
				return (
					<BanToggleForm
						userId={row.original.id}
						initialBanned={row.original.banned}
					/>
				);
			},
		},

		{
			header: "",
			enableSorting: false,
			id: "actions",

			accessorFn: (row) => (row.createdAt ? new Date(row.createdAt) : null),
			cell: ({ row }) => {
				return (
					<div className="flex items-center gap-2">
						<ActionsCellComponent
							id={row.original.id}
							onViewUser={onViewUser}
						/>
					</div>
				);
			},
		},
	];
}
