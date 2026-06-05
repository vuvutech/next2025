// File: app/admin/users/ClientWrapper.tsx
"use client";

import { useMemo, useState } from "react";
import { UserProfileSheet } from "@/components/modals/UserProfileSheet";
import { GenericDataTable } from "@/components/ui/data-table/generic-data-table";
import { createColumns, type UserRow } from "./columns";

export const dynamic = "force-dynamic";

export default function ClientWrapper({ data }: { data: UserRow[] }) {
	const [viewUserId, setViewUserId] = useState<string | null>(null);
	const [showSheet, setShowSheet] = useState(false);

	const handleViewUser = (id: string) => {
		setViewUserId(id);
		setShowSheet(true);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: handleViewUser is stable across renders
	const columns = useMemo(() => createColumns(handleViewUser), []);

	return (
		<>
			<GenericDataTable columns={columns} data={data} addFiltering={true} />
			<UserProfileSheet
				open={showSheet}
				onOpenChange={setShowSheet}
				userId={viewUserId}
			/>
		</>
	);
}
