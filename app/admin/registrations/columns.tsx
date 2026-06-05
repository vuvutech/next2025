// File: app/admin/registrations/columns.tsx
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Ban, CheckCircle, Clock, DollarSign, XCircle } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatAccraDate } from "@/lib/date";
import { ActionsCellComponent } from "./ActionsCellComponent";
import { ApproveButton } from "./ApproveButton";

export function createColumns(
	onViewUser: (id: string) => void,
): ColumnDef<any>[] {
	return [
		{
			header: "User",
			accessorFn: (row) => row.user?.name || "Unknown",
			cell: ({ row }) => (
				<button
					type="button"
					className="rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
					onClick={() => onViewUser(row.original.user?.id)}
				>
					<Image
						src={row.original.user?.image || "/images/avatar.webp"}
						alt={row.original.user?.name || "Unknown user"}
						width={50}
						height={50}
						className="rounded-full"
					/>
				</button>
			),
		},
		{
			header: "",
			accessorKey: "user.name",
			cell: ({ row }) => (
				<button
					type="button"
					className="cursor-pointer text-left bg-transparent border-0 p-0 block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
					onClick={() => onViewUser(row.original.user?.id)}
				>
					<h6 className="text-current gap-2 text-sm">
						{row.original.user?.name}
					</h6>
					—
					<div className="text-[10px] font-bold uppercase">
						{row.original.user?.email}
					</div>
				</button>
			),
		},
		{
			header: "Student ID",
			accessorFn: (row) => row.user?.studentId,
			accessorKey: "user.studentId",
			cell: ({ row }) => (
				<div className="text-xs">
					{row.original.user?.studentId || "Not specified"}
				</div>
			),
		},

		{
			header: "Institute",
			accessorFn: (row) => row.edition?.institute?.name,
			enableSorting: true,

			cell: ({ row }) => (
				<div className="flex items-center gap-2">
					<Image
						src={
							row.original.edition?.institute?.logo
								? `/${row.original.edition.institute.logo}`
								: "/images/costrad.png"
						}
						alt="Institute Logo"
						width={50}
						height={50}
					/>
					<span>
						{row.original.edition?.institute?.name} <br />
						{row.original.edition?.startDate && (
							<>
								<span
									className=" text-firefly text-[11px] font-bold uppercase"
									suppressHydrationWarning
								>
									{" "}
									{formatAccraDate(row.original.edition.startDate)}
								</span>{" "}
								&mdash;{" "}
								<span
									className=" text-destructive text-[11px] font-bold uppercase"
									suppressHydrationWarning
								>
									{row.original.edition?.endDate
										? formatAccraDate(row.original.edition.endDate)
										: "TBC"}
								</span>{" "}
							</>
						)}
					</span>
				</div>
			),
		},
		{
			header: "Date of Registration",
			enableSorting: true,

			accessorFn: (row) => (row.createdAt ? new Date(row.createdAt) : null),
			cell: ({ row }) => (
				<div>
					{row.original.createdAt
						? formatAccraDate(row.original.createdAt, "PPP")
						: "—"}
				</div>
			),
		},
		{
			header: "Status",
			cell: ({ row }) => {
				const isPast =
					row.original.edition?.endDate &&
					new Date(row.original.edition.endDate) < new Date();
				return row.original.approved ? (
					<div className="flex flex-col gap-0.5">
						<Badge className="bg-green-500 text-background uppercase flex items-center gap-1 w-fit">
							<CheckCircle className="size-3" /> Approved
						</Badge>
						{row.original.approvedBy && (
							<span className="text-[9px] text-muted-foreground whitespace-nowrap">
								Approved by: {row.original.approvedBy}
							</span>
						)}
					</div>
				) : isPast ? (
					<Badge className="bg-muted text-muted-foreground uppercase flex items-center gap-1 w-fit">
						<XCircle className="size-3" /> Expired
					</Badge>
				) : (
					<Badge className="bg-yellow-500 text-background uppercase flex items-center gap-1 w-fit">
						<Clock className="size-3" /> Pending
					</Badge>
				);
			},
		},
		{
			header: "Payment",
			cell: ({ row }) => {
				const paid = row.original.paid;
				return (
					<div className="flex flex-col gap-0.5">
						<Badge
							className={
								paid
									? "bg-green-500 text-background uppercase flex items-center gap-1 w-fit"
									: "bg-yellow-500 text-background uppercase flex items-center gap-1 w-fit"
							}
						>
							{paid ? (
								<>
									<DollarSign className="size-3" /> Paid
								</>
							) : (
								<>
									<Ban className="size-3" /> Unpaid
								</>
							)}
						</Badge>
						{paid && row.original.paidBy && (
							<span className="text-[10px] text-muted-foreground whitespace-nowrap">
								Supervised by: {row.original.paidBy}
							</span>
						)}
					</div>
				);
			},
		},
		{
			id: "details",
			header: "Approve",
			cell: ({ row }) => (
				<ApproveButton
					id={row.original.id}
					name={row.original.user?.name || "Unknown"}
					email={row.original.user?.email || "Unknown"}
					approved={row.original.approved}
					startDate={row.original.edition?.startDate}
					endDate={row.original.edition?.endDate}
					price={row.original.edition?.price}
					priceViaZoom={row.original.edition?.priceViaZoom}
				/>
			),
		},
		{
			header: "",
			enableSorting: false,
			id: "actions",

			// accessorFn: (row) => (row.createdAt ? new Date(row.createdAt) : null),
			cell: ({ row }) => {
				return (
					<div className="flex items-center gap-2">
						<ActionsCellComponent
							id={row.original.user?.id}
							onViewUser={onViewUser}
							registrationId={row.original.id}
							approved={row.original.approved}
							paid={row.original.paid}
						/>
					</div>
				);
			},
		},
	];
}
