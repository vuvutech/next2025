"use client";

import { LucideScanFace, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActionsCellProps {
	id?: string;
	onViewUser?: (id: string) => void;
}

export function ActionsCellComponent({ id, onViewUser }: ActionsCellProps) {
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="h-8 w-8 p-0 rounded-full">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuSeparator />

					<DropdownMenuItem
						className="text-foreground cursor-pointer"
						onClick={() => id && onViewUser?.(id)}
					>
						<span className=" flex items-center gap-1">
							<LucideScanFace /> View User
						</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
