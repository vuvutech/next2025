// File: app/admin/registrations/ClientWrapper.tsx
"use client";

import { useCallback, useMemo, useState } from "react";
import { UserProfileSheet } from "@/components/modals/UserProfileSheet";
import { GenericDataTable } from "@/components/ui/data-table/generic-data-table";
import { createColumns, type RegistrationRow } from "./columns";

export const dynamic = "force-dynamic";

export default function ClientWrapper({ data }: { data: RegistrationRow[] }) {
	const [viewUserId, setViewUserId] = useState<string | null>(null);
	const [showSheet, setShowSheet] = useState(false);

	const handleViewUser = useCallback((id: string) => {
		setViewUserId(id);
		setShowSheet(true);
	}, []);

	const columns = useMemo(
		() => createColumns(handleViewUser),
		[handleViewUser],
	);

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
