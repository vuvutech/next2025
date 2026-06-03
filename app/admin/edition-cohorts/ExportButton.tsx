"use client";

import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ExportButtonProps {
	registrations: any[];
	editionTitle: string;
}

export function ExportButton({
	registrations,
	editionTitle,
}: ExportButtonProps) {
	const rows = registrations.map((r) => ({
		Name: r.user?.name || "Unknown",
		"Student ID": r.user?.studentId || "Not specified",
		"Institute Edition": editionTitle,
		Approved: r.approved ? "Yes" : "No",
		Paid: r.paid ? "Yes" : "No",
	}));

	const exportExcel = () => {
		const ws = XLSX.utils.json_to_sheet(rows);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "Registrations");
		XLSX.writeFile(
			wb,
			`${editionTitle.replace(/\s+/g, "_")}_registrations.xlsx`,
		);
	};

	const exportPDF = () => {
		const doc = new jsPDF("landscape");
		doc.text(`${editionTitle} - Registrations`, 14, 15);

		const tableData = rows.map((r) => [
			r.Name,
			r["Student ID"],
			r["Institute Edition"],
			r.Approved,
			r.Paid,
		]);

		autoTable(doc, {
			head: [["Name", "Student ID", "Institute Edition", "Approved", "Paid"]],
			body: tableData,
			startY: 25,
			styles: { fontSize: 8 },
		});

		doc.save(
			`${editionTitle.replace(/\s+/g, "_")}_registrations.pdf`,
		);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="flex items-center gap-1 text-xs"
				>
					<Download className="size-3.5" />
					Export
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					className="cursor-pointer"
					onClick={exportExcel}
				>
					Export to Excel
				</DropdownMenuItem>
				<DropdownMenuItem
					className="cursor-pointer"
					onClick={exportPDF}
				>
					Export to PDF
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
